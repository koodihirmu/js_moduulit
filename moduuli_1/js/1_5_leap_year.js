'use strict';

const body = document.querySelector("body")

body.innerHTML = `
	<h1>Leap Year Machine (3p)</h1>
	<form id="form_leap_year">
		<div>
			<input type="text" name="year" placeholder="input year...">
			<input type="submit" name="submit" value="send">
		</div>
		<p></p>
	</form>
`

const form = document.querySelector("form[id=form_leap_year]")
const year = document.querySelector("input[name=year]")
const p = document.querySelector("p")

form.addEventListener('submit', function(evt) {
	// prevent site from refreshing since that is form default action
	evt.preventDefault()
	// check if the year is a leap year
	if ((year.value % 4 == 0 && year.value % 100 != 0) || (year.value % 100 == 0 && year.value % 400 == 0)) {
		p.innerText = `Year ${year.value} is a leap year.`
	} else {
		p.innerText = `Year ${year.value} is NOT a leap year.`
	}
})
