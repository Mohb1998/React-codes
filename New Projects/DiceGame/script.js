var randomnumber1 =  Math.floor(Math.random() * 6) + 1;
var randomnumber2 =  Math.floor(Math.random() * 6) + 1;

var randomImage1 = "images/dice"+randomnumber1+".png";
var randomImage2 = "images/dice"+randomnumber2+".png";

document.querySelectorAll("img")[0].setAttribute("src",randomImage1);
document.querySelectorAll("img")[1].setAttribute("src",randomImage2);


if(randomnumber1 > randomnumber2)
{
    document.querySelector("h1").innerHTML = "Player 1 is the winner"
}

else if(randomnumber1 < randomnumber2)
{
    document.querySelector("h1").innerHTML = "Player 2 is the winner"
}

else
{
    document.querySelector("h1").innerHTML = "Draw"
}

