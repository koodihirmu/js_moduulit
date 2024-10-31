'use strict';

// program that gives a confirmation window asking to calculate square root
// if user selects ok the program prints the answer to html file
// if user cancels the program prints "Square root not calculated"

const div_dice = document.body.querySelector("div[id=div_dice]")
const dice_amount = div_dice.querySelector("input[name=dice_amount]")
const eye_value = div_dice.querySelector("input[name=eye_value]")
const dice_button = div_dice.querySelector("button")

dice_button.addEventListener('click', function() {
	let hit = 0
	let rolls = 10000

	for (let i = 0; i < rolls; i++) {
		let sum = 0
		for (let j = 0; j < dice_amount.value; j++) {
			let value = ((Math.random() * 10000).toFixed(0) % 6) + 1
			sum += value
		}
		console.log(sum)
		if (sum == parseInt(eye_value.value)) {
			hit += 1
		}
	}
	// print the result to paragraph
	div_dice.querySelector("p").innerText = `Probability to get sum ${eye_value.value} with ${dice_amount.value} dice is ${(hit / rolls) * 100}%`
})
