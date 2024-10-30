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
