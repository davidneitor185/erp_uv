import { useState } from "react";
import React from "react";
import { TablaSI } from "../componentes/TablaSI";
import { TablaCOC } from "../componentes/TablaCOC";
import { FormControl, Button, Form, Row, Col, Dropdown, Modal } from "react-bootstrap";
import crearSoli from "./crearSoli.css";
import { BiSearchAlt2, BiFolderPlus } from "react-icons/bi";

const ModalCrearOC = ({ data_solicitud }) => {
    const [showPanel, setShowPanel] = useState(false);
    const titulos = ["Id Orden", "Jefe Compra", "Aprob Gerente", "Id. Solicitud", "Total"];

    const handleClose = () => setShowPanel(false);
    const handleShow = () => setShowPanel(true);

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                <BiFolderPlus />
            </Button>{' '}

            <Modal show={showPanel} onHide={handleClose} fullscreen={true}>
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
                            {/* <TablaCOC titulos={titulos} ref={data_solicitud}/> */}

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

export default ModalCrearOC;