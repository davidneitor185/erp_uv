import { useState } from "react";
//import React from "react";
//import { TablaSI } from "../componentes/TablaSI";
import {  Button, Form, Row, Col, Modal } from "react-bootstrap";
import "./ViewOrdenes.css";
import Table from 'react-bootstrap/Table'
import useAxios from "../../../useAxios";



const ViewOrdenes = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const elementos = useAxios(`/orde_art/${props.data.id_orden_compra}`);

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        🔍 buscar
      </Button>
      
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Ver Orden de Compra</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>

            <div>
              <Form>
                <Form.Group as={Row} style={{ justifyContent: "center", marginTop: 40 }}>
                  <Col sm="2" className="button">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select >
                      <option>Diligenciada</option>
                      <option>Aprobada</option>
                      <option>Rechazada</option>
                    </Form.Select>
                    
                  </Col>
                </Form.Group>
              </Form>
            </div>
            <div style={{ justifyContent: "center", margin: "0 250px", paddingTop: "4%" }}>
                <div className='block_border'>
                    <Table striped hover class="table table-striped">
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Item</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Totales</th>
                        </tr>
                        </thead>
                        <tbody>
                        {elementos.data.map((data, key) => {
                            return(
                            <tr key={key}>
                                <td>{data.id_orden_a}</td>
                                <td>{data.nombre}</td>
                                <td>{data.cantidad}</td>
                                <td>{data.precio}</td>
                                <td>{data.cantidad * data.precio}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </div>
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

export default ViewOrdenes;