import React from "react";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import Navbar from "../componentes/Navbar";
import { Link } from "react-router-dom";

const CuentasPorPagar = () => {

    const titulos = [
        "Identificación",
        "Fecha Límite",
        "Valor A Pagar",
        "Estado",
        "Recibo",
        "Opciones",
    ];
    const datos = [["177898", "31-01-20-22", "$798.000", "Activo", "No Aplica"], 
    ["177899", "31-01-20-22", "$60.000", "Activo", "No Aplica"], [], [], [], [], []];

    const tipo = "cuentasxpagar";

    return (
        <div classname="ppal-content" style={{ display: "flex", flexDirection: "column", alignItems:"center" }}>
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
                            <Link className="btn btn-secondary" to={"/cuentasporpagar/crear"}>➕</Link>
                        </Col>
                    </Form.Group>
                </Form>
                <div style={{ margin: "0 210px" }}>
                <TablaSI titulos={titulos} datos={datos} tipo={tipo} />
              </div>
            </div>  
            </div>
            );
};
export default CuentasPorPagar;