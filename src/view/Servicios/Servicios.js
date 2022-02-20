import { useEffect, useState } from "react";
import useAxios from "../../useAxios";
import Navbar from "../componentes/Navbar";
import { FormControl, Button, Form, Row, Col, Modal, ModalBody, ModalFooter, ModalTitle } from "react-bootstrap";
import { TablaSI } from "../componentes/TablaSI";
import {BiSearchAlt, BiEditAlt} from "react-icons/bi";
import {AiFillDelete, AiFillFileAdd} from "react-icons/ai";
import BadgeServicio from "./FooterServicios/BadgeServicio";
import { Table } from "react-bootstrap";
import Paginas from "../componentes/Paginas";
import "../componentes/Table/TablaSI.css"

import "./Servicios.css";
import datae from "./mock-data.json";
import axios from "axios";

const Servicios = () => {

    //quede en el minuto 18:50
    /*const[contacts, setContacts] = useState(datae);
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
    };*/

    const titles = [
        "No",
        "Servicio",
        "Valor del Servicio",
        "Funcionario Asignado",
        "Estado",
        "Opciones",
    ];
    //const {data} = useAxios("/ordenesServicio");
    const [listOrdenes, setListOrdenes] = useState([]);
    const [selectOrden, setSelectOrden] = useState({});
    const [viewModalDelete, setModalDelete] = useState(false);
    const [viewModalEdit, setModalEdit] = useState(false);
    const [viewModalAdd, setModalAdd] = useState(false);
    const [data, setData] = useState([]);

    const getData = () => {
        axios.get("http://localhost:5000/ordenesServicio").then((res) => {
            setData(res.data);
        });
    }

    const selectOS = (os) => {
        setSelectOrden(os);
    }

    const deleteOrdenServicio = (ref) => {
        axios.delete(`http://localhost:5000/borraOServicio/${ref}`).then((response) => {
            console.log(response.data);
            console.log("sirvio");
            getData();
        });
    }

    /*useEffect(() => {
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
    }, [data]);*/
    

    useEffect(() => {
        getData();
    }, []);

    console.log(data);

    //Quitar estos:
    const handleAddFormSubmit = () => {};
    const handleAddFormChange = () => {};

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
                <div style={{ justifyContent: "center", margin: "0 70px" }}>
                    {/*<TablaSI titulos={titles} datos={listOrdenes} tipo={type}/>*/}
                    <div
                        style={{
                            margin: "5%",
                            padding: "5%",
                            border: "0.5px solid black",
                            borderRadius: "45px",
                        }}
                        >
                        <div style={{borderRadius:4}}>
                            
                            <Table striped bordered hover>
                            <thead>
                                <tr>
                                    {titles.map((titulo, index) => {
                                        return <th key={index}>{titulo}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {/*listOrdenes.map((dato) => {
                                    return (
                                    <tr>
                                        {dato.map((iterateDato, index) => {
                                        return <td key={index}>{iterateDato}</td>
                                        })}
                                        <td>
                                        <div className="btn-group" role="group" aria-label="">
                                            <button type="button" className="btn btn-warning">Editar</button>
                                            <button  onClick={() => {selectOS(dato); setEliminar(true)}} className="btn btn-danger">Borrar</button>
                                        </div>
                                        </td>
                                    </tr>
                                    );
                                })*/
                                data.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{row.idordenservicio}</td>
                                            <td>{row.comentarios}</td>
                                            <td>{new Intl.NumberFormat('en-US').format(row.costototal)}</td>
                                            <td>{row.empleadoasignado}</td>
                                            <td>{row.estado}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <button type="button" onClick={() => {setModalEdit(true)}} className="btn btn-outline-warning"><BiEditAlt /></button>
                                                    <button  onClick={() => {selectOS(row); setModalDelete(true)}} className="btn btn-outline-danger"><AiFillDelete /></button>
                                                    <button type="button" onClick={() => setModalAdd(true)} className="btn btn-outline-success"><AiFillFileAdd /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            </Table>
                        </div>
                        <Paginas />
                        </div>
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


                {/* Modal de Eliminar Orden de Servicio */}
                <Modal show={viewModalDelete} onHide={() => setModalDelete(false)}>
                    <Modal.Header style={{backgroundColor: "crimson"}}>
                        <Modal.Title>Eliminar Orden de Servicio</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar la orden {selectOrden.idordenservicio} y todos sus registros asociados?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => {deleteOrdenServicio(selectOrden.idordenservicio); setModalDelete(false)}}>Sí</button>
                        <button className="btn btn-secundary" onClick={()=>setModalDelete(false)}>No</button>
                    </ModalFooter>
                </Modal>

                {/* Modal de Editar Ordenes de Servicio */}
                <Modal size="lg" show={viewModalEdit} onHide={() => setModalEdit(false)} aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton style={{backgroundColor: "dodgerblue"}}>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Editar Orden de Servicio
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "aliceblue"}}>
                        <div style={{display: "flex", flexDirection: "column", 
                                alignItems: "center", justifyContent: "center", paddingTop: "5%", width: "100%"}}>
                            <Form onSubmit={handleAddFormSubmit} style={{width: "50%"}}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBasicEmail">
                                        <Form.Label>Asignar Empleado</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>Funcionario</option>
                                            <option value="1">Func 1</option>
                                            <option value="2">Func 2</option>
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
                                            {/*data.map((data_id, index) => {
                                                return(
                                                    <option value={index} key={index}>
                                                        {data_id.id}
                                                    </option>
                                                )
                                            })*/}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalEdit(false)}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={() => setModalDelete(false)}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Modal de Agregar Servicios a ordenes */}
                <Modal show={viewModalAdd} onHide={() => setModalAdd(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Items en la Orden</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalAdd(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => setModalAdd(false)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default Servicios;