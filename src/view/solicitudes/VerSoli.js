import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./versoli.css";
import Navbar from "../componentes/Navbar";
import { Link } from "react-router-dom";
import { url } from "../../db/variabledb";
import { Table } from "react-bootstrap";
import { render } from "@testing-library/react";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { useNavigate } from "react-router-dom";



class VerSoliClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { solicitud: [], isDataLoaded: false, elementos: [], estado: "", tiempo_e: "", justif: ""}
    }

    updateSoli(){
        fetch(url + "updatesolicitud/" + this.props.id + "/"+this.state.estado,{
            method:"PUT",
            //body:JSON.stringify()
        })  .then(respuesta => respuesta.json())         
            .then((response) => {
                console.log(response)
                
            })
            .catch(console.log)
    }

    cargarSolicitudes() {
        fetch(url + "solicitud/" + this.props.id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta)
                //console.log(this.props)
                this.setState({ solicitud: datosRespuesta, estado: datosRespuesta[0].estado, tiempo_e: datosRespuesta[0].tiempo_e.split("T")[0], justif: datosRespuesta[0].justificacion })
            })
            .catch(console.log)
        fetch(url + "elemento/" + this.props.id)
            .then(respuesta => respuesta.json())
            .then((datosRespuesta) => {
                //console.log(datosRespuesta)
                //console.log(this.props)
                this.setState({ elementos: datosRespuesta, isDataLoaded: true })
            })
            .catch(console.log)

    }

    componentDidMount() {
        this.cargarSolicitudes();
    }

    render() {
        const { isDataLoaded, justif, estado, elementos, tiempo_e } = this.state
        if (!isDataLoaded) {

            return (<div>Cargando...</div>);
        } else {

            return (
                <>
                    <Navbar />
                    <h2 className="tittle">Ver Solicitud Interna</h2>

                    <div>

                        <div>
                            <Form>
                                <Form.Group
                                    as={Row}
                                    style={{ justifyContent: "center", marginTop: 40 }}
                                >
                                    <Col sm="2">
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Tiempo esperado</Form.Label>
                                            <Form.Control type="date" readOnly value={tiempo_e} />
                                        </Form.Group>
                                        {/* <FormControl
              placeholder="Tiempo esperado           📅"
              aria-label="Username"
              aria-describedby="basic-addon1"
            /> */}
                                    </Col>
                                    <Col sm="2" >
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Select value={estado} onChange={(e) => this.setState({ estado: e.target.value })}>
                                            <option>Diligenciada</option>
                                            <option>Aprobada Jefe I.</option>
                                            <option>Rechazada Jefe I.</option>
                                            <option>Aprobada Gerente Gral.</option>
                                            <option>Rechazada Gerente Gral.</option>
                                        </Form.Select>

                                    </Col>

                                </Form.Group>
                            </Form>
                        </div>
                        <div style={{ justifyContent: "center", margin: "0 250px" }}>
                            <div
                                style={{
                                    margin: "1%",
                                    padding: "5%",
                                    border: "0.5px solid black",
                                    borderRadius: "45px",
                                }}
                            >
                                <div style={{ borderRadius: 4 }}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Numero</th>
                                                <th>Elemento</th>
                                                <th>Cantidad</th>
                                            </tr>
                                            {elementos.map((dato, index) => {
                                                let fecha = Date();

                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{dato.nombre}</td>
                                                        <td>{dato.cantidad}</td>
                                                    </tr>
                                                );
                                            })}
                                        </thead>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Form style={{ width: "60%" }}>
                                <Form.Group className="mb-3" controlId="Form.ControlJustifi">
                                    <Form.Label>Justificación</Form.Label>
                                    <Form.Control as="textarea" rows={3} readOnly value={justif} />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>

                    <div className="buttons">
                        <Link className="button btn btn-secondary" to={"/principal"}>
                            Volver
                        </Link>
                        <Button variant="primary" className="button" onClick={()=> this.updateSoli()} >
                            Guardar
                        </Button>
                    </div>

                </>
            );
        }
    }
}

export default VerSoliClass;
