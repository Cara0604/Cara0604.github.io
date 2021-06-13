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

        //for (var i = 0; i < json_length; ++i) {
            infos.push(myObj.results[0].data.country);
            infos.push(myObj.results[0].data.place);
            infos.push(myObj.results[0].data.name);
        //}

        for (var i = 0; i < infos.length; i++) {
            for (var j = 0; j < infos.length; j++) {
                if ((infos[i] == infos[j]) && i != j) {
                    infos.splice(j, 1);
                }
            }
        }
    }
};

xmlhttp.open("GET", ('https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YJvfJxIAACIArFwi&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22YJrEPxAAACMASTcn%22%29+%5D%5D%27'), false);
xmlhttp.send();

autocomplete(document.querySelector('.myInput'), infos);
