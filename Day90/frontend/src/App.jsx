import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  function loadnotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {loadnotes();
  }, []);

  function handlesubmit(e) {
    e.preventDefault();
    const title = e.target[0].value;
    const description = e.target[1].value;
    axios
      .post("http://localhost:3000/api/notes", {
        title,
        description,
      })
      .then((res) => {
        loadnotes();
      });
  }
  function deleteNotes(id){
    axios.delete(`http://localhost:3000/api/notes/${id}`).then((res)=>{
      loadnotes();
    })
  }

  function editNote(id){
    const description = prompt("Enter new description");
    axios.patch(`http://localhost:3000/api/notes/${id}`,{
      description
    }).then((res)=>{
      loadnotes();
    })
  }
  return (
    <>
    <form action="" className="getnotes" onSubmit={handlesubmit}>
      <input type="text" placeholder="title" />
      <input type="text" placeholder="description" />
      <button type="submit">Add Note</button>
    </form>


      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={()=>{deleteNotes(note._id)}}>Delete</button>
              <button onClick={()=>{editNote(note._id)}}>Edit</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
