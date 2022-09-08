const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser:true});

//Here we are creating the skeleton of our database
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        //Here we specify that this field must be inserted
        //and we add a small optional text to give us a hint
        //if something goes wrong
        //This will also prevent the addition of the data to the database
        //until it gets fixed
        required: [true, "Please enter a name for the fruit."]
    },

    //Here we introduce a small part of validation in which we specify
    //the type of the data and give it some limits 
    rating: {
        type: Number,
        min:1,
        max:10
    },
    review: String
});

//Here we specify the model and what schema the 
//model will follow and we use the model to create new
//documents
const Fruit = mongoose.model("Fruit", fruitSchema);

//Here we start creating our document
const apple = new Fruit({
    name: "apple",
    rating: 5,
    review: "Very good"
});

const kiwi = new Fruit({
    name: "kiwi",
    rating: 8,
    review: "Very nice"
});

const banana = new Fruit({
    name: "banana",
    rating: 7,
    review: "excellent"
});

const peach = new Fruit({
    name: "peach",
    rating: 8,
    review: "The best"
});

const pineapple = new Fruit({
    name: "pineapple",
    rating: 10,
    review: "amazing"
})
pineapple.save();

const orange = new Fruit({
    name: "orange",
    rating: 10,
    review: "sour"
})
orange.save();


//and then save if to our fruitsDB
//but this only saves one document
//fruit.save();

//to do it in bulk use :
Fruit.insertMany([apple,kiwi,banana,peach], function(err){
    //it takes 2 parameters an array of the objects to save
    //and a call back function
    if(err)
    {
        console.log(err);
    }
    else
    {
        console.log("Succesfully saved all the data to fruitsDB");
    }
});


Fruit.find(function(err,fruits){

    if(err)
    {
        console.log(err);
    }

    else
    {
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        })
        
    }

        //You should always close the connection to the database
        //it should be right after the last command that needed the database

        //mongoose.connection.close();
});

//The update function requires 2 fields 
//a query which is the id part which can be found through terminal
//and the value to update
// Fruit.updateOne(
//     {_id: "613771ec139869b2f601fbf5"},
//     {name: "Peach"},
//     function(err){
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("The update was successfull")
//         }
//     }
// );
    
// Fruit.deleteOne(
//     {name: "peach"},
//     function(err){
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("Record deleted ");
//         }
//     }
// );


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,

    //Here we are creating a relation between the person and the fruit
    favouriteFruit: fruitSchema
});

//Person here stands for the model
const Person = mongoose.model("Person",personSchema);

const person = new Person({
    name: "Johny",
    age: 12,
    favouriteFruit: orange
});

person.save();

// Person.deleteMany(
//     {name: "John"},
//     function(err){
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
//             console.log("John deleted ");
//         }
//     }
// );
