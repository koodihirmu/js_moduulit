'use strict'

// app that shows route from location to school karaportti 2
// get address
// turn address to coordinates
// fetch route somehow with coordinates

const apiAddress = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
const apiAddress_geocoding = "https://api.digitransit.fi/geocoding/v1/search"

const getAPIkey = async () => {
	try {
		// make sure to load the api key so that it doesn't show up in git repo
		const api_key = await fetch("http://127.0.0.1:8080/env.json")
			.then((response) => { return response.json() })
		return api_key.api_key
	} catch (error) {
		console.log(error)
		return null
	}
}

const addressToCoordinates = async (address) => {
	try {
		const params = new URLSearchParams({
			text: address,
			size: 1
		})
		const fetchOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'digitransit-subscription-key': await getAPIkey(),
			},
		}
		const response = await fetch(`${apiAddress_geocoding}?${params.toString()}`, fetchOptions)

		if (!response.ok) {
			throw new Error(`Error: ${response.status} ${response.statusText}`)
		}

		const apiData = await response.json()
		if (!apiData.features.length > 0) {
			console.log("Error: no results.")
			return
		}
		return { longitude: apiData.features[0].geometry.coordinates[0], latitude: apiData.features[0].geometry.coordinates[1] }
	} catch (error) {
		console.log(error)
		return null
	}
}

const getRoute = async (beginning, destination) => {
	const GQLquery = `{
			plan(
			fromPlace: "${beginning.latitude}, ${beginning.longitude}"
			toPlace: "${destination.latitude}, ${destination.longitude}"
			)
			{
				itineraries{
				  duration,
				  legs {
					mode
					startTime
					endTime
					from {
					  lat
					  lon
					},
					to {
					  lat
					  lon
					  name
					},
					distance
					legGeometry {
					  length
					  points
					}
				  }
				}
			  }
	}`
	try {
		const fetchOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'digitransit-subscription-key': await getAPIkey(),
			},
			body: JSON.stringify({ query: GQLquery }),
		}
		const response = await fetch(apiAddress, fetchOptions)
		const apiData = await response.json()
		if (!apiData.data.plan.itineraries.length > 0) {
			return null
		}
		return apiData
	} catch (error) {
		console.log(error)
	}
}

const form = document.body.querySelector("#search_location")

let layer = []
let polyline = []

// the api seems to return the time stamp already multiplied 1000
const unixToTime = (unixTimeStamp) => {
	const date = new Date(unixTimeStamp)
	return date.toLocaleTimeString("fi-FI")
}

// event listener for form
form.addEventListener('submit', async (evt) => {
	evt.preventDefault()
	// remove all markers
	layer.forEach((x) => {
		x.remove()
	})

	// remove all polylines
	polyline.forEach((x) => {
		x.remove()
	})

	try {
		const query = form.querySelector("input[name=location]")
		// check if we have a value in the input
		if (!query.value) {
			console.log("Error: no search term found")
			return
		}
		// get coordinates fromt he input
		const address = await addressToCoordinates(query.value)
		// check if address is valid
		if (address) {
			// set marker for the address
			layer = [L.marker([address.latitude, address.longitude]).addTo(map)]
			// get the default destination
			const destination = await addressToCoordinates("Karaportti 2")
			// zoom out to fit the route
			map.fitBounds([[address.latitude, address.longitude], [destination.latitude, destination.longitude]])
			// push a marker in the array
			layer.push(new L.marker([destination.latitude, destination.longitude]).addTo(map))
			// get route
			const route = await getRoute(address, destination)
			if (!route) {
				console.log("Error: no routes found")
				return
			}
			// decode route points
			const routeRoot = route.data.plan.itineraries[0]
			const routeLegs = routeRoot.legs
			routeLegs.forEach((leg) => {
				const pointObjects = L.Polyline.fromEncoded(leg.legGeometry.points).getLatLngs()
				polyline.push(L.polyline(pointObjects).setStyle({ color: 'red' }).addTo(map))
			})

			// for showing the times
			const startEndTime = document.querySelector("#result2")
			startEndTime.innerText = "Departure: " + unixToTime(routeLegs[0].startTime) + " Arrival: " + unixToTime(routeLegs[routeLegs.length - 1].endTime)
			// estimated duration of the route
			const estimatedTime = document.querySelector("#result")
			estimatedTime.innerText = `Estimated duration for the route: ${(routeRoot.duration / 60).toFixed(0)} minutes`
		}
	} catch (error) {
		console.log(error)
	}
})

