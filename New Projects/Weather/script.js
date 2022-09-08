const express = require("express");
//The https module allows us to make requests to API
const https = require("https");
//body-parser module allows us to look through and grab specific data inside a form post request
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

//Gets the request made to localhost URL and is used to respond
app.get("/", function(req,res){

    //Remember the __dirname is used to reach the main folder no matter its location
    //Then we add the specific location we want to reach
    res.sendFile(__dirname + "/index.html");
});

//This is the method used to get the post request made by the form
app.post("/", function(req,res){
    
    // console.log("Post request received");
    // console.log(req.body.cityName);

    //res.send("Server is up and running");

    //The req is retrieved from the form
    //then we access its body
    //and target the cityname
    const location = req.body.cityName;
    // const lon = req.body.cityLon;
    // const lat = req.body.cityLat;

    const apiKey = "acece669eddaa0b15d76de2de1f2cee6";
    
    //URL created with postman, the https:// must be written manually.
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+apiKey+"&unit=metric";
    //const urlLonLat = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=acece669eddaa0b15d76de2de1f2cee6";

    //Here we start a https request and grab the data we need from the API
    // https.get(urlLonLat, function(response){

    //     response.on("data", function(data){

    //         const weatherDataLonLat = JSON.parse(data);

    //         const locationName = weatherDataLonLat.name;
    //         const tempLonLat = weatherDataLonLat.main.temp;
    //         const humidityLonLat = weatherDataLonLat.main.humidity;
    //         const weatherDesLonLat = weatherDataLonLat.weather[0].description;
    //         const weatherIconLonLat = weatherDataLonLat.weather[0].icon;
    //         const weatherImageLonLat = "http://openweathermap.org/img/wn/"+weatherIconLonLat+"@2x.png";

    //         res.write("<h1>The weather in "+locationName+" is "+tempLonLat+"</h1>")
    //         res.write("<p>The humidity is "+humidityLonLat+"</p>");
    //         res.write("<p>The weather description is : "+weatherDesLonLat+"</p>");
    //         res.write("<img scr = "+weatherImageLonLat+">")

    //         res.send();

    //     })
    // });

    //This is a method that makes an https request and retrieves the data from that URL
    https.get(url, function(response){

        //console.log(response);
        console.log(response.statusCode);

        //The response.on() fetches the data retrieved from an https request.
        response.on("data", function(data){

            //The JSON.parse() converts hexa decimal data to a Javascript object.
            //The reverse of this method is JSON.stringify() that will convert it to hexa.
            const weatherData = JSON.parse(data);

            //Here we tap into specific data in the Javascript object.
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const weatherDes = weatherData.weather[0].description;

            //Here we get the weather icon code
            const weatherIcon = weatherData.weather[0].icon;
            //Then we fetch it through the weather API
            const imageURL = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";

            console.log("The temperature is : " + temp);
            console.log("The humidity is : " + humidity);
            console.log("The weather is "+weatherDes);

            res.write("<h1>The temperature in "+location+" is : "+temp+"</h1>");
            res.write("\n<p>The humidity is : "+humidity+"</p>");
            res.write("\n<p>The weather description is : "+weatherDes+"</p>");
            
            //Here we display the image we fetched
            res.write("<img src = "+imageURL+">");

            res.send();
            //console.log(weatherData);

        })
    });
});


app.listen(3000 , function() {
    console.log("Server is running on port 3000.");
});