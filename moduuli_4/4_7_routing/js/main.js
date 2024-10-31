'use strict'

// app that shows route from location to school karaportti 2
// get address
// turn address to coordinates
// fetch route somehow with coordinates

const apiAddress = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
const apiAddress_geocoding = "https://api.digitransit.fi/geocoding/v1/search"

const getAPIkey = async () => {
	try {
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
		return undefined
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
				  walkDistance,
				  duration,
				  legs {
					mode
					startTime
					endTime
					from {
					  lat
					  lon
					  name
					  stop {
						code
						name
					  }
					},
					to {
					  lat
					  lon
					  name
					},
					agency {
					  gtfsId
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
		//console.log(apiData)
		return apiData
	} catch (error) {
		console.log(error)
	}
}

const form = document.body.querySelector("#search_location")
let layer = []
let polyline = []


form.addEventListener('submit', async (evt) => {
	evt.preventDefault()
	// remove markers
	layer.forEach((x) => {
		console.log(x)
		x.remove()
	})

	polyline.forEach((x) => {
		x.remove()
	})

	try {
		const query = form.querySelector("input[name=location]")
		if (!query.value) {
			console.log("Error: no search term found")
			return
		}
		const address = await addressToCoordinates(query.value)
		if (address) {
			map.setView([address.latitude, address.longitude], 13)
			layer = [L.marker([address.latitude, address.longitude]).addTo(map)]
			const destination = await addressToCoordinates("Karaportti 2")
			layer.push(new L.marker([destination.latitude, destination.longitude]).addTo(map))
			const route = await getRoute(address, destination)
			const encodedRoute = route.data.plan.itineraries[0].legs
			encodedRoute.forEach((leg) => {
				const pointObjects = L.Polyline.fromEncoded(leg.legGeometry.points).getLatLngs()
				polyline.push(L.polyline(pointObjects).setStyle({ color: 'red' }).addTo(map))
			})
			map.fitBounds([[address.latitude, address.longitude], [destination.latitude, destination.longitude]])
			//console.log(route.data.plan.itineraries[0].legs.forEach((leg) => console.log(leg.legGeometry["points"])))
		}
	} catch (error) {
		console.log(error)
	}
})

