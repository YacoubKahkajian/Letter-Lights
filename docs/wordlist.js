export let words = [
'which',
'there',
'their',
'about',
'would',
'these',
'other',
'words',
'could',
'write',
'first',
'water',
'after',
'where',
'words',
'could',
'after',
'wight',
'think',
'three',
'years',
'place',
'sound',
'great',
'again',
'still',
'every',
'small',
'found',
'those',
'never',
'under',
'might',
'while',
'house',
'world',
'below',
'asked',
'going',
'large',
'until',
'along',
'shall',
'being',
'often',
'earth',
'began',
'since',
'study',
'night',
'light',
'above',
'paper',
'parts',
'young',
'story',
'point',
'times',
'heard',
'whole',
'white',
'given',
'means',
'music',
'miles',
'thing',
'today',
'later',
'using',
'money',
'lines',
'order',
'group',
'among',
'learn',
'known',
'space',
'table',
'early',
'trees',
'short',
'hands'
];

//write cookies
document.getElementById("submitWords").addEventListener("click", function() {
	let cookieValue = "customWords=" + document.getElementById("customWords").value;
	document.cookie = cookieValue;
});

function readCookie() {
	let newWords = document.cookie.split("=").join(",").split(" ").join(",").split(",");
	for (let i = 0; i < newWords.length; i++) {
		if (newWords[i].length == 5) {
			words.push(newWords[i]);
			document.getElementById("customWords").value += newWords[i] + " ";
		}
	}
}

window.onload = readCookie;
