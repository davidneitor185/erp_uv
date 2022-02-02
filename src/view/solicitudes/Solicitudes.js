import React, { useState } from "react";
import { TablaSI } from "../componentes/TablaSI";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
//import Paginas from "../componentes/Paginas";
import BadgeInfe from "../componentes/badgeinfe_compras/BadgeInfe";
import useAxios from "../../useAxios";
import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import { useEffect } from "react";

const Solicitudes = () => {
  const titulos = [
    "Id. Solicitud",
    "Solicitante",
    "Tiempo esperado",
    "Estado",
    "Opciones",
  ];
  const [datos, setDatos] = useState([]);
  const {data} = useAxios("/solicitudes");
  
  useEffect(() => {
    const datico = [];
    if(data){
        data.map((soli)=>{
        
        const solicitud=[];
        solicitud.push(soli.id_solicitud);
        solicitud.push(soli.nombre_funcionario);
        solicitud.push(soli.timepo_e);
        solicitud.push(soli.estado);
        datico.push(solicitud);
             
      })
      setDatos(datico);      
    }

    console.log(datos);   
  }, [data])
  

  return (
    <>
  
      <Navbar/>
  
    <div>
      
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <h3>Solicitudes Internas</h3>
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
    </>
  );
};

export default Solicitudes;
