var la;
var lo;
var nme;
var type;
var adress;
var bild;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    la = myObj.results[1].data.coordinates.latitude;
    lo = myObj.results[1].data.coordinates.longitude;
    nme = myObj.results[1].data.name;
    type = myObj.results[1].data.type;
    adress = myObj.results[1].data.street + " <p>" +  myObj.results[1].data.zip_code + " ," + myObj.results[1].data.place + "<p>" + myObj.results[1].data.country_code + " ," + myObj.results[1].data.country;
    bild = myObj.results[1].data.url;
  }
};
xmlhttp.open("GET", "response2.json", true);
xmlhttp.send();

function initMap() {
    //hier werden alle Marker mit Standorten definiert
    const uluru = { lat: -25.363, lng: 131.044 };
    const jakob = {lat: 30.363, lng: 110.234};
    const test = {lat: parseFloat(la), lng: parseFloat(lo)};
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
     `<h1 id="firstHeading" class="firstHeading">${ nme }</h1>` +
     '<div id="bodyContent">' +
     `<p><b>- Typ: </b> ${type} <\p> `+
     `<p><b>- Adresse: </b> ${adress} <\p> `+      //Bild einfügen
     `<img src="https://www.tagesspiegel.de/images/google-logo/12266780/4-format43.jpg" width="400" alt="google">`
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

    //zudem benötigen wir für jeden Standort noch einen Listener
    //dieser ist dazu da, um den Klick auf den Standort zu erkennen
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
  }
