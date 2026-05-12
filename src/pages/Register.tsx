import React, { useState } from 'react';
import { api } from '../services/api';
import { Mail, Lock, Loader2, UserPlus, ArrowLeft } from 'lucide-react';

interface RegisterProps {
  onToggleAuth: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onToggleAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await api.post('/register', { email, password });
      setSuccess(true);
      setTimeout(() => onToggleAuth(), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-container p-4">
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center mb-4">
              <UserPlus className="w-10 h-10 text-tertiary" />
            </div>
            <h2 className="text-3xl font-headline font-bold text-neutral">Join NoteFlow</h2>
            <p className="text-secondary mt-2">Start capturing your thoughts today</p>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-green-600 dark:text-green-400 text-3xl">✓</div>
              </div>
              <h3 className="text-xl font-bold text-neutral">Account Created!</h3>
              <p className="text-secondary mt-2">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-label font-medium text-secondary ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-secondary group-focus-within:text-tertiary transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-container border border-transparent rounded-xl focus:bg-surface focus:ring-2 focus:ring-tertiary/20 focus:border-tertiary transition-all outline-none text-neutral"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-label font-medium text-secondary ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-secondary group-focus-within:text-tertiary transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-container border border-transparent rounded-xl focus:bg-surface focus:ring-2 focus:ring-tertiary/20 focus:border-tertiary transition-all outline-none text-neutral"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-label font-medium text-secondary ml-1">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-secondary group-focus-within:text-tertiary transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-container border border-transparent rounded-xl focus:bg-surface focus:ring-2 focus:ring-tertiary/20 focus:border-tertiary transition-all outline-none text-neutral"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-4 px-4 bg-tertiary text-neutral font-headline font-bold rounded-xl hover:bg-tertiary/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-8 text-center">
              <button 
                onClick={onToggleAuth}
                className="flex items-center justify-center mx-auto text-secondary text-sm hover:text-neutral transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
