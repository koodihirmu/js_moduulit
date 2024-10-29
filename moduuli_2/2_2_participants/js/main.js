'use strict'

const participant_count = prompt("Amount of participants: ")
const participants = []

// prompt for participants
for (let i = 0; i < participant_count; i++) {
	participants.push(prompt("Name of a participant: "))
}

// put them in alphabetical order
participants.sort()

participants.forEach((x) => {
	let body = document.querySelector("body")

	// check if we have list element already
	let list = document.querySelector("ol")
	if (!list) {
		list = document.createElement("ol")
		body.appendChild(list)
	}

	// create items for list
	let item = document.createElement("li")
	let name = document.createTextNode(x)

	// append the elements to each other
	item.appendChild(name)
	list.appendChild(item)
})
