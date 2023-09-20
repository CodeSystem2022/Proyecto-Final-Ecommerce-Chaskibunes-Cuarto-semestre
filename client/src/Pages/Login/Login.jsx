import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthenticated } from "../../reducer/userSlice.js";
import "../Register/FormStyles.css";

const LoginPage = () => {
  // Define estados para el email, contraseña, mensaje de error y carga
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = inputs;
 // Maneja cambios en los campos de entrada del formulario
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
 // Maneja el proceso de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const Usuario = {
        email,
        password,
      };
      setLoading(true);
      await axios
        .post("http://localhost:3000/login", Usuario)
        .then((res) => {
          const { data } = res;
          setMessage(data.message);
          setTimeout(() => {
            setMessage("");
            if (data.usuario && data.usuario.token) {
               // Al iniciar sesión con éxito, se almacenan los datos en sessionStorage
              sessionStorage.setItem("token", data.usuario.token);
              sessionStorage.setItem("nombre", data.usuario.nombre);
              sessionStorage.setItem("userId", data.usuario.id);
              // Se despacha una acción para autenticar al usuario en Redux
              dispatch(
                setAuthenticated({
                  isAuthenticated: true,
                  token: data.usuario.token,
                  userName: data.usuario.nombre,
                  userId: data.usuario.id,
                })
              );
            }
            // Redirige al usuario a la página de perfil después del inicio de sesión
            navigate(`/perfil`);
          }, 1500);
        })
        .catch((error) => {
          console.error(error);
          setMessage("Correo u contraseña incorrecta");
          setTimeout(() => {
            setMessage("");
          }, 1500);
        });
      setInputs({ email: "", password: "" });
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 main-content">
      <Row className="justify-content-center">
        <Col md={24} className="text-center">
          <Form className="form" onSubmit={(e) => handleLogin(e)}>
            <h2 className="form-title">Iniciar Sesión</h2>
            <Form.Group className="mb-3 input-container">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  value={email}
                  name="email"
                  type="email"
                  placeholder="Ingrese su email"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
                  onChange={handleChange}
                  value={password}
                  name="password"
                  autoComplete="off"
                />
              </Form.Group>
            </Form.Group>
            <Button variant="primary" type="submit">
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </Button>
            <p className="signup-link">
              ¿Aún no tienes cuenta?{" "}
              <b onClick={() => navigate("/registro")}>¡Regístrate!</b>
            </p>
          </Form>
        </Col>
      </Row>
      {message && (
        <Alert variant="dark" className="mt-3 text-bg-dark">
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default LoginPage;
