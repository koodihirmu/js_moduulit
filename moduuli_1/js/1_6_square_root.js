'use strict';

// program that gives a confirmation window asking to calculate square root
// if user selects ok the program prints the answer to html file
// if user cancels the program prints "Square root not calculated"

// body is declared in 1_5_leap_year

const div_sq = container.querySelector("div[id=squareroot_div]")
const button_sq = div_sq.querySelector("button")

button_sq.addEventListener('click', function() {
	console.log("Square root machine")
	if (confirm("Should I calculate the square root?")) {
		let answer = parseInt(prompt("Give me a positive number"))
		if (answer >= 0) {
			div_sq.querySelector("p").innerText = `Square root of ${answer} is ${Math.sqrt(answer).toFixed(2)}`
		} else {
			div_sq.querySelector("p").innerText = `Square root of ${answer} is imaginary ${Math.sqrt(Math.abs(answer)).toFixed(2)}i`
		}
	} else {
		div_sq.querySelector("p").innerText = "Square root not calculated!"
	}
})
