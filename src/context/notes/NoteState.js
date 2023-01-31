import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
  const host = "http://localhost:4000/"
    const notesInitial = []
      const [notes, setNotes] = useState(notesInitial)

      //Fetch all note
      const getNotes = async() =>{
        //API call
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json = await response.json();
        setNotes(json)
      } 
      //Add note
      const addNote = async(title, description, tag) =>{
        //API call
        const response = await fetch(`${host}api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        setNotes(notes.concat(json))
      } 
      //Delete note
      const deleteNote = async(id) =>{
        //API call
        const response = await fetch(`${host}api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = await response.json();
        console.log(json);
        const newNote = notes.filter((note)=>{ return note._id!==id});
        setNotes(newNote);
      } 
      //Edit note
      const editNote = async (id, title, description, tag) =>{
        //API call
        const response = await fetch(`${host}api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json);
        // Logic to edit in cliet
        // for (let index = 0; index < notes.length; index++) {
        //   const element = notes[index];
        //   if (element._id === id) {
        //     element.title = title;
        //     element.description = description;
        //     element.tag = tag;
        //   }
        // }
        getNotes();
      } 
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, getNotes, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;