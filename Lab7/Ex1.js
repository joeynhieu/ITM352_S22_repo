require("./products_data.js");

var num_products = 5;
var num_counter = 1;
while(num_counter <= num_products){
    console.log(`${num_counter}. ${eval(`name`+ num_counter)}`);
    num_counter++;
    if(num_counter > (num_products/2)){
        console.log("That's enough!");
        break;
    }

    
}

console.log("That's all we have!");
