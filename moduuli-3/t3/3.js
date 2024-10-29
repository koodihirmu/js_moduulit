'use strict';

const names = ['John', 'Paul', 'Jones'];

const target = document.querySelector("#target")

names.forEach((x) => {
	let item = document.createElement("li")
	item.innerText = x
	target.appendChild(item)
})
