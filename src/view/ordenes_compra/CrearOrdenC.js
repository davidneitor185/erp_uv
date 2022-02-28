import React from "react";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import BadgeInfe from "../componentes/badgeinfe_compras/BadgeInfe";
import "./crearOrdenC.css";
import Navbar from "../componentes/Navbar";
import { Table } from "react-bootstrap";
import UserContext from "../../User/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { url } from "../../db/variabledb";
import axios from "axios";
import useAxios from "../../useAxios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function createRow(id_articulo, articulo, cantidad,precio,total) {
  return { id_articulo, articulo, cantidad,precio,total };
}

const CrearOrdenC = () => {
  const props = useParams();
  const { dispatch } = useContext(UserContext);
  const [justificacion, setJustificacion] = useState("");
  const [tiempo_e, setTiempo_e] = useState("");
  const elementos = useAxios(`/elemento/${props.id}`);
  const [cantidadElement, setCantidadElement] = useState("");
  const [proveedor, setProveedor] = useState("");
  const proveedores = useAxios(`/proveedores`);
  const [precioElement, setPrecioElement] = useState("");
  const [articulo, setArticulo] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [totalOC, setTotalOC] = useState(0);


  const postOc = async (body) => {
    try {
      //console.log(body);
      const response = await axios.post(url + "crear_orden", body);
      return response;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const postOrdenArt = async (body) => {
    try {
      //console.log(body);
      const response = await axios.post(url + "crear_orden_art", body);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  const cargarOC = async () => {
    let user = window.localStorage.getItem('user');
    let jefe_compra = JSON.parse(user).id_funcionario;

    let body = {
      "jefe_compra": jefe_compra,
      "id_solicitud": parseInt(props.id),
      "total": totalOC,
      "estado":"Diligenciada", 
      "id_proveedor": proveedor     
    }
    
    let oc_created = await postOc(body);    
    let id_orden = oc_created.data[0].id_orden_compra;

    articulos.map((ele) => {
      let body2 = {
        "id_orden_compra": id_orden,
        "id_articulo": ele.id_articulo,
        "precio": ele.precio,
        "tiempo_llegada": tiempo_e
      }
      //console.log(body2);
      postOrdenArt(body2)
    } )



  };

  const agregarelement = async () => {
    //articulo, cantidad,precio,total
    let art = await elementos.data.filter((ele)=>{
      let res = ele.id_elemento==articulo;
      return res;     
    });
   
    let row = createRow(art[0].id_elemento, art[0].nombre, parseInt(art[0].cantidad), precioElement,(parseInt(art[0].cantidad) * precioElement));
    
    setArticulos([...articulos, row]);
    setTotalOC( parseInt(totalOC)+ parseInt(precioElement));
    setPrecioElement("");
  };


  return (
    <>

      <div>
        <Navbar />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <h3>Crear Orden de Compra</h3>
        </div>
        <div>
          <Form>
            <Form.Group
              as={Row}
              style={{ justifyContent: "center", marginTop: 40 }}
            >

              <Col sm="2">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Tiempo esperado</Form.Label>
                  <Form.Control type="date" placeholder="dd/mm/aaaa" value={tiempo_e} onChange={(e) => setTiempo_e(e.target.value)} />
                </Form.Group>

              </Col>
              <Col sm="1">
                <Form.Label>Proveedor</Form.Label>
                <Form.Select value={proveedor}  onChange={(e) => setProveedor(e.target.value)}>
                <option value={0}>
                  Seleccione un proveedor...
                </option>
                  {proveedores.data.map((prov)=>{
                    return(
                      <option value={prov.id_proveedor}>
                        {prov.proveedor}
                      </option>
                    );
                  })}
                  
                 
                </Form.Select>
              </Col>
              <Col sm="1" className="button bton" style={{ width: "10%" }}>
                  <Link
                    className="btn btn-secondary" to={"/principal/ordenes_compra"}
                    style={{ backgroundColor: "#4a3187" }}
                    onClick={()=>cargarOC()}
                  >
                    Guardar
                  </Link>
                </Col>
                <Col sm="1" className="button bton">
                  <Link className="btn btn-secondary" to={"/principal/ordenes_compra"}>Regresar</Link>
                </Col>
            </Form.Group>
          </Form>
        </div>
        <div style={{ justifyContent: "center", margin: "0 250px" }}>
          <div
            style={{
              margin: "1%",
              padding: "5%",
              border: "0.5px solid black",
              borderRadius: "45px",
            }}
          >
            <div style={{ borderRadius: 4 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ justifyContent: "center", marginBottom: 20 }}>
                  <Form.Group as={Row}>
                    <Col sm="5">
                      <Form.Label>Elemento</Form.Label>
                      <Form.Select value={articulo} onChange={(e)=> setArticulo(e.target.value)}>
                      <option value={0}>
                  Seleccione elemento...
                </option>
                      {elementos.data.map((ele)=>{
                    return(
                      <option value={ele.id_elemento} >
                        {ele.nombre}
                      </option>
                    );
                  })}
                      </Form.Select>
                    </Col>
                    <Col sm="3">
                    <Form.Label>Precio</Form.Label>
                      <FormControl
                        type="number"
                        value={precioElement}
                        onChange={(e) => setPrecioElement(e.target.value)}
                      />
                    </Col>
                    <Col sm="1" className="but">
                      <Button variant="secondary" style={{ width: 80 }} onClick={() => agregarelement()}>
                        + Item
                      </Button>
                    </Col>
                  </Form.Group>
                </div>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Numero</th>
                    <th>Articulo</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Total</th>
                  </tr>
                 {articulos.map((dato, index) => {

                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{dato.articulo}</td>
                        <td>{dato.cantidad}</td>
                        <td>{dato.precio}</td>
                        <td>{dato.total}</td>
                      </tr>
                    );
                  })}
                </thead>
              </Table>
              <Col className="col align-self-end">
                    <Form.Label>Total Orden</Form.Label>
                      <FormControl
                        disabled
                        type="number"
                        value={totalOC}
                        onChange={(e) => setTotalOC(e.target.value)}
                      />
                    </Col>
            </div>
          </div>
        </div>
       
        <BadgeInfe />
      </div>
    </>
  );
};

export default CrearOrdenC;
