import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NotFoundStyle.css';

const NotFoundPage = () => {
  return (
    <Container
      className="d-flex flex-column align-items-center container-styles"
    >
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no esta disponible si no inicias sesión o realizas una compra.</p>
      <Link to="/" className="text-decoration-none btn-not-found">
        <Button variant="primary" className="button-submit">Volver al Inicio</Button>
      </Link>
    </Container>
  );
};

export default NotFoundPage;
