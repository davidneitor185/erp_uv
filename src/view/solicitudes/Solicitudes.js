import React from "react";
import { FormControl, Button, Form, Row, Col, Table } from "react-bootstrap";
import BadgeInfe from "../componentes/badgeinfe_compras/BadgeInfe";
import { Link } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import { url } from "../../db/variabledb";



class Solicitudes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isDataLoaded: false }
  }
  roluser = JSON.parse(window.localStorage.getItem('user')).id_rol

  cargarSolicitudes() {
    fetch(url + "solicitudes")
      .then(respuesta => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta)
        this.setState({ isDataLoaded: true, data: datosRespuesta })
      })
      .catch(console.log)
  }

  componentDidMount() {
    this.cargarSolicitudes();
  }

  render() {
    const { isDataLoaded, data } = this.state

    if (!isDataLoaded) {

      return (<div>Cargando...</div>);
    } else {

      return (<>

        <Navbar />

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
                <Col sm="1" style={{ width: "4%", display: "flex" }}>
                  <Button variant="secondary">🔍</Button>
                </Col>
                <Col sm="1">
                  <Link className="btn btn-secondary" to={"/principal/crearsolicitud"}>➕</Link>
                </Col>
              </Form.Group>
            </Form>
          </div>
          <div style={{ justifyContent: "center", margin: "0 250px" }}>
            <div
              style={{
                margin: "5%",
                padding: "5%",
                border: "0.5px solid black",
                borderRadius: "45px",
              }}
            >
              <div style={{ borderRadius: 4 }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Id. Solicitud</th>
                      <th>Solicitante</th>
                      <th>Tiempo esperado</th>
                      <th>Estado</th>
                      <th>Opciones</th>
                    </tr>
                    {data.map((dato, index) => {
                      let fecha = Date();
                      fecha = dato.tiempo_e;
                      fecha = fecha.split("T");
                      if(this.roluser==2){
                        if(dato.estado=="Diligenciada"){
                          return (
                            <tr key={index}>
                              <td>{dato.id_solicitud}</td>
                              <td>{dato.nombre_funcionario}</td>
                              <td>{fecha[0]}</td>
                              <td>{dato.estado}</td>
                              <td><Link className="btn btn-secondary" to={"/principal/versolicitud/"+dato.id_solicitud}>🔍</Link>{' '}                             
                              
                              </td>
                            </tr>
                          );
                        }
                      }else if(this.roluser==3){
                        if(dato.estado=="Aprobada Jefe I."){
                          return (
                            <tr key={index}>
                              <td>{dato.id_solicitud}</td>
                              <td>{dato.nombre_funcionario}</td>
                              <td>{fecha[0]}</td>
                              <td>{dato.estado}</td>
                              <td><Link className="btn btn-secondary" to={"/principal/versolicitud/"+dato.id_solicitud}>🔍</Link></td>
                              
                            </tr>
                          );
                        }
                      }else if(this.roluser==4){
                        if(dato.estado=="Aprobada Gerente Gral."){
                        return (
                          <tr key={index}>
                            <td>{dato.id_solicitud}</td>
                            <td>{dato.nombre_funcionario}</td>
                            <td>{fecha[0]}</td>
                            <td>{dato.estado}</td>
                            <td><Link className="btn btn-secondary" to={"/principal/versolicitud/"+dato.id_solicitud}>🔍</Link>
                            <Link className="btn btn-secondary" to={"/crearoc/"+dato.id_solicitud}>➕Orden</Link>
                            </td>
                            
                          </tr>
                        );}
                      }else{
                        return (
                          <tr key={index}>
                            <td>{dato.id_solicitud}</td>
                            <td>{dato.nombre_funcionario}</td>
                            <td>{fecha[0]}</td>
                            <td>{dato.estado}</td>
                            <td><Link className="btn btn-secondary" to={"/principal/versolicitud/"+dato.id_solicitud}>🔍</Link></td>
                            
                            
                          </tr>
                        );
                      }
                      
                    })}
                  </thead>
                </Table>
              </div>
            </div>
          </div>
          <BadgeInfe />
        </div>
      </>);
    }
  }
}

export default Solicitudes;

/* const Solicitudes = () => {
  const titulos = [
    "Id. Solicitud",
    "Solicitante",
    "Tiempo esperado",
    "Estado",
    "Opciones",
  ];
  const [datos, setDatos] = useState([]);
  const { data } = useAxios("/solicitudes");
  const tipo = "solicitudes";

  useEffect(() => {
    const datico = [];
    if (data) {
      data.map((soli) => {

        const solicitud = [];
        solicitud.push(soli.id_solicitud);
        solicitud.push(soli.nombre_funcionario);
        solicitud.push(soli.timepo_e);
        solicitud.push(soli.estado);
        datico.push(solicitud);

      })
      console.log(datico);
      setDatos(datico);
      console.log(datos);
    }


  }, [data])


  return (
    <>

      <Navbar />

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
              <Col sm="1" style={{ width: "4%", display: "flex" }}>
                <Button variant="secondary">🔍</Button>
              </Col>
              <Col sm="1">
                <Link className="btn btn-secondary" to={"/principal/crearsolicitud"}>➕</Link>
              </Col>
            </Form.Group>
          </Form>
        </div>
        <div style={{ justifyContent: "center", margin: "0 250px" }}>
          <TablaSI titulos={titulos} datos={datos} tipo={tipo} />
        </div>
        <BadgeInfe />
      </div>
    </>
  );
};

export default Solicitudes;
 */