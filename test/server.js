var express = require('express');

var app = express();


app.get('/', function (req, res) {

res.send('<html> <body><p>This is home Page.</p></body></html>');

});


app.get('/student', function (req, res) {

res.write('<html><body><p id="id_h1">This is student Page.</p></body></html>');

res.write('<script>document.getElementById("id_h1").innerHTML="I\'ve been hacked!";</script>');

res.end();

});


app.get('/admin', function (req, res) {

res.send('<html><body><p>This is admin Page.</p></body></html>');

});


app.get('*', function (req, res) {

res.send('Invalid Request!');

});


var server = app.listen(8080, function () {

console.log('Node server is running..');

});