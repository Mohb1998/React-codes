import React from "react";
import Contacts from "./contacts";
import Card from "./Card";

function createCard(Contacts)
{
  return( <Card 
  // The key prop is a MUST and must be spelled like this and it is expected by react to be able to render elements that have the same props
    key= {Contacts.id}
    userID= {Contacts.userID}
    name= {Contacts.name}
    imgURL= {Contacts.imageURL}
    tel= {Contacts.phone}
    email= {Contacts.email}
  />)
}

function App() {

  return (
    <div>
      <h1 className="heading">My Contacts</h1>


      {/* Another smarter way to make repetetive lines easier is to use the mapping function */}
      {Contacts.map(createCard)};

      {/* <Card 
        name= {Contacts[0].name}
        imgURL= {Contacts[0].imageURL}
        tel= {Contacts[0].phone}
        email= {Contacts[0].email}
      />

      <Card 
        name= {Contacts[1].name}
        imgURL= {Contacts[1].imageURL}
        tel= {Contacts[1].phone}
        email= {Contacts[1].email}
      />

      <Card 
        name= {Contacts[2].name}
        imgURL= {Contacts[2].imageURL}
        tel= {Contacts[2].phone}
        email= {Contacts[2].email}
      /> */}

    </div>
  );
}

export default App;
