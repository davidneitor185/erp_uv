import React from "react";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import BadgeInfe from "../componentes/BadgeInfe";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const AnularCuentas = () =>{
        const [fullscreen, setFullscreen] = useState(true);
        const [show, setShow] = useState(false);
      
        const setModal = (valor) => {
          setShow(valor);
        };
      
        return (
          <>
               <OverlayTrigger
                    delay={{ hide: 450, show: 180 }}
                    overlay={(props) => (
                        <Tooltip {...props}>
                            Anular Cuenta
                        </Tooltip>
                    )}
                    placement="bottom"
      ><Button className="me-2" variant="outline-dark" size="sm" onClick={() => setModal(true)}>
                ✖
              </Button></OverlayTrigger>
            <Modal show={show} fullscreen={fullscreen} onHide={() => setModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Anular Cuentas Por Pagar</Modal.Title>
              </Modal.Header>
              <Modal.Body>¡¡Funciona!!</Modal.Body>
            </Modal>
          </>
        );
};
export default AnularCuentas;
