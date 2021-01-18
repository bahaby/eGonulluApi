/*jslint node: true */
"use strict";
var soap = require('soap');
var express = require('express');
const sqlite = require('sqlite3');
var fs = require('fs');

// the splitter function, used by the service
function checkLogin(data) {
    let promise = new Promise((resolve, rejects) =>{
        const connection = new sqlite.Database('../sqlite.db');
        const loginQuery = "SELECT * FROM User WHERE Email = ? and Password = ?";
        var email = data.email;
        var password = data.password;
        console.log(email);
        console.log(password);
        var result = [];
        connection.all(loginQuery,[email,password],function (err,rows,fields) {
            let statusCode = 400;
            let message;
            let userId = -1;
            if(err) {
                message = "database error";
            }
            if(rows.length==1){
                statusCode = 200;
                message = "user logged in";
                userId = rows[0].Id;
            }
            else{
                message = "wrong email or password";
            }
            resolve({
                statusCode : statusCode,
                message: message,
                userId : userId
            });
        });
        connection.close();
    });
    return promise.then((value) => {
        console.log(value);
        return value;
    });
}
// the service
var serviceObject = {
    CheckLoginService: {
        CheckLoginServiceSoapPort: {
            CheckLogin: checkLogin
        },
        CheckLoginServiceSoap12Port: {
            CheckLogin: checkLogin
        }
    }
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})

// Launch the server and listen
var port = 4004;

app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");
});
