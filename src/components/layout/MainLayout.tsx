import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  RefreshCw, 
  Settings, 
  Grid, 
  List, 
  Lightbulb, 
  Bell, 
  Edit3, 
  Archive, 
  Trash2, 
  UserCircle,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/useAuthStore';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon: Icon, label, isActive, isCollapsed, onClick }: SidebarItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center h-12 cursor-pointer transition-all duration-200 rounded-r-full group",
        isActive 
          ? "bg-[#feefc3] dark:bg-[#41331c] text-[#202124] dark:text-[#e8eaed]" 
          : "hover:bg-container text-secondary"
      )}
    >
      <div className="flex items-center justify-center w-12 ml-3">
        <Icon className="w-5 h-5" />
      </div>
      {!isCollapsed && (
        <span className="ml-5 font-medium text-sm whitespace-nowrap overflow-hidden">
          {label}
        </span>
      )}
    </div>
  );
};

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('noteflow-theme') === 'dark';
  });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('Notes');
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('noteflow-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('noteflow-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const sidebarItems = [
    { icon: Lightbulb, label: 'Notes' },
    { icon: Bell, label: 'Reminders' },
    { icon: Edit3, label: 'Edit labels' },
    { icon: Archive, label: 'Archive' },
    { icon: Trash2, label: 'Trash' },
  ];

  return (
    <div className="flex flex-col h-screen bg-surface">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2 lg:space-x-4">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-3 hover:bg-container rounded-full transition-colors"
          >
            <Menu className="w-6 h-6 text-secondary" />
          </button>
          <div className="flex items-center space-x-2">
            <img src="/favicon.png" alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-headline text-secondary hidden sm:block">NoteFlow</span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-secondary group-focus-within:text-neutral" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-12 pr-3 py-3 bg-container border-none rounded-lg focus:bg-surface focus:ring-1 focus:ring-gray-200 focus:shadow-md transition-all outline-none text-neutral"
            />
          </div>
        </div>

        <div className="flex items-center space-x-1 lg:space-x-3">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-container rounded-full"
          >
            {isDark ? <Sun className="w-5 h-5 text-secondary" /> : <Moon className="w-5 h-5 text-secondary" />}
          </button>
          <button className="p-2 hover:bg-container rounded-full hidden sm:block"><RefreshCw className="w-5 h-5 text-secondary" /></button>
          <button className="p-2 hover:bg-container rounded-full hidden sm:block"><Grid className="w-5 h-5 text-secondary" /></button>
          <button className="p-2 hover:bg-container rounded-full"><Settings className="w-5 h-5 text-secondary" /></button>
          
          <div className="relative ml-2 lg:ml-6">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center justify-center p-1 hover:bg-container rounded-full transition-colors"
            >
              <UserCircle className="w-8 h-8 text-primary" />
            </button>

            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-surface border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl z-40 p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <UserCircle className="w-10 h-10 text-primary" />
                  </div>
                  <span className="text-neutral font-headline font-bold text-lg mb-1">{user?.email}</span>
                  <span className="text-secondary text-sm mb-6">NoteFlow User</span>
                  
                  <button 
                    onClick={() => {
                      logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 text-neutral hover:text-red-500 hover:border-red-200 transition-all font-medium"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "pt-2 pb-4 flex flex-col transition-all duration-300 ease-in-out z-20 bg-surface",
            isSidebarCollapsed ? "w-20" : "w-72 shadow-xl border-r border-transparent dark:border-gray-800"
          )}
          onMouseEnter={() => isSidebarCollapsed && setIsSidebarCollapsed(false)}
          onMouseLeave={() => !isSidebarCollapsed && setIsSidebarCollapsed(true)}
        >
          {sidebarItems.map((item) => (
            <SidebarItem 
              key={item.label} 
              {...item} 
              isActive={activeItem === item.label}
              onClick={() => setActiveItem(item.label)}
              isCollapsed={isSidebarCollapsed} 
            />
          ))}
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-surface">
          {children}
        </main>
      </div>
    </div>
  );
};
