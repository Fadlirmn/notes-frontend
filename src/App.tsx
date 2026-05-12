import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from './components/layout/MainLayout';
import { NoteCreator } from './components/notes/NoteCreator';
import { NoteGrid } from './components/notes/NoteGrid';
import { useNoteStore } from './store/useNoteStore';
import { useAuthStore } from './store/useAuthStore';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const queryClient = new QueryClient();

function AppContent() {
  const { notes, fetchNotes } = useNoteStore();
  const { isAuthenticated, user } = useAuthStore();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [isAuthenticated, fetchNotes]);

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <Login onToggleAuth={() => setAuthMode('register')} />
    ) : (
      <Register onToggleAuth={() => setAuthMode('login')} />
    );
  }

  // Filter notes for the main view
  const activeNotes = notes.filter(n => !n.isDeleted && !n.isArchived);
  const pinnedNotes = activeNotes.filter(n => n.isPinned);
  const otherNotes = activeNotes.filter(n => !n.isPinned);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <NoteCreator />
        
        {pinnedNotes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[11px] font-label font-bold uppercase tracking-wider text-secondary mb-4 ml-4">Pinned</h2>
            <NoteGrid notes={pinnedNotes} />
          </div>
        )}

        {pinnedNotes.length > 0 && otherNotes.length > 0 && (
          <h2 className="text-[11px] font-label font-bold uppercase tracking-wider text-secondary mb-4 ml-4">Others</h2>
        )}
        
        <NoteGrid notes={otherNotes} />

        {activeNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 opacity-30 select-none">
            <img 
              src="/favicon.png" 
              alt="Empty" 
              className="w-32 h-32 grayscale mb-4" 
            />
            <p className="text-xl font-headline">Notes for {user?.email} appear here</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
