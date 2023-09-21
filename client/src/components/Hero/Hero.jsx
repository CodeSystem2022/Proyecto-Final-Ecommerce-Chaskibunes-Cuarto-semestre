import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from "react-bootstrap";
import { Link } from 'react-scroll';
import "./HeroStyles.css";


const HeroSection = () => {
  return (
    <div className="hero-section">
      <Container className="hero-content">
        <h1 className="display-4">Bienvenido a Nuestra Apple Reseller</h1>
        <p className="lead">Somos distribuidores oficiales de Apple.</p>
        <Link to="productos" smooth={true} duration={100}>
          <Button variant="primary" size="lg" className='hero-button'>
            Ver Productos
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default HeroSection;
