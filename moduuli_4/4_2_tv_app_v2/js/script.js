'use strict'

const form = document.querySelector("#target")

// checking if the form exists
if (form) {
	console.log("form exist")

	form.addEventListener('submit', async function(evt) {
		evt.preventDefault()
		const query = form.querySelector("#query")
		try {
			const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query.value}`)
			const jsonData = await response.json()
			console.log(jsonData)
		}
		catch (error) {
			console.log(error.message)
		}
	})
} else {
	console.log("form doesn't exist")
}
