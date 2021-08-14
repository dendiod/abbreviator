const fs = require("fs");
const express = require("express");  
const app = express();
app.use(express.static("public"));
const jsonParser = express.json();
const abbreviator = require('./../public/customUtil/abbreviator.js');

function readFromFile(path, regex) {
	return fs.readFileSync(path).toString('utf-8').split(regex);
}

function getPathByLanguage(language){
	return './server/' + language;
}

function getLanguageDetails(path){
	return {
		prefixes: readFromFile(path + '/prefixes.txt', /\s+/),
		utf: readFromFile(path + '/utf-8.txt', /\s+/)
	};
}
  
app.post("/prefixes", jsonParser, function (request, response) {
	let language = request.body.lang;
	const path = getPathByLanguage(language);
	console.log('loading ' + language + ' prefixes');
	const languageDetails = getLanguageDetails(path);
	response.json({
		"prefixes": languageDetails.prefixes, 
		"utf": languageDetails.utf
	});
});

app.post("/lang", jsonParser, function (request, response) {
	let language = request.body.lang;
	const path = getPathByLanguage(language);
	console.log('loading ' + language + ' gui');
	let gui = readFromFile(path + '/gui.txt', /[\r\n]+/gm);
	response.json({"lang": gui});  
});

app.post("/abbreviate", jsonParser, function (request, response) {
	const textToAbbreviate = request.body.textToAbbreviate;	
	const lettersToAbbr = request.body.lettersToAbbr 
	? request.body.lettersToAbbr
	: abbreviator.getDefaultLettersToAbbr();
	const language = request.body.lang
	? request.body.lang
	: abbreviator.getLanguageList()[0];
	const path = getPathByLanguage(language);
	const languageDetails = getLanguageDetails(path);
	const input = {
		textToAbbreviate: textToAbbreviate,
		languageDetails: languageDetails,
		lettersToAbbr: lettersToAbbr
	};
	const abbreviatedText = abbreviator.getAbbreviatedText(input);
	response.json({"abbreviatedText": abbreviatedText});  
});

let port = 3000;
app.listen(port);
	
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");