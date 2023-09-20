import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";
import './about.css';

const About = () => {
  return (
    <Container className="py-5 about-container">
      <Row className='about-row'>
        <Col xs={12} className="text-center mb-4">
          <h1 className="title">Sobre Nosotros</h1>
        </Col>
        <Col xs={12} md={6}>
          <p className="description">
            En <span className="brand-name">Apple Reseller Argentina</span>, nuestra pasión es llevar la magia de Apple directamente a tus manos. Como un reseller oficial de Apple, nos enorgullece brindarte una selección excepcional de productos Apple, desde los innovadores iPhone y iPad hasta las potentes MacBook y las experiencias inmersivas de Apple Watch.
          </p>
          <p className="description">
            Nuestra tienda está ubicada en el corazón de Argentina, y hemos estado sirviendo a la comunidad con productos de alta calidad y un servicio incomparable. Nuestro equipo dedicado y apasionado está listo para asesorarte en la elección de productos que se adapten a tus necesidades y estilo de vida.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <p className="description">
            Con <span className="brand-name">Apple Reseller Argentina</span>, no solo obtienes productos excepcionales, sino que también experimentas un envío rápido y seguro. Nuestro compromiso con la seguridad y la privacidad se refleja en nuestras transacciones encriptadas y en la protección de tus datos personales.
          </p>
          <p className="description">
            Además, nuestra atención al cliente es inigualable. Estamos aquí para responder a tus preguntas y brindarte asistencia las 24 horas del día, los 7 días de la semana. Tu satisfacción es nuestra prioridad número uno.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
