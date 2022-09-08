const express = require("express");
const bodyparser = require("body-parser");

//Here we require our own made module and save the module.exports value in a const date
//date now holds the function we wrote and when you want to execute this code 
//you simply call date();
const date = require(__dirname + "/modules/date.js")


const app = express();

var newItems = [];
var workItems = [];

//We tell the express module that we will use ejs to render templates
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.static("public"));

app.get("/", function (req, res) {

    console.log(date);

    //the .render() method work with ejs 
    //we render a page and give it certain data to display
    //we mus first specify the file to render and it should be inside a folder called views
    //then we pass a json object made of a key and value
    //the key is the name of the placeholder in the ejs file
    //The value is the value sent from the js
    
    res.render("list.ejs", {
        //kindOfDay: week[day]
        //Here we call the method held inside the variable date
        listTitle: date.getDate(), // date.getDay() ==> will display only the day
        NewListItems: newItems
    });

});

app.post("/", function(req,res){

    newItem = req.body.newItem;

    if(req.body.list === "Work")
    {
        workItems.push(newItem);
        res.redirect("/work")
    }
    else
    {
        newItems.push(newItem);
        res.redirect("/");
    }

});

app.get("/work", function(req,res){

    res.render("list.ejs", {
        listTitle: "Work List",
        NewListItems: workItems
    });

});

app.post("/work", function(){
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/");
});

app.get("/about", function(req,res){
    res.render("about.ejs");
})


app.listen(3000, function () {
    console.log("Server listening at port 3000 ...");
});