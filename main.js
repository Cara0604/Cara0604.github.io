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

    console.log(myObj.results[0].data.coordinates);

    //Länge des Datensatzes (die Anzahl der Standorte)
    //json_length = Object.keys(myObj.results[0].data).length;
    //console.log(json_length);

    //hier werden die Daten aus der JSON-Datei in Variablen gespeichert
    //for(var i = 0; i < json_length; ++i){

    hcs_id = myObj.results[0].data.hcs_id; //Versuch eine eindeutige id zu beziehen, um die Standorte zu unterscheiden; Im Konstruktor, in der Klasse als auch in der attributenliste angepasst.
    la = myObj.results[0].data.coordinates.latitude;
    lo = myObj.results[0].data.coordinates.longitude;
    name = myObj.results[0].data.name;
    type = myObj.results[0].data.type;
    street = myObj.results[0].data.street;
    street_addition = myObj.results[0].data.street_addition;
    zip_code = myObj.results[0].data.zip_code;
    place = myObj.results[0].data.place;
    country_code = myObj.results[0].data.country_code;
    country = myObj.results[0].data.country;
    adress = myObj.results[0].data.country + ", " +myObj.results[0].data.place;
    bild = myObj.results[0].data.supplier_image.url;
    creditor = myObj.results[0].data.creditor;
    division = myObj.results[0].data.devision;
    partner_since_year = myObj.results[0].data.partner_since_year;
    purchasing_volume = myObj.results[0].data.purchasing_volume;
    estimated_leverage = myObj.results[0].data.estimated_leverage;
    employees_female = myObj.results[0].data.emloyees_female;
    employees_male = myObj.results[0].data.employees_male;
    audit_type = myObj.results[0].data.audit_type;
    fair_wear_audit = myObj.results[0].data.fair_wear_audit;
    last_fair_wear_training = myObj.results[0].data.last_fair_wear_training;
    bsci_id = myObj.results[0].data.bsci_id;
    wrap_id = myObj.results[0].data.wrap_id;
    complaints = myObj.results[0].data.complaints;
    certificates = myObj.results[0].data.certificates;
    mode_of_transportation = myObj.results[0].data.mode_of_transportation;
    port_name = myObj.results[0].data.port_name;
    port_coordinates_latitude = myObj.results[0].data.port_coordinates_latitude;
    port_coordinates_longitude = myObj.results[0].data.port_coordinates_longitude;
    warehouse_name = myObj.results[0].data.warehouse_name;
    carbon_footprint = myObj.results[0].data.carbon_footprint;

    //für jeden Standort wird ein Objekt erzeugt
    let t = new Standort(la,lo,name,type,adress,bild,creditor, division,
      partner_since_year,purchasing_volume,estimated_leverage,employees_female,employees_male,
      audit_type,fair_wear_audit, last_fair_wear_training,bsci_id,wrap_id,complaints,certificates,mode_of_transportation,
      port_name,port_coordinates_latitude,port_coordinates_longitude,warehouse_name,carbon_footprint, street, street_addition,place,country_code, country, hcs_id);

    auto_standort.push(t);
  //}

  //Alle ids in einem Feld speichern
  //for (var i = 0; i < json_length; ++i) {
    ids[0] = myObj.results[0].data.hcs_id;
  //}
}
};

xmlhttp.open("GET", 'https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YJvfJxIAACIArFwi&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22YJrEPxAAACMASTcn%22%29+%5D%5D%27', false);
xmlhttp.send();


