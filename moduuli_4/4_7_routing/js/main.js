'use strict'

// app that shows route from location to school karaportti 2
// get address
// turn address to coordinates
// fetch route somehow with coordinates

const apiAddress = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
const apiAddress_geocoding = "https://api.digitransit.fi/geocoding/v1/search"

const getAPIkey = async () => {
	try {
		const api_key = await fetch("http://127.0.0.1:8080/moduuli_4/4_7_routing/env.json")
			.then((response) => { return response.json() })
		return api_key.api_key
	} catch (error) {
		console.log(error)
		return null
	}
}

const addressToCoordinates = async (address) => {
	const params = new URLSearchParams({
		text: address,
		size: 1
	})
	try {
		const fetchOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'digitransit-subscription-key': await getAPIkey(),
			},
		}
		const response = await fetch(`${apiAddress_geocoding}?${params.toString()}`, fetchOptions)
		const apiData = await response.json()
		return apiData.features[0].geometry.coordinates
	} catch (error) {
		console.log(error)
	}
}

const getRoute = async (beginning, destination) => {
	const GQLquery = `{
			plan{
			fromPlace: "${beginning[1]}, ${beginning[0]}"
			toPlace: "${destination[1]}, ${destination[0]}"
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
		console.log(apiData)
	} catch (error) {
		console.log(error)
	}
}

const form = document.body.querySelector("#search_location")

form.addEventListener('submit', async (evt) => {
	evt.preventDefault()
	try {
		const query = form.querySelector("input[name=location]")
		const address = await addressToCoordinates(query.value)
		map.setView([address[1], address[0]], 13)
	} catch (error) {
		console.log(error)
	}
})

