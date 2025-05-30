import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './Contexto/Contexto';
import { supabase } from "./supabase";

// Componentes
import Menu from './Componentes/Menu';
import Aleatorios from './Componentes/Aleatorios';
import Listas from './Componentes/Listas';
import Capturados from './Componentes/Capturados';
import Favoritos from './Componentes/Favoritos';
import Usuario from './Componentes/Usuario';
import Pokemon from './Componentes/Pokemon';
import Login from './Componentes/Login';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }
    verificarSesion();

    // Escucha cambios en la sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (cargando) return <div className="cargando">Cargando...</div>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}

        <Routes>
          {/* Rutas protegidas */}
          <Route path="/" element={usuario ? <Listas /> : <Navigate to="/login" replace />} />
          <Route path="/usuario" element={usuario ? <Usuario /> : <Navigate to="/login" replace />} />
          <Route path="/aleatorios" element={usuario ? <Aleatorios /> : <Navigate to="/login" replace />} />
          <Route path="/capturados" element={usuario ? <Capturados /> : <Navigate to="/login" replace />} />
          <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" replace />} />
          <Route path="/pokemon/:name" element={usuario ? <Pokemon /> : <Navigate to="/login" replace />} />
          
          {/* Ruta pública */}
          <Route path="/login" element={!usuario ? <Login /> : <Navigate to="/" replace />} />
          
          {/* Ruta de fallback */}
          <Route path="*" element={<Navigate to={usuario ? "/" : "/login"} replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;