const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:true }))

let result;
app.get("/", function (req, res) {
    console.log("New client")
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

    let num1 = Number(req.body.num1);
    let num2 = Number(req.body.num2);

    result = num1 + num2;
    //res.send("The result is " + result);

    const element = document.getElementById("sum");
    element.innerHTML = "hello";
});


app.listen(3000, function () {
    console.log("Server is running ...")
});