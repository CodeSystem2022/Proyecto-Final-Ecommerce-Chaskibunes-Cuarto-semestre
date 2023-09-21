import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../reducer/userSlice.js';

function UserProfile() {
    // Obtenemos el estado del usuario del store de Redux utilizando el hook useSelector
  const user = useSelector(state => state.user);
   // Obtenemos la función dispatch del store de Redux utilizando el hook useDispatch
  const dispatch = useDispatch();

  //Función para manejar el evento de cierre de sesión
  const handleLogout = () => {
    // Despacha la acción "logout" que actualiza el estado de Redux para cerrar la sesión del usuario
    dispatch(logout());
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      {user.isAuthenticated ? (
        <div>
          <p>Nombre de usuario: {user.nombre}</p> {/* Muestra el nombre del cliente */}
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}

export default UserProfile;
