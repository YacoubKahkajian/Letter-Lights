import {words} from './wordlist.js'

const checkbox = document.querySelector("input[name=darkModeToggle]");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
if (prefersDarkScheme.matches) {
	checkbox.checked == true;
}

function checkboxEdit() {  
  var themeColor = document.querySelector("meta[name=theme-color]");
  if (checkbox.checked) {
    document.body.classList.add("dark-theme");
	themeColor.setAttribute("content", "#121212");
  } 
  else {
    document.body.classList.remove("dark-theme");
	themeColor.setAttribute("content", "#fff");
  }
}

checkbox.addEventListener('change', checkboxEdit);
window.onload = checkboxEdit;

var c = 0; //column number
var r = document.getElementById("board").getAttribute("rows"); //row number
var rCount = 0;
var getKeys = true;
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
	if (getKeys == true) {
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
				document.getElementById("resultText").innerHTML = "Correct! The word was&nbsp;<b>" + correctWord + ".</b>";
				getKeys = false;
			}
			else {
				c = 0;
				rCount++;
				currentWord = "";	
				if (rCount > r - 1) {
					document.getElementById("resultText").innerHTML = "Too bad! The word was&nbsp;<b>" + correctWord + ".</b>";
				}
			}
		}
		else if (clickButton != "Enter"){
			row.getElementsByClassName(c)[0].innerHTML = clickChar.toUpperCase();
			row.getElementsByClassName(c)[0].classList.replace("unknown", "filled");
			currentWord += clickButton;
			c++;
		}	
	}
}

document.getElementById("reset").addEventListener("click", function() {
	correctWord = words[Math.round(Math.random()*words.length)];
	currentWord = "";
	c = 0;
	rCount = 0;
	for (let i = 0; i <= 4; i++) {
		for (let j = 0; j <= 4; j++) {
			document.getElementsByClassName(i)[j].innerHTML = "/";
			document.getElementsByClassName(i)[j].classList.remove("none", "filled", "in", "correct", "unknown");
			document.getElementsByClassName(i)[j].classList.add("unknown");
		}
	}
	const resetBank = document.querySelectorAll("div.topRow > button, div.midRow > button, div.endRow > button");
	resetBank.forEach(function(item) {
		item.classList.remove("none", "filled", "in", "correct", "unknown");
		item.classList.add("unknown");
	});
	document.getElementById("resultText").innerHTML = "";
	this.blur();
});

window.onkeydown = function(e) {
	document.getElementById(e.key).click();
};

document.getElementById("settingsButton").addEventListener("click", function() {
	document.getElementById("settings").style.display = "block";
	getKeys = false;
});

document.getElementById("outside").addEventListener("click", function() {
	document.getElementById("settings").style.display = "none";
	getKeys = true;
});
