import React, { useState }  from 'react'
import Navbar from "../componentes/Navbar";
import { FormControl, Button, Form, Row, Col, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TablaSI } from "../componentes/TablaSI";
import useAxios from "../../useAxios";
import {BsFillPersonPlusFill} from 'react-icons/bs'

const RolesPerfiles = () => {
    const titulos = [
        "Identificación",
        "Nombre",
        "Teléfono",
        "Email",
        "Rol",
        "Opciones",
      ];
      const [datos, setDatos] = useState([]);
      const {data} = useAxios("/solicitudes");
      const tipo = "solicitudes";
  return (
    <>
      <Navbar/>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Roles & Perfiles</h3>
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
              <Link className="btn btn-secondary" to={"/rolesperfiles/crear"}><BsFillPersonPlusFill style={{fontSize:25}}/></Link>
            </Col>
              </Form.Group>
          </Form>
      </div>
      <div style={{ justifyContent: "center", margin: "0 250px" }}>
        <TablaSI titulos={titulos} datos={datos} tipo={tipo}/>
      </div>
      <footer>
  <div style={{paddingLeft:25}}>
      <div>
  <Badge pill bg="primary" >
    <Link to={''} className='link'>
  1. Perfiles
  </Link>
  </Badge>{' '}
  <Badge pill bg="secondary">
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

export default RolesPerfiles