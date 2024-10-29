'use strict';

const students = [
  {
    name: 'John',
    id: '2345768',
  },
  {
    name: 'Paul',
    id: '2134657',
  },
  {
    name: 'Jones',
    id: '5423679',
  },
];

const target = document.querySelector("#target")

students.forEach((x) => {
  let option = document.createElement("option")
  option.value = x.id
  option.innerText = x.name
  target.appendChild(option)
})
