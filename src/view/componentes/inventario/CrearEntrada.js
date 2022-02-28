import React from "react";
import Navbar from "../Navbar";
import { Form, Row, Col, FormControl, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

class CrearEntrada extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        return (<>

            <Navbar />

            <div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                    <h3>Crear entrada de articulos</h3>
                </div>
                <div>
                    <Form.Group as={Row} style={{ justifyContent: "center" }}>
                        <Col sm="3">
                            <Form.Label>Proveedor</Form.Label>
                            <Form.Select >
                                <option value={0}>
                                    Seleccione un proveedor...
                                </option>
                                {/* {proveedores.data.map((prov)=>{
                    return(
                      <option value={prov.id_proveedor}>
                        {prov.proveedor}
                      </option>
                    );
                  })} */}


                            </Form.Select>
                        </Col>
                    </Form.Group>


                </div>
                <div style={{ justifyContent: "center", margin: "0" }}>
                    <div
                        style={{
                            margin: "2% 5%",
                            padding: "1.5% 5% 5% 5%",
                            border: "0.5px solid black",
                            borderRadius: "45px",
                        }}
                    >
                        <Form>
                            <Form.Group as={Row} style={{ justifyContent: "space-around" }}>
                                <Col sm="3">
                                    <Form.Label>Articulo</Form.Label>
                                    <FormControl type="text" />
                                </Col>
                                <Col sm="3">
                                    <Form.Label>Cantidad recibida</Form.Label>
                                    <FormControl type="number" />
                                </Col>
                                <Col sm="3">
                                    <Form.Label>Precio Unitario</Form.Label>
                                    <FormControl type="number" />
                                </Col>
                                <Col sm="2" >
                                <Form.Label>Estado</Form.Label>
                                <Form.Select >
                                <option>
                                    Seleccione un Estado...
                                </option>
                                <option>
                                    Buen Estado
                                </option>
                                <option>
                                    Mal Estado
                                </option>
                                </Form.Select>
                                </Col>
                                <Col sm="1" style={{ marginTop: "2.7%" }} >
                                    <Button style={{ backgroundColor: "#9B51E0", borderColor: "#9B51E0" }}>Añadir</Button>
                                </Col>

                            </Form.Group>
                        </Form>
                        <div style={{ borderRadius: 4, paddingTop: "3%"}}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Articulo</th>
                                        <th>Cantidad recibida</th>
                                        <th>Estado Articulo</th>
                                    </tr>

                                </thead>
                            </Table>
                        </div>
                    </div>
                </div>

            </div>
        </>);
    }
}

export default CrearEntrada;