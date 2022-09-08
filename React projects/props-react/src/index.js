import React from "react";
import ReactDOM from "react-dom";
import Card from "./components/Card.jsx";

ReactDOM.render(
  <div>
    <h1>My Contacts</h1>

    <Card 
      name="Mohb" 
      src="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg"
      tel="+1208714647" 
      email="mohebkhaled@gmail.com"
    />

    <Card 
      name="Mira" 
      src="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" 
      tel="+1208714647" 
      email="mohebkhaled@gmail.com"
    />

    <Card 
      name="Amer" 
      src="https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg" 
      tel="+1208714647" 
      email="mohebkhaled@gmail.com"
    />

  </div>,
  document.getElementById("root")
);
