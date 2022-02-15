import BadgeServicio from "./FooterServicios/BadgeServicio"
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import Navbar from "../componentes/Navbar";

export const CrearServicios = () => {
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
                        <Form.Label>Servicio</Form.Label>
                        <Form.Control name="fullName" type="text" placeholder="Servicio" onChange={handleAddFormChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formBasicPassword">
                        <Form.Label>Valor del Servicio</Form.Label>
                        <Form.Control name="address" type="text" placeholder="Valor del Servicio" onChange={handleAddFormChange}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Funcionario Asignado</Form.Label>
                    <Form.Control name="phoneNumber" type="text" placeholder="Funcionario" onChange={handleAddFormChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control name="email" type="text" placeholder="Estado" onChange={handleAddFormChange}/>
                </Form.Group>

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
