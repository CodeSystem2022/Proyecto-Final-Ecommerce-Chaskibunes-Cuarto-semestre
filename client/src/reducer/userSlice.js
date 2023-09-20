import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user", // El nombre del slice, utilizado para identificarlo en el store de Redux
  initialState: {
    isAuthenticated: false, // Estado inicial: el usuario no está autenticado
    nombre: "", // Nombre del usuario, inicialmente vacío
    token: "", // Token de autenticación, inicialmente vacío
  },
  reducers: {
    setAuthenticated: (state, action) => {
      // Este reducer actualiza el estado de autenticación y el nombre del usuario
      state.isAuthenticated = action.payload.isAuthenticated;
      state.nombre = action.payload.userName;
    },
    login: (state, action) => {
      // Este reducer actualiza el estado después de un inicio de sesión exitoso
      state.isAuthenticated = true;
      state.nombre = action.payload.nombre;
      state.token = action.payload.token;
      state.email = action.payload.email;
      // Almacenar datos en el session Storage
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("nombre", action.payload.nombre);
      localStorage.setItem("userId", action.payload.id);
    },
    logout: (state) => {
      // Este reducer actualiza el estado después de cerrar sesión
      state.isAuthenticated = false;
      state.nombre = ""; // Limpiamos 'nombre' en el estado
      state.id = ""; // Limpiamos 'id' en el estado
      // Eliminar datos del Session Storage
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("nombre");
      localStorage.removeItem("userId");
    },
    updateNameInAuthentication: (state, action) => {
      // Este reducer actualiza el nombre de usuario y el id en el estado
      state.nombre = action.payload.nombre;
      state.id = action.payload.id;
    },
  },
});

export const { setAuthenticated, logout, login, updateNameInAuthentication } =
  userSlice.actions;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserName = (state) => state.user.nombre;
export const selectToken = (state) => state.user.token;

export default userSlice.reducer;
