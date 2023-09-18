import {
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importamos el componente Link de react-router-dom para manejar enlaces internos
import LogoFooter from "../../assets/Chaskibunes_apple_store.png";
import "./FooterStyle.css";

const Footer = () => {
  // Definimos una función para manejar el clic en el enlace de Inicio en el footer
  const handleHomeClick = () => {
      // Hace scroll hacia arriba de la página con un efecto suave
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Simula un clic en el botón de la barra de navegación (navbar) para cerrar el menú si está abierto
    document.querySelector(".navbar").click();
  };
  return (
    <footer className="footer">
      <Container fluid className="container__footer">
        <Row className="row__information-footer">
          <Col className="box__footer logo-footer">
            <Link to="/inicio" onClick={handleHomeClick}>
              <img src={LogoFooter} alt="Logo" />
            </Link>
          </Col>
          <Col className="box__footer">
            <h2>Enlaces rápidos</h2>
            <Nav.Link as={Link} to="/inicio" onClick={handleHomeClick}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleHomeClick}>
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/productos" onClick={handleHomeClick}>
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" onClick={handleHomeClick}>
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={handleHomeClick}>
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/registro" onClick={handleHomeClick}>
              Registrarse
            </Nav.Link>
          </Col>
          <Col className="box__footer">
            <h2>Contáctenos</h2>
            <div className="box__contact-footer">
              <Link to="/contacto" onClick={handleHomeClick}>
                <Button variant="primary" size="lg" className="footer-button">
                  Contacto
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="row__copyright-footer">
          <Col
            xs={12}
            md={6}
            className="text-center text-md-start "
          >
            <p className="mb-0">
              Copyright © 2023 Chaskibunes Apple Store - Todos los derechos
              reservados.
            </p>
          </Col>
          <Col xs={12} md={6} className="socialMedia text-center text-md-end">
            <a target="_blank" href="#">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a target="_blank" href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a target="_blank" href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
