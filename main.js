//Klasse Standort
class Standort {

  //Konstruktor der Klasse
  constructor(la, lo, name, unit_type, adress, bild, creditor, division, partner_since_year, purchasing_volume,
     estimated_leverage, employees_female, employees_male, audit_type, fair_wear_audit,
      last_fair_wear_training, bsci_id, wrap_id, complaints, certificates, mode_of_transportation,
      port_name, port_coordinates_latitude, port_coordinates_longitude, warehouse_name, carbon_footprint, street, street_addition,place,country_code, country, hcs_id) {

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
var hcs_id; //eineutige id

//Feld, in dem alle Standorte gespeichert werden (inkl. aller Attribute)
var auto_standort = [];
var contentString = [];
var ids = []; //Alle Ids um zu vergleichen, ids existieren

var json_length;

//Feld, in dem alle Marker gespeichert werden
var markers = []; 

//Request, um die Daten aus der JSON-Datei zu holen
var url = 'https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YMnpZxMAACoACiwF';

while(url != null) {
  var abfrage = new XMLHttpRequest();
abfrage.onreadystatechange = function() {
  console.log(abfrage);
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(abfrage.responseText);

    url = myObj.next_page;
    //Länge des Datensatzes (die Anzahl der Standorte)
    json_length = Object.keys(myObj.results).length;

    //json_length = Object.keys(myObj.results[0].data).length;

      console.log(myObj);

    //hier werden die Daten aus der JSON-Datei in Variablen gespeichert
    for (var i = 0; i < json_length; ++i){

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
        let t = new Standort(la,lo,name,unit_type,adress,bild,creditor, division,
        partner_since_year,purchasing_volume,estimated_leverage,employees_female,employees_male,
        audit_type,fair_wear_audit, last_fair_wear_training,bsci_id,wrap_id,complaints,certificates,mode_of_transportation,
        port_name,port_coordinates_latitude,port_coordinates_longitude,warehouse_name,carbon_footprint, street, street_addition,place,country_code, country, hcs_id);

      auto_standort.push(t);
      console.log(myObj.results[i].type);
      }
    }
  }
}
      console.log(auto_standort);


abfrage.open("GET", url, false);
// abfrage.open("GET", "response2.json", false);
abfrage.send();
}


