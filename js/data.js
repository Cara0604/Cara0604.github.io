var street;
var zip_code;
var place;
var country;
var name;
var infos = [];
var suche = [];
var json_length;
var master_ref;
var initiale_abfrage = new XMLHttpRequest();
initiale_abfrage.onreadystatechange = function() {
	if(this.readyState == 4 && this.status == 200) {
		var myObj = JSON.parse(initiale_abfrage.responseText);
		var i = 0;
		while(myObj.refs[i].id != "master") {
			i++;
		}
		master_ref = myObj.refs[i].ref;
	}
}
initiale_abfrage.open("GET", "https://schoeffel-b2c.cdn.prismic.io/api/v2", false);
initiale_abfrage.send();

var url = 'https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=' + master_ref;

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

				//falls es nicht zum Typ supply_chain_unit gehört, soll abgebrochen werden
				if (!(myObj.results[i].type === "supply_chain_unit")) {
					continue;
				}
				if (myObj.results[i].data.country != null) {
					var string = myObj.results[i].data.country;
					var splitted = string.split(" ");
					for (var a = 0; a < splitted.length; ++a) {
						suche.push(splitted[a]);
					}

					infos.push(myObj.results[i].data.country);
				}
				if (myObj.results[i].data.place != null) {
					var string = myObj.results[i].data.place;
					var splitted = string.split(" ");
					for (var a = 0; a < splitted.length; ++a) {
						suche.push(splitted[a]);
					}

					infos.push(myObj.results[i].data.place);
				}
				if (myObj.results[i].data.name != null) {
					var string = myObj.results[i].data.name;
					var splitted = string.split(" ");
					for (var a = 0; a < splitted.length; ++a) {
						suche.push(splitted[a]);
					}

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
			for (var i = 0; i < suche.length; i++) {
				for (var j = 0; j < suche.length; j++) {
					if (suche[i] == suche[j] && i != j) {
						suche.splice(j, 1);
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
autocomplete(document.querySelector('.myInput'), infos, suche);
