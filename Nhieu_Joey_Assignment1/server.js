/*Author Joey Nhieu Assignment 1 Server.js: 
code referenced from previous lab12 
Received help/assistance from Tai T, Joshua R*/

var express = require('express');
var app = express();
//var myParser = require("body-parser");
var data = require('./public/product_data.js');
var products = data.products;
const queryString = require('query-string');


app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.post("/process_quantity_form", function (request, response) {
    let POST = request.body;
  
      // assumes that the quantity will be valid
                var has_valid_quantities=true; 
      // assumes that there is no quantity
                var has_quantities=false

                for (i = 0; i < products.length; i++) {
                    
                                qty=POST[`quantity${i}`];

                                has_quantities = has_quantities || qty>0; // If its value is larger than 0 then it is good//
                                
                                has_valid_quantities = has_valid_quantities && isNonNegInt(qty);    // if it is both a quantity over 0 and is valid//     

                                if (products[i].quantity > products[i].stock){
                                    has_valid_quantities = false;
                                }
                }
                
                // if all quantities are valid, generate the invoice// 
                const stringified = queryString.stringify(POST);
                if (has_valid_quantities && has_quantities) {
                    console.log(stringified);
                    response.redirect("./invoice.html?"+stringified); // using the invoice.html and all the data that is input//
                }  
                // directs user to another page prompting to go back and entire valid quantity
                else {response.send('Please go back and enter a valid quantity!')} 
            }
        );

        function isNonNegInt(stringToCheck, returnErrors = false) {
            errors = []; // assume no errors at first
            if(stringToCheck ==""){stringToCheck = 0;}
            if (Number(stringToCheck) != stringToCheck) errors.push('Not a number!'); // Check if string is a number value
            if (stringToCheck < 0) errors.push('Negative value!'); // Check if it is non-negative
            if (parseInt(stringToCheck) != stringToCheck) errors.push('Not an integer!'); // Check that it is an integer
        
            return returnErrors ? errors : (errors.length == 0);
        }
        


/* Start server */
app.listen(8080, () => console.log(`listening on port 8080`));
