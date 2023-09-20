import axios from "axios";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css";


const RegistroPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    nombre: "",
    password: "",
  });
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { nombre, password, email } = inputs;

  const HandleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (nombre !== "" && password !== "" && email !== "") {
      const Usuario = {
        nombre,
        email,
        password,
      };
      
      setLoading(true);
      await axios
      .post("http://localhost:3000/register", Usuario)
      .then((res) => {
        const { data } = res;
        setMessage(data.message);
        setInputs({ nombre: "", password: "", email: "" });
        setTimeout(() => {
          setMessage("");
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Hubo un error");
        setTimeout(() => {
          setMessage("");
        }, 1500);
      });

    setLoading(false);
  }};
  return (
    <Container className="py-5 main-content">
      <Row className="justify-content-center">
        <Col md={24} className="text-center">
          <Form className="form" onSubmit={(e) => onSubmit(e)}>
            <h2 className="form-title">Regístrate</h2>
            <Form.Group className="mb-3 input-container">
              <Form.Group controlId="name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  onChange={(e) => HandleChange(e)}
                  value={nombre}
                  name="nombre"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  onChange={(e) => HandleChange(e)}
                  value={email}
                  name="email"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  onChange={(e) => HandleChange(e)}
                  value={password}
                  name="password"
                  autoComplete="off"
                />
              </Form.Group>
            </Form.Group>
            <Button className="details-button" variant="primary" type="submit">
              {loading ? "Cargando..." : "Registrarme"}
            </Button>
            <p className="signup-link">
              ¿Ya tienes una cuenta?{" "}
              <b onClick={() => navigate("/login")}>¡Inicia Sesión!</b>
            </p>
          </Form>
        </Col>
      </Row>
      {/* Muestra el mensaje usando el componente Alert de Bootstrap */}
      {message && (
        <Alert variant="dark" className="mt-3 text-bg-dark">
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default RegistroPage;
