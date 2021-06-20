//Hier wird der Input und die Datei übergeben
function autocomplete(inp, arr) {

	var currentFocus;
	//Funktion wird ausgelöst, wenn Eingabe gestartet wird
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value; //value von input hinzugefügt
		closeAllLists();

		if (!val) {
			return false;
		}
		currentFocus = -1;

		//Erstellt ein div Element aus dem Datensatz
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		//Dieser wird als 'Kind vom ganzen Autocomplete-Container geestellt:
		this.parentNode.appendChild(a);
		//Für jedes Element im übergebenen Feld arr...
		for (i = 0; i < arr.length; i++) {
			// Wird überprüft, ob das eingebene Element in die Suchleiste mit den selben Buchstaben beginnt, wie die elemente im Feld
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				// Für jeden Treffer wird ein eigenes Div erstellt: 
				b = document.createElement("DIV");
				// Die Buchstaben, die sich übereinstimmen, werden fett gemacht
				b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
				b.innerHTML += arr[i].substr(val.length);
				//verstehe ich noch nict
				/*insert a input field that will hold the current array item's value:*/
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
				//hier wird ein Listener hinzugefügt, falls jemand auf ein Element in der Liste klickt
				b.addEventListener("click", function(e) {
					//erst wird der Text in das Suchfeld übernommen:
					inp.value = this.getElementsByTagName("input")[0].value;
					//anschließend wird die komplette Liste geschlossen: 
					closeAllLists();
					//löst dann den Suchbutton aus, wie als hätte man darauf geklickt
					$('#button').trigger('click');
				});
				a.appendChild(b);
			}
		}
	});
	/*Keyboardsteuerung innerhalb der Liste mit den Pfeiltasten*/
	inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) { //down
			/*Wenn Pfeiltaste nach unten gedrückt wird, dann geh runter*/
			currentFocus++;
			/*Zeig das ausgewählt visuell besser an*/
			addActive(x);
		} else if (e.keyCode == 38) { //up
			/*Wenn Pfeiltaste nach oben gedrückt wird, dann geh hoch*/
			currentFocus--;
			/*Zeig das ausgewählt visuell besser*/
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
		//hiermit wird ein element die Klasse "autocomplete-active zugewiesen"
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
		//function um "active" von allen anderen autocomplete elementen zu entfernen
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove("autocomplete-active");
		}

	}

	function closeAllLists(elmnt) {
		//es schließt die gesamte Liste, außer das übergeben elmnt
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != inp) {
				x[i].parentNode.removeChild(x[i]);
			}
		}

	}
	//sobald jemand auf die Webseite clickt, wird die Liste geschlossen
	document.addEventListener("click", function(e) {
		closeAllLists(e.target);
	});
}