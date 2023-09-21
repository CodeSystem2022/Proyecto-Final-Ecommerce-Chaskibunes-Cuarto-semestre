import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import { BsHeadset, BsShieldLock, BsTruck } from "react-icons/bs";
import "./SobreNostrosStyle.css";

const SobreNosotros = () => {
  return (
    <Container className="py-5">
      <Row>
        <h1 className='title'>Sobre Nostros</h1>
        <Col xs={12} md={4} className="mb-4 text-center">
          <BsTruck size={48} />
          <h3>Envío rápido</h3>
          <p>Entrega en 24 horas</p>
        </Col>
        <Col xs={12} md={4} className="mb-4 text-center">
          <BsShieldLock size={48} />
          <h3>Pagos seguros</h3>
          <p>Transacciones encriptadas</p>
        </Col>
        <Col xs={12} md={4} className="mb-4 text-center">
          <BsHeadset size={48} />
          <h3>Atención al cliente</h3>
          <p>Soporte 24/7</p>
        </Col>
      </Row>
    </Container>
  );
};

export default SobreNosotros;
