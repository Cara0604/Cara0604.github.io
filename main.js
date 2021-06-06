//Klasse Standort
class Standort {

  //Konstruktor der Klasse
  constructor(la, lo, name, type, adress, bild, creditor, division, partner_since_year, purchasing_volume,
     estimated_leverage, employees_female, employees_male, audit_type, fair_wear_audit,
      last_fair_wear_training, bsci_id, wrap_id, complaints, certificates, mode_of_transportation,
      port_name, port_coordinates_latitude, port_coordinates_longitude, warehouse_name, carbon_footprint, street, street_addition,place,country_code, country, hcs_id) {

  this.hcs_id = hcs_id;
  this.la = la;
  this.lo = lo;
  this.name = name;
  this.type = type;
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
  this.street =street;
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
var type;
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
var hcs_id; //eineutige id

//Feld, in dem alle Standorte gespeichert werden (inkl. aller Attribute)
var auto_standort = [];
var contentString = [];
var ids = []; //Alle Ids um zu vergleichen, ids existieren

var json_length;

//Feld, in dem alle Marker gespeichert werden
var markers = []; //wofür den Namen markers2? es gibt nur ein markers

//Request, um die Daten aus der JSON-Datei zu holen
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);

    //Länge des Datensatzes (die Anzahl der Standorte)
    json_length = Object.keys(myObj.results[1].data).length;

    //hier werden die Daten aus der JSON-Datei in Variablen gespeichert
    for(var i = 0; i < json_length; ++i){
    
    hcs_id = myObj.results[1].data[i].hcs_id; //Versuch eine eindeutige id zu beziehen, um die Standorte zu unterscheiden; Im Konstruktor, in der Klasse als auch in der attributenliste angepasst. 
    la = myObj.results[1].data[i].coordinates.latitude;
    lo = myObj.results[1].data[i].coordinates.longitude;
    name = myObj.results[1].data[i].name;
    type = myObj.results[1].data[i].type;
    street = myObj.results[1].data[i].street;
    street_addition = myObj.results[1].data[i].street_addition;
    zip_code = myObj.results[1].data[i].zip_code;
    place = myObj.results[1].data[i].place;
    country_code = myObj.results[1].data[i].country_code;
    country = myObj.results[1].data[i].country;
    adress = myObj.results[1].data[i].street + " <p>" +  myObj.results[1].data[i].zip_code + " ," + myObj.results[1].data[i].place + "<p>" + myObj.results[1].data[i].country_code + " ," + myObj.results[1].data[i].country;
    bild = myObj.results[1].data[i].supplier_image.url;
    creditor = myObj.results[1].data[i].creditor;
    division = myObj.results[1].data[i].devision;
    partner_since_year = myObj.results[1].data[i].partner_since_year;
    purchasing_volume = myObj.results[1].data[i].purchasing_volume;
    estimated_leverage = myObj.results[1].data[i].estimated_leverage;
    employees_female = myObj.results[1].data[i].emloyees_female;
    employees_male = myObj.results[1].data[i].employees_male;
    audit_type = myObj.results[1].data[i].audit_type;
    fair_wear_audit = myObj.results[1].data[i].fair_wear_audit;
    last_fair_wear_training = myObj.results[1].data[i].last_fair_wear_training;
    bsci_id = myObj.results[1].data[i].bsci_id;
    wrap_id = myObj.results[1].data[i].wrap_id;
    complaints = myObj.results[1].data[i].complaints;
    certificates = myObj.results[1].data[i].certificates;
    mode_of_transportation = myObj.results[1].data[i].mode_of_transportation;
    port_name = myObj.results[1].data[i].port_name;
    port_coordinates_latitude = myObj.results[1].data[i].port_coordinates_latitude;
    port_coordinates_longitude = myObj.results[1].data[i].port_coordinates_longitude;
    warehouse_name = myObj.results[1].data[i].warehouse_name;
    carbon_footprint = myObj.results[1].data[i].carbon_footprint;

    //für jeden Standort wird ein Objekt erzeugt
    let t = new Standort(la,lo,name,type,adress,bild,creditor, division,
      partner_since_year,purchasing_volume,estimated_leverage,employees_female,employees_male,
      audit_type,fair_wear_audit, last_fair_wear_training,bsci_id,wrap_id,complaints,certificates,mode_of_transportation,
      port_name,port_coordinates_latitude,port_coordinates_longitude,warehouse_name,carbon_footprint, street, street_addition,place,country_code, country, hcs_id);

    auto_standort.push(t);

    //ursprüngliche Daten für das InfoWindow
    // contentString[i]=
    //   `<div id="content">` +
    //     `<h1 id="firstHeading" class="firstHeading">${ auto_standort[i].name }</h1>` +
    //     `<div id="bodyContent">` +
    //       `<p><b>- Typ: </b> ${auto_standort[i].type} </p> `+
    //       `<p><b>- Adresse: </b> ${auto_standort[i].adress} </p> `+
    //       `<p><b>- Creditor: </b> ${auto_standort[i].creditor} </p>` +
    //       `<p><b>- Partner seit: </b> ${auto_standort[i].partner_since_year} </p>` +
    //       `<p><b>- Purchasing volume: </b> ${auto_standort[i].purchasing_volume} </p>` +
    //       `<p><b>- Estimated Leverage: </b> ${auto_standort[i].estimated_leverage} </p>` +
    //       `<p><b>- Arbeiterinnen: </b> ${auto_standort[i].employees_female} </p>` +
    //       `<p><b>- Arbeiter: </b> ${auto_standort[i].employees_male} </p>` +
    //       `<p><b>- Beschwerden: </b> ${auto_standort[i].complaints} </p>` +
    //       `<p><b>- Transportart: </b> ${auto_standort[i].mode_of_transportation} </p>` +
    //       `<p><b>- CO2-Fußabdruck: </b> ${auto_standort[i].carbon_footprint} </p>` +
    //       `<img src=${auto_standort[i].bild} width="400" alt="supplier_image">`
    //     "</div>" +
    //   '</div>';
  }

