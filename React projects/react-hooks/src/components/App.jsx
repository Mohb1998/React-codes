import React from "react";

function App() {
  
  const [time, setTime] = React.useState();

  function updateTime() {
    var updatedeTime = new Date().toLocaleTimeString();
    setTime(updatedeTime);
  }setInterval(updateTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={updateTime}>Get Time</button>
    </div>
  );
}

export default App;
