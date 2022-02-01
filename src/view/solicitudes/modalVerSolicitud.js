import { useState } from "react";
import React from "react";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col, Dropdown, Modal } from "react-bootstrap";
import crearSoli from "./crearSoli.css";

const ModalVerSoli = () => {
  const [show, setShow] = useState(false);
  const titulos = ["No.", "Item", "Cantidad"];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        🔍
      </Button>

      <Modal show={show} onHide={handleClose}
        fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Ver Solicitud Interna</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>

            <div>
              <Form>
                <Form.Group
                  as={Row}
                  style={{ justifyContent: "center", marginTop: 40 }}
                >
                  <Col sm="2">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Tiempo esperado</Form.Label>
                      <Form.Control type="date" placeholder="dd/mm/aaaa" />
                    </Form.Group>
                    {/* <FormControl
                placeholder="Tiempo esperado           📅"
                aria-label="Username"
                aria-describedby="basic-addon1"
              /> */}
                  </Col>
                  <Col sm="2" >
                  <Form.Label>Estado</Form.Label>
                    <Form.Select >
                      <option>Diligenciada</option>
                      <option>Aprobada Jefe I.</option>
                      <option>Rechazada Jefe I.</option>
                      <option>Aprobada Gerente Gral.</option>
                      <option>Rechazada Gerente Gral.</option>
                    </Form.Select>
                    
                  </Col>
                  <Col sm="1" className="button">
                    <Button variant="secondary">Regresar</Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
            <div style={{ justifyContent: "center", margin: "0 250px" }}>
              <TablaSI titulos={titulos} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form style={{ width: "60%" }}>
                <Form.Group className="mb-3" controlId="Form.ControlJustifi">
                  <Form.Label>Justificación</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalVerSoli;
