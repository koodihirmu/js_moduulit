'use strict'

const get_joke = async () => {
	try {
		let joke = await fetch("https://api.chucknorris.io/jokes/random")
		let json_joke = await joke.json()
		return json_joke["value"]
		//console.log(json_joke["value"])
	} catch (error) {
		console.log(error)
	}
}

const main = async () => {
	console.log(await get_joke())
}

main()

const form = document.querySelector("#target")
const section = document.querySelector("section")

form.addEventListener('submit', async (evt) => {
	evt.preventDefault()

	let search_term = form.querySelector("input[name=q]")

	try {
		let jokeResponse = await fetch(`https://api.chucknorris.io/jokes/search?query=${search_term.value}`);
		let json_joke = await jokeResponse.json()

		section.innerHTML = ""

		if (json_joke.result && json_joke.result.length > 0) {

			json_joke.result.forEach(async (item) => {
				let card = document.createElement("article")
				let p = document.createElement("p")
				p.innerText = item["value"]
				card.appendChild(p)
				section.appendChild(card)
			})
		} else {
			let p = document.createElement("p")
			p.innerText = "No jokes found."
			section.appendChild(p)
		}
	} catch (error) {
		console.log(error)
	}
})
