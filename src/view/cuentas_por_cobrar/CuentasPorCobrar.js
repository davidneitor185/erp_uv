import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAxios from "../../useAxios";
import {
  TablePagination,
  TableRow,
  TableCell,
} from "../componentes/TablaPagination";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FaWindowClose, FaSearch } from "react-icons/fa";

const CuentasPorCobrar = () => {
  const titulos = [
    "Identificación",
    "Fecha límite",
    "Valor a Pagar",
    "Estado",
    "Recibo",
    "Opciones",
  ];

  const formatDate = (date)=>{
    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
     return formatted_date;
    }

  const { data: cuentascobrar } = useAxios("/cuentasxcobrar");
  console.log(cuentascobrar);
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
                ➕
              </Link>
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div style={{ justifyContent: "center", margin: "0 250px" }}>
      <TablePagination
          titulos={titulos}
          /*CUANTOS POR PAG*/
          rowsPerPage={5}
        >
          {cuentascobrar &&
            cuentascobrar.map((cuentita) => {
              return (
                <TableRow>
                  <TableCell key={1}>{cuentita.id_cuentaxc}</TableCell>
                  <TableCell key={2}>{formatDate(new Date(cuentita.fecha_limite))}</TableCell>
                  <TableCell key={3}>$ {cuentita.costototal}</TableCell>
                  <TableCell key={4}>{cuentita.estado_cxc}</TableCell>
                  <TableCell key={5}>{cuentita.recibo}</TableCell>
                  <TableCell>
                    <OverlayTrigger
                      delay={{ hide: 450, show: 180 }}
                      overlay={(props) => (
                        <Tooltip {...props}>Anular</Tooltip>
                      )}
                      placement="bottom"
                    ><Link to={"..."}>
                      <FaWindowClose
                        style={{
                          fontSize: 25,
                          color: "black",
                          marginRight: 10,
                        }}
                      /></Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                    delay={{ hide: 450, show: 180 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Ver Detalles</Tooltip>
                    )}
                    placement="bottom"
                    >
                    <Link to={`/cuentasporcobrar/detalles/${cuentita.id_cuentaxc}`}>
                      <FaSearch style={{ fontSize: 25, color: "black" }} />
                    </Link>
                    </OverlayTrigger>
                  </TableCell>
                </TableRow>
              );
            })}
        </TablePagination>
      </div>
    </>
  );
};

export default CuentasPorCobrar;
