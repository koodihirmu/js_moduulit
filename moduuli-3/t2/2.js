'use strict'

const target = document.querySelector("#target")

const element = document.createElement("li")
const element1 = document.createElement("li")
const element2 = document.createElement("li")

element.innerText = "First item"
element1.innerText = "Second item"
element2.innerText = "Third item"

target.appendChild(element)
target.appendChild(element1)
target.appendChild(element2)
