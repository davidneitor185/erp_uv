import React, { useState, useEffect } from "react";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import Navbar from "../componentes/Navbar";
import { Link } from "react-router-dom";
import { itemCargado } from "./validacionAxios";

class CuentasPorPagar extends React.Component {
    constructor(props) {
        super(props);
    }
    state = { 
        cuentasCargadas: false,
        recibosCargados: false,
        itemCargado: false,
        cuentas:[],
        recibos:[],
        item:[],
        inicio:"fine"
     }

    cargarDatos = async() =>{
        fetch("http://localhost:5000/cuentaxpagar/todo")
        .then(respuesta=>respuesta.json())
        .then((datosCuentas)=>{
            this.setState({ 
                cuentasCargadas:true,
                cuentas:datosCuentas
             })
             let rowsTemp = [];
            console.log("esto es datosCuentas", datosCuentas)
            const {item} = this.state
            datosCuentas.map((element) =>{
                if(element.idrecibo !== null){
                    const body = [
                        element.idcuentaxp,
                        element.tiempopago,
                        element.cobroto,
                        element.estado,
                        element.idrecibo
                       ];
                       rowsTemp.push(body);
                } else {
                    const body = [
                        element.idcuentaxp,
                        element.tiempopago,
                        element.cobroto,
                        element.estado,
                       "No aplica"
                        ]; 
                    rowsTemp.push(body);
                }
            })
            this.setState({ 
                item:rowsTemp,
                inicio:"end"
            })
        })
        .catch(console.log);
    }
        /*fetch("http://localhost:5000/recibos_pago/todos")
        .then(resp=>resp.json())
        .then((datosRecibos)=>{
            this.setState({
                recibosCargados:true,
                recibos:datosRecibos
            })
            const {cuentas, item, cuentasCargadas, recibosCargados, inicio} = this.state
            if(item.length === 0 && cuentasCargadas && recibosCargados){
                let rowsTemp = [];
                let x = 0;
                let y = 0;
                let bodyTemp = [];
                for(let i=0; i <cuentas.length; i++){
                    for(let o=0; o < datosRecibos.length; o++){
                        if(cuentas[i].idcuentaxp === datosRecibos[o].cuentaxp){
                           x = cuentas[i].idcuentaxp;
                            const body = [
                                 cuentas[i].idcuentaxp,
                                 cuentas[i].tiempopago,
                                 cuentas[i].cobroto,
                                 cuentas[i].estado,
                                 datosRecibos[o].idrecibo
                                ];
                               
                            rowsTemp.push(body);
                            
                        } else if(datosRecibos[o+1] !== undefined && 
                            datosRecibos[o].cuentaxp !== cuentas[i].idcuentaxp &&
                            datosRecibos[o+1].cuentaxp !== cuentas[i].idcuentaxp){
                            y = cuentas[i].idcuentaxp;
                            const body = [
                                cuentas[i].idcuentaxp,
                                cuentas[i].tiempopago,
                                cuentas[i].cobroto,
                                cuentas[i].estado,
                               "No aplica"
                                ]; 
                                if(cuentas[i+1] !== undefined && y !== cuentas[i+1].idcuentaxp){
                                    rowsTemp.push(body);
                                }
                           
                        } else if(datosRecibos[o-1] !== undefined && 
                            datosRecibos[o-1].cuentaxp !== cuentas[i].idcuentaxp){
                            y = cuentas[i].idcuentaxp;
                            const body = [
                                cuentas[i].idcuentaxp,
                                cuentas[i].tiempopago,
                                cuentas[i].cobroto,
                                cuentas[i].estado,
                               "No aplica"
                                ]; 
                                if(cuentas[i-1] !== undefined && y !== cuentas[i-1].idcuentaxp){
                                    rowsTemp.push(body);
                                } 
                                
                        }
                    };
                }*/
      

    componentDidMount(){
        this.cargarDatos();
    }

    render(){ 
        const { item, inicio} = this.state
        const roluser = JSON.parse(window.localStorage.getItem('user')).id_rol;
        const titulos = [
            "Identificación",
            "Fecha Límite",
            "Valor A Pagar",
            "Estado",
            "Recibo",
            "Opciones",
        ];
        const tipo = "cuentasxpagar"; 
      

        if(item !== undefined){  
            return ( 
                <div className="ppal-content" style={{ display: "flex", flexDirection: "column", alignItems:"center" }}>
                <Navbar/>
                <div style={{ marginTop: 40 }}>
                    <h3>Cuentas Por Pagar</h3>
                </div>
                <div style={{ alignItems: "center",width:"100%"}}>
                    <Form className="form rounded p-4 p-sm-3">
                        <Form.Group as={Row} style={{ justifyContent: "center", }}>
                            <Col sm="3">
                                <FormControl
                                    placeholder="🔍   Search..."
                                    aria-label="Identificación"
                                    aria-describedby="basic-addon1"
                                />
                            </Col>
                            <Col sm="1" style={{ width: "5%" }}>
                                <Button variant="secondary">🔍</Button>
                            </Col>
                            <Col sm="1">
                               { roluser === 5 && <Link className="btn btn-secondary" to={"/cuentasporpagar/crear"}>➕</Link>}
                            </Col>
                            <div style={{ display:"flex", justifyContent:"center", height: "290px" }}>
                                { inicio === "end" ? <TablaSI titulos={titulos} datos={item} tipo={tipo} /> :
                                <div>...cargando</div>}
                            </div>
                        </Form.Group>
                    </Form>
                </div>  
                </div>
             );
        }  
            
            
        }
    }
export default CuentasPorPagar;