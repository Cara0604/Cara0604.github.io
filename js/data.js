var street;
var zip_code;
var place;
var country;
var name;
var infos = [];
var json_length;

var url = 'https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YMnpZxMAACoACiwF';

// Die Daten werden in verschieden Websiten, damit in verschiedene Links gespeichert. Um an sie ranzukommen muss man hierfür 
//die variable url mit dem nächsten Link austauschen. Diese wird in dem Attribut myObj.next_page abgerufen

while (url != null) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) { //Abfrage hat funktioniert
			var myObj = JSON.parse(this.responseText);

			url = myObj.next_page;

			json_length = Object.keys(myObj.results).length;

			//falls der Inhalt der Attributes nicht leer ist, wird er dem Feld Infos hinzugefügt
			for (var i = 0; i < json_length; ++i) {
				if (myObj.results[i].data.country != null) {
					// nicht löschen!!!!
					// var string = myObj.results[i].data.country;
					// var splitted = string.split(" ");
					// for (var a = 0; a < splitted.length; ++a) {
					// 	infos.push(splitted[a]);
					// }
					infos.push(myObj.results[i].data.country);
				}
				if (myObj.results[i].data.place != null) {
					infos.push(myObj.results[i].data.place);
				}
				if (myObj.results[i].data.name != null) {
					infos.push(myObj.results[i].data.name);
				}
			}

			//sollte etwas doppelt sein, wird es hier gelöscht -> Erhöhung der Datenqualität
			for (var i = 0; i < infos.length; i++) {
				for (var j = 0; j < infos.length; j++) {
					if ((infos[i] == infos[j]) && i != j) {
						infos.splice(j, 1);
					}
				}
			}
		}
	};

	//holt sich die Daten
	xmlhttp.open("GET", url, false);
	xmlhttp.send();
}

//hiermit übergeben wir Daten an autocomplete.js, um die Autcomplete-Funktion zu ermöglichen. Hier wird die Eingabe und unsere Variable mit allen Straßen, Plätzen und Ländern übergeben
autocomplete(document.querySelector('.myInput'), infos);