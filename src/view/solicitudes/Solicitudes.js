import React from "react";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
//import Paginas from "../componentes/Paginas";
import BadgeInfe from "../componentes/BadgeInfe";
import useAxios from "../../useAxios";
import { Link } from "react-router-dom";

const Solicitudes = () => {
  const titulos = [
    "Id. Solicitud",
    "Solicitante",
    "Numero Items",
    "Tiempo esperado",
    "Estado",
    "Opciones",
  ];
  const datos = [["1", "marbelle","5","05/02/2022","radicado"],[]];
  const solicitudes = useAxios("/solicitudes");
  const data = () =>{
    solicitudes.map((soli)=>{
      console.log(soli);
    })
  }


  return (
    <div>
      
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Solicitudes Internas</h3>
      </div>
      <div>
        <Form>
          <Form.Group as={Row} style={{ justifyContent: "center" }}>
            <Col sm="3">
              <FormControl
                placeholder="🔍   Search..."
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </Col>
            <Col sm="1" style={{ width: "4%" }}>
              <Button variant="secondary">🔍</Button>
            </Col>
            <Col sm="1">
              <Link className="btn btn-secondary" to={"/principal/crearsolicitud"}>➕</Link>
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div style={{ justifyContent: "center", margin: "0 250px" }}>
        <TablaSI titulos={titulos} datos={datos}/>
      </div>
      <BadgeInfe />
    </div>
  );
};

export default Solicitudes;
