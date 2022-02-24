require("./products_data.js");

var num_products = 5;
for(num_counter = 1; eval("typeof name"+num_counter) != 'undefined'; num_counter++){
   
   if(num_counter > num_products/2){
        //console.log("Don't ask for anything else!");
        //process.exit();
    }
        console.log(`${num_counter}. ${eval(`name`+ num_counter)}`);
    
}

console.log("That's all we have!");
