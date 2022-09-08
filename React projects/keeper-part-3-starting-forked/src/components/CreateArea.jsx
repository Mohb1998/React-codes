import React from "react";

function CreateArea(props) {

  const [note, setNote] = React.useState({
    title : "",
    content : ""
  });

  function handleChange(event)
  {
    const {name, value} = event.target;

    setNote(prevNote => {
      return{...prevNote, [name]: value
      }
    })

  }

  function handleClick(event)
  {

    props.onAdd(note);
    //Here we empty up the note to add a new one
    setNote({
      title : "",
      content : ""
    })
    //prevents the default behaviour when pressing a button
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input name="title" value={note.title} onChange={handleChange} placeholder="Title" />
        <textarea name="content" value={note.content} onChange={handleChange} placeholder="Take a note..." rows="3" />
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
