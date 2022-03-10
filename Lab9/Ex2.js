
// Defined variable attributes  =  "<name>;<age>;<major>"
var attributes  =  "Joey;20;MIS;-1";

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

function isNonNegInt(q){
errors = []; // assume no errors at first
if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
returnErrors ? errors : (errors.length == 0)}


for(piece in pieces){
    console.log(`${pieces[piece]} is ${isNonNegInt(pieces[piece]) + errors}`);
}
//, returnErrors = false