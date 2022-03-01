import React from "react";
import Navbar from "../Navbar";
import { Form, Row, Col, FormControl, Button, Table } from "react-bootstrap";
import { url } from "../../../db/variabledb";
import { Link } from "react-router-dom";
import axios from "axios";



function createRow(ordenC, itemId, itemNombre, cantidad, estado) {
    return { ordenC, itemId, itemNombre, cantidad, estado };
}

class CrearEntrada extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isDataLoaded: false, ordenC: "", items: [], selectedItem: "", cantidadRecibida: "", estado: "", rows: [], pull: false }
    }


    agregarItems() {
        let item = this.state.selectedItem.split(",");
        let row = createRow(this.state.ordenC,item[0], item[1], this.state.cantidadRecibida, this.state.estado);
        this.state.rows.push(row);
        console.log(this.state.rows);
        this.cambiapull();

    };

    cambiapull(){
        this.setState({pull: !this.state.pull})
        console.log(this.state.pull);
    }

    cargarOc() {
        fetch(url + "ordenes")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta)
                this.setState({ isDataLoaded: true, data: datosRespuesta })
            })
            .catch(console.log)
    }

    cargarArticulos() {
        fetch(url + "getitems")
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta)
                this.setState({ items: datosRespuesta })
            })
            .catch(console.log)
    }

    componentDidMount() {
        this.cargarOc();
        this.cargarArticulos();
    }

    async cargarEntrada() {
        let response = await axios.post(url+"postentrada", this.state.rows);
        
    }

    render() {
        const { isDataLoaded, data, items, rows } = this.state

        if (!isDataLoaded) {

            return (<div>Cargando...</div>);
        } else {
            return (<>

                <Navbar />

                <div>

                    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                        <h3>Crear entrada de articulos</h3>
                    </div>
                    <div>
                        <Form.Group as={Row} style={{ justifyContent: "center" }}>
                            <Col sm="3">
                                <Form.Label>Orden de Compra</Form.Label>
                                <Form.Select value={this.state.ordenC} onChange={(e) => this.setState({ ordenC: e.target.value })}>
                                    <option value={0}>
                                        Seleccione una OC...
                                    </option>
                                    {data.map((oc, index) => {
                                        return (
                                            <option key={index}  value={oc.id_orden_compra}>
                                                {oc.id_orden_compra + " : " + oc.proveedor}
                                            </option>
                                        );
                                    })}


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
                                        <Form.Select value={this.state.selectedItem} onChange={(e) => this.setState({ selectedItem: e.target.value })}>
                                            <option value={0}>
                                                Seleccione un Articulo...
                                            </option>
                                            {items.map((art, index) => {
                                                return (
                                                    <option key={index} value={[art.iditem, art.nombreitem]}>
                                                        {art.nombreitem}
                                                    </option>
                                                );
                                            })}


                                        </Form.Select>
                                    </Col>
                                    <Col sm="3">
                                        <Form.Label >Cantidad recibida</Form.Label>
                                        <FormControl type="number" value={this.state.cantidadRecibida} onChange={(e) => this.setState({ cantidadRecibida: e.target.value })} />
                                    </Col>
                                    <Col sm="2" >
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Select value={this.state.estado} onChange={(e) => this.setState({ estado: e.target.value })}>
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
                                        <Button style={{ backgroundColor: "#9B51E0", borderColor: "#9B51E0" }} onClick={() => this.agregarItems()}>Añadir</Button>
                                    </Col>

                                </Form.Group>
                            </Form>
                            <div style={{ borderRadius: 4, paddingTop: "3%" }}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Articulo</th>
                                            <th>Cantidad recibida</th>
                                            <th>Estado Articulo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.rows.map((dato, index) => {
                                        
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{dato.itemNombre}</td>
                                                <td>{dato.cantidad}</td>
                                                <td>{dato.estado}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </Table>
                                
                            </div>
                           
                        </div>
                        <div style={{display:"flex", justifyContent:"center"}}>
                        
                        <a className="button btn btn-primary" onClick={() => this.cargarEntrada()} href="http://localhost:3000/inventario">Guardar</a>
                        </div>
                    </div>

                </div>
            </>);
        }
    }
}

export default CrearEntrada;