import BadgeServicio from "./FooterServicios/BadgeServicio"
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import Navbar from "../componentes/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export const CrearServicios = () => {

    const url = "http://localhost:5000/IDclientes";
    const[data, setData] = useState(null);

    useEffect(() => {
        axios.get(url).then((response) => {
            setData(response.data)
        });
    }, []);

    if (!data) return(<div>Error</div>);

    const handleAddFormChange = () => {

    };
    const handleAddFormSubmit = () => {

    };

  return (
      <div>
        <Navbar/>
        <div style={{display: "flex", flexDirection: "column", 
                     alignItems: "center", justifyContent: "center", paddingTop: "5%", width: "100%"}}>
            <Form onSubmit={handleAddFormSubmit} style={{width: "50%"}}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>Asignar Empleado</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Funcionario</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Select Estado</option>
                            <option value="1">Asignado</option>
                            <option value="2">En tramite</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Comentarios</Form.Label>
                    <Form.Control name="phoneNumber" as="textarea"  onChange={handleAddFormChange}/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Costo Total</Form.Label>
                        <Form.Control name="email" type="text" placeholder="$0000,00" onChange={handleAddFormChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select aria-label="Default select example">
                            <option>Select ID</option>
                            {data.map((data_id, index) => {
                                return(
                                    <option value={index} key={index}>
                                        {data_id.id}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
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
