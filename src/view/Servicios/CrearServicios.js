import BadgeServicio from "./FooterServicios/BadgeServicio"
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import Navbar from "../componentes/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export const CrearServicios = () => {

    const[cliente, setCliente] = useState([]);
    const[funcionario, setFuncionario] = useState([]);
    //Estados para el formulario:
    const [asigFunc, setAsigFunc] = useState(-1);
    const [estado, setEstado] = useState("");
    const [comentario, setComentario] = useState("");
    const [costo, setCosto] = useState(0);
    const [comprador, setComprador] = useState(-1);
    // Enable/disable button
    const [off, setOff] = useState(true);

    const links = [
        "http://localhost:5000/clientes",
        "http://localhost:5000/funcionarios"
    ];

    const getData = async () => {
        try {
            await axios.all(links.map(promise => axios.get(promise))).then(
                axios.spread((cli, func) => {
                    setCliente(cli.data);
                    setFuncionario(func.data);
                })
            );
        }catch(e) {
            console.log(e);
        };
    };

    const postOrdenServicio = async (obj) => {
        try {
            await axios.post("http://localhost:5000/crearServicio", obj).then(res => {
                console.log("se ha ingresado con exito");
            });
        }catch(e) {
            console.log("ff");
            console.log(e);
        };
    };

    useEffect(() => {
        getData();
        if(asigFunc != -1 && estado != "" && comprador != -1)
            setOff(false);
        else
            setOff(true);
    }, [asigFunc, estado, comprador]);

    const createOS = () => {
        const body = {
            empleado: parseInt(asigFunc),
            estado: estado,
            comentarios: comentario,
            costo: costo,
            cliente: parseInt(comprador)
        };

        postOrdenServicio(body);
    }

    const printForm = () => {
        const body = {
            funcionario: parseInt(asigFunc),
            estado: estado,
            comentario: comentario,
            costo: costo,
            cliente: parseInt(comprador)
        };

        console.log(body);
    }


    if (cliente == []) return(<div style={{display: "flex", alignItems: "center", width: "100%", height: "100%", gap: "15px"}}>
        <Spinner animation="border" role="status" variant="danger">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        <di>Loanding ...</di>
    </div>);

  return (
      <div>
        <Navbar/>
        <div style={{display: "flex", flexDirection: "column", 
                     alignItems: "center", justifyContent: "center", paddingTop: "5%", width: "100%"}}>
            <Form  style={{width: "50%"}}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>Asignar Empleado</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => {setAsigFunc(e.target.value)}}>
                            <option value={-1}>Funcionario</option>
                            {funcionario.map((func, index) => {
                                return(
                                    <option value={func.id_funcionario} key={index}>
                                        {func.id_funcionario + ": " + func.nombre_funcionario}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => {setEstado(e.target.value)}}>
                            <option value="">Select Estado</option>
                            <option value="Asignado">Asignado</option>
                            <option value="En tramite">En tramite</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comentarios</Form.Label>
                    <Form.Control name="phoneNumber" as="textarea"  onChange={(e) => setComentario(e.target.value)}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Costo Total</Form.Label>
                        <Form.Control name="email" type="text" placeholder="$0000,00" onChange={(e) => setCosto(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => setComprador(e.target.value)}>
                            <option value="null">Select ID</option>
                            {cliente.map((clte, index) => {
                                return(
                                    <option value={clte.idcliente} key={index}>
                                        {clte.idcliente + ": " + clte.nombrecliente}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Button  type="button" onClick={() => createOS()} disabled={off}>
                    Submit
                </Button>
            </Form>
            <div style={{paddingTop: "3%", width: "100%"}}>
                <BadgeServicio/>
            </div>
        </div>
    </div>
  )
}
