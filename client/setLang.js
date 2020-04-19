function setLanguage(i) {
	if(i == radioIndex && radioIndex)
		return;
	let req = JSON.stringify({lang: folders[i]});
	let request = new XMLHttpRequest();
	request.open("POST", "/lang", true);   
	request.setRequestHeader("Content-Type", "application/json");
	request.addEventListener("load", function () {
		let data = JSON.parse(request.response).lang;
		document.getElementById('input').placeholder = data[0];
		document.getElementById('output').placeholder = data[1];
		document.getElementById('getResult').innerHTML = data[2];
		message = [data[3], data[4]];
		radioIndex = i;
	});
	request.send(req);
}

var folders = ['en', 'es', 'ru', 'ua'];
var radioIndex, message = [];

for (let i = 0; i < languages.lang.length; i++) {
    languages.lang[i].addEventListener("click", function(){
    setLanguage(i);});
}

setLanguage(0);