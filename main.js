//Klasse Standort
class Standort {

  //Konstruktor der Klasse
  constructor(la, lo, name, type, adress, bild, creditor, division, partner_since_year, purchasing_volume,
     estimated_leverage, employees_female, employees_male, audit_type, fair_wear_audit,
      last_fair_wear_training, bsci_id, wrap_id, complaints, certificates, mode_of_transportation, 
      port_name, port_coordinates_latitude, port_coordinates_longitude, warehouse_name, carbon_footprint, street, street_addition,place,country_code, country) {

  this.la = la;
  this.getLa = function(){
      return this.la;
  }
  this.lo = lo;
  this.getLo = function() {
      return this.lo;
  }
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

var auto_standort = [];
var contentString = [];

var json_length;

var markers = [];
var markers2 = [];

//Request, um Daten zu holen
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);

    json_length = Object.keys(myObj.results[1].data).length;

    //hier wird das Feld für alle Standorte erzeugt
    for(var i = 0; i < json_length; ++i){

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

    let t = new Standort(la,lo,name,type,adress,bild,creditor, division,
      partner_since_year,purchasing_volume,estimated_leverage,employees_female,employees_male,
      audit_type,fair_wear_audit, last_fair_wear_training,bsci_id,wrap_id,complaints,certificates,mode_of_transportation,
      port_name,port_coordinates_latitude,port_coordinates_longitude,warehouse_name,carbon_footprint, street, street_addition,place,country_code, country);
      
    auto_standort.push(t);

    contentString[i]=
    '<div id="content>' +
    '<div id="siteNotice">' +
    "</div>" +
    `<h1 id="firstHeading" class="firstHeading">${ auto_standort[i].name }</h1>` +
    '<div id="bodyContent">' +
    `<p><b>- Typ: </b> ${auto_standort[i].type} </p> `+
    `<p><b>- Adresse: </b> ${auto_standort[i].adress} </p> `+      
    `<p><b>- Creditor: </b> ${auto_standort[i].creditor} </p>` + 
    `<p><b>- Partner seit: </b> ${auto_standort[i].partner_since_year} </p>` + 
    `<p><b>- Purchasing volume: </b> ${auto_standort[i].purchasing_volume} </p>` + 
    `<p><b>- Estimated Leverage: </b> ${auto_standort[i].estimated_leverage} </p>` + 
    `<p><b>- Arbeiterinnen: </b> ${auto_standort[i].employees_female} </p>` + 
    `<p><b>- Arbeiter: </b> ${auto_standort[i].employees_male} </p>` + 
    `<p><b>- Beschwerden: </b> ${auto_standort[i].complaints} </p>` + 
    `<p><b>- Transportart: </b> ${auto_standort[i].mode_of_transportation} </p>` + 
    `<p><b>- CO2-Fußabdruck: </b> ${auto_standort[i].carbon_footprint} </p>` + 

   //Bild einfügen
   `<img src=${auto_standort[i].bild} width="400" alt="supplier_image">`
   "</div>" +
   "</div>";


    }
  }

 
};

xmlhttp.open("GET", "response2.json", false);
xmlhttp.send();

/*auto_standort = new Standort(la,lo,name,type,adress,bild,creditor, division,
  partner_since_year,purchasing_volume,estimated_leverage,employees_female,employees_male,
  audit_type,fair_wear_audit, last_fair_wear_training,bsci_id,wrap_id,complaints,certificates,mode_of_transportation,
  port_name,port_coordinates_latitude,port_coordinates_longitude,warehouse_name,carbon_footprint);
  auto_standort.la = 3;*/
   

  
function initMap() {

    //hier werden alle Marker mit Standorten definiert
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3.5,
      center: {lat: 30.363, lng: 50.234},
    });

    const infowindow = new google.maps.InfoWindow({
    });

    //für jeden Standort benötigen wir einen Marker
   

      //Test mit Marker-Feld

      for (i = 0; i < json_length; i++) {
        newMarker = new google.maps.Marker({
          position: {lat: auto_standort[i].getLa(), lng: auto_standort[i].getLo()},
          map: map,
          title: auto_standort[i].name
        });

        newMarker.category = auto_standort[i].type;

        markers2.push(newMarker);
      }

      for(i = 0; i < markers2.length; i++) {
        const a = i;
        markers2[a].addListener("click", () => {
          infowindow.setContent(contentString[a] );
          infowindow.open(map, markers2[a]);
          map.setZoom(8);
          map.setCenter(markers2[a].getPosition());
        });
      }


    //zudem benötigen wir für jeden Standort noch einen Listener
    //dieser ist dazu da, um den Klick auf den Standort zu erkennen
  

     /*  for(var i = 0; i <= 2; ++i){
         marker[i] = new google.maps.Marker({
          position: jakob,
          map,
          title: "Jakob (hart wie ein Stein)",
      });


        marker[i].addListener("click", () => {
          infowindow.setContent(contentString2);
          infowindow.open(map, marker[i]);
          map.setZoom(8);
          map.setCenter(marker[i].getPosition());
        });


      } */

      
      // Hier wird der Filter für die Produzenten gesetzt
      var checkbox_produzenten = document.getElementById('checkbox-1');

      checkbox_produzenten.addEventListener('change', function() {
        var i;

        if(this.checked) {
          for (i = 0; i < markers2.length; i++) {
            if(markers2[i].category === "Factory") {
              markers2[i].setVisible(true);
            } 
          }
        } else {
          for (i = 0; i < markers2.length; i++) {
            if(markers2[i].category === "Factory") {
              markers2[i].setVisible(false);
            } 
          }
        }
        
      });


      // Hier wird der Filter für die Lieferanten gesetzt 
      var checkbox_lieferanten = document.getElementById('checkbox-2');

      checkbox_lieferanten.addEventListener('change', function() {
        var i;

        if(this.checked) {
          for (i = 0; i < markers2.length; i++) {
            if(markers2[i].category === "Supplier") {
              markers2[i].setVisible(true);
            } 
          }
        } else {
            for (i = 0; i < markers2.length; i++) {
              if(markers2[i].category === "Supplier") {
                markers2[i].setVisible(false);
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
      var anzeige = false;

      for(i = 0; i < markers2.length; i++) {
        markers2[i].setVisible(false);
        if(auto_standort[i].name.toLowerCase() == input || auto_standort[i].country.toLowerCase() == input || auto_standort[i].zip_code == input) {
          markers2[i].setVisible(true);
          anzeige = true;
        }
        if(input === "")
          eingabe = false;
        else
          eingabe = true;
      }
  
      if (!eingabe) {
        for(i = 0; i < markers2.length; i++) {
          markers2[i].setVisible(true);
        }
      }
      //Wenn keine es keine Treffer gibt, bekommt der Benutzer eine entsprechender Rückmeldung
      if (eingabe && !anzeige) {
        $('.alert').removeClass("hide");
        $('.alert').addClass("show");
        $('.alert').addClass("showAlert");
        setTimeout(function () {
          $('.alert').addClass("hide");
          $('.alert').removeClass("show");
        }, 5000); //hide ist after 5 sec
      }
    });
    
  // Enter drücken
  $("#searchForm").submit(function () {
    document.getElementById('button').click();
    return false;
  });
  
} //Ende der initMap Funktion

$('.close-btn').click(function () {
  $('.alert').addClass("hide");
  $('.alert').removeClass("show");
});
