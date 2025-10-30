import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ssb_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error loading user:', e);
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Save to localStorage
    localStorage.setItem('ssb_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    // Clear localStorage
    localStorage.removeItem('ssb_user');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
      <Toaster />
    </div>
  );
}
