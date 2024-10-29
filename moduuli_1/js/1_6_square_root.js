'use strict';

// program that gives a confirmation window asking to calculate square root
// if user selects ok the program prints the answer to html file
// if user cancels the program prints "Square root not calculated"

// body is declared in 1_5_leap_year
container.innerHTML += `
<div id="squareroot_div">
<h2>Squareroot Machine (3p)</h2>
<button>Start</button>
<p>Result is printed here!</p>
</div>
`

const div_sq = document.querySelector("div[id=squareroot_div]")
const button_sq = div_sq.querySelector("button")

button_sq.addEventListener('click', function() {
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
