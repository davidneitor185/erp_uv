import React from "react";
import Navbar from "../Navbar";
import "./cuentasContables.css";
import { Form, Col, Row, Button, FormControl, Table } from "react-bootstrap";
import { url } from "../../../db/variabledb";
import axios from "axios";


class CuentasContables extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isDataLoaded: false, noCuenta: "", entidadBancaria: "", fechaVencimiento: "", tipo: "", total: "" }
    }
    cargarCuentas() {
        fetch(url + "cuenta_cont")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                console.log(datosRespuesta)
                this.setState({ isDataLoaded: true, data: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarCuentas();
    }

    async postCuenta() {
        let body = {
            "entidadbancaria": this.state.entidadBancaria,
            "numerocuenta": this.state.noCuenta,
            "fechavencimiento": this.state.fechaVencimiento,
            "montototal": this.state.total,
            "tipo_cuenta": this.state.tipo
        }
        try {
            const response = await axios.post(url + "crear_cuenta", body);
            return response;
        } catch (error) {
            console.error(error);
            return false;
        }

        
    }

    limpiarcampos(){
        this.setState({noCuenta: "", entidadBancaria: "", fechaVencimiento: "", tipo: "", total: "" })
    }

    render() {
        const { isDataLoaded, data } = this.state

        if (!isDataLoaded) {

            return (<div>Cargando...</div>);
        } else {
            return (<>
                <Navbar />
                <div className="container">
                    <h3 className="titulo">Cuentas Contables</h3>
                </div>
                <div className="barrasuperior">
                    <Form>
                        <Form.Group as={Row} style={{ justifyContent: "center" }}>
                            <Col sm="2">
                                <Form.Label>No. Cuenta</Form.Label>
                                <Form.Control type="number" value={this.state.noCuenta} onChange={(e) => this.setState({ noCuenta: e.target.value })} />
                            </Col>
                            <Col sm="2">
                                <Form.Label>Entidad Bancaria</Form.Label>
                                <Form.Control type="text" value={this.state.entidadBancaria} onChange={(e) => this.setState({ entidadBancaria: e.target.value })} />
                            </Col>
                            <Col sm="2">
                                <Form.Label>Fecha de Vencimiento</Form.Label>
                                <Form.Control type="date" value={this.state.fechaVencimiento} onChange={(e) => this.setState({ fechaVencimiento: e.target.value })} />
                            </Col>
                            <Col sm="2">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Select value={this.state.tipo} onChange={(e) => this.setState({ tipo: e.target.value })} >
                                    <option>Seleccionar...</option>
                                    <option>Debito</option>
                                    <option>Credito</option>

                                </Form.Select>

                            </Col>
                            <Col sm="2">
                                <Form.Label>Total</Form.Label>
                                <Form.Control type="number" value={this.state.total} onChange={(e) => this.setState({ total: e.target.value })} />
                            </Col>

                            <Col sm="1" style={{ marginTop: "2.2%" }} >
                                <Button style={{ backgroundColor: "#9B51E0", borderColor: "#9B51E0" }} onClick={()=> {
                                    this.postCuenta()
                                    this.cargarCuentas()
                                    console.log(this.data)
                                    this.limpiarcampos()}}>Añadir</Button>
                            </Col>

                        </Form.Group>
                    </Form>
                    <div style={{ justifyContent: "center", margin: "0" }}>
                        <div
                            style={{
                                margin: "5%",
                                padding: "5%",
                                border: "0.5px solid black",
                                borderRadius: "45px",
                            }}
                        >
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>No. Cuenta</th>
                                            <th>Entidad Bancaria</th>
                                            <th>Fecha Caducidad</th>
                                            <th>Tipo</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    {data.map((dato, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{dato.numerocuenta}</td>
                                                <td>{dato.entidadbancaria}</td>
                                                <td>{dato.fechavencimiento}</td>
                                                <td>{dato.tipo_cuenta}</td>
                                                <td>{dato.montototal}</td>
                                            </tr>)
                                    })}
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>


            </>);
        }
    }
}

export default CuentasContables;