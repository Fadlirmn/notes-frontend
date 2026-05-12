import React, { useState, useRef, useEffect } from 'react';
import { Image, CheckSquare, PenTool, Pin, PinOff, Palette } from 'lucide-react';
import { useNoteStore } from '../../store/useNoteStore';
import { cn } from '../../utils/cn';
import { ColorPicker } from './ColorPicker';
import type { NoteColor } from '../../types';

export const NoteCreator: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [color, setColor] = useState<NoteColor>('default');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const addNote = useNoteStore((state) => state.addNote);

  const handleClose = () => {
    if (title || content) {
      addNote({ title, content, isPinned, color });
    }
    setTitle('');
    setContent('');
    setIsPinned(false);
    setColor('default');
    setIsExpanded(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [title, content, isPinned]);

  return (
    <div className="max-w-xl mx-auto mb-10 w-full px-4 sm:px-0">
      <div 
        ref={containerRef}
        className={cn(
          "rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200",
          isExpanded ? cn("p-4", `note-bg-${color}`) : "flex items-center px-4 py-3 cursor-text bg-surface"
        )}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {isExpanded ? (
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-start">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent font-headline font-semibold text-lg outline-none placeholder-secondary text-neutral"
                autoFocus
              />
              <button 
                onClick={() => setIsPinned(!isPinned)}
                className="p-2 hover:bg-container rounded-full"
              >
                {isPinned ? (
                  <Pin className="w-5 h-5 text-primary fill-primary" />
                ) : (
                  <PinOff className="w-5 h-5 text-secondary" />
                )}
              </button>
            </div>
            <textarea
              placeholder="Take a note..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent resize-none outline-none min-h-[100px] text-neutral placeholder-secondary"
            />
            <div className="flex justify-between items-center pt-2">
              <div className="flex space-x-1 relative">
                <div className="relative">
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowColorPicker(!showColorPicker);
                    }}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                  >
                    <Palette className="w-5 h-5 text-secondary" />
                  </button>
                  {showColorPicker && (
                    <div className="absolute z-50">
                      <div 
                        className="fixed inset-0" 
                        onClick={() => setShowColorPicker(false)} 
                      />
                      <ColorPicker 
                        currentColor={color} 
                        onSelect={(c) => {
                          setColor(c);
                          setShowColorPicker(false);
                        }} 
                      />
                    </div>
                  )}
                </div>
                <button type="button" className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><Image className="w-5 h-5 text-secondary" /></button>
                <button type="button" className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"><CheckSquare className="w-5 h-5 text-secondary" /></button>
              </div>
              <button 
                onClick={handleClose}
                className="px-6 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded font-medium text-sm transition-colors text-neutral"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="flex-1 text-secondary font-medium">Take a note...</span>
            <div className="flex space-x-1">
              <button className="p-2 hover:bg-container rounded-full"><CheckSquare className="w-5 h-5 text-secondary" /></button>
              <button className="p-2 hover:bg-container rounded-full"><PenTool className="w-5 h-5 text-secondary" /></button>
              <button className="p-2 hover:bg-container rounded-full"><Image className="w-5 h-5 text-secondary" /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
