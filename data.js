var street;
var zip_code;
var place;
var country;
var name;
var infos = [];
var json_length;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);

    json_length = Object.keys(myObj.results).length;

        for (var i = 0; i < json_length; ++i) {
            infos.push(myObj.results[i].data.country);
            infos.push(myObj.results[i].data.place);
            infos.push(myObj.results[i].data.name);
        }

        for (var i = 0; i < infos.length; i++) {
            for (var j = 0; j < infos.length; j++) {
                if ((infos[i] == infos[j]) && i != j) {
                    infos.splice(j, 1);
                }
            }
        }
    }
};

console.log(infos);
xmlhttp.open("GET", ('https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YMnpZxMAACoACiwF&pageSize=1000'), false);
xmlhttp.send();


autocomplete(document.querySelector('.myInput'), infos);
