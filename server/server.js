const fs = require("fs");
const express = require("express");  
const app = express();
app.use(express.static("client"));
// создаем парсер для данных в формате json
const jsonParser = express.json();

function readFromFile(path, regex) {
	return fs.readFileSync(path).toString('utf-8').split(regex);
}
  
app.post("/prefixes", jsonParser, function (request, response) {
	let language = request.body.lang, path = './server/' + language;
	console.log('loading ' + language + ' prefixes');
	let utf = readFromFile(path + '/utf-8.txt', /\s+/);
    let prefixes = readFromFile(path + '/prefixes.txt', /\s+/);	
	response.json({"prefixes": prefixes, "utf": utf});
});

app.post("/lang", jsonParser, function (request, response) {
	let language = request.body.lang, path = './server/' + language;
	console.log('loading ' + language + ' gui');
	let gui = readFromFile(path + '/gui.txt', /[\r\n]+/gm);
	response.json({"lang": gui});  
});

let port = 8080;
app.listen(port);
	
console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");