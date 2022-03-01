import React, { useState } from 'react'
import Navbar from "../componentes/Navbar";
import { FormControl, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  TablePagination,
  TableRow,
  TableCell,
} from "../componentes/TablaPagination";
import useAxios from "../../useAxios";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";


function RolesPerfiles_rol() {
    const titulos = [
        "No.",
        "Nombre",
        "Descripción",
        "Opciones",
      ];
      /**/
  const { data: roles } = useAxios("/roles");
  console.log(roles);
  return (
    <>
    <Navbar/>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Roles</h3>
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
            <Col sm="1" style={{ width: "4%", display: "flex"}}>
              <Button variant="secondary">🔍</Button>
            </Col>
            <Col sm="2" style={{ width: "5%", display: "flex"}}>
              <Link className="btn btn-secondary" to={"/rolesperfiles/rol/crear"}>➕</Link>
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
          {roles &&
            roles.map((rol) => {
              return (
                <TableRow>
                  <TableCell key={1}>{rol.id_rol}</TableCell>
                  <TableCell key={2}>{rol.nombre_rol}</TableCell>
                  <TableCell key={3}>{rol.descripcion}</TableCell>
                  <TableCell>
                    <OverlayTrigger
                      delay={{ hide: 450, show: 180 }}
                      overlay={(props) => (
                        <Tooltip {...props}>Eliminar</Tooltip>
                      )}
                      placement="bottom"
                    >
                      <FaTrashAlt
                        style={{
                          fontSize: 25,
                          color: "black",
                          marginRight: 10,
                        }}
                      />
                    </OverlayTrigger>
                    <OverlayTrigger
                    delay={{ hide: 450, show: 180 }}
                    overlay={(props) => (
                      <Tooltip {...props}>Modificar</Tooltip>
                    )}
                    placement="bottom"
                    >
                      <FaEdit style={{ fontSize: 25, color: "black" }} />
                    </OverlayTrigger>
                  </TableCell>
                </TableRow>
              );
            })}
        </TablePagination>
      </div>
      <footer>
  <div style={{paddingLeft:25}}>
      <div>
  <Badge pill bg="secondary" >
    <Link to={'/rolesperfiles'} className='link'>
  1. Perfiles
  </Link>
  </Badge>{' '}
  <Badge pill bg="primary">
  <Link to={''} className='link'>
    2. Roles
  </Link>
  </Badge>{' '}
</div>
  </div>;
  </footer>
        
      </>
  )
}

export default RolesPerfiles_rol