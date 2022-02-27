import React from "react";
import { useState, useEffect } from "react";
import { TablaSI } from "../componentes/TablaSI";
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Row, Col } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import useAxios from "../../useAxios";

const VerDetalleCuentas = (info) =>{
        const [show, setShow] = useState(false);
        const [item, setItem] = useState([]);
        const [turn, setTurn] = useState([]);
    const tipo = "cuentaxpdetalle";

    const titulos = [
        "ID", "Item", "Cantidad", "Costo", "Costo Total"
    ];

    const full = useAxios(`/cuentaxpagarFull/${info.info}`);
    const todo = full.data;


    useEffect(()=>{
      let tempo = [];
      if(todo && turn === true){
        todo.map((td) =>{
          const costot = td.precio * td.cantidad;
          const body = [
            td.item,
            td.nombreitem,
            td.cantidad,
            td.precio,
            costot
          ];
            tempo.push(body);
        });
        setItem(tempo);
      }
    }, [todo, turn]);

        const setModal = (valor) => {
          setShow(valor);
          setTurn(valor);
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
                              <Form.Control value={todo[0] !== undefined ? todo[0].ordencompra : 0} name="orden" disabled={true}/>
                          </Col>
                          <Col> 
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Control value={todo[0] !== undefined ? todo[0].proveedor : 0} name="proveedor" disabled={true}/>
                          </Col>
                          <Col>
                            <Form.Label>Fecha límite para pago</Form.Label>
                            <Form.Control value={todo[0] !== undefined ? todo[0].tiempopago : 0} name="fecha" disabled={true}/>
                          </Col>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "320px", maxHeight: "320px", marginTop:10 }}>
                        <TablaSI titulos={titulos} datos={item} tipo={tipo} />
                      </div>
                      <Col>
                        <Form.Label>Estado</Form.Label>
                        <Form.Control value={info.estado} name="estado" disabled={true}/>
                      </Col>
                      <Col>
                        <Form.Label>Número recibo de pago</Form.Label>
                        <Form.Control value={info.recibo} name="recibo" disabled={true}/>
                      </Col>
                      <Col>
                        <Form.Label>Cobro total</Form.Label>
                        <Form.Control  name="cobroT" value={todo[0] !== undefined ? todo[0].cobroto : 0} disabled={true} />
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