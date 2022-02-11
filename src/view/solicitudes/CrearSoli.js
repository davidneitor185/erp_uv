import React from "react";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import BadgeInfe from "../componentes/badgeinfe_compras/BadgeInfe";
import "./crearSoli.css";
import Navbar from "../componentes/Navbar";
import { Table } from "react-bootstrap";
import UserContext from "../../User/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { url } from "../../db/variabledb";
import axios from "axios";


 const CrearSoli = () => {
 
  const { dispatch } = useContext(UserContext);
  const [justificacion, setJustificacion] = useState("");
  const [tiempo_e, setTiempo_e] = useState("");
  
  const postSoli = async (body) => {
    try {
      console.log(body);
      const response = await axios.post(url+"postsolicitud", body);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const cargarSoli = ()=>{
    let user = window.localStorage.getItem('user');
    let id_funcionario = JSON.parse(user).id_funcionario;
    let body = {
      "id_funcionario": id_funcionario,
      "justificacion": justificacion,
      "tiempo_e": tiempo_e,
      "estado": "Diligenciada"
    }
   
    postSoli(body);
    
    
  };
  
  
  return (
    <>

        <div>
          <Navbar />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <h3>Crear Solicitudes Internas</h3>
          </div>
          <div>
            <Form>
              <Form.Group
                as={Row}
                style={{ justifyContent: "center", marginTop: 40 }}
              >
                
                <Col sm="2">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Tiempo esperado</Form.Label>
                    <Form.Control type="date" placeholder="dd/mm/aaaa" value={tiempo_e} onChange={(e)=>setTiempo_e(e.target.value)}/>
                  </Form.Group>

                </Col>
                <Col sm="1" className="button bton" style={{ width: "10%" }}>
                  <Button
                    variant="secondary"
                    style={{ backgroundColor: "#4a3187" }}
                    onClick={()=>cargarSoli()}
                  >
                    Guardar
                  </Button>
                </Col>
                <Col sm="1" className="button bton">
                  <Button variant="secondary">Regresar</Button>
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ justifyContent: "center", marginBottom: 20 }}>
                    <Form.Group as={Row}>
                      <Col sm="5">
                        <FormControl
                          placeholder="Elemento"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </Col>
                      <Col sm="3">
                        <FormControl
                          placeholder="Cantidad"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </Col>
                      <Col sm="1">
                        <Button variant="secondary" style={{ width: 80 }}>
                          + Item
                        </Button>
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Numero</th>
                      <th>Elemento</th>
                      <th>Cantidad</th>
                    </tr>
                     {/* {elementos.map((dato, index) => {
                      let fecha = Date();

                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{dato.nombre}</td>
                          <td>{dato.cantidad}</td>
                        </tr>
                      );
                    })} */}
                  </thead>
                </Table>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form style={{ width: "60%" }}>
              <Form.Group className="mb-3" controlId="Form.ControlJustifi">
                <Form.Label>Justificación</Form.Label>
                <Form.Control as="textarea" rows={3} value={justificacion} onChange={(e)=>setJustificacion(e.target.value)}/>
              </Form.Group>
            </Form>
          </div>
          <BadgeInfe />
        </div>
      </>
  );
};

export default CrearSoli;
