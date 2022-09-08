import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes.js"

function App() {
  return (
    <div>
      <Header />


      {notes.map(function(notes){
        return(
          <Note 
            key={notes.key}
            noteTitle={notes.title}
            noteContent={notes.content}
          />
        );
      })}


      <Footer />
    </div>
  );
}

export default App;
