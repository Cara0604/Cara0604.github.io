//Klasse Standort
class Standort {

	//Konstruktor der Klasse
	constructor(la, lo, name, unit_type, adress, bild, creditor, division, partner_since_year, purchasing_volume,
		estimated_leverage, employees_female, employees_male, audit_type, fair_wear_audit,
		last_fair_wear_training, bsci_id, wrap_id, complaints, certificates, mode_of_transportation,
		port_name, port_coordinates_latitude, port_coordinates_longitude, warehouse_name, carbon_footprint, street, street_addition, place, country_code, country, hcs_id) {

		this.hcs_id = hcs_id;
		this.la = la;
		this.lo = lo;
		this.name = name;
		this.unit_type = unit_type;
		this.adress = adress;
		this.bild = bild;
		this.creditor = creditor;
		this.division = division;
		this.partner_since_year = partner_since_year;
		this.purchasing_volume = purchasing_volume;
		this.estimated_leverage = estimated_leverage;
		this.employees_female = employees_female;
		this.employees_male = employees_male;
		this.audit_type = audit_type;
		this.fair_wear_audit = fair_wear_audit;
		this.last_fair_wear_training = last_fair_wear_training;
		this.sci_id = bsci_id;
		this.wrap_id = wrap_id;
		this.complaints = complaints;
		this.certificates = certificates;
		this.mode_of_transportation = mode_of_transportation;
		this.port_name = port_name;
		this.port_coordinates_latitude = port_coordinates_latitude;
		this.port_coordinates_longitude = port_coordinates_latitude;
		this.warehouse_name = warehouse_name;
		this.carbon_footprint = carbon_footprint;
		this.street = street;
		this.street_addition = street_addition;
		this.place = place;
		this.country_code = country_code;
		this.country = country;
	}
}

//Globale Variablen
var la;
var lo;
var name;
var unit_type;
var street;
var street_addition;
var zip_code;
var place;
var country_code;
var country;
var adress;
var bild;
var creditor;
var division;
var partner_since_year;
var purchasing_volume;
var estimated_leverage;
var employees_female;
var employees_male;
var audit_type;
var fair_wear_audit;
var last_fair_wear_training;
var bsci_id;
var wrap_id;
var complaints;
var certificates;
var mode_of_transportation;
var port_name;
var port_coordinates_latitude;
var port_coordinates_longitude;
var warehouse_name;
var carbon_footprint;
var hcs_id; //eineutige ID

//Feld, in dem alle Standorte gespeichert werden (inkl. aller Attribute)
var auto_standort = [];
var contentString = [];
var ids = []; //Alle IDs, um zu vergleichen, ob IDs existieren
var latlng = [];

var json_length;

//Feld, in dem alle Marker gespeichert werden
var markers = [];

//Request, um die Daten aus der Datenbank zu holen
var url = 'https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YMnpZxMAACoACiwF';

while (url != null) {
	var abfrage = new XMLHttpRequest();
	abfrage.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(abfrage.responseText);

			url = myObj.next_page;
			
			//Länge des Datensatzes (die Anzahl der Standorte)
			json_length = Object.keys(myObj.results).length;
			
			//hier werden die Daten aus der JSON-Datei in den Variablen gespeichert
			for (var i = 0; i < json_length; ++i) {
				
				if (myObj.results[i].type === "supply_chain_unit") {					
					la = myObj.results[i].data.coordinates.latitude;
					lo = myObj.results[i].data.coordinates.longitude;
					name = myObj.results[i].data.name;
					unit_type = myObj.results[i].data.unit_type;
					street = myObj.results[i].data.street;
					street_addition = myObj.results[i].data.street_addition;
					zip_code = myObj.results[i].data.zip_code;
					place = myObj.results[i].data.place;
					country_code = myObj.results[i].data.country_code;
					country = myObj.results[i].data.country;
					adress = myObj.results[i].data.country + ", " + myObj.results[i].data.place;
					bild = myObj.results[i].data.supplier_image.url;
					creditor = myObj.results[i].data.creditor;
					division = myObj.results[i].data.devision;
					partner_since_year = myObj.results[i].data.partner_since_year;
					purchasing_volume = myObj.results[i].data.purchasing_volume;
					estimated_leverage = myObj.results[i].data.estimated_leverage;
					employees_female = myObj.results[i].data.emloyees_female;
					employees_male = myObj.results[i].data.employees_male;
					audit_type = myObj.results[i].data.audit_type;
					fair_wear_audit = myObj.results[i].data.fair_wear_audit;
					last_fair_wear_training = myObj.results[i].data.last_fair_wear_training;
					bsci_id = myObj.results[i].data.bsci_id;
					wrap_id = myObj.results[i].data.wrap_id;
					complaints = myObj.results[i].data.complaints;
					certificates = myObj.results[i].data.certificates;
					mode_of_transportation = myObj.results[i].data.mode_of_transportation;
					port_name = myObj.results[i].data.port_name;
					port_coordinates_latitude = myObj.results[i].data.port_coordinates_latitude;
					port_coordinates_longitude = myObj.results[i].data.port_coordinates_longitude;
					warehouse_name = myObj.results[i].data.warehouse_name;
					carbon_footprint = myObj.results[i].data.carbon_footprint;

					//für jeden Standort wird ein Objekt erzeugt
					let t = new Standort(la, lo, name, unit_type, adress, bild, creditor, division,
						partner_since_year, purchasing_volume, estimated_leverage, employees_female, employees_male,
						audit_type, fair_wear_audit, last_fair_wear_training, bsci_id, wrap_id, complaints, certificates, mode_of_transportation,
						port_name, port_coordinates_latitude, port_coordinates_longitude, warehouse_name, carbon_footprint, street, street_addition, place, country_code, country, hcs_id);

					auto_standort.push(t);
      				console.log(myObj.results[i].type);
				}
			}
		}
	}

	abfrage.open("GET", url, false);
	abfrage.send();
}

