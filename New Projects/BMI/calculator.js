//npm init
//npm install express
//nodemon [filename]
//npm install body-parser

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    //res.send("Hello World");
    //The __dirname will return the file no matter where it is hosted
    //Then add the file you want
    res.sendFile(__dirname + "/index.html");
    console.log("A user connected ....")
});

app.post("/" ,function(req,res){
    //res.send("Thanks for posting.");
    //the bodyparser return everything as a string 
    //So you must parse it to a number

    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;
    res.send("The result is : "+result);
});

app.get("/bmiCalculator", function(req,res){
    res.sendFile(__dirname + "/bmiCalculator.html");
    console.log("A user connected ...."); 
});

app.post("/bmiCalculator", function(req,res){

    //Or use parseFloat();
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    //var bmiResult = weight / Math.pow(height,2);
    var bmiResult = weight / (height * height);

    res.send("Your BMI is : " + bmiResult);
});

app.listen(3000, function(){
    console.log("Server connected to port 3000...")
});

