function inspectText() {
	output = '', lettersCounter = 0;
	let isCurrentLetter = false;
	let coherentChars = parseInt(utf[0]), charsToUpper = parseInt(utf[1]);	
	
	for(let i = 0; i < textToAbbreviate.length; i++) {
		isCurrentLetter = false;
		for(let j = 2; j < coherentChars + 2; j+=2) {
			if(textToAbbreviate[i] >= utf[j].charAt(0) && textToAbbreviate[i] <= utf[j+1].charAt(0)) {
				isCurrentLetter = true;
				break;
			}
		}
		if(!isCurrentLetter) {
			for(let j = coherentChars + 2; j < utf.length; j++) {
				if(textToAbbreviate[i] == utf[j].charAt(0)) {
					isCurrentLetter = true;
					break;
				}
			}
		}
		
		if(!isCurrentLetter) {
			for(let j = 2; j < coherentChars + 2; j+=2) {
				if(textToAbbreviate[i] >= utf[j].toUpperCase().charAt(0) && textToAbbreviate[i] <= utf[j+1].toUpperCase().charAt(0)) {
					isCurrentLetter = true;
					break;
				}
			}
		}
		
		if(!isCurrentLetter) {
			for(let j = coherentChars + 2; j < charsToUpper; j++) {
				if(textToAbbreviate[i] == utf[j].toUpperCase().charAt(0)) {
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
			output += textToAbbreviate[i];
			lettersCounter = 0;
		}
	}
	
	if(isCurrentLetter) {
		processWord(textToAbbreviate.length);
	}

	return output;
}

function processWord(lastIndex) {
	let startIndex = lastIndex - lettersCounter; 
	if(lettersCounter > lettersToAbbr + 1) {
		let firstLetter = textToAbbreviate[startIndex];
		let word = firstLetter.toLowerCase();
		for(let i = startIndex + 1; i < lastIndex; i++) {
			word += textToAbbreviate[i];
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
			output += textToAbbreviate[i];
		}
	}	
}

let lettersToAbbr;
let prefixes;
let utf;
let output = '', lettersCounter = 0;
let textToAbbreviate;
const languageList = ['en', 'es', 'ru', 'ua'];

(function(exports){
   exports.getAbbreviatedText = function(input){
	   prefixes = input.languageDetails.prefixes;
	   utf = input.languageDetails.utf;
	   textToAbbreviate = input.textToAbbreviate;
	   lettersToAbbr = input.lettersToAbbr;
        return inspectText();
    };
	exports.getLanguageList = function(){
		 return languageList;
	 };
	 exports.getDefaultLettersToAbbr = function(){
		 return 5;
	 };
})(typeof exports === 'undefined'? this['abbreviator']={}: exports);