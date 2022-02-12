import React from "react";
import { useState } from "react";
import { TablaSI } from "../componentes/TablaSI";
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Row, Col } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


const VerDetalleCuentas = () =>{
        const [fullscreen, setFullscreen] = useState(true);
        const [show, setShow] = useState(false);
        const [item, setItem] = useState([
          //Aquí va algo
        ]);
    const tipo = "cuentaxpdetalle";

    const titulos = [
        "No.", "Item", "Cantidad", "Costo", "Costo Total"
    ];

    const items = [ ["177898", "31-01-2022", "$798.000", "Activo", "No Aplica"], 
    ["177899", "31-01-2022", "$60.000", "Activo", "No Aplica"], ["algo"], ["algo"], ["algo"]];
      
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
            <Modal
            show={show}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => setModal(false)}
            centered>
              <Modal.Header closeButton>
                <Modal.Title>Ver Detalles</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="tituloDetacxp">
                    <h3>Detalles de cuentas por pagar</h3>
                    </div>
              <div 
            style={{
            margin: "0%",
            padding: "1%",
            border: "0.5px solid black",
            borderRadius: "45px",
            height: "530px"
          }} > 
              <Form className="form rounded p-4 p-sm-3">
                        <Form.Group as={Row} className="mb-3" controlId="primera_linea" >
                          <Col>
                              <Form.Label>Orden de compra asociada</Form.Label>
                              <Form.Control placeholder="Orden Compra" name="orden" onChange={handleInputChange}/>
                          </Col>
                          <Col> 
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Control placeholder="Provedorcito" name="proveedor" onChange={handleInputChange}/>
                          </Col>
                          <Col>
                            <Form.Label>Fecha límite para pago</Form.Label>
                            <Form.Control placeholder="Ingrese la fecha" name="fecha" onChange={handleInputChange}/>
                          </Col>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "320px", maxHeight: "320px", marginTop:10 }}>
                        <TablaSI titulos={titulos} datos={items} tipo={tipo} />
                      </div>
                      <Col>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control placeholder="?" name="estado" onChange={handleInputChange} />
                      </Col>
                      <Col>
                        <Form.Label>Número recibo de pago</Form.Label>
                        <Form.Control placeholder="no." name="recibo" onChange={handleInputChange} />
                      </Col>
                        </Form.Group>
                  </Form>
              </div>
              </Modal.Body>
            </Modal>
          </>
        );
};
export default VerDetalleCuentas;