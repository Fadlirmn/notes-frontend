import axios from "axios";
import type { Note } from "../types";

const API_URL = "https://note-crud-backend-production.up.railway.app/notes"

export const GetNotes = async(): Promise<Note[]>=>{
    const res = await axios.get<Note[]>(API_URL)
    return res.data
}

export const CreateNote = async(
    note: Omit<Note, "id">
): Promise<void>=>{
    await axios.post(API_URL,note)
}

export const UpdateNote = async(note:Note):Promise<void> =>{
    await axios.put(`${API_URL}/${note.id}`, note)
}
export const DeleteNote = async(id:number):Promise<void> =>{
    await axios.delete(`${API_URL}/${id}`)
}