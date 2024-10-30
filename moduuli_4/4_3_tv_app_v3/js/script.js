'use strict'

const form = document.querySelector("#target")
const section = document.querySelector("#results")

// checking if the form exists
if (form) {
	console.log("form exist")

	// event listener for the form submit
	form.addEventListener('submit', async function(evt) {
		// prevent the default action
		evt.preventDefault()
		// get the query
		const query = form.querySelector("#query")
		try {
			// empty the section
			section.innerHTML = ''
			// get data asynchronously
			const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query.value}`)
			const jsonData = await response.json()
			// assign data asynchronously
			jsonData.forEach(async (item) => {
				const card = document.createElement("article")
				card.className = "card"
				const h2 = document.createElement("h2")
				h2.innerText = item["show"]["name"]
				const a = document.createElement("a")
				a.href = item["show"]["url"]
				a.innerText = item.show.url
				a.target = "_blank"
				const img = document.createElement("img")
				// I love anonymous functions
				img.src = (() => { return item.show.image?.medium || "https://placehold.co/210x295" })()
				// Though this way would work too
				//img.src = item.show.image?.medium || "https://placehold.co/210x295"

				card.appendChild(h2)
				card.appendChild(a)
				card.appendChild(img)
				section.appendChild(card)
			})
		}
		catch (error) {
			console.log(error.message)
		}
	})

} else {
	console.log("form doesn't exist")
}
