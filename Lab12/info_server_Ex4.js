var express = require('express');
var app = express();

//middleware
app.use(express.urlencoded({ extended: true }));


//respond to any request
app.all('*', function (request, response, next) {
   console.log(request.method + ' to path ' + request.path);
   next();
});
app.post("/process_form", function (request, response) {
    var q = request.body['quantity_textbox'];
    if (typeof q != 'undefined') {
    response.send(`Thank you for purchasing ${q} things!`);
    } 
 });
 
app.get('/test', function (request, response, next) {
    response.send('In test ' + request.method + ' to path ' + request.path);
});
app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback

function isStringNonNegInt(q, returnErrors){
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
        else{
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    }
    return returnErrors ? errors : (errors.length == 0)
}