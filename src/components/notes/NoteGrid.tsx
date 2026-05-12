import React from 'react';
import Masonry from 'react-masonry-css';
import type { Note } from '../../types';
import { NoteCard } from './NoteCard';

interface NoteGridProps {
  notes: Note[];
}

const breakpointColumnsObj = {
  default: 6,
  1800: 5,
  1500: 4,
  1200: 3,
  900: 2,
  600: 1
};

export const NoteGrid: React.FC<NoteGridProps> = ({ notes }) => {
  if (notes.length === 0) return null;

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </Masonry>
  );
};
