import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  googleProvider,
  resetPassword as firebaseResetPassword
} from '../utils/firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(email, password);
  };

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Special check for Admin (Demo Access)
    if (cleanEmail === 'admin@autointern.com' && password === 'admin123') {
      const mockAdmin = { email: 'admin@autointern.com', uid: 'admin-demo-id', displayName: 'System Admin' };
      setCurrentUser(mockAdmin);
      localStorage.setItem('currentUser', JSON.stringify(mockAdmin));
      return mockAdmin;
    }
    return signInWithEmailAndPassword(cleanEmail, password);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    return signOut();
  };

  const loginWithGoogle = () => {
    return signInWithPopup(googleProvider);
  };

  const resetPassword = (email) => {
    return firebaseResetPassword(email);
  };

  useEffect(() => {
    // Check for saved user on initial load
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        const stillMock = localStorage.getItem('currentUser');
        if (!stillMock) {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    resetPassword,
    isAdmin: currentUser?.email?.toLowerCase() === 'admin@autointern.com'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
