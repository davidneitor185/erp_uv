import { useState } from "react";
import React from "react";
import { TablaSI } from "../componentes/TablaSI";
import { TablaCOC } from "../componentes/TablaCOC";
import { FormControl, Button, Form, Row, Col, Dropdown, Modal } from "react-bootstrap";
import crearSoli from "./crearSoli.css";
import {BiSearchAlt2, BiFolderPlus} from "react-icons/bi";

const ModalVerSoli = ({data_solicitud}) => {
  const [showPanel1, setShowPanel1] = useState(false);
  const [showPanel2, setShowPanel2] = useState(false);
  const titulos1 = ["No.", "Item", "Cantidad"];
  const titulos2 = ["Id Orden", "Jefe Compra", "Aprob Gerente", "Id. Solicitud", "Total"];

  const handleClose1 = () => setShowPanel1(false);
  const handleShow1 = () => setShowPanel1(true);
  const handleClose2 = () => setShowPanel2(false);
  const handleShow2 = () => setShowPanel2(true);

  return (
    <>
      <Button variant="secondary" onClick={handleShow1}>
        <BiSearchAlt2 />
      </Button>
      <Button variant="secondary" onClick={handleShow2}>
        <BiFolderPlus />
      </Button>
      {console.log(data_solicitud)}


      

      <Modal show={showPanel2} onHide={handleClose2} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Ordenes de Compra</Modal.Title>
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
              <TablaCOC titulos={titulos2} ref={data_solicitud}/>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalVerSoli;
