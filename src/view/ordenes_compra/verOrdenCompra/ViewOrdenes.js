import { useState } from "react";
//import React from "react";
//import { TablaSI } from "../componentes/TablaSI";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./ViewOrdenes.css";
import Table from 'react-bootstrap/Table'
import useAxios from "../../../useAxios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { url } from "../../../db/variabledb";

const ViewOrdenes = (props) => {

  const params = useParams();
  const orden = JSON.parse(params.id);
  const articulos = useAxios(`/orde_art/${orden.id_orden_compra}`);
  const [estado, setEstado] = useState(orden.est);
  const proveedor = orden.proveedor;
  const emailProv = orden.email;

  /* useEffect( () => {
    if(orden.data[0]!== undefined){
    let state = orden.data[0].estado;
    let prov =  orden.data[0].proveedor;
    let email= orden.data[0].email;

    setEstado(state);
    setProveedor(prov);
    setEmailProv(email);}
  }, [orden]); */

  const updateOc= () => {
      //console.log(orden);
      fetch(url + "orden_c/" + orden.id_orden_compra + "/" + estado, {
        method: "PUT",
        //body:JSON.stringify()
    })
};


  return (
    
    <>
        
      <div className="header">
        <h2 className="title" >Ver Orden de Compra</h2>
      </div>


      <div>
        <Form>
          <Form.Group
            as={Row}
            style={{ justifyContent: "center", marginTop: 40 }}
          >
            <Col sm="2">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control value={proveedor} disabled />
            </Col>
            <Col sm="2">
              <Form.Label>Email proveedor</Form.Label>
              <Form.Control value={emailProv} disabled />
            </Col>
            <Col sm="2" >
              <Form.Label>Estado</Form.Label>
              <Form.Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option>Diligenciada</option>
                <option>Aprobada</option>
                <option>Rechazada</option>
              </Form.Select>

            </Col>

          </Form.Group>
        </Form>
      </div>
      <div style={{ justifyContent: "center", margin: "0px 10%", paddingTop: "2%" }}>
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
                  <th>No.</th>
                  <th>Item</th>
                  <th>Tiempo llegada</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Totales</th>
                </tr>
              </thead>
              <tbody>
                {articulos.data.map((data, key) => {
                  let date = data.tiempo_llegada.split("T")[0];

                  return (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{data.nombre}</td>
                      <td>{date}</td>
                      <td>{data.cantidad}</td>
                      <td>{data.precio}</td>
                      <td>{data.cantidad * data.precio}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>


      <div className="buttons">
        <Link className="button btn btn-secondary" to={"/principal/ordenes_compra"}>
          Volver
        </Link>
        <Link className="button btn btn-primary" onClick={() => updateOc()} to={"/principal/ordenes_compra"} >
          Guardar
        </Link>
      </div>
    </>
  );
};

export default ViewOrdenes;