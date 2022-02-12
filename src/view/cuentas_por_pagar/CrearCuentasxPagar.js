import React from "react";
import { useState } from "react";
import { TablaSI } from "../componentes/TablaSI";
import Navbar from "../componentes/Navbar";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CrearCuentasxPagar = () => {
    const [datos, setDatos] = useState({
        nombre: "", 
        cantidad: "",
        costo:"",
        costoT:"", 
        orden: "",
        proveedor: "",
    });
    

    const titulos = [
     "Item", "Cantidad", "Costo", "Costo Total"
    ];

    //Debo de traerlos según la orden de compra
    const data = [[ "Jabón avon", "12", "2300", "27600"], [ "Hornomicroondas", "1", "500000", "500000"],
    ["Escritorio", "50", "150000", "7500000"], ["algo"], ["algo"], ["algo"]];

    const tipo = "cuentaxpdetalle";

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className="contePpal" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Navbar />
            <div style={{ marginTop: 20 }}>
                <h3>Registrar nueva cuenta</h3>
            </div>
            <div style={{
                 alignItems: "center",
                  width: "80%",
                  margin: "1%",
                  padding: "1%",
                  border: "0.5px solid black",
                  borderRadius: "45px" }}>
                <Form className="form rounded p-4 p-sm-3">
                    <Form.Group as={Row} className="mb-3" controlId="primera_linea" >
                        <Col className="mb-3">
                            <Form.Label>Orden de compra asociada</Form.Label>
                            <Form.Select name="orden" onChange={handleInputChange} >
                                <option>Selecciona una</option>
                                <option>Orden 1</option>
                                <option>Orden 2</option>
                                <option>Orden 3</option>
                            </Form.Select>
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Select name="proveedor" onChange={handleInputChange} >
                                <option>Selecciona uno</option>
                                <option>Proveedor 1</option>
                                <option>Proveedor 2</option>
                                <option>Proveedor 3</option>
                            </Form.Select>
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Fecha límite para pago</Form.Label>
                            <Form.Control placeholder="Ingrese la fecha" name="fecha" onChange={handleInputChange} />
                        </Col>
                        <div style={{ display:"flex", justifyContent:"center", height: "290px" }}>
                            <TablaSI titulos={titulos} datos={data} tipo={tipo} />
                        </div>
                        <Col className="mb-3">
                                <Form.Label>Cobro Total</Form.Label>
                                <Form.Control value="mucho dinero" name="fecha" disabled/>
                        </Col>
                        <Col className="mb-3">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control value="Activo" name="fecha" disabled/>
                        </Col>
                        <Col className="mb-3">
                            <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", width:"250px", margin: "32px 45px 0"}}>
                                <Button type="btn" variant="warning">Guardar</Button>
                                <Link className="btn btn-secondary" to={"/cuentasporpagar"}>Regresar</Link>
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
                
            </div>
        </div>
    );
};

export default CrearCuentasxPagar;