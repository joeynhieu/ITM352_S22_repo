/*Author Joey Nhieu Assignment 1 Server.js: 
code referenced from previous lab12 
Received help/assistance from Tai T, Joshua R*/

//Coded taken and modified from Kazman's info_server_Ex4.js from lab 13
var express = require('express');
var app = express();
var myParser = require("body-parser");
var data = require('./public/product_data.js');
var products = data.products;
var fs = require('fs');
const queryString = require('query-string');

//Defines file in variable for later usage
var filename = 'user_data.json';
app.all('*', function(request, response, next){
    console.log(request.method + ' to ' + request.path);
    next();
});

//Checks for file
if (fs.existsSync(filename)) {
    stats = fs.statSync(filename);
    console.log(`user_data.json has ${stats['size']} characters`);
    var data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(data);
} else {
    console.log (`Error: ${Filename} does not exist.`);
}

app.use(express.static('./public'));
app.use(myParser.urlencoded({ extended: true }));

//Sends data to invoice
app.post("/process_form", function(request, response, next){
   
   //Validates data
   var validqty = true; //Check for valid input. 
   var totlpurchases = false; 
   for (i = 0; i < products.length; i++) {
       aqty = request.body[`quantity${i}`];
       if(isNonNegIntString(aqty) == false){
           validqty &= false; //Invalid data 
   
       }
       if (aqty > 0){ //Checks for visible data
           totlpurchases = true;
       }
   }
   
       // Following code taken from Brittney's code shown in class
       purchase_qs = qs.stringify(request.body); 
       if (validqty == true && totlpurchases == true) { 
           response.redirect('./login_page.html?' + purchase_qs); 
       }
       else { 
           response.redirect("./products_display.html?"); 
       }
   });


//Processes user login, code taken and expanded upon from lab 14 and assignment 2 examples
app.post("/process_login", function (req, res) {
    var LogError = [];
    console.log(req.body);
    the_username = req.body.username.toLowerCase(); //Formatting of username to fit specifications
    if (typeof users_reg_data[the_username] != 'undefined') { 
        if (req.body.password == users_reg_data[req.body.username].password) {
            res.redirect('/invoice.html?' + qs.stringify(req.query) + qs.stringify(req.body.username));
            //This redirects to the invoice if the appropriate password is entered
        } else { //Wrong password
            LogError.push = ('Invalid Password');
            console.log(LogError);
            req.query.username= the_username;
            req.query.name= users_reg_data[the_username].name;
            req.query.LogError=LogError.join(';');
        }
        } else { //States invalid username and redirects
            LogError.push = ('Invalid Username');
            console.log(LogError);
            req.query.username= the_username;
            req.query.LogError=LogError.join(';');
        }
    res.redirect('./login_page.html?' + qs.stringify(req.query));
});

//To create code on server side
//Worked on code with Philip
app.post("/process_registration", function (req, res) {
    qstr = req.body;
    console.log(qstr);
    var errors = [];

    if (/^[A-Za-z]+$/.test(req.body.name)) { //Allows for only letters
    }
    else {
      errors.push('Use Only Letters for Full Name');
    }
    // Checks for full name
    if (req.body.name == "") {
      errors.push('Invalid Full Name');
    }
    // Need length of full name, fix in order to make it fit
  if ((req.body.fullname.length > 25 && req.body.fullname.length <0)) {
    errors.push('Full Name Too Long');
  }
  //checks new username
    var reguser = req.body.username.toLowerCase(); 
    if (typeof users_reg_data[reguser] != 'undefined') { //Gives error
      errors.push('Username taken');
    }
    //Makes code the username to only be betters and numbers
    if (/^[0-9a-zA-Z]+$/.test(req.body.username)) {
    }
    else {
      errors.push('Letters And Numbers Only for Username');
    }
  
    //password needs to be 6 characters
    if (req.body.password.length < 6) {
      errors.push('Password Too Short');
    }
    // matches passwords and checks
    if (req.body.password !== req.body.repeat_password) { 
      errors.push('Password Not a Match');
    }
    //Shows error, code taken directly from code 14
    if (errors.length == 0) {
      POST = req.body;
      console.log('no errors');
      var username = POST['username'];
      users_reg_data[username] = {}; 
      users_reg_data[username].name = username;
      users_reg_data[username].password= POST['password'];
      users_reg_data[username].email = POST['email'];
      data = JSON.stringify(users_reg_data); 
      fs.writeFileSync(filename, data, "utf-8");
      res.redirect('./invoice4.html?' + qs.stringify(req.query));
    }
    e
    if (errors.length > 0) {
        console.log(errors);
        req.query.name = req.body.name;
        req.query.username = req.body.username;
        req.query.password = req.body.password;
        req.query.repeat_password = req.body.repeat_password;
        req.query.email = req.body.email;

        req.query.errors = errors.join(';');
        res.redirect('registration.html?' + qs.stringify(req.query));
    }
});


app.post("/process_quantity_form", function (request, response) {
    let POST = request.body;
    
    if (typeof POST['submitPurchase'] != 'undefined') {
                var hasvalidquantities=true; // assuming that the variable will be true// 
                var hasquantities=false
                for (i = 0; i < products.length; i++) {
                    
                                qty=POST[`quantity${i}`];
                                hasquantities=hasquantities || qty>0; // If its value is larger than 0 then it is good//
                                hasvalidquantities=hasvalidquantities && isNonNegInt(qty);    // if it is both a quantity over 0 and is valid//     
                } 
                // if all quantities are valid, generate the invoice// 
                const stringified = queryString.stringify(POST);
                if (hasvalidquantities && hasquantities) {
                    response.redirect("./invoice.html?"+stringified); // using the invoice.html and all the data that is input//
                }  
                else {response.send('Enter a valid quantity!')} 
            }
        });

function isNonNegInt(stringToCheck, returnErrors = false) {
    errors = []; // assume no errors at first
    if(stringToCheck ==""){stringToCheck = 0;}
    if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
    if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors : (errors.length == 0);
}

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

//Login edits, code borrowed from lab 14 and got help from Philip


app.listen(8080, () => console.log(`listening on port 8080`));