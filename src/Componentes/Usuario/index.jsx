import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

export default function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    roll: "usuario"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Obtener usuario autenticado
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          throw new Error(`Error de autenticación: ${authError.message}`);
        }
        
        if (!user) {
          throw new Error("No hay usuario autenticado");
        }

        // 2. Obtener datos del perfil - usando userabdd
        const { data: userData, error: userError } = await supabase
          .from("userabdd") // Nombre de tabla ajustado
          .select("*")
          .eq("id", user.id)
          .single();

        if (userError) {
          throw new Error(`Error al obtener datos del usuario: ${userError.message}`);
        }

        // Si no existe el perfil, crear uno básico
        if (!userData) {
          console.warn("No se encontró perfil para este usuario, creando uno...");
          const { error: insertError } = await supabase
            .from("userabdd") // Nombre de tabla ajustado
            .insert([{
              id: user.id,
              nombre: user.email.split('@')[0],
              correo: user.email,
              roll: 'usuario'
            }]);

          if (insertError) throw insertError;
          
          return fetchUserData();
        }

        // 3. Actualizar estados
        setUsuario(user);
        setForm({
          nombre: userData.nombre || user.email.split('@')[0] || "",
          correo: user.email || "",
          fecha_nacimiento: userData.fecha_nacimiento || "",
          telefono: userData.telefono || "",
          roll: userData.roll || "usuario"
        });

      } catch (err) {
        console.error("Error cargando datos:", err);
        setError(err.message);
        
        if (err.message.includes("autenticación") || err.message.includes("autenticado")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleUpdate = async () => {
    try {
      if (!usuario) {
        throw new Error("No hay usuario autenticado");
      }

      const { error } = await supabase
        .from("userabdd") // Nombre de tabla ajustado
        .update({
          nombre: form.nombre,
          fecha_nacimiento: form.fecha_nacimiento,
          telefono: form.telefono,
          roll: form.roll
        })
        .eq("id", usuario.id);

      if (error) throw error;
      
      alert("Perfil actualizado correctamente");
    } catch (err) {
      console.error("Error actualizando:", err);
      setError(`Error al actualizar: ${err.message}`);
    }
  };

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-container">
      <h2>Mi Perfil</h2>
      
      <div className="form-group">
        <label>Nombre:</label>
        <input
          value={form.nombre}
          onChange={(e) => setForm({...form, nombre: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Correo:</label>
        <input
          value={form.correo}
          disabled
        />
      </div>

      <div className="form-group">
        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          value={form.fecha_nacimiento}
          onChange={(e) => setForm({...form, fecha_nacimiento: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Teléfono:</label>
        <input
          value={form.telefono}
          onChange={(e) => setForm({...form, telefono: e.target.value})}
        />
      </div>

      <div className="form-group">
        <label>Rol:</label>
        <span>{form.roll}</span>
      </div>

      <button onClick={handleUpdate}>Guardar cambios</button>
    </div>
  );
}