import React from "react";
import { useState } from "react";
import { TablaSI } from "../componentes/TablaSI";
import Modal from 'react-bootstrap/Modal'
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import "./ModuloCxP.css";

const PagarCuenta = (nombreC) =>{
        const [fullscreen, setFullscreen] = useState(true);
        const [show, setShow] = useState(false);
        const [info, setInfo] = useState({
          recibo: "",
          cuentas: 0,
          saldo: ""
        });

        const handleInputChange = (event) => {
          setInfo({
              ...info,
              [event.target.name]: event.target.value
          });
      };

        const setModal = (valor) => {
          setShow(valor);
        };
      
        return (
          <>
          <OverlayTrigger
              delay={{ hide: 450, show: 180 }}
              overlay={(props) => (
                  <Tooltip {...props}>
                      Pagar Cuenta
                  </Tooltip>
              )}
              placement="bottom"
      ><Button className="me-2" variant="outline-dark" size="sm" onClick={() => setModal(true)}>
        💲
       </Button></OverlayTrigger>
            <Modal
             show={show}
             backdrop="static"
             keyboard={false}
             size="lg"
             aria-labelledby="contained-modal-title-vcenter"
             onHide={() => setModal(false)}
             centered>
              <Modal.Header closeButton>
                <Modal.Title>Formato Para Realizar Pagos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div style={{
                display: "flex",
                flexDirection:"column",
                margin: "2%",
                padding: "2%",
                border: "0.5px solid black",
                
              }}>
                  <Form className="form rounded p-4 p-sm-3">
                    <div className="tituloModPagar">
                    <h3>Diligencie el formulario</h3>
                    </div>
                        <Form.Group as={Row} className="mb-3" controlId="recibo" >
                          <Col>
                              <Form.Label>Número recibo de pago</Form.Label>
                              <Form.Control placeholder="Ingresa el número" name="recibo" onChange={handleInputChange} disabled/>
                          </Col>
                          <Col>
                          <Form.Label>Cuentas de la empresa</Form.Label>
                            <Form.Select name="cuentas">
                              <option>Cuenta 1</option>
                              <option>Cuenta 2</option>
                              <option>Cuenta 3</option>
                            </Form.Select>
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="saldo" >
                          <Col>
                              <Form.Label>Saldo a pagar</Form.Label>
                              <Form.Control placeholder="$" name="saldo" onChange={handleInputChange}/>
                              <Form.Text className="text-muted">
                                Cuenta a pagar: "Ejemplo"
                              </Form.Text>
                          </Col>
                          <Col style={{ marginLeft:"50px"}}>
                            <Button variant="success" style={{ marginTop: "30px"}}>Realizar Pago</Button>
                            <Button variant="secondary" style={{ marginTop: "30px", marginLeft: "60px"}} onClick={() => setModal(false)}>Cancelar</Button>
                          </Col>
                        </Form.Group>
                  </Form>
              </div>
              </Modal.Body>
            </Modal>
          </>
        );
};
export default PagarCuenta;