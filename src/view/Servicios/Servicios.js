import { useEffect, useState } from "react";
import useAxios from "../../useAxios";
import Navbar from "../componentes/Navbar";
import { FormControl, Button, Form, Row, Col } from "react-bootstrap";
import { TablaSI } from "../componentes/TablaSI";
import {BiSearchAlt} from "react-icons/bi";
import BadgeServicio from "./FooterServicios/BadgeServicio";

import "./Servicios.css";
import datae from "./mock-data.json";

const Servicios = () => {

    //quede en el minuto 18:50
    const[contacts, setContacts] = useState(datae);
    const[addFormData, setAddFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        email: ''
    })
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: contacts[contacts.length-1].id+1,
            fullName: addFormData.fullName,
            address: addFormData.address,
            phoneNumber: addFormData.phoneNumber,
            email: addFormData.email,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const titles = [
        "No",
        "Servicio",
        "Valor del Servicio",
        "Funcionario Asignado",
        "Estado",
        "Opciones",
    ];
    const {data} = useAxios("/ordenesServicio");
    const [listOrdenes, setListOrdenes] = useState([]);
    const type = "servicios";

    useEffect(() => {
        const ref_list = [];
        if(data) {
            data.map((elem) => {
                const get_list_servicios = [];
                get_list_servicios.push(elem.idordenservicio);
                get_list_servicios.push(elem.comentarios);
                get_list_servicios.push(elem.costototal);
                get_list_servicios.push(elem.empleadoasignado);
                get_list_servicios.push(elem.estado);
                ref_list.push(get_list_servicios);
            })
            setListOrdenes(ref_list);
        }
        else
            console.log("error");
    }, [data]);


    return(
        <>
            <Navbar/>
            <div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 20}}>
                    <h3>Ordenes de Servicio</h3>
                </div>
                <div>
                    <Form>
                        <Form.Group as={Row} style={{ justifyContent: "center" }}>
                            <Col sm="3">
                                <FormControl
                                    placeholder="Search..."
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </Col>
                            <Col sm="1" style={{ width: "4%", display: "flex"}}>
                                <Button variant="secondary"><BiSearchAlt/></Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
                <div style={{ justifyContent: "center", margin: "0 150px" }}>
                    <TablaSI titulos={titles} datos={listOrdenes} tipo={type}/>
                    {/*<div className="app-container">
                        <table className="table">
                            <thead>
                                <th className="th">No</th>
                                <th className="th">Servicio</th>
                                <th className="th">Valor del Servicio</th>
                                <th className="th">Funcionario Asignado</th>
                                <th className="th">Estado</th>
                            </thead>
                            <tbody>
                                {contacts.map(item => (
                                    <tr key={item.id}>
                                        <td className="td">{item.id}</td>
                                        <td className="td">{item.fullName}</td>
                                        <td className="td">{item.address}</td>
                                        <td className="td">{item.phoneNumber}</td>
                                        <td className="td">{item.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <h2>Add a contacts</h2>

                        <Form onSubmit={handleAddFormSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Servicio</Form.Label>
                                <Form.Control name="fullName" type="text" placeholder="Servicio" onChange={handleAddFormChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Valor del Servicio</Form.Label>
                                <Form.Control name="address" type="text" placeholder="Valor del Servicio" onChange={handleAddFormChange}/>
                            </Form.Group>

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
                    </div>*/}
                </div>
                <BadgeServicio/>
            </div>
        </>
    );
}

export default Servicios;