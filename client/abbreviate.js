function inspectText() {
	
	output = '', lettersCounter = 0;
	let isCurrentLetter = false;
	input = document.getElementById('input').value;
	let coherentChars = parseInt(utf[0]), charsToUpper = parseInt(utf[1]);	
	
	for(let i = 0; i < input.length; i++) {
		isCurrentLetter = false;
		for(let j = 2; j < coherentChars + 2; j+=2) {
			if(input[i] >= utf[j].charAt(0) && input[i] <= utf[j+1].charAt(0)) {
				isCurrentLetter = true;
				break;
			}
		}
		if(!isCurrentLetter) {
			for(let j = coherentChars + 2; j < utf.length; j++) {
				if(input[i] == utf[j].charAt(0)) {
					isCurrentLetter = true;
					break;
				}
			}
		}
		
		if(!isCurrentLetter) {
			for(let j = 2; j < coherentChars + 2; j+=2) {
				if(input[i] >= utf[j].toUpperCase().charAt(0) && input[i] <= utf[j+1].toUpperCase().charAt(0)) {
					isCurrentLetter = true;
					break;
				}
			}
		}
		
		if(!isCurrentLetter) {
			for(let j = coherentChars + 2; j < charsToUpper; j++) {
				if(input[i] == utf[j].toUpperCase().charAt(0)) {
					isCurrentLetter = true;
					break;
				}
			}
		}
		
		if(isCurrentLetter) {
			++lettersCounter;
		} else {
			if(lettersCounter > 0) {
				processWord(i);
			}
			output += input[i];
			lettersCounter = 0;
		}
	}
	
	if(isCurrentLetter) {
		processWord(input.length);
	}
	
	document.getElementById('output').innerHTML = output;
	let difference = input.length - output.length;
	setTimeout(() => alert(message[0] + difference + message[1]), 50);
	console.log(input.length);
}

function processWord(lastIndex) {
	let startIndex = lastIndex - lettersCounter; 
	if(lettersCounter > lettersToAbbr + 1) {
		let firstLetter = input[startIndex];
		let word = firstLetter.toLowerCase();
		for(let i = startIndex + 1; i < lastIndex; i++) {
			word += input[i];
		}
		let letSymbols, hasPrefix = false, abbreviate = true;
		for(let i = 0; i < prefixes.length; i++) {
			if(word.startsWith(prefixes[i])) {
				letSymbols = prefixes[i].length + lettersToAbbr;
				if(letSymbols > word.length - 2)
					abbreviate = false;
				hasPrefix = true;
				break;
			}
		}
		if(!hasPrefix){
			letSymbols = lettersToAbbr;
		}
		let newWord = firstLetter + word.substr(1);
		if(abbreviate) {
			output += newWord.substr(0, letSymbols);
			output += '*';
		} else {
			output += newWord;
		}
	} else {
		for(let i = startIndex; i < lastIndex; i++) {
			output += input[i];
		}
	}	
}

function getResult() {
	let req = JSON.stringify({lang: folders[radioIndex]});
	let request = new XMLHttpRequest();
	request.open("POST", "/prefixes", true);   
	request.setRequestHeader("Content-Type", "application/json");
	request.addEventListener("load", function () {
		prefixes = JSON.parse(request.response).prefixes;
		utf = JSON.parse(request.response).utf;		
		inspectText();
	});
	request.send(req);
}

const lettersToAbbr = 5;
let input, output = '', lettersCounter = 0;
let prefixes, utf;