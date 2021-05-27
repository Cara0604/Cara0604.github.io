//BITTE MEHR KOMME
var la;
var lo;
var nme;
var type;
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


var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) { //was machen readyState und status?
    var myObj = JSON.parse(this.responseText); // und was ist das? responseText und parse?
    la = myObj.results[1].data.coordinates.latitude;
    lo = myObj.results[1].data.coordinates.longitude;
    name = myObj.results[1].data.name;
    type = myObj.results[1].data.type;
    adress = myObj.results[1].data.street + " <p>" +  myObj.results[1].data.zip_code + " ," + myObj.results[1].data.place + "<p>" + myObj.results[1].data.country_code + " ," + myObj.results[1].data.country;
    bild = myObj.results[1].data.supplier_image.url;
    creditor = myObj.results[1].data.creditor;
    division = myObj.results[1].data.devision;
    partner_since_year = myObj.results[1].data.partner_since_year;
    purchasing_volume = myObj.results[1].data.purchasing_volume;
    estimated_leverage = myObj.results[1].data.estimated_leverage;
    employees_female = myObj.results[1].data.emloyees_female;
    employees_male = myObj.results[1].data.employees_male;
    audit_type = myObj.results[1].data.audit_type;
    fair_wear_audit = myObj.results[1].data.fair_wear_audit;
    last_fair_wear_training = myObj.results[1].data.last_fair_wear_training;
    bsci_id = myObj.results[1].data.bsci_id;
    wrap_id = myObj.results[1].data.wrap_id;
    complaints = myObj.results[1].data.complaints;
    certificates = myObj.results[1].data.certificates;
    mode_of_transportation = myObj.results[1].data.mode_of_transportation;
    port_name = myObj.results[1].data.port_name;
    port_coordinates_latitude = myObj.results[1].data.port_coordinates_latitude;
    port_coordinates_longitude = myObj.results[1].data.port_coordinates_longitude;
    warehouse_name = myObj.results[1].data.warehouse_name;
    carbon_footprint = myObj.results[1].data.carbon_footprint;
    

  }
};
xmlhttp.open("GET", "response2.json", false);
xmlhttp.send();

function initMap() {
    //hier werden alle Marker mit Standorten definiert
    const uluru = { lat: -25.363, lng: 131.044 };
    const jakob = {lat: 30.363, lng: 110.234};
    const test = {lat:Number(la), lng: Number(lo)};

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3.5,
      center: {lat: 30.363, lng: 50.234},
    });


    //für jeden Standort benötigen wir den Inhalt, der bei einem Klick
    //auf den Marker angezeigt werden soll (Text + Bild)
    const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      "<p><b>T-Rex</b>, also referred to as <b>Ayers Rock</b>, is a large " +
      "sandstone rock formation in the southern part of the " +
      "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
      "south west of the nearest large town, Alice Springs; 450&#160;km " +
      "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
      "features of the Uluru - Kata Tjuta National Park. Uluru is " +
      "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
      "Aboriginal people of the area. It has many springs, waterholes, " +
      "rock caves and ancient paintings. Uluru is listed as a World " +
      "Heritage Site.</p>" +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      "https://de.wikipedia.org/wiki/Dinosaurier</a> " +
      "(last visited May 16, 2021).</p>" +
      //Bild einfügen
      '<img src="https://www.ntz.de/uploads/tx_templavoila/nzwz-a67d6045-8644-4e40-9536-32a67edada4e_onlineBild.jpg" width="400" alt="großer Dino">'
      "</div>" +
      "</div>";

      //Standort 2
      const contentString2 =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Hier </h1>' +
      '<div id="bodyContent">' +
      "<p><b>Test1</b>, ist  <b>Text</b>, drinnen " +
      "test2" +
      //Bild einfügen
      '<img src="https://www.tagesspiegel.de/images/google-logo/12266780/4-format43.jpg" width="400" alt="google">'
      "</div>" +
      "</div>";

      const contentString3 =
      '<div id="content>' +
      '<div id="siteNotice">' +
      "</div>" +
      `<h1 id="firstHeading" class="firstHeading">${ name }</h1>` +
      '<div id="bodyContent">' +
      `<p><b>- Typ: </b> ${type} </p> `+
      `<p><b>- Adresse: </b> ${adress} </p> `+      
      `<p><b>- Creditor: </b> ${creditor} </p>` + 
      `<p><b>- Partner seit: </b> ${partner_since_year} </p>` + 
      `<p><b>- Purchasing volume: </b> ${purchasing_volume} </p>` + 
      `<p><b>- Estimated Leverage: </b> ${estimated_leverage} </p>` + 
      `<p><b>- Arbeiterinnen: </b> ${employees_female} </p>` + 
      `<p><b>- Arbeiter: </b> ${employees_male} </p>` + 
      `<p><b>- Beschwerden: </b> ${complaints} </p>` + 
      `<p><b>- Transportart: </b> ${mode_of_transportation} </p>` + 
      `<p><b>- CO2-Fußabdruck: </b> ${carbon_footprint} </p>` + 

     //Bild einfügen
     `<img src=${bild} width="400" alt="supplier_image">`
     "</div>" +
     "</div>";

    //es wird nur ein infowindow benötigt
    const infowindow = new google.maps.InfoWindow({
    });

    //für jeden Standort benötigen wir einen Marker
    const marker = new google.maps.Marker({
      position: uluru,
      map,
      title: "Uluru (Ayers Rock)",
    });

    const marker2 = new google.maps.Marker({
        position: jakob,
        map,
        title: "Jakob (hart wie ein Stein)",
    });

    const marker3 = new google.maps.Marker({
      position: test,
      map,
      title: "Test",
    });

    marker.addListener("click", () => {
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
    });

    marker2.addListener("click", () => {
        infowindow.setContent(contentString2);
        infowindow.open(map, marker2);
        map.setZoom(8);
        map.setCenter(marker2.getPosition());
      });

      marker3.addListener("click", () => {
        infowindow.setContent(contentString3);
        infowindow.open(map, marker3);
        map.setZoom(8);
        map.setCenter(marker3.getPosition());
      });

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
  }
