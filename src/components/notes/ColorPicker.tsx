import React from 'react';
import type { NoteColor } from '../../types';
import { cn } from '../../utils/cn';

interface ColorPickerProps {
  onSelect: (color: NoteColor) => void;
  currentColor: NoteColor;
}

const colors: { name: NoteColor; value: string; darkValue: string }[] = [
  { name: 'default', value: '#ffffff', darkValue: '#1e1e1e' },
  { name: 'red', value: '#f28b82', darkValue: '#5c2b29' },
  { name: 'orange', value: '#fbbc04', darkValue: '#614a19' },
  { name: 'yellow', value: '#fff475', darkValue: '#635d19' },
  { name: 'green', value: '#ccff90', darkValue: '#345920' },
  { name: 'teal', value: '#a7ffeb', darkValue: '#16504b' },
  { name: 'blue', value: '#cbf0f8', darkValue: '#2d555e' },
  { name: 'darkblue', value: '#aecbfa', darkValue: '#1e3a5f' },
  { name: 'purple', value: '#d7aefb', darkValue: '#42275e' },
  { name: 'pink', value: '#fdcfe8', darkValue: '#5b2245' },
  { name: 'brown', value: '#e6c9a8', darkValue: '#442f19' },
  { name: 'gray', value: '#e8eaed', darkValue: '#3c3f43' },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ onSelect, currentColor }) => {
  return (
    <div className="absolute bottom-10 left-0 bg-surface shadow-xl border border-gray-200 dark:border-gray-700 rounded-lg p-2 flex flex-wrap gap-1 w-[160px] z-30">
      {colors.map((c) => (
        <button
          key={c.name}
          onClick={() => onSelect(c.name)}
          className={cn(
            "w-7 h-7 rounded-full border border-gray-200 dark:border-gray-600 transition-transform hover:scale-110",
            currentColor === c.name ? "ring-2 ring-primary ring-offset-2" : ""
          )}
          style={{ 
            backgroundColor: document.documentElement.classList.contains('dark') ? c.darkValue : c.value 
          }}
          title={c.name}
        />
      ))}
    </div>
  );
};
