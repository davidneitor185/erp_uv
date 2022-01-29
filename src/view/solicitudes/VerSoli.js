import React from "react";
import Navbar from "../componentes/Navbar";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col, Dropdown } from "react-bootstrap";
import Paginas from "../componentes/Paginas";
import BadgeInfe from "../componentes/BadgeInfe";



const VerSoli = (data) => {
  const titulos = ["No.", "Item", "Cantidad"];
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Ver Solicitud Interna</h3>
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
              {/* <FormControl
                placeholder="Tiempo esperado           📅"
                aria-label="Username"
                aria-describedby="basic-addon1"
              /> */}
            </Col>
            <Col sm="2">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Estado solicitud
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Aprobada Jefe I.</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Blah 1</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Blah 2</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col sm="1">
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
      <BadgeInfe />
    </div>
  );
};

export default VerSoli;
