


// require will allow you to load file
var filename = "./user_data.json";

const fs = require("fs");

//if the file exists
if(fs.existsSync(filename)){
    let stats = fs.statSync(filename);
    //prints file size
    console.log(`${filename} has ${stats.size} characters`)
    var data = fs.readFileSync(filename, 'utf-8');
    //parse to object
    var users = JSON.parse(data);
    //checks if it exists
    if(typeof users["kazman"] != undefined ){
        //prints
         console.log(users["kazman"].password);
    }
} else{
    console.log(`${filename} does not exist`);
}

var express = require('express');
const req = require('express/lib/request');
const { resourceUsage } = require("process");
var app = express();


app.use(express.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/login", function (request, response) {
    console.log(request.body);
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    if (typeof users[request.body.username] != undefined){
        //username exists so get the stored password and check if it matches
        if (users[request.body.username].password == request.body.password){
            response.send(`${request.body.username} is logged in`);
            return;
        } else {
            response.send(`Password is incorrect <br> ${str}` );
        }

    } else{
        response.send(`${request.body.username} does not exist <br> ${str}`);
    }

});
app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

 app.post("/register", function (request, response) {
    console.log(request.body);
   
    // process a simple register form
    // creates new object
    // sets username, password, email to object
    let username = request.body.username;
    users[username] = {};
    users[username].password = request.body.password;
    users[username].email = request.body.email;

    if (typeof users[username] != undefined  && users[username].password == request.body.repeat_password){
    fs.writeFileSync(filename, JSON.stringify(users));
    
    //redirects page to login page
    response.redirect('/login');
    } else {
     //   console.log(request.body.password);
     //   console.log(request.body.repeat_password);
        console.log('user exists');
        response.redirect('/register');
          }
 });

app.listen(8080, () => console.log(`listening on port 8080`));

