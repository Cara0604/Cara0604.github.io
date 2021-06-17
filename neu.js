

// let Prismic;//
  
/*define(function(require) {
     const Prismic = require('@prismicio/client');

    console.log(Prismic);*/
/*require(['@prismicio/client'], function (prismicio) {

});*/




const Prismic = require('@prismicio/client');
var apiEndpoint = "https://your-repository-name.cdn.prismic.io/api/v2";
 
Prismic.client(apiEndpoint, { req: req }).then(function(api) {
   return api.query(""); // An empty query will return all the documents
 }).then(function(response) {
   console.log("Documents: ", response.results);
 }, function(err) {
   console.log("Something went wrong: ", err);
 });
// });

//const Prismic = require('@prismicio/client');

define(function (require) {
    const Prismic = require('@prismicio/client/types/index.d.ts');
    console.log(Prismic);

    const client = Prismic.client("https://schoeffel-b2c.cdn.prismic.io/api/v2")
var options = {}; // In Node.js, pass the request as 'req' to read the reference from the cookies
client.query("", options, function(err, response) { // An empty query will return all the documents
  if (err) {
    console.log("Something went wrong: ", err);
  }
  console.log("Documents: ", response.documents);
});


});