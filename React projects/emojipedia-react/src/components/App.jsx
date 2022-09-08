import React from "react";
import emojipedia from "../emojipedia.js"
import Entry from "./Entry.jsx";

function createEntry (emojipedia)
{
  return(<Entry 
    key={emojipedia.id}
    emoji={emojipedia.emoji}
    name={emojipedia.name}
    meaning={emojipedia.menaing}
  />
  );
}

function App() {
  return (
    <div>

      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map(createEntry)};
      </dl>

    </div>
  );
}

export default App;
