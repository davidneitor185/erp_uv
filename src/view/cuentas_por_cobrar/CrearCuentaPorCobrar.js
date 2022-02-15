import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import useAxios from "../../useAxios";
import {
  TablePagination,
  TableRow,
  TableCell,
} from "../componentes/TablaPagination";
import { Link } from "react-router-dom";

const datotes = [
  ["lo", "que", "sea1"],
  ["lo", "que", "sea2"],
  ["lo", "que", "sea3"],
  ["lo", "que", "sea4"],
  ["lo", "que", "sea5"],
  ["lo", "que", "sea6"],
];

function CrearCuentaPorCobrar() {
  const titulos = ["Servicio prestado", "Encargado", "Tarifa"];
  const [datos, setDatos] = useState([]);
  const { data } = useAxios("/solicitudes");
  
  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Crear Cuenta Por Cobrar</h3>
      </div>
      <div>
        <Form.Group as={Row} style={{ justifyContent: "center" }}>
          <Col sm="2">
            <Form.Label>Orden de servicio</Form.Label>
            <Form.Select name="cuentas">
              <option>Servicio 1</option>
              <option>Servicio 2</option>
              <option>Servicio 3</option>
            </Form.Select>
          </Col>
          <Col sm="2">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control type="date" placeholder="dd/mm/aaaa" />
            </Form.Group>
          </Col>
        </Form.Group>
      </div>
      <div style={{ margin: "0 250px" }}>
        <TablePagination
          titulos={titulos}
          rowsPerPage={2}
          ornament={
            <Col sm="3" >
              <Form.Label>Total cuenta</Form.Label>
              <Form.Control
                placeholder="Total de la cuenta"
                name="totalC"
                disabled
              />
            </Col>
          }
        >
          {datotes &&
            datotes.map((row) => {
              return (
                <TableRow>
                  {row.map((datico, index) => {
                    return <TableCell key={index}>{datico}</TableCell>;
                  })}
                </TableRow>
              );
            })}
        </TablePagination>
        {/* <TablaSI titulos={titulos} datos={datos} tipo={tipo}>
          <Col sm="3" style={{ marginLeft: "600px" }} >
            <Form.Label>Total cuenta</Form.Label>
            <Form.Control
              placeholder="Total de la cuenta"
              name="totalC"
              disabled
            />
          </Col>
        </TablaSI> */}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Col sm="1">
          <Link className="btn btn-secondary" to={"/cuentasporcobrar"}>
            Regresar
          </Link>
        </Col>
      </div>
    </>
  );
}

export default CrearCuentaPorCobrar;
