import React from "react";
import { useState } from "react";
import { TablaSI } from "../componentes/TablaSI";
import Modal from 'react-bootstrap/Modal'
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import BadgeInfe from "../componentes/BadgeInfe";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


const VerDetalleCuentas = () =>{
        const [fullscreen, setFullscreen] = useState(true);
        const [show, setShow] = useState(false);
        const [info, setInfo] = useState([
          //Aquí va algo
        ]);
      
        const setModal = (valor) => {
          setShow(valor);
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
                <Modal.Title>Detalle Cuentas Por Pagar</Modal.Title>
              </Modal.Header>
              <Modal.Body>¡¡Funciona!!</Modal.Body>
            </Modal>
          </>
        );
};
export default VerDetalleCuentas;