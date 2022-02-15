import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TablaSI } from "../componentes/TablaSI";
import useAxios from "../../useAxios";

const CuentasPorCobrar = () => {
  const titulos = [
    "Identificación",
    "Fecha límite",
    "Valor a Pagar",
    "Estado",
    "Recibo",
    "Opciones",
  ];
  const [datos, setDatos] = useState([]);
  const { data } = useAxios("/solicitudes");
  const tipo = "solicitudes";

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Cuentas Por Cobrar</h3>
      </div>
      <div>
        <Form>
          <Form.Group as={Row} style={{ justifyContent: "center" }}>
            <Col sm="3">
              <FormControl
                placeholder="   Search..."
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </Col>
            <Col sm="1" style={{ width: "4%", display: "flex" }}>
              <Button variant="secondary">🔍</Button>
            </Col>
            <Col sm="1">
              <Link
                className="btn btn-secondary"
                to={"/cuentasporcobrar/crear"}
              >
                Crear
              </Link>
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div style={{ justifyContent: "center", margin: "0 250px" }}>
        <TablaSI titulos={titulos} datos={datos} tipo={tipo} />
      </div>
    </>
  );
};

export default CuentasPorCobrar;
