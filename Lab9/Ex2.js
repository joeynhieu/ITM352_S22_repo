
// Defined variable attributes  =  "<name>;<age>;<major>"
var attributes  =  "Joey;20;20.5;-19.5";

//var parts_array = attributes.split(';');

// EX3: assigned return value to pieces
var pieces = attributes.split(";");

console.log(attributes);

//iterates through pieces to return data types
for(piece of pieces){
    console.log(`${piece} is a ${typeof piece}`);
}

//prints out data type of pieces --> object
console.log(typeof pieces);

//put together string separated by ','
console.log(pieces.join());

//function checks whether the string is an integer --> checks if is number first --> checks if its a positive int --> checks if it can be parsed to an int
// call upon the function by isStringNonNegInt(array, boolean)
function isStringNonNegInt(q, returnErrors = false){
errors = []; // assume no errors at first
if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0)
}

for(piece in pieces){
    console.log(`${pieces[piece]} is ${isStringNonNegInt(pieces[piece], true).join(',')}`);
}

function callback (i,piece){
    console.log (`${piece} is non neg int ${isNonNegIntString(piece, true).join(",")}` );
}

//pieces.forEach(function (item,i){console.log (`${pieces[i]} is non neg int ${isNonNegIntString(pieces[i], true).join(",")}` )};