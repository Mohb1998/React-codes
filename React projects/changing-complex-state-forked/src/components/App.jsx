import React from "react";

function App() {
  const [fullName, setFullName] = React.useState({
    fName : "",
    lName : ""
  });

  function nameHandler (event)
  {
    const {value, name} = event.target;

    setFullName((prevValue) => {

      if(name === "fName")
      {
        return{
          fName : value,
          lName : prevValue.lName
        }
      }
      else if(name === "lName")
      {
        return{
          fName : prevValue.fName,
          lName : value
        } 
      }
    })
  }

  return (
    <div className="container">
      <h1>
        Hello {fullName.fName} {fullName.lName}
      </h1>
      <form>
        <input
          onChange={nameHandler}
          name="fName"
          placeholder="First Name"
          value={fullName.fName}
        />
        <input
          onChange={nameHandler}
          name="lName"
          placeholder="Last Name"
          value={fullName.lName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
