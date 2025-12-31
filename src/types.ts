export interface Note {
  id:number,
  title:string,
  note:string
}

export type CreateNote = Omit<Note, "id">;

export type Props = {
    onAdd: (note: CreateNote)=>void,
    onUpdate:(note: Note)=>void,
    editNote: Note|null
}