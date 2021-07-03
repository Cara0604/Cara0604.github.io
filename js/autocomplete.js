//Hier wird der Input und die Datei übergeben
function autocomplete(inp, arr, suche) {

	var currentFocus;
	//Funktion wird ausgelöst, wenn Eingabe gestartet wird
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value; //value von input hinzugefügt
		closeAllLists();

		if (!val) {
			return false;
		}
		currentFocus = -1;

		//Erstellt ein div Element aus dem Datensatz und fügt eine id bzw. eine class
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");

		//Dieser wird als "Kind" vom ganzen Autocomplete-Container gestellt:
		this.parentNode.appendChild(a);
		//Für jedes Element im übergebenen Feld suche...
		for (i = 0; i < suche.length; i++) {
			// ... wird überprüft, ob das eingebene Element in der Suchleiste mit den selben Buchstaben beginnt, wie die Elemente im Feld
			var substring = suche[i].substr(0, val.length).toUpperCase();
			if (substring === val.toUpperCase()) {

				for (var zahl = 0; zahl < arr.length; ++zahl) {

					if (arr[zahl].toUpperCase().includes(substring)) { //hier muss man noch die if bedingung anpassen, da alle buchstaben gemeint sind und nicht nur der Anfang der Wörters
						// Für jeden Treffer wird ein eigenes Div erstellt: 
						b = document.createElement("DIV");

						// Die Buchstaben, die übereinstimmen, werden fett gemacht
						// b.innerHTML = "<strong>" + arr[zahl].substr(0, substring.length) + "</strong>";

						b.innerHTML = "<input id='value' type='hidden' value='" + arr[zahl] + "'>" + "<p id=text></p>";
						b.querySelector('#text').innerHTML += arr[zahl].toUpperCase().replace(substring.toUpperCase(), "<span>"  + substring + '</span>');
						// b.innerHTML += arr[zahl].substr(substring.length);
						console.log("Was hier los_: ", zahl);
						//hier wird ein Eingabefeld eingesetzt, das den Wert vom aktuellen Feldindex hält

						//hier wird ein Listener hinzugefügt, falls jemand auf ein Element in der Liste klickt
						b.addEventListener("click", function(e) {
							//erst wird der Text in das Suchfeld übernommen:
							inp.value = this.getElementsByTagName("input")[0].value;
							//anschließend wird die komplette Liste geschlossen: 
							closeAllLists();
							//löst dann den Suchbutton aus, als hätte man darauf geklickt
							$('#button').trigger('click');
						});
						
						a.appendChild(b);

					}

				}
				
			}
		}
	});
	//Keyboardsteuerung innerhalb der Liste mit den Pfeiltasten
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) { //down
			//Wenn Pfeiltaste nach unten gedrückt wird, dann geh runter
			currentFocus++;
			//Zeigt das Ausgewählte visuell besser an
			addActive(x);
		} else if (e.keyCode == 38) { //up
			//Wenn Pfeiltaste nach oben gedrückt wird, dann geh hoch
			currentFocus--;
			//Zeigt das ausgewählt visuell besser an
			addActive(x);
		} else if (e.keyCode == 13) { //enter Funktion einbauen
			if (currentFocus > -1) {
				if (x) {
					x[currentFocus].click();
				}
			}
			$("#searchForm").submit(function() {
				document.getElementById('button').click();
				return false;
			});
		}
	})

	function addActive(x) {
		//hiermit wird ein Element der Klasse "autocomplete-active" zugewiesen
		if (!x)
			return false;
		//anschließend entfernt man bei allen anderen Elemente "active"
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		//hier wird die klasse hinzugefügt
		x[currentFocus].classList.add("autocomplete-active");

	}

	function removeActive(x) {
		//function um "active" von allen anderen autocomplete Elementen zu entfernen
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}

	}

	function closeAllLists(elmnt) {
		//schließt die gesamte Liste, außer das übergebene Element
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}

	}
	//sobald jemand auf die Webseite klickt, wird die Liste geschlossen
	document.addEventListener("click", function(e) {
		closeAllLists(e.target);
	});
}