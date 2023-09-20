/* eslint-disable react-hooks/exhaustive-deps */
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import {
  Form as BootstrapForm,
  Button,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";

import "./ContactoStyle.css";

const Contacto = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);

  // Define valores iniciales y esquema de validación Yup para el formulario
  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    asunto: "",
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre debe tener al menos 3 letras")
      .required("El nombre es obligatorio"),
    apellido: Yup.string()
      .min(3, "El apellido debe tener al menos 3 letras")
      .required("El apellido es obligatorio"),
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio")
      .matches(/@/, 'El correo electrónico debe contener "@"'),
    asunto: Yup.string().required("El mensaje es obligatorio"),
  });
 // Maneja la presentación del modal de éxito después del envío del formulario
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setTimeout(() => {
      setSubmitting(false);
      setShowSuccessModal(true);
      startCountdown(); // Iniciar cuenta regresiva al mostrar el modal
      resetForm(); // Restablecer los valores del formulario
    }, 400);
  };
  // Maneja el cierre del modal de éxito
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSecondsLeft(5);
  };
 // Inicia una cuenta regresiva al mostrar el modal de éxito
  const startCountdown = useCallback(() => {
    let seconds = 5;
    const countdownInterval = setInterval(() => {
      seconds--;
      setSecondsLeft(seconds);
      if (seconds === 0) {
        clearInterval(countdownInterval);
        handleCloseSuccessModal();
      }
    }, 1000);
  });
  // Efecto para iniciar la cuenta regresiva cuando se muestra el modal

  useEffect(() => {
    if (showSuccessModal) {
      startCountdown();
    }
  }, [showSuccessModal, startCountdown]);

  return (
    <Container className="contact-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema} // Utiliza el esquema Yup
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="btn-form">
            <h2 className="text-center">Contacto</h2>
            <Row className="gx-4">
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Nombre</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="nombre"
                    className="form-control"
                    placeholder="Ingresa tu nombre"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Apellido</BootstrapForm.Label>
                  <Field
                    type="text"
                    name="apellido"
                    className="form-control"
                    placeholder="Ingresa tu apellido"
                  />
                  <ErrorMessage
                    name="apellido"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
              <Col xs={12}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Email</BootstrapForm.Label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Ingresa tu email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
              <Col xs={12}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Mensaje</BootstrapForm.Label>
                  <Field
                    as="textarea"
                    name="asunto"
                    rows={3}
                    className="form-control"
                    placeholder="Escribe tu mensaje"
                  />
                  <ErrorMessage
                    name="asunto"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              size="lg"
              className="button-submit"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </Form>
        )}
      </Formik>

      {/* Modal de éxito */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>¡Formulario enviado con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu formulario se ha enviado correctamente.</Modal.Body>
        <Modal.Footer className="btn-footer-modal">
          <Button
            variant="primary"
            className="button-submit"
            onClick={handleCloseSuccessModal}
          >
            Cerrar ({secondsLeft} segundos)
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Contacto;
