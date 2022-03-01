import React, { useState } from "react";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import useAxios from "../../useAxios";
import { TablaSI } from "../componentes/TablaSI";
import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";

const CrearRol = () => {
  const titulos = ["Permiso", "Leer", "Escribir", "Actualizar", "Anular"];
  const [datos, setDatos] = useState([]);
  const { data } = useAxios("/solicitudes");
  const tipo = "solicitudes";
  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Crear Rol</h3>
      </div>
      <div>
        <Form.Group as={Row} style={{ justifyContent: "center" }}>
          <Col sm="2">
            <Form.Label>Nombre del rol</Form.Label>
            <Form.Control
              placeholder="Nombre del rol"
              name="nombreRol"
              disabled
            />
          </Col>
          <Col sm="2">
            <Form.Label>Descripción corta</Form.Label>
            <Form.Control
              placeholder="Descripción"
              name="descripcionRol"
              disabled
            />
          </Col>
        </Form.Group>
      </div>
      <div style={{ justifyContent: "center", margin: "0 250px" }}>
        <TablaSI titulos={titulos} datos={datos} tipo={tipo} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 0,
        }}
      >
        <div sm="1" style={{marginRight: 50}}>
          <Link className="btn btn-secondary" to={"/rolesperfiles/rol"}>
            Regresar
          </Link>
        </div>
        <div sm="1 ">
          <Button variant="secondary" style={{ backgroundColor: "purple" }}>
            Crear
          </Button>
        </div>
      </div>
    </>
  );
};

export default CrearRol;