function initMap() {

  console.log(auto_standort[0].name);

    //hier wird definiert, wie stark in die Karte reingezoomt wird und wo sich das Zentrum befinden soll, wenn man die Seite aufruft
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: {lat: 30.363, lng: 50.234},
    });

    const infowindow = new google.maps.InfoWindow({
    });

    //für jeden Standort benötigen wir einen Marker
      //Hier werden die Marker angelegt

      //for (i = 0; i < json_length; i++) {
        if (auto_standort[0].type === "Supplier") {
           newMarker = new google.maps.Marker({
            position: {lat: auto_standort[0].la, lng: auto_standort[0].lo},
           map: map,
           icon: new google.maps.MarkerImage('/bilder/marker_black.svg', null, null, null, new google.maps.Size(30,30)),
           animation: google.maps.Animation.DROP,
           title: auto_standort[0].name
           });
        }
       else {
          newMarker = new google.maps.Marker({
         position: {lat: auto_standort[0].la, lng: auto_standort[0].lo},
          map: map,
          icon: new google.maps.MarkerImage('/bilder/marker_black.svg', null, null, null, new google.maps.Size(30,30)),
          animation: google.maps.Animation.DROP,
          title: auto_standort[0].name
          });
        }
        markers.push(newMarker);
      //}

      //Es funktioniert, wenn man auf einen POI drückt, jedoch wird durch das hochzählen der Zählervariable in ln. 233 jedes Mal das InfoWindow desselben POIs überschrieben => Man bekommt immer ein anderes Fenster. Ich habe versucht mithilfe eines bestimmten eindeutigen id (hcs_id) zu vergleichen, welches POI aufgerufen wurde, doch es hat nicht wirklich funktioniert. Das infoWindow funktioniert simultan zur Alertfunktion;
      //Es muss einen Weg geben herauszufinden, welches POI gedrückt worden ist, um damit den richtigen Index einzusetzen und damit das richtige InfoWindow zu bekommen. Bei dem Erzfeind (Jack Wolfskin) funktioniert es ja auch!

      //Wäre nice noch die Fensterbreite anzupassen, damit es durch die Benachrichtungen nicht soweit nach links verschwindet (kann ich auch selber nächste Woche anschauen)
      var i = 0;
      markers.forEach(loop => {
        loop.addListener("click", (event) =>  {
          document.querySelector('#firstHeading').textContent = auto_standort[i].name;
          document.querySelector('#typ').textContent = auto_standort[i].type;
          document.querySelector('#adresse').textContent = auto_standort[i].adress;
          document.querySelector('#creditor').textContent = auto_standort[i].creditor;
          document.querySelector('#partner-seit').textContent = auto_standort[i].partner_since_year;
          document.querySelector('#purchasing-volume').textContent = auto_standort[i].purchasing_volume;
          document.querySelector('#estimated-leverage').textContent = auto_standort[i].estimated_leverage;
          document.querySelector('#arbeiterinnen').textContent = auto_standort[i].employees_female;
          document.querySelector('#arbeiter').textContent = auto_standort[i].employees_male;
          document.querySelector('#beschwerden').textContent = auto_standort[i].complaints;
          document.querySelector('#picture').src =auto_standort[i].bild;
          document.querySelector('.ALLESMUSSRAUS').textContent= "";
          ++i;


          //document.querySelector('#transport').textContent = "Transport: " + auto_standort[i].mode_of_transportation;   Falls dies geschwünscht ist kann man es wieder hinzufügen
          //document.querySelector('#co2-fußabdruck').textContent = "CO2-Fußabdruck:" + auto_standort[i].carbon_footprint;

          $('.info').addClass("show");
          $('.info').removeClass("hide");
          $('.info').addClass("showInfo");
          map.setCenter(loop.getPosition());
          map.setZoom(8);
          window.scrollTo({ top: 0, behavior: 'smooth' });

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
        if(auto_standort[i].name.toLowerCase() == input || auto_standort[i].country.toLowerCase() == input || auto_standort[i].place.toLowerCase() == input) {
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

        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    //close Info function
  $('.close-info').click(function () {
    $('.info').removeClass("show");
    $('.info').addClass("hide");
    setTimeout(() => {  $('.info').removeClass("showInfo"); }, 1100);
    map.setZoom(4);
  })
} //Ende der initMap Funktion

//close Alert function
$('.close-btn').click(function () {
  $('.alert').removeClass("show");
  $('.alert').addClass("hide");
  setTimeout(() => {  $('.alert').removeClass("showAlert"); }, 1100);
});
