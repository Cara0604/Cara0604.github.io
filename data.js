var street;
var zip_code;
var place;
var country;
var name;
var infos = [];

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        var a = 0;

        for (var i = 0; i < json_length; ++i) {
            infos.push(myObj.results[1].data[i].street);
            infos.push(myObj.results[1].data[i].zip_code);
            infos.push(myObj.results[1].data[i].country);
            infos.push(myObj.results[1].data[i].place);
            infos.push(myObj.results[1].data[i].name);
        }
        console.log(infos);
        for (var i = 0; i < infos.length; i++) {
            for (var j = 0; j < infos.length; j++) {
                if ((infos[i] == infos[j]) && i != j) {
                    infos.splice(j, 1);
                }
            }
        }
        console.log(infos);

    }
}

xmlhttp.open("GET", "response2.json", false);
xmlhttp.send();
autocomplete(document.querySelector('.myInput'), infos);


/*! Bug mit dem  ersten Standort
    enter funktion beim autocomplete einbauen
*/