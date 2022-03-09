function isNonNegIntString(q, returnErrors=false){
    //This function returns true if string_to_check is a non-negative integer. If returnErrors = true it will return the array of reasons it is not a non-negative integer.
    errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer

    return returnErrors ? errors: (errors.length ==0);
}

attributes  =  "Josh;19;19.5;" + (0.5 - 19) ;
pieces = attributes.split (";");

function callback (i,part){
    console.log (`${part} is non neg int ${isNonNegIntString(part, true).join("***")}` );
}

for (i in pieces) {
    console.log (`${pieces[i]} is non neg int ${isNonNegIntString(pieces[i], true).join("***")}` );
}

pieces.forEach(function (item,i){console.log (`${pieces[i]} is non neg int ${isNonNegIntString(pieces[i], true).join("***")}` )});
