/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Routes as ReactDomRoutes,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "../Pages/About/SobreNostros";
import CheckoutPage from "../Pages/CheckoutPage/CheckoutPage";
import Contacto from "../Pages/Contacto/Contacto";
import Inicio from "../Pages/Inicio/Inicio";
import LoginPage from "../Pages/Login/Login";
import NotFoundPage from "../Pages/NotFound/NotFoundPage";
import Profile from "../Pages/Perfil/Perfil";
import ProductDetails from "../Pages/Productos/ProductDetails";
import Productos from "../Pages/Productos/Productos";
import RegistroPage from "../Pages/Register/Register";
import ConfirmationPage from "../Pages/confirmation/confirmation";
import UserProfile from "../components/Auth/UserProfile";
import Footer from "../components/Footer/Footer";
import NavComponent from "../components/Header/NavComponent";
import { setAuthenticated } from "../reducer/userSlice.js";

const Routes = () => {
  const cart = useSelector((state) => state.cart);
  // Definición de rutas protegidas y públicas
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    return isAuthenticated ? element : <Navigate to="/NotFound" />;
  };
  const PaymentProtectedRoute = ({ element }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    return isAuthenticated ? element : <Navigate to="/NotFound" />;
  };

  const PublicRoute = ({ element }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    // Redirige al perfil si el usuario está autenticado y trata de acceder a la página de registro o inicio de sesión.
    if (isAuthenticated && (LoginPage || RegistroPage)) {
      return <Navigate to="/perfil" />;
    }

    return element; // Devolver el elemento sin un componente <Route> envolvente.
  };

  const dispatch = useDispatch();

  // Verifica si existe un token en el almacenamiento local al cargar la página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Establecer la autenticación si hay un token
      dispatch(
        setAuthenticated({
          isAuthenticated: true,
        })
      );
    }
  }, [dispatch]);
  const checkSessionStorageToken = () => {
    // Obtener el token y nombre de usuario almacenados en el sessionStorage
    const storedToken = sessionStorage.getItem("token");
    const storedNombre = sessionStorage.getItem("nombre");
    /* Si se encuentran tanto el token como el nombre de usuario en el sessionStorage,establecer la
    autenticación del usuario con esta información.*/
    if (storedToken && storedNombre) {
      dispatch(
        setAuthenticated({
          isAuthenticated: true,
          userName: storedNombre,
        })
      );
    }
  };

  // Llama a la función de verificación cuando se carga la página
  useEffect(() => {
    checkSessionStorageToken();
  }, []);

  return (
    <BrowserRouter>
      <layout>
        <NavComponent />
        <ReactDomRoutes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:productId" element={<ProductDetails />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/login"
            element={<PublicRoute path="/login" element={<LoginPage />} />}
          />
          <Route
            path="/registro"
            element={
              <PublicRoute path="/register" element={<RegistroPage />} />
            }
          />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route
            path="/perfil"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="/checkout"
            element={
              cart.length > 0 ? (
                <PrivateRoute element={<CheckoutPage />} />
              ) : (
                <Navigate to="/productos" />
              )
            }
          />
          <Route
            path="/confirmacion"
            element={<PaymentProtectedRoute element={<ConfirmationPage />} />}
          />

          <Route
            path="/NotFound"
            element={
              <PublicRoute path="/register" element={<NotFoundPage />} />
            }
          />
        </ReactDomRoutes>
        <ToastContainer />
        <Footer />
      </layout>
    </BrowserRouter>
  );
};

export default Routes;