function initMap() {

    //hier wird definiert, wie stark in die Karte reingezoomt wird und wo sich das Zentrum befinden soll, wenn man die Seite aufruft
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: {lat: 30.363, lng: 50.234},
      restriction: {
        latLngBounds: {
          north: 85,
          south: -85,
          west: -180,
          east: 180
        }
      },
    });
    map.setOptions({ minZoom: 2.5});

    //Marker anlegen
    const infowindow = new google.maps.InfoWindow({
    });

      for (var i = 0; i < auto_standort.length; i++) {
        const a = i;
        if (auto_standort[i].unit_type === "Material Lieferant") {
           newMarker = new google.maps.Marker({
            position: {lat: auto_standort[i].la, lng: auto_standort[i].lo},
           map: map,
           icon: new google.maps.MarkerImage('bilder/fabrik2.png', null, null, null, new google.maps.Size(30,30)),
           animation: google.maps.Animation.DROP,
           title: auto_standort[i].name
           });
        }
       else if (auto_standort[i].unit_type === "Produktionsstätte") {
          newMarker = new google.maps.Marker({
            position: {lat: auto_standort[i].la, lng: auto_standort[i].lo},
          map: map,
          icon: new google.maps.MarkerImage('bilder/nahmaschine2.png', null, null, null, new google.maps.Size(30,30)),
          animation: google.maps.Animation.DROP,
          title: auto_standort[i].name
          });
        } else {
          newMarker = new google.maps.Marker({
            position: {lat: auto_standort[i].la, lng: auto_standort[i].lo},
          map: map,
          //icon: new google.maps.MarkerImage('bilder/marker_blue.png', null, null, null, new google.maps.Size(30,30)),
          animation: google.maps.Animation.DROP,
          title: auto_standort[i].name
          });
        }

        newMarker.addListener("click", () => {

          document.querySelector('#firstHeading').textContent = auto_standort[a].name;
          document.querySelector('#typ').textContent = auto_standort[a].unit_type;
          document.querySelector('#adresse').textContent = auto_standort[a].adress;
          document.querySelector('#creditor').textContent = auto_standort[a].creditor;

          
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

          // Wenn das für src null eingesetzt  (bzw undefined) tritt eine Fehlermeldung ein, die beschreibt, dass der localHost undefined ist
          if (auto_standort[a].supplier_image != null) {
            document.querySelector('#picture').src = auto_standort[a].supplier_image;
          }

          
          // document.querySelector('#transport').src =auto_standort[a].mode_of_transportation;           Bei Bedarf aktivierbar
          // document.querySelector('#co2-Fußabdruck').src =auto_standort[a].carbon_footprint;

          $('.info').addClass("show");
          $('.info').removeClass("hide");
          $('.info').addClass("showInfo");
          map.setCenter({lat: auto_standort[a].la, lng: auto_standort[a].lo});
          map.setZoom(8);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          $('.container').addClass("active");
        });

        markers.push(newMarker);
      }

      console.log(auto_standort);

      ////////////////// unsere Verewigung
      const infowindow2 = new google.maps.InfoWindow({
      });
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
          document.querySelector('#creditor').textContent = "Diese Karte wurde Studenten der Uni Augsburg im Rahmen des Projektstudiums Wirtschaftsinformatik entwickelt";
          document.querySelector('#partner-seitP').textContent = "";
          document.querySelector('#purchasing-volumeP').textContent = "";
          document.querySelector('#estimated-leverageP').textContent = "";
          document.querySelector('#arbeiterinnenP').textContent = "";
          document.querySelector('#arbeiterP').textContent = "";
          document.querySelector('#beschwerdenP').textContent = "";

          $('.info').addClass("show");
          $('.info').removeClass("hide");
          $('.info').addClass("showInfo");
          map.setCenter({lat: 48.33366559150027, lng: 10.894521557382948});
          map.setZoom(8);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          $('.container').addClass("active");
            console.log("FIM Standort", marker);
        }); 
      //////////////////////////////////////////////////////
      

      // Hier wird der Filter für die Produzenten gesetzt
      var checkbox_produzenten = document.getElementById('checkbox-1');

      checkbox_produzenten.addEventListener('change', function() {
        var i;

        if(this.checked) {
          for (i = 0; i < auto_standort.length; i++) {
            if(auto_standort[i].unit_type === "Produktionsstätte") {
              markers[i].setVisible(true);
            }
          }
        } else {
          for (i = 0; i < auto_standort.length; i++) {
            if(auto_standort[i].unit_type === "Produktionsstätte") {
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
            if(auto_standort[i].unit_type === "Material Lieferant") {
              markers[i].setVisible(true);
            }
          }
        } else {
            for (i = 0; i < auto_standort.length; i++) {
              if(auto_standort[i].unit_type === "Material Lieferant") {
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
      if (!eingabe && input != "") {
        for(i = 0; i < markers.length; i++) {
          markers[i].setVisible(false);
        }

        document.querySelector('.msg').innerHTML = "Kein Ergebnis!";

        window.scrollTo({ top: 0, behavior: 'smooth' });
        $('.alert').addClass("show");
        $('.alert').removeClass("hide");
        $('.alert').addClass("showAlert");
        setTimeout(function () {
          $('.alert').removeClass("show");
          $('.alert').addClass("hide");
        setTimeout(() => {  $('.alert').removeClass("showAlert"); }, 1100);
        }, 3000); //hide ist after 3 sec
      } else if (input === "") {
        for(i = 0; i < markers.length; i++) {
          markers[i].setVisible(true);
        }

        $('.alert').removeClass("show");
          $('.alert').addClass("hide");
          setTimeout(() => {  $('.alert').removeClass("showAlert"); }, 1100);
      } else if (eingabe) {
          $('.alert').removeClass("show");
          $('.alert').addClass("hide");
          setTimeout(() => {  $('.alert').removeClass("showAlert"); }, 1100);
          map.setZoom(4);
      }

      
    });

    //close Info function
  $('.close-info').click(function () {
    $('.info').removeClass("show");
    $('.info').addClass("hide");
    setTimeout(() => {  $('.info').removeClass("showInfo"); }, 1100);
    document.getElementById('map').scrollIntoView({
    behavior: 'smooth'
    });
    $('.container').removeClass("active");
  })
  
} //Ende der initMap Funktion

//close Alert function
$('.close-btn').click(function () {
  $('.alert').removeClass("show");
  $('.alert').addClass("hide");
  setTimeout(() => {  $('.alert').removeClass("showAlert"); }, 1100);
});