//Google Map wird initialisiert
function initMap() {

	//hier wird definiert, wie stark in die Karte reingezoomt wird und wo sich das Zentrum befinden soll, wenn man die Seite aufruft
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: {
			lat: 48.11,
			lng: 10.45
		},
		restriction: {
			latLngBounds: {
				north: 85,
				south: -85,
				west: -180,
				east: 180
			}
		},
	});
	map.setOptions({
		minZoom: 2.5
	});

	//Marker anlegen anhand ihres Typus

	for (var i = 0; i < auto_standort.length; i++) {
		const a = i;
		if (auto_standort[i].unit_type === "Material Lieferant") {
			newMarker = new google.maps.Marker({
				position: {
					lat: auto_standort[i].la,
					lng: auto_standort[i].lo
				},
				map: map,
				icon: 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
				animation: google.maps.Animation.DROP,
				title: auto_standort[i].name
			});
		} else if (auto_standort[i].unit_type === "Produktionsstätte") {
			newMarker = new google.maps.Marker({
				position: {
					lat: auto_standort[i].la,
					lng: auto_standort[i].lo
				},
				map: map,
				icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
				animation: google.maps.Animation.DROP,
				title: auto_standort[i].name
			});
		} else {
			newMarker = new google.maps.Marker({
				position: {
					lat: auto_standort[i].la,
					lng: auto_standort[i].lo
				},
				map: map,
				animation: google.maps.Animation.DROP,
				title: auto_standort[i].name
			});
		}

		//hier wird einerseits die Funktionalität implementiert, dass unser Infowindow erscheint und zwar jedes mal ein spezifisches für jeden Standort
		newMarker.addListener("click", () => {
			document.querySelector('#firstHeading').textContent = auto_standort[a].name;
			document.querySelector('#typ').textContent = auto_standort[a].unit_type;
			document.querySelector('#adresse').textContent = auto_standort[a].adress;
			document.querySelector('#creditor').textContent = auto_standort[a].creditor;

			//Manche Standorte haben keine Informationen und deshalb wird erstmal überprüft, ob Daten vorliegen:
			if (auto_standort[a].partner_since_year == null) {
				document.querySelector('#partner-seitP').textContent = "";
			} else {
				document.querySelector('#partner-seitP').innerHTML = "Partner-seit: <span id='partner-seit'></span>";
				document.querySelector('#partner-seit').textContent = auto_standort[a].partner_since_year;
			}

			if (auto_standort[a].purchasing_volume == null) {
				document.querySelector('#purchasing-volumeP').textContent = "";
			} else {
				document.querySelector('#purchasing-volumeP').innerHTML = "Purchasing-Volume: <span id='purchasing-volume'></span>";
				document.querySelector('#purchasing-volume').textContent = auto_standort[a].purchasing_volume;
			}

			if (auto_standort[a].estimated_leverage == null || auto_standort[a].estimated_leverage == "") {
				document.querySelector('#estimated-leverageP').textContent = "";
			} else {
				document.querySelector('#estimated-leverageP').innerHTML = "Estimated-Leverage: <span id='estimated-leverage'></span>";
				document.querySelector('#estimated-leverage').textContent = auto_standort[a].estimated_leverage;
			}

			if (auto_standort[a].employees_female == null) {
				document.querySelector('#arbeiterinnenP').textContent = "";
			} else {
				document.querySelector('#arbeiterinnenP').innerHTML = "Arbeiterinnen: <span id='arbeiterinnen'></span>";
				document.querySelector('#arbeiterinnen').textContent = auto_standort[a].employees_female;
			}

			if (auto_standort[a].employees_male == null) {
				document.querySelector('#arbeiterP').textContent = "";
			} else {
				document.querySelector('#arbeiterP').innerHTML = "Arbeiter: <span id='arbeiter'></span>";
				document.querySelector('#arbeiter').textContent = auto_standort[a].employees_male;
			}

			if (auto_standort[a].complaints == null) {
				document.querySelector('#beschwerdenP').textContent = "";
			} else {
				document.querySelector('#beschwerdenP').innerHTML = "Beschwerden: <span id='beschwerden'></span>";
				document.querySelector('#beschwerden').textContent = auto_standort[a].complaints;
			}

			// Wenn hier für src null eingesetzt wird (bzw. undefined), tritt eine Fehlermeldung ein, die beschreibt, dass der localHost undefined ist

			if (auto_standort[a].supplier_image != null) {
				$('#picture').addClass("showPic");
				document.querySelector('#picture').src = auto_standort[a].supplier_image;
			} else {
				// $('#picture').removeClass("showPic");
				document.querySelector('#picture').src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwsq1r1AOCs6_prjRTVrOe7wDUdriCjl6XW_sbp47qF6PfB6iglkqNtxjLTq5E5mjJkkw&usqp=CAU";
			}

			// if (auto_standort[a].supplier_video != null) {
			// }

			//Wenn auf den Standort geklickt wird, öffnet sich das infoWindow, zoomt zum spezifischen Standort; lässt den Hintergrund ausblurren 
			$('.info').addClass("show");
			$('.info').removeClass("hide");
			$('.info').addClass("showInfo");
			map.setCenter({
				lat: auto_standort[a].la,
				lng: auto_standort[a].lo
			});
			map.setZoom(8);
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
			$('.container').addClass("active");
		});
		//alle Marker werden in markers gespeichert
		markers.push(newMarker);
		latlng[i] = new google.maps.LatLng(auto_standort[i].la, auto_standort[i].lo);
	}


	////////////////// unsere Verewigung -> der FIM-Standort
	var myLatlng = new google.maps.LatLng(48.33366559150027, 10.894521557382948);

	var marker = new google.maps.Marker({
		position: myLatlng,
		animation: google.maps.Animation.BOUNCE,
		map: map,
		title: "FIM"
	});

	marker.addListener("click", () => {

		document.querySelector('#firstHeading').textContent = "FIM";
		document.querySelector('#typ').textContent = "Entwickler";
		document.querySelector('#adresse').textContent = "@Cara, Hani, Felix, Domi, Jakob";
		document.querySelector('#creditor').textContent = "Diese Karte wurde von Studenten der Uni Augsburg im Rahmen des Projektstudiums Wirtschaftsinformatik entwickelt";
		document.querySelector('#partner-seitP').textContent = "";
		document.querySelector('#purchasing-volumeP').textContent = "";
		document.querySelector('#estimated-leverageP').textContent = "";
		document.querySelector('#arbeiterinnenP').textContent = "";
		document.querySelector('#arbeiterP').textContent = "";
		document.querySelector('#beschwerdenP').textContent = "";

		$('.info').addClass("show");
		$('.info').removeClass("hide");
		$('.info').addClass("showInfo");
		map.setCenter({
			lat: 48.33366559150027,
			lng: 10.894521557382948
		});
		map.setZoom(8);
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
		$('.container').addClass("active");
	});
	//////////////////////////////////////////////////////

	var button = document.getElementById('button');

	// Hier wird der Filter für die Produzenten gesetzt
	var checkbox_produzenten = document.getElementById('checkbox-1');
	var checkbox_lieferanten = document.getElementById('checkbox-2');


	checkbox_produzenten.addEventListener('change', function() {
		button.click();
		if(checkbox_produzenten.checked && checkbox_lieferanten.checked) {
			marker.setVisible(true);
		} else {
			marker.setVisible(false);
		}
	});

	function changeProduzentTrue(eingabe) {
		var i;

			if (checkbox_produzenten.checked) {
				for (i = 0; i < auto_standort.length; i++) {
					if (auto_standort[i].unit_type === "Produktionsstätte" && eingabe[i]) {
						markers[i].setVisible(true);
					}
				}
			} else {
				for (i = 0; i < auto_standort.length; i++) {
					if (auto_standort[i].unit_type === "Produktionsstätte") {
						markers[i].setVisible(false);
					}
				}
			}
	}

	// Hier wird der Filter für die Lieferanten gesetzt

	checkbox_lieferanten.addEventListener('change', function() {
		button.click();
		if(checkbox_produzenten.checked && checkbox_lieferanten.checked) {
			marker.setVisible(true);
		} else {
			marker.setVisible(false);
		}
	});

	function changeLieferantenTrue(eingabe) {
		var i;
		if (checkbox_lieferanten.checked) {
		console.log(checkbox_produzenten.checked);
		for (i = 0; i < auto_standort.length; i++) {
			if (auto_standort[i].unit_type === "Material Lieferant" && eingabe[i]) {
				markers[i].setVisible(true);
				}
			}
		} else {
			for (i = 0; i < auto_standort.length; i++) {
				if (auto_standort[i].unit_type === "Material Lieferant") {
					markers[i].setVisible(false);
				}
			}
		}
	}



	var latlong = [];

	// Hier wird die Funktionalität der Suchleiste implementiert
	button.addEventListener("click", function() {
		var i;
		var input = document.querySelector('.searchTerm').value.toLowerCase();
		var eingabe = [];
		
		var a = 0;
		var bounds = new google.maps.LatLngBounds();
		latlong.splice(0, latlong.length);
		for (i = 0; i < markers.length; i++) {
			//erstmal alle Marker unsichtbar machen, sodass danach nur die gesuchten auf sichtbar gesetzt werden müssen
			markers[i].setVisible(false);
			eingabe[i] = false;
			if (auto_standort[i].name.toLowerCase() == input || auto_standort[i].country.toLowerCase() == input || auto_standort[i].place.toLowerCase() == input) {
				markers[i].setVisible(true);
				eingabe[i] = true;

				latlong[a] = new google.maps.LatLng(auto_standort[i].la, auto_standort[i].lo);
				bounds.extend(latlong[a]);
				a++;
			}
		}

		//falls die Eingabe nicht übereinstimmt werden keine Standorte angezeigt
		if (!eingabe && input != "") {
			for (i = 0; i < markers.length; i++) {
				markers[i].setVisible(false);
			}

			document.querySelector('.msg').innerHTML = "Kein Ergebnis!";

			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
			$('.alert').addClass("show");
			$('.alert').removeClass("hide");
			$('.alert').addClass("showAlert");
			setTimeout(function() {
				$('.alert').removeClass("show");
				$('.alert').addClass("hide");
				setTimeout(() => {
					$('.alert').removeClass("showAlert");
				}, 1100);
			}, 3000);

			//wenn die Eingabe leer ist, werden alle Standorte angezeigt
		} else if (input === "") {
			for (i = 0; i < markers.length; i++) {
				markers[i].setVisible(true);
			}

			//Mitte der Karte bestimmen
			for (var i = 0; i < latlng.length; ++i) {
				bounds.extend(latlng[i]);
			}

			$('.alert').removeClass("show");
			$('.alert').addClass("hide");
			setTimeout(() => {
				$('.alert').removeClass("showAlert");
			}, 1100);
		}

		changeLieferantenTrue(eingabe);
		changeProduzentTrue(eingabe);

		//Grenzen der Karte übergeben
		map.fitBounds(bounds);
		
		if (a === 1) {
			map.setZoom(8);
		}	
	});

	//Damit wird das InfoWindow geschlossen
	$('.close-info').click(function() {
		$('.info').removeClass("show");
		$('.info').addClass("hide");
		setTimeout(() => {
			$('.info').removeClass("showInfo");
		}, 1100);
		document.getElementById('map').scrollIntoView({
			behavior: 'smooth'
		});
		$('.container').removeClass("active");
	})

} //Ende der initMap Funktion


//close Alert Funktion
$('.close-btn').click(function() {
	$('.alert').removeClass("show");
	$('.alert').addClass("hide");
	setTimeout(() => {
		$('.alert').removeClass("showAlert");
	}, 1100);
});

