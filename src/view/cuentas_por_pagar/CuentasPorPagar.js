import React from "react";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
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
    ["177899", "31-01-20-22", "$60.000", "Activo", "No Aplica"]];

    const tipo = "cuentasxpagar";

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                <h3>Cuentas Por Pagar</h3>
            </div>
            <div>
                <Form>
                    <Form.Group as={Row} style={{ justifyContent: "center" }}>
                        <Col sm="3">
                            <FormControl
                                placeholder="🔍   Search..."
                                aria-label="Identificación"
                                aria-describedby="basic-addon1"
                            />
                        </Col>
                        <Col sm="1" style={{ width: "4%" }}>
                            <Button variant="secondary">🔍</Button>
                        </Col>
                        <Col sm="1">
                            <Link className="btn btn-secondary" to={"/cuentasporpagar/crearcuenta"}>➕</Link>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            <div style={{ justifyContent: "center", margin: "0 250px" }}>
                <TablaSI titulos={titulos} datos={datos} tipo={tipo} />
            </div>
            </div>
            );
};
export default CuentasPorPagar;