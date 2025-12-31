import React,{ useEffect,useState } from "react";
import type { Note, Props } from "../types";
import "./component.css"

export default function NoteForm({onAdd, onUpdate, editNote}:Props){
    const [title,setTitle] = useState("")
    const [note,setNote] = useState("")

    useEffect(() => {
        if (editNote) {
            setTitle(editNote.title)
            setNote(editNote.note)
        }else{
            setTitle("")
            setNote("")
        }
        }, [editNote])

    const handleSubmit  = ( e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(editNote){
            onUpdate({
                id: editNote.id,
                title,
                note
            })
        }else{
            onAdd({
                title,
                note
            })
        } 

        setTitle("")
        setNote("")
    }
    return(
        <form action=""className="note-form" onSubmit={handleSubmit}>
            <input 
            placeholder="Judul note"
            value={title}
            onChange={e=> setTitle(e.target.value)}
            />
            <textarea 
            placeholder="Note"
            value={note}
            onChange={e=> setNote(e.target.value)}
            
            />
            <button type="submit">
                {editNote ? 'Update':'Tambah'}
            </button>
        </form>
    )
}
