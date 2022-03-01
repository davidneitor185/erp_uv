import React from "react";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notify } from "../componentes/notify/Notify";
import {AiFillDelete} from "react-icons/ai";

const AnularCuentas = (elemen) =>{
        const [show, setShow] = useState(false);
      
        const setModal = (valor) => {
          setShow(valor);
        };

        const putCtnxp = async() =>{
          const url = "http://localhost:5000";
          try {
            const response = await axios.put(url + `/cuentaxpagar/update/${elemen.id}`);
            const resp = response.data;
            if(resp !== undefined ){
              notify("Se ha anulado la cuenta exitosamente, por favor recargue la página", "", "info");
              
            }else {
              notify("Ha ocurrido un error, intente nuevamente", "", "error");
             
            }
          } catch (e) {
            console.log(e);
          }
        };

        const anular = () =>{
          const up = putCtnxp();
          
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
                <AiFillDelete />
              </Button></OverlayTrigger>
            <Modal 
            show={show}
            backdrop="static"
            keyboard={false}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={() => setModal(false)}
            centered>
              <Modal.Header closeButton>
                <Modal.Title>Pregunta De Seguridad</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div className="tituloDetacxp">
                    <h3>¿Está seguro que desea anular la cuenta número: {elemen.id} ?</h3>
                    </div>
              <div > 
              <Form className="form rounded p-4 p-sm-3">
                <ToastContainer />
                        <Form.Group as={Row} className="mb-3" controlId="primera_linea" >
                        <Col style={{ display:"flex" , justifyContent: "space-around"}}>
                            <Button  style={{ backgroundColor: "#9B51E0", borderColor: "#9B51E0" }} onClick = {() => anular()}>Anular</Button>
                            <Button variant="secondary" onClick={() => setModal(false)}>Cancelar</Button>
                          </Col>
                        </Form.Group>
                  </Form>
              </div>
              </Modal.Body>
            </Modal>
          </>
        );
};
export default AnularCuentas;
