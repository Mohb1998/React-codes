//The ready method is used to make sure that jQUery has been 
//loaded to avoid any errors

// $(document).ready(function(){
//     $("h1").css("color", "red");
// });

//Change the styling property
//           what     to what
//If you only write "color" you are getting the value
//$("h1").css("color", "red");

//addClass method can add css classes 
//to keep styling and behavious separated
$("h1").addClass("big-title");


//removeClass does the exact oposite
//$("h1").removeClass("big-title");


//The text() method allows us to overwrite any existing text
//$("h1").text("Fuck off");

//The html() works as innerHTML method
//and allows us to change not only the text but also the html
//$("button").html("<em>Hello<em/>")


//The attr() method allow us to change html attributes
$("img").attr("src", "images/s2.png");

//This is how to add an event listener to any html element
$("h1").click(function(){
    $("h1").css("color", "purple")
})

//The keypress event detects any keypresses as an event
$("body").keypress(function(event){
    $("h1").text(event.key);
})