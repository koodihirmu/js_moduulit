'use strict'

let candidate_count = prompt("Input amount of candidates: ")
if (!candidate_count) {
} else {
	// check that the count is a number
	while (!candidate_count.match(/^[0-9]*$/)) {
		console.log("invalid input, only numbers allowed.")
		candidate_count = prompt("Input amount of candidates: ")
	}

	let candidates = []
	for (let i = 0; i < candidate_count; i++) {
		let candidate = {
			name: prompt("Name for candidate" + (i + 1)),
			votes: 0,
		}
		candidates.push(candidate)
	}

	let voter_count = prompt("Input amount of voters: ")
	// check that the count is a number
	while (!voter_count.match(/^[0-9]*$/)) {
		console.log("invalid input, only numbers allowed.")
		voter_count = prompt("Input amount of voters: ")
	}

	for (let i = 0; i < voter_count; i++) {
		let voter_choice = prompt("Who will you vote for? ")
		if (voter_choice) {
			candidates.find((x) => { return (x.name == voter_choice) }).votes += 1
		}
	}

	candidates.sort((a, b) => {
		return b.votes - a.votes;
	})

	console.log(`The winner is ${candidates[0].name} with ${candidates[0].votes} votes`)
	console.log(`Results:`)
	candidates.forEach((x) => {
		console.log(`${x.name}: ${x.votes} votes`)
	})
}
