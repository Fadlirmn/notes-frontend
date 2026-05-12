import React, { useState } from 'react';
import { 
  Palette, 
  Archive, 
  Trash2, 
  MoreVertical, 
  Pin, 
  CheckCircle2, 
  Circle 
} from 'lucide-react';
import type { Note, NoteColor } from '../../types';
import { useNoteStore } from '../../store/useNoteStore';
import { cn } from '../../utils/cn';
import { ColorPicker } from './ColorPicker';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { updateNote, deleteNote, archiveNote, pinNote } = useNoteStore();

  const handleColorChange = (color: NoteColor) => {
    updateNote(note.id, { color });
  };

  const bgClass = `note-bg-${note.color}`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4 transition-all duration-200 hover:shadow-lg",
        bgClass
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-headline font-semibold text-neutral">{note.title}</h3>
        <button 
          onClick={() => pinNote(note.id)}
          className={cn(
            "p-1.5 rounded-full transition-opacity",
            isHovered || note.isPinned ? "opacity-100" : "opacity-0",
            note.isPinned ? "text-primary" : "text-secondary hover:bg-black/5 dark:hover:bg-white/5"
          )}
        >
          <Pin className={cn("w-5 h-5", note.isPinned && "fill-primary")} />
        </button>
      </div>

      <p className="text-sm text-neutral whitespace-pre-wrap leading-relaxed">
        {note.content}
      </p>

      {note.isChecklist && (
        <div className="mt-3 space-y-1">
          {note.checklist.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              {item.completed ? (
                <CheckCircle2 className="w-4 h-4 text-primary" />
              ) : (
                <Circle className="w-4 h-4 text-secondary" />
              )}
              <span className={cn("text-sm", item.completed && "line-through text-secondary")}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div 
        className={cn(
          "flex items-center justify-between mt-4 transition-opacity",
          isHovered || showColorPicker ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="flex space-x-0.5 relative">
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
              className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
            >
              <Palette className="w-4 h-4 text-secondary" />
            </button>
            {showColorPicker && (
              <div className="absolute z-50">
                <div 
                  className="fixed inset-0" 
                  onClick={() => setShowColorPicker(false)} 
                />
                <ColorPicker 
                  currentColor={note.color} 
                  onSelect={(color) => {
                    handleColorChange(color);
                    setShowColorPicker(false);
                  }} 
                />
              </div>
            )}
          </div>
          <button 
            onClick={() => archiveNote(note.id)}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            <Archive className="w-4 h-4 text-secondary" />
          </button>
          <button 
            onClick={() => deleteNote(note.id)}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4 text-secondary" />
          </button>
          <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
            <MoreVertical className="w-4 h-4 text-secondary" />
          </button>
        </div>
      </div>
      
      {/* Multi-select check icon (Keep style) */}
      <div 
        className={cn(
          "absolute -top-3 -left-3 p-1 bg-surface border border-gray-200 dark:border-gray-700 rounded-full shadow-sm transition-opacity",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  );
};
