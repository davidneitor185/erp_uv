import React from "react";
import Navbar from "../componentes/Navbar";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
//import Paginas from "../componentes/Paginas";
import BadgeInfe from "../componentes/BadgeInfe";
import { useNavigate } from "react-router-dom";
import useAxios from "../../useAxios";

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

  const history = useNavigate();

  const crearSoli = () =>{
    history("/principal/crearsolicitud");
    console.log(solicitudes);
  }

  return (
    <div>
      <Navbar />
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
              <Button variant="secondary" onClick={() => crearSoli()}>➕</Button>
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
