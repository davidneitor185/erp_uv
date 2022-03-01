import React, { useState } from "react";
import Navbar from "../componentes/Navbar";
import { FormControl, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  TablePagination,
  TableRow,
  TableCell,
} from "../componentes/TablaPagination";
import useAxios from "../../useAxios";
import axios from "axios";
import { notify } from "../componentes/notify/Notify";
import { ToastContainer } from "react-toastify";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUserTimes, FaUserEdit } from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const RolesPerfiles = () => {
  const titulos = [
    "Identificación",
    "Nombre",
    "Teléfono",
    "Email",
    "Rol",
    "Opciones",
  ];
  /**/
  const { data: usuarios } = useAxios("/usuarios");

  const Denegar = async (id) => {
    const guardado = await axios.put(`http://localhost:5000/modificar_acceso/${id}`);
    if (guardado.status === 200) {
      notify("Acceso actualizado a Denegado", "", "info");
    } else {
      notify("Error al actualizar el acceso");
    }
  }

  return (
    <>
      <ToastContainer/>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3> Perfiles</h3>
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
            <Col sm="2" style={{ width: "5%", display: "flex" }}>
              <Link className="btn btn-secondary" to={`/rolesperfiles/crear`}>
                <BsFillPersonPlusFill style={{ fontSize: 25 }} />
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
          {usuarios &&
            usuarios.map((usuario) => {
              return (
                <TableRow>
                  <TableCell key={1}>{usuario.identificacion}</TableCell>
                  <TableCell key={2}>{usuario.nombre_funcionario}</TableCell>
                  <TableCell key={3}>{usuario.tel}</TableCell>
                  <TableCell key={4}>{usuario.email}</TableCell>
                  <TableCell key={5}>{usuario.nombre_rol}</TableCell>
                  <TableCell>
                    <OverlayTrigger
                      delay={{ hide: 450, show: 180 }}
                      overlay={(props) => (
                        <Tooltip {...props}>Denegar acceso</Tooltip>
                      )}
                      placement="bottom"
                    >
                      <Link to={""}>
                      <FaUserTimes
                      onClick={() => Denegar(usuario.id_cuenta)}
                      disabled= {usuario.acceso === 'Denegado'}
                        style={{
                          fontSize: 25,
                          color: "black",
                          marginRight: 10,
                        }}
                      />
                      </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                    delay={{ hide: 450, show: 180 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Modificar</Tooltip>
                    )}
                    placement="bottom"
                    >
                    <Link to={`/rolesperfiles/modificar/${usuario.id_funcionario}`}>
                      <FaUserEdit style={{ fontSize: 25, color: "black" }} />
                    </Link>
                    </OverlayTrigger>
                  </TableCell>
                </TableRow>
              );
            })}
        </TablePagination>
      </div>
      <footer>
        <div style={{ paddingLeft: 25 }}>
          <div>
            <Badge pill bg="primary">
              <Link to={""} className="link">
                1. Perfiles
              </Link>
            </Badge>{" "}
            <Badge pill bg="secondary">
              <Link to={"/rolesperfiles/rol"} className="link">
                2. Roles
              </Link>
            </Badge>{" "}
          </div>
        </div>
        ;
      </footer>
    </>
  );
};

export default RolesPerfiles;
