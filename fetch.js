//OPTION 1:
$.getJSON('https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YJvfJxIAACIArFwi&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22YJrEPxAAACMASTcn%22%29+%5D%5D%27', function(data) {
    // Data ist der Name der Variable, in der das Ergebnis gespeichert werden soll
});


//OPTION 2:
responseObj = readJsonFromUrl('https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YJvfJxIAACIArFwi&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22YJrEPxAAACMASTcn%22%29+%5D%5D%27');
var count = responseObj.query.count; //soll 1 sein


//Option 3 (diese nicht gut)
let url = 'https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YJvfJxIAACIArFwi&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22YJrEPxAAACMASTcn%22%29+%5D%5D%27';

fetch(url)
.then(res => Response.json())
.then((out) => {
  console.log('Das ist die .json! ', out);
})
.catch(err => { throw err });


url = 'https://schoeffel-b2c.cdn.prismic.io/api/v2/documents/search?ref=YJvfJxIAACIArFwi&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22YJrEPxAAACMASTcn%22%29+%5D%5D%27';