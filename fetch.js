//Option 1
/*"use strict";

var myInit = {  method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default' }:

let myRequest = new Request("./data_class.json", myInit);

fetch(myRequest)
        .then(funktion(resp) {
            return resp.json();
        })
        .then(function(data) {
            console.log(data.students);
        });

*/

/*
//Option 2
const getData = () => {
    fetch('https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YJvfJxIAACIArFwi')
    .then(response => {
      return response.json();
    })
    .then(data => {
        console.log(data);
    });
};
*/

/*
Option 3
const Http = new XMLHttpRequest();
const url = 'https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YJvfJxIAACIArFwi':
Http.open("GET", url);
Http.send();

Http.onreadystatechange = fuction(){
    if(this.readyState == 4 && this.status == 200) {
        console.log(Http.responseText)
    }
}
*/

/*Option 4
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    document.getElementById("demo").innerHTML = myObj.name;
  }
};
xmlhttp.open("GET", "json_demo.txt", true);
xmlhttp.send();
*/
