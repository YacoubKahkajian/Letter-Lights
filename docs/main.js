import {words} from './wordlist.js'

var c = 0; //column number
var r = document.getElementById("board").getAttribute("rows"); //row number
var rCount = 0;
let currentWord = "";
let correctWord = words[Math.round(Math.random()*words.length)];

var rowLabel = 1;
for (let j = r-1; j > 0; j--) {
	var clone = document.getElementById("row0").cloneNode(true);
	clone.id = "row" + rowLabel;
	document.getElementById("board").appendChild(clone);
	rowLabel++;
}
window.clickButton = clickButton;
function clickButton(clickChar) {
	var clickButton = clickChar;
	var row = document.getElementById('row' + rCount);
	if (c < 0) {
		c = 0;
	}
	if (clickButton == "Backspace") {
		c--;
		row.getElementsByClassName(c)[0].innerHTML = "/";
		row.getElementsByClassName(c)[0].classList.replace("filled", "unknown");
		currentWord = currentWord.slice(0, -1);
	}
	else if (clickButton == "Enter" && c == 5) {
		var correctChar = 0;
		for (let i = 0; i <= 4; i++) {
			if (currentWord.slice(i, i+1) === correctWord.slice(i, i+1)) {
				row.getElementsByClassName(i)[0].classList.replace("filled", "correct");
				document.getElementById(correctWord.slice(i, i+1)).className = "correct";
				correctChar++;
			}
			else if (correctWord.search(currentWord.slice(i, i+1)) != -1) {
				row.getElementsByClassName(i)[0].classList.replace("filled", "in");
				document.getElementById(currentWord.slice(i, i+1)).className = "in";
			}
			else {
				row.getElementsByClassName(i)[0].classList.replace("filled", "none");
				document.getElementById(currentWord.slice(i, i+1)).className = "none";
			}
		}
		if (correctChar == 5) {
			alert("Correct! The word was " + correctWord + ".");
		}
		else {
			c = 0;
			rCount++;
			currentWord = "";	
			if (rCount > r - 1) {
				alert("Too bad! The word was " + correctWord + ".");
			}
		}
	}
	else {
		row.getElementsByClassName(c)[0].innerHTML = clickChar.toUpperCase();
		row.getElementsByClassName(c)[0].classList.replace("unknown", "filled");
		currentWord += clickButton;
		c++;
	}
}

window.onkeydown = function(e) {
	document.getElementById(e.key).click();
};