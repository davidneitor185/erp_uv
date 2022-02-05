import React from "react";
import { useState } from "react";
import { TablaSI } from "../componentes/TablaSI";
import Modal from 'react-bootstrap/Modal';
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


const VerDetalleCuentas = () =>{
        const [fullscreen, setFullscreen] = useState(true);
        const [show, setShow] = useState(false);
        const [item, setItem] = useState([
          //Aquí va algo
        ]);

    const tipo = "algo";

    const titulos = [
        "Identificación",
        "Fecha Límite",
        "Valor A Pagar",
        "Estado",
        "Recibo",
        "Opciones",
    ];

    const datos = [["177898", "31-01-20-22", "$798.000", "Activo", "No Aplica"], 
    ["177899", "31-01-20-22", "$60.000", "Activo", "No Aplica"]];
      
        const setModal = (valor) => {
          setShow(valor);
        };

        const handleInputChange = (event) => {
          setItem({
              ...item,
              [event.target.name]: event.target.value
          });
      };
      
        return (
          <>
          <OverlayTrigger
                    delay={{ hide: 450, show: 180 }}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            Ver Detalle
                        </Tooltip>
                    )}
                    placement="bottom"
      ><Button className="me-2" variant="outline-dark" size="sm" onClick={() => setModal(true)}>
                🔍
              </Button></OverlayTrigger>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Detalles</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form className="form rounded p-4 p-sm-3">
                    <div className="tituloModPagar">
                    <h3>Detalles de las cuentas por pagar</h3>
                    </div>
                        <Form.Group as={Row} className="mb-3" controlId="primera_linea" >
                          <Col>
                              <Form.Label>Orden de compra asociada</Form.Label>
                              <Form.Select name="ordenA" >
                              <option>Orden 1</option>
                              <option>Orden 2</option>
                              <option>Orden 3</option>
                            </Form.Select>
                          </Col>
                          <Col>
                          <Form.Label>Proveedor</Form.Label>
                            <Form.Select name="proveedor">
                              <option>Proveedor 1</option>
                              <option>Proveedor 2</option>
                              <option>Proveedor 3</option>
                            </Form.Select>
                          </Col>
                          <Col>
                          <Form.Label>Fecha límite para realizar el pago</Form.Label>
                          <Form.Control placeholder="Ingrese la fecha" name="fecha" onChange={handleInputChange}/>
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
              <div style={{ justifyContent: "center", margin: "0 250px" }}>
                <TablaSI titulos={titulos} datos={item} tipo={tipo} />
              </div>
              </Modal.Body>
            </Modal>
          </>
        );
};
export default VerDetalleCuentas;