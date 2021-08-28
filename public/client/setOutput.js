function getResult() {
	let req = JSON.stringify({lang: selectedLanguage});
	let request = new XMLHttpRequest();
	request.open("POST", "/prefixes", true);   
	request.setRequestHeader("Content-Type", "application/json");
	request.addEventListener("load", function () {
		const textToAbbreviate = document.getElementById('input').value;
		const lettersToAbbr = parseInt(document.getElementById('charsToAbbreviateInput').value);
		const input = {
			textToAbbreviate: textToAbbreviate,
			languageDetails: JSON.parse(request.response),
			lettersToAbbr: lettersToAbbr
		};	
		const output = abbreviator.getAbbreviatedText(input);

        document.getElementById('output').innerHTML = output;
        let difference = textToAbbreviate.length - output.length;
        setTimeout(() => alert(message[0] + difference + message[1]), 50);
        console.log(textToAbbreviate.length);
	});
	request.send(req);
}