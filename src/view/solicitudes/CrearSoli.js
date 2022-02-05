import React from "react";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import BadgeInfe from "../componentes/badgeinfe_compras/BadgeInfe";
import crearSoli from "./crearSoli.css";
import Navbar from "../componentes/Navbar";
const CrearSoli = () => {
  const titulos = ["No.", "Item", "Cantidad", "Opciones"];
  const busqueda = () => {
    return (
      <>     
      
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{justifyContent: "center", marginBottom:20 }}>
            <Form.Group as={Row}>
              <Col sm="5">
                <FormControl
                  placeholder="Item"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </Col>
              <Col sm="3">
                <FormControl
                  placeholder="Cantidad"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </Col>
              <Col sm="1">
                <Button variant="secondary" style={{ width: 80 }}>
                  + Item
                </Button>
              </Col>
            </Form.Group>
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      <Navbar/>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Crear Solicitudes Internas</h3>
      </div>
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
              
            </Col>
            <Col sm="1" className="button" style={{ width: "10%" }}>
              <Button
                variant="secondary"
                style={{ backgroundColor: "#4a3187" }}
              >
                Guardar
              </Button>
            </Col>
            <Col sm="1" className="button">
              <Button variant="secondary">Regresar</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div style={{justifyContent: "center", margin:"0 250px" }}>
      <TablaSI titulos={titulos} children={busqueda}/>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Form style={{ width: "60%" }}>
          <Form.Group className="mb-3" controlId="Form.ControlJustifi">
            <Form.Label>Justificación</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </div>
      <BadgeInfe />
    </div>
  );
};

export default CrearSoli;
