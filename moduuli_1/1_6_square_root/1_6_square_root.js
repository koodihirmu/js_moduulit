'use strict';

// program that gives a confirmation window asking to calculate square root
// if user selects ok the program prints the answer to html file
// if user cancels the program prints "Square root not calculated"

const button_sq = document.body.querySelector("button")

button_sq.addEventListener('click', function() {
	console.log("Square root machine")
	if (confirm("Should I calculate the square root?")) {
		let answer = parseInt(prompt("Give me a positive number"))
		if (answer >= 0) {
			document.body.querySelector("#target").innerText = `Square root of ${answer} is ${Math.sqrt(answer).toFixed(2)}`
		} else {
			document.body.querySelector("#target").innerText = `Square root of ${answer} is imaginary ${Math.sqrt(Math.abs(answer)).toFixed(2)}i`
		}
	} else {
		document.body.querySelector("#target").innerText = "Square root not calculated!"
	}
})
