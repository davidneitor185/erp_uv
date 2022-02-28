import React from "react";
import { useState, useEffect } from "react";
import { TablaSI } from "../componentes/TablaSI";
import Modal from 'react-bootstrap/Modal'
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import useAxios from "../../useAxios";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { notify } from "../componentes/notify/Notify";
import "./ModuloCxP.css";

const PagarCuenta = (datos) =>{
        const [show, setShow] = useState(false);
        const [recibito, setRecibito] = useState(0);
        const [errores, setErrores] = useState({
          select: false
        });
        
        let notificacion = 0;
      
        const rec = useAxios(`/recibos_pago/todos`);
        const recibos = rec.data;

        const cuentaco = useAxios(`/datosmaestros_join_terceros`);
        const cntac = cuentaco.data;       

        const [cuentac, setCuentac] = useState({
          cuentas: 0
        })

        const setModal = (valor) => {
          setShow(valor);
          if(valor){
            if(recibos.length !== 0){
              setRecibito(recibos[recibos.length-1].idrecibo + 1);
              setCuentac({cuentas:cntac[0].idcuentactle})
              console.log("cuenta_contable", cntac);
            }
          }
        };

        const handleInputChange = (event) => {
          setCuentac({
              [event.target.name]: event.target.value
          });
      };  

      const postRecibo = async () => {
        const body = {
          idrecibo: recibito,
          cuentaxp: datos.dato,
          valorpagado: datos.total,
          cuentacontable: cuentac.cuentas
        }
        const url = "http://localhost:5000";
        console.log("esto es recibo", body);
        try {
            const response = await axios.post(url + `/recibos_pago/nuevo`, body);
            const datos = response.data;
            
            if (datos.length === 0){
                return true;
                } else {
                  return false;
            }
        } catch (error) {
            console.error(error);
        }
      };

      const putCc = async () =>{
        const url = "http://localhost:5000";
        let monto = 0;
        console.log("esto es cntac[0]", cntac[0].idcuentactle)
          if(cntac[0].idcuentactle === cuentac.cuentas){
            monto = cntac[0].montototal
            const body = {
              idcuentactle: cuentac.cuentas,
              montototal: monto - datos.total
            };
            console.log("esto es cc", body);
            try {
              const response = await axios.put(url + `/cuenta_contable/modifica`, body);
              const datos = response.data;
              
              if (datos.length === 0){
                return true;
                } else {
                  return false;
              }
            } catch (error) {
              console.error(error);
            }
          }
        
      };

      const putCuentaxp = async() =>{
        const url = "http://localhost:5000";
        const body = {
          idcuentaxp: datos.dato,
          cobroto: 0
        };
        console.log("esto es cuentaxp", body);
        try {
          const response = await axios.put(url + `/cuentaxpagar/update`, body);
          const datos = response.data;
          
          if (datos.length === 0){
            return true;
            } else {
              return false;
            }
        } catch (error) {
          console.log(error);
        }
        
      };

      const guardar = () =>{
        console.log("esto es cuentac", cuentac)
        if(cntac[0].montototal > datos.total){
          setErrores({
            select: false
          });
          const cuenta_con = putCc();
          if (cuenta_con) {
            const recbo = postRecibo();
            if (recbo) {
              const cero = putCuentaxp();
              if (cero) {
                notify("Se ha realizado el pago exitosamente", "", "info");
              } else {
                notify("Ha ocurrido un error, por favor recargue la página", "", "error");
                console.log("Error en putcuentaxp");
              }

            } else {
              notify("Ha ocurrido un error, por favor recargue la página", "", "error");
              console.log("error en recibo")
            }
          } else {
            notify("Ha ocurrido un error, por favor recargue la página", "", "error");
            console.log("error en cuentacontable")
          }
        } else if (cntac[0].montototal < datos.total) {
          setErrores({
            select: true
          });
        }
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
                  <ToastContainer />
                    <div className="tituloModPagar">
                    <h3>Sistema Para Pagos En Línea</h3>
                    </div>
                        <Form.Group as={Row} className="mb-3" controlId="recibo" >
                          <Col>
                              <Form.Label>Número recibo de pago</Form.Label>
                              <Form.Control value={recibito} name="recibo" disabled/>
                          </Col>
                          <Col>
                          <Form.Label>Cuentas de la empresa</Form.Label>
                            <Form.Select name="cuentas" onChange={handleInputChange} disabled>
                            {cntac.length !== 0 && cntac.map((elemento) => (
                                    <option key={elemento.idcuentactle} value={elemento.idcuentactle}>{elemento.entidadbancaria + " : " + elemento.numerocuenta}</option>
                                ))}
                            </Form.Select>
                            {errores && errores.select &&
                                <span className="span text-danger text-small d-block">
                                    No existen fondos suficientes
                            </span>}
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="saldo" >
                          <Col>
                              <Form.Label>Saldo a pagar</Form.Label>
                              <Form.Control value={datos.total} name="saldo" disabled={true}/>
                              <Form.Text className="text-muted">
                                N° cuenta a pagar: {datos.dato}
                              </Form.Text>
                          </Col>
                          <Col style={{ marginLeft:"50px"}}>
                            <Button variant="success" style={{ marginTop: "30px"}} onClick = {() => guardar()}>Realizar Pago</Button>
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