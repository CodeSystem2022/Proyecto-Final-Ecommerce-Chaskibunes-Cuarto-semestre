import { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Importa acciones y selectores relacionados con la autenticación del usuario desde el archivo "userSlice.js"
import {
  login,
  logout,
  selectIsAuthenticated,
  selectUserName,
  updateNameInAuthentication,
} from "../../reducer/userSlice";
import Cart from "./CartComponent";
import Logo from "./Logo";
import "./NavbarStyles.css";

const NavComponent = () => {
  // Obtiene el estado de autenticación del usuario y su nombre desde Redux
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUserName);
  // Obtiene la función dispatch del store de Redux
  const dispatch = useDispatch();

  // Utilizamos useffect para verificar si hay datos de inicio de sesión en el session Storage
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedNombre = sessionStorage.getItem("nombre");
    const storedId = sessionStorage.getItem("id");

    if (storedToken && storedNombre) {
      // Si se encuentran datos, iniciar sesión automáticamente
      dispatch(
        login({
          token: storedToken,
          nombre: storedNombre,
          id: storedId,
        })
      );

      // Actualiza el nombre en el estado de Redux
      dispatch(
        updateNameInAuthentication({
          nombre: storedNombre,
          id: storedId,
        })
      );
    }
  }, [dispatch]);

  // Función para manejar el clic en los enlaces de navegación en dispositivos móviles
  const handleNavLinkClick = () => {
    if (window.innerWidth <= 991) {
      document.querySelector(".navbar-toggler").click();
    }
  };
  
 // Función para hacer scroll hacia la parte superior de la página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Dispatch de la acción logout para eliminar la autenticación
    dispatch(logout());
  };

  return (
    <Navbar expand="lg" variant="dark" className="navbar-custom fixed-top">
      <Container fluid className="conteiner">
        <Navbar.Brand as={Link} to="/inicio" className="nav-logo">
          <Logo onClick={scrollToTop} />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/inicio"
              onClick={() => {
                handleNavLinkClick();
                scrollToTop();
              }}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/sobre-nosotros"
              onClick={() => {
                handleNavLinkClick();
                scrollToTop();
              }}
            >
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/productos"
              onClick={() => {
                handleNavLinkClick();
                scrollToTop();
              }}
            >
              Productos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contacto"
              onClick={() => {
                handleNavLinkClick();
                scrollToTop();
              }}
            >
              Contacto
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown title={`Hola, ${userName}`} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/perfil" className="profile">
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} disabled>
                  Mis Compras
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="profile">
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  onClick={() => {
                    handleNavLinkClick();
                    scrollToTop();
                  }}
                >
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/registro"
                  onClick={() => {
                    handleNavLinkClick();
                    scrollToTop();
                  }}
                >
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
          <Cart />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavComponent;
