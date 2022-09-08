//jshint esversion:6
//This is a module a sort of mini class that gets called in the app.js
//we tens to create multiple modules to decluster our main js file


//console.log(module); 
//The module.exports method allow us to export certain functionalities from our module
//and require them in other files that have requiered this module

//module.exports = "Hello World";
//Don't put () as not to call it internaly
//This method only exports one method
//module.exports = getDate;

exports.getDate = getDate;
module.exports.getDay = getDay;
//either way of exporting is acceptable


function getDate()
{
    const today = new Date();

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    const formatedDay = today.toLocaleDateString("en-US", options);
    return formatedDay;
}

function getDay()
{
    const today = new Date();

    const options = {
        weekday: 'long',
    };
    const day = today.toLocaleDateString("en-US", options);
    return day;
}

//Will show that there are 2 functions being exported
//console.log(module.exports)