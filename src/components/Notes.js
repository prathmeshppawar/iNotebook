import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({eId:"", etitle:"", edescription:"", etag:""})
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }else{
            navigate('/login')
        }
    }, [navigate, getNotes])

    const ref = useRef(null);
    const ref1= useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({eId: currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag: currentNote.tag})
    }
    const handleClick = (e) =>{
        e.preventDefault();
        ref1.current.click();
        editNote(note.eId, note.etitle, note.edescription, note.etag);
    }
    const handleChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className='my-3'>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} minLength={5} required aria-describedby="emailHelp" onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} minLength={5} required onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={handleChange} />
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref1}>Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your notes</h2>
                {notes.map((note) => {
                    return <NoteItem updateNote={updateNote} note={note} key={note._id}/>
                })}
            </div>
        </div>
    )
}

export default Notes;