  //Alle ids in einem Feld speichern
  for (var i = 0; i < json_length; ++i) {
    ids[i] = myObj.results[1].data[i].hcs_id;
  }
}
};

xmlhttp.open("GET", "response2.json", false);
xmlhttp.send();


function initMap() {

    //hier wird definiert, wie stark in die Karte reingezoomt wird und wo sich das Zentrum befinden soll, wenn man die Seite aufruft
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3.5,
      center: {lat: 30.363, lng: 50.234},
    });

    const infowindow = new google.maps.InfoWindow({
    });

    //für jeden Standort benötigen wir einen Marker
      //Hier werden die Marker angelegt

      for (i = 0; i < json_length; i++) {
        if (auto_standort[i].type === "Supplier") {
           newMarker = new google.maps.Marker({
            position: {lat: auto_standort[i].la, lng: auto_standort[i].lo},
           map: map,
           icon: new google.maps.MarkerImage('/bilder/marker_black.svg', null, null, null, new google.maps.Size(30,30)),
           animation: google.maps.Animation.DROP,
           title: auto_standort[i].name
           });
        }
       else {
          newMarker = new google.maps.Marker({
         position: {lat: auto_standort[i].la, lng: auto_standort[i].lo},
          map: map,
          icon: new google.maps.MarkerImage('/bilder/marker_blue.png', null, null, null, new google.maps.Size(30,30)),
          animation: google.maps.Animation.DROP,
          title: auto_standort[i].name
          });
        }
        markers.push(newMarker);
      }

      //Es funktioniert, wenn man auf einen POI drückt, jedoch wird durch das hochzählen der Zählervariable in ln. 233 jedes Mal das InfoWindow desselben POIs überschrieben => Man bekommt immer ein anderes Fenster. Ich habe versucht mithilfe eines bestimmten eindeutigen id (hcs_id) zu vergleichen, welches POI aufgerufen wurde, doch es hat nicht wirklich funktioniert. Das infoWindow funktioniert simultan zur Alertfunktion;
      //Es muss einen Weg geben herauszufinden, welches POI gedrückt worden ist, um damit den richtigen Index einzusetzen und damit das richtige InfoWindow zu bekommen. Bei dem Erzfeind (Jack Wolfskin) funktioniert es ja auch!

      //Wäre nice noch die Fensterbreite anzupassen, damit es durch die Benachrichtungen nicht soweit nach links verschwindet (kann ich auch selber nächste Woche anschauen)
      var i = 0;
      markers.forEach(loop => {
        loop.addListener("click", (event) =>  {
          
          console.log(i);
          document.querySelector('#firstHeading').textContent = "Standort: " + auto_standort[i].name;
          document.querySelector('#typ').textContent = "Art: " + auto_standort[i].type;
          document.querySelector('#adresse').textContent = "Adresse: " + auto_standort[i].adress;
          document.querySelector('#creditor').textContent = "Creditor: " + auto_standort[i].creditor;
          document.querySelector('#partner-seit').textContent = "Partner seit: " + auto_standort[i].partner_since_year;
          document.querySelector('#purchasing-volume').textContent = "Purchasing Volume: " + auto_standort[i].purchasing_volume;
          document.querySelector('#estimated-leverage').textContent = "Estimated Leverage: " + auto_standort[i].estimated_leverage;
          document.querySelector('#arbeiterinnen').textContent = "Arbeiterinnen: " + auto_standort[i].employees_female;
          document.querySelector('#arbeiter').textContent = "Arbeiter: " + auto_standort[i].employees_male;
          document.querySelector('#beschwerden').textContent = "Beschwerden" + auto_standort[i].complaints;
          document.querySelector('#transport').textContent = "Transport: " + auto_standort[i].mode_of_transportation;
          document.querySelector('#co2-fußabdruck').textContent = "CO2-Fußabdruck:" + auto_standort[i].carbon_footprint;
          document.querySelector('#picture').src =auto_standort[i].bild;
          ++i;

          $('.info').addClass("show");
          $('.info').removeClass("hide");
          $('.info').addClass("showInfo");
          map.setZoom(8);
          map.setCenter(loop.getPosition());

          if (i == markers.length) {
            i = 0;
          }
        });
      });
      
      // //Hier werden die Marker anklickbar gemacht
      // for(i = 0; i < markers2.length; i++) {
      //   const a = i;
      //   markers2[a].addListener("click", () => {
      //     infowindow.setContent(contentString[a]);
      //     infowindow.open(map, markers2[a]);
      //     map.setZoom(8);
      //     map.setCenter(markers2[a].getPosition());
      //   });
      // }

      // Hier wird der Filter für die Produzenten gesetzt
      var checkbox_produzenten = document.getElementById('checkbox-1');

      checkbox_produzenten.addEventListener('change', function() {
        var i;

        if(this.checked) {
          for (i = 0; i < auto_standort.length; i++) {
            if(auto_standort[i].type === "Factory") {
              markers[i].setVisible(true);
            }
          }
        } else {
          for (i = 0; i < auto_standort.length; i++) {
            if(auto_standort[i].type === "Factory") {
              markers[i].setVisible(false);
            }
          }
        }

      });


      // Hier wird der Filter für die Lieferanten gesetzt
      var checkbox_lieferanten = document.getElementById('checkbox-2');

      checkbox_lieferanten.addEventListener('change', function() {
        var i;

        if(this.checked) {
          for (i = 0; i < auto_standort.length; i++) {
            if(auto_standort[i].type === "Supplier") {
              markers[i].setVisible(true);
            }
          }
        } else {
            for (i = 0; i < auto_standort.length; i++) {
              if(auto_standort[i].type === "Supplier") {
                markers[i].setVisible(false);
              }
            }
        }
      });


    // Hier wird die Funktionalität der Suchleiste implementiert
    var button = document.getElementById('button');
    button.addEventListener("click", function() {
      var i;
      var input = document.getElementById('searchbar').value.toLowerCase();
      var eingabe = false;

      for(i = 0; i < markers.length; i++) {
        //erstmal alle Marker unsichtbar machen, sodass danach nur die gesuchten auf sichtbar gesetzt werden müssen
        markers[i].setVisible(false);
        if(auto_standort[i].name.toLowerCase() == input || auto_standort[i].country.toLowerCase() == input || auto_standort[i].zip_code == input || auto_standort[i].street.toLowerCase() == input || auto_standort[i].place.toLowerCase() == input) {
          markers[i].setVisible(true);
          eingabe = true;
        }
      }

      //falls die Eingabe nicht übereinstimmt / es keine Eingabe gibt, werden alle Standorte angezeigt
      if (!eingabe) {
        for(i = 0; i < markers.length; i++) {
          markers[i].setVisible(true);
        }
        //falls die Eingabe leer ist
        if (input === "") {
          document.querySelector('.msg').innerHTML = "Leere Eingabe!";
          //falls die Eingabe ungültig ist
        } else {
          document.querySelector('.msg').innerHTML = "Kein Ergebnis!";
        }
        $('.alert').addClass("show");
        $('.alert').removeClass("hide");
        $('.alert').addClass("showAlert");
        setTimeout(function () {
          $('.alert').removeClass("show");
          $('.alert').addClass("hide");
        setTimeout(() => {  $('.alert').removeClass("showAlert"); }, 1100);
        }, 5000); //hide ist after 5 sec
      }
    });
} //Ende der initMap Funktion

//close Alert function
$('.close-btn').click(function () {
  $('.alert').removeClass("show");
  $('.alert').addClass("hide");
  setTimeout(() => {  $('.alert').removeClass("showAlert"); }, 1100);
});


//close Info function
$('.close-info').click(function () {
  $('.info').removeClass("show");
  $('.info').addClass("hide");
  setTimeout(() => {  $('.info').removeClass("showInfo"); }, 1100);
});