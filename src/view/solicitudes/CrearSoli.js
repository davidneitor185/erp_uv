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
import { Link } from "react-router-dom";

function createRow(elemento,cantidad) {
  return { elemento,cantidad };
}

 const CrearSoli = () => {
 
  const { dispatch } = useContext(UserContext);
  const [justificacion, setJustificacion] = useState("");
  const [tiempo_e, setTiempo_e] = useState("");
  const [elementos, setElementos] = useState([]);
  const [elementoName, setElementoName] = useState("");
  const [cantidadElement, setCantidadElement] = useState("");
  
  
  const postSoli = async (body) => {
    try {
      //console.log(body);
      const response = await axios.post(url+"postsolicitud", body);
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const postElement = async (body) => {
    try {
      //console.log(body);
      const response = await axios.post(url+"postelement", body);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  const cargarSoli = async ()=>{
    let user = window.localStorage.getItem('user');
    let id_funcionario = JSON.parse(user).id_funcionario;
    let body = {
      "id_funcionario": id_funcionario,
      "justificacion": justificacion,
      "tiempo_e": tiempo_e,
      "estado": "Diligenciada"
    }
   
    let soli_id = await postSoli(body);
    let id_soli = soli_id.data[0].id_solicitud;
    elementos.map((ele)=>{
      let body2 = {
        "nombre": ele.elemento,
        "cantidad": ele.cantidad,
        "id_solicitud": id_soli
      }
      postElement(body2)
    })
    
    
    
  };

  const agregarelement = () =>{
    
    let row = createRow(elementoName,cantidadElement);
    setElementos([...elementos, row]);
    
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
                  <Link
                    className="btn btn-secondary" to={"/principal"}
                    style={{ backgroundColor: "#4a3187" }}
                    onClick={()=>cargarSoli()}
                  >
                    Guardar
                  </Link>
                </Col>
                <Col sm="1" className="button bton">
                  <Link className="btn btn-secondary" to={"/principal"}>Regresar</Link>
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
                          value={elementoName}
                          onChange={(e)=>setElementoName(e.target.value)}
                        />
                      </Col>
                      <Col sm="3">
                        <FormControl
                          placeholder="Cantidad"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          value={cantidadElement}
                          onChange={(e)=>setCantidadElement(e.target.value)}
                        />
                      </Col>
                      <Col sm="1">
                        <Button variant="secondary" style={{ width: 80 }} onClick={()=>agregarelement()}>
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
                      {elementos.map((dato, index) => {
                      
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{dato.elemento}</td>
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
