import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../Firebase/config.js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
      const nombreLimpio = userFirebase.email.replace('@teoforever.com', '');
      const rol = nombreLimpio === 'admin' ? 'admin' : 'cliente';

        setUsuario({
          uid: userFirebase.uid,
          email: userFirebase.email,
          nombre: nombreLimpio,
          rol,
        });
      } else {
        setUsuario(null);
      }
      setCargandoAuth(false);
    });

    return () => desuscribir();
  }, []);

  const formatearUsuario = (username) => {
  const limpio = username.trim().toLowerCase();
  return limpio.includes('@') ? limpio : `${limpio}@teoforever.com`;
};

  const login = (username, password) => {
    const emailFirebase = formatearUsuario(username);
    return signInWithEmailAndPassword(auth, emailFirebase, password);
  };

  const registrarCliente = (username, password) => {
    const emailFirebase = formatearUsuario(username);
    return createUserWithEmailAndPassword(auth, emailFirebase, password);
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ usuario, login, registrarCliente, logout, cargandoAuth }}>
      {!cargandoAuth && children}
    </AuthContext.Provider>
  );
};