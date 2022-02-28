import React from "react";
import { useState } from "react";
import Navbar from "../componentes/Navbar";
import { Button, Form, Row, Col } from "react-bootstrap";
import useAxios from "../../useAxios";
import { ToastContainer } from "react-toastify";
import { notify } from "../componentes/notify/Notify";
import axios from "axios";

const DatosMaestros = () =>{
    const roluser = JSON.parse(window.localStorage.getItem('user')).id_rol;
    const [datos, setDatos] = useState({
        pagot:0,
        recp: 0,
        pagon: 0,
        dias: ""
    });

    const [errores, setErrores] = useState({
        pagot: false,
        recp: false,
        pagon: false,
        dias: false
    });

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
    };  

    const cc = useAxios(`/cuenta_contable/todos`);
    const cntac = cc.data;

    const putDm = async() =>{
        const url = "http://localhost:5000";
        const body = {
          pagot: datos.pagot,
          recepcionp: datos.recp,
          pagon: datos.pagon,
          vencimiento: datos.dias
        };
        try {
          const response = await axios.put(url + `/datosmaestros_put/`, body);
          const datos = response.data;
          if (datos !== "" && datos !== null){
            return true;
            } else {
              return false;
        }
        } catch (error) {
          console.error(error);
        }
    };

    const validaciones = () =>{
        if(datos.pagot === 0 && datos.recp === 0 && datos.pagon === 0
            && (datos.dias === "" || datos.dias === 0 || datos.dias < 0)){
                setErrores({
                    pagot: true,
                    recp: true,
                    pagon: true,
                    dias: true
                });
                return false;
            } else if(datos.pagot === 0){
                setErrores({
                    pagot: true
                });
                return false;
            } else if(datos.recp === 0){
                setErrores({
                    recp: true
                });
                return false;
            } else if(datos.pagon === 0){
                setErrores({
                    pagon: true
                });
                return false;
            } else if(datos.dias === 0 || datos.dias === "" || datos.dias < 0){
                setErrores({
                    dias: true
                });
                return false;
            } else {
                setErrores({
                    pagot: false,
                    recp: false,
                    pagon: false,
                    dias: false
                });
                return true;
            }
    };

    const guardar = () => {
        console.log(datos);
        const valida = validaciones();
        if(valida){
           console.log("BIEN");
           const dato = putDm();
           if(dato){
                notify("Se ha actualizado exitosamente", "", "info");
           }else{
                notify("Ha ocurrido un error, por favor recargue la página", "", "error");
           } 
        }else{
            console.log("MAL");
        }
    };

    return(
        <div style={{ 
        display: "flex",
        flexDirection:"column",
        alignItems:"center"}}>
           <Navbar/> 
        <div style={{
            display: "flex",
            flexDirection:"column",
            alignItems:"center",
            margin: "1%",
            border: "0.5px solid black",
            borderRadius: "45px",
            width: "90%"
          }}>
              <Form className="form rounded p-4 p-sm-3" style={{ display:"flex", flexDirection:"column", justifyContent:"center", width: "50%"}}>
              <ToastContainer/>
                <div className="tituloModPagar" style={{display:"flex", justifyContent:"center"}}>
                <h3>Administración De Los Datos Maestros</h3>
                </div>
                    <Form.Group className="mb-3" controlId="recibo" >
                      <Col style={{ padding:"1%"}}>
                      <Form.Label>Pagos a terceros</Form.Label>
                        <Form.Select name="pagot" onChange={handleInputChange} disabled={roluser !== 10 && true}>
                        <option value={0}>Cuentas</option>
                            {cntac.length !== 0 && cntac.map((elemento) => (
                                <option key={elemento.idcuentactle} value={elemento.idcuentactle}>{elemento.entidadbancaria + " : " + elemento.numerocuenta}</option>
                                
                            ))}
                        </Form.Select>
                        {errores && errores.pagot &&
                                <span className="span text-danger text-small d-block">
                                    Seleccione una cuenta contable
                                </span>}
                      </Col>
                      <Col style={{ padding:"1%"}}>
                      <Form.Label>Recepción de pagos</Form.Label>
                        <Form.Select name="recp" onChange={handleInputChange} disabled={roluser !== 10 && true}>
                        <option value={0}>Cuentas</option>
                            {cntac.length !== 0 && cntac.map((elemento) => (
                                <option key={elemento.idcuentactle} value={elemento.idcuentactle}>{elemento.entidadbancaria + " : " + elemento.numerocuenta}</option>
                                
                            ))}
                        </Form.Select>
                        {errores && errores.recp &&
                                <span className="span text-danger text-small d-block">
                                    Seleccione una cuenta contable.
                                </span>}
                      </Col>
                      <Col style={{ padding:"1%"}}>
                      <Form.Label>Pagos de nomina</Form.Label>
                        <Form.Select name="pagon" onChange={handleInputChange} disabled={roluser !== 10 && true}>
                        <option value={0}>Cuentas</option>
                            {cntac.length !== 0 && cntac.map((elemento) => (
                                <option key={elemento.idcuentactle} value={elemento.idcuentactle}>{elemento.entidadbancaria + " : " + elemento.numerocuenta}</option>
                                
                            ))}
                        </Form.Select>
                        {errores && errores.pagon &&
                                <span className="span text-danger text-small d-block">
                                    Seleccione una cuenta contable.
                                </span>}
                      </Col>
                      <Col style={{ padding:"1%"}}>
                          <Form.Label>Vencimiento cuentas por cobrar</Form.Label>
                          <Form.Control name="dias" onChange={handleInputChange} disabled={roluser !== 10 && true}/>
                          <Form.Text className="text-muted">
                            En días
                          </Form.Text>
                          {errores && errores.dias &&
                                datos.dias === "" ?
                                <span className="span text-danger text-small d-block">
                                    Campo obligatorio.
                                </span>
                                : errores && errores.dias && datos.dias <= 0 &&
                                <span className="span text-danger text-small d-block">
                                    Ingrese números mayores que cero.
                                </span>
                            }
                      </Col>
                    </Form.Group>
              </Form>
          </div>
              <Form >
              <Form.Group as={Row} className="mb-3" controlId="administra" >
                          <Col style={{ marginLeft:"50px"}}>
                           <Button variant="warning" style={{ marginTop: "30px"}} onClick = {() => guardar()} disabled={roluser !== 10 && true}>Guardar</Button>
                          </Col>
                        </Form.Group>
              </Form>
          </div>
    );
};
export default DatosMaestros;