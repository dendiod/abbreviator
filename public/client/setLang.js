function setLanguage(language) {
	console.log('language', language);
	selectedLanguage = language;
	let req = JSON.stringify({lang: selectedLanguage});
	let request = new XMLHttpRequest();
	request.open("POST", "/lang", true);   
	request.setRequestHeader("Content-Type", "application/json");
	request.addEventListener("load", function () {
		let data = JSON.parse(request.response).lang;
		document.getElementById('input').placeholder = data[0];
		document.getElementById('output').placeholder = data[1];
		document.getElementById('getResult').innerHTML = data[2];
		message = [data[3], data[4]];
		//document.getElementById('charsToAbbreviateInput').innerHTML = data[5];
	});
	request.send(req);
}

function radioButtonOnChange(radioButton){
	console.log('radioButtonOnChange value', radioButton);
	setLanguage(radioButton.value);
}

let message = [];

const languageValueList = abbreviator.getLanguageList();
let selectedLanguage = languageValueList[0];
setLanguage(selectedLanguage);