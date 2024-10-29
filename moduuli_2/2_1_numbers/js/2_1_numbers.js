'use strict'

const numbers = []

for (let i = 0; i < 5; i++) {
	numbers.push(prompt("Give a number!"))
}

for (let i = numbers.length; i > 0; i--) {
	console.log(i)
}

