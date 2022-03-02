import React, { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import {IoMdPersonAdd} from 'react-icons/io';
import {IoPersonRemove} from 'react-icons/io5';
import { BiSearchAlt } from "react-icons/bi";
import {GrAddCircle} from "react-icons/gr";
import axios from 'axios';
import Navbar from '../../componentes/Navbar';
import BadgeRrhh from '../FooterRrhh/BadgeRrhh';
import { FormControl, Button, Form, Row, Col, Modal, ModalBody, ModalFooter, InputGroup, Table, Pagination, Offcanvas } from "react-bootstrap";

export const Contrataciones = () => {

    const [contratacion, setContratacion] = useState([]);
    const [jefes, setJefes] = useState([]);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [selectCont, setSelectCont] = useState("");
    const [selectPerson, setSelectPerson] = useState([]);
    const [selectJefe, setSelectJefe] = useState(null);

    //Estados para agregar, aceptar y borrar:
    const [viewAdd, setViewAdd] = useState(false);
    const [viewDelete, setViewDelete] = useState(false);
    const [viewContratar, setViewContratar] = useState(false);
    const links = [
        "http://localhost:5000/contrataciones",
        "http://localhost:5000/jefes"
    ];

    const getData = async() => {
        try {
            await axios.all(links.map(promise => axios.get(promise))).then(
                axios.spread((contra, jef) => {
                    setContratacion(contra.data);
                    setJefes(jef.data);
                })
            )
        }catch(error) {
            console.log(error);
        };
    };

    const addContratacion = async () => {
        try {
            await axios.post("http://localhost:5000/addContratacion", form).then(res => {
                getData();
                console.log("Se pudo agregar con exito!!!!");
            })
        }catch(error) {
            console.log(error);
        }
    }

    const deletePerson = async () => {
        try {
            await axios.delete(`http://localhost:5000/deleteContratacion/${selectCont}`).then(res => {
                getData();
                console.log("Se ha podido eliminar :(");
            })
        }catch(error) {
            console.log(error);
        }
    };

    const deletefromContratacion = async (elm) => {
        try {
            await axios.delete(`http://localhost:5000/deleteContratacion/${elm}`).then(res => {
                console.log("Se ha podido eliminar :(");
                getData();
            })
        }catch(error) {
            console.log(error);
        }
    };

    const contratar = async (obj) => {
        try {
            await axios.post("http://localhost:5000/addFuncionario", {
                jefe: selectJefe,
                nombre: obj.nombre_persona,
                email: obj.email,
                departamento: obj.departamento,
                identificacion: obj.idpersona,
                telefono: obj.telefono
            }).then(res => {
                deletefromContratacion(obj.idpersona);
                console.log("se pudo contratar y borrar");
            })
        }catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData()
    }, []);

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if(!!errors[field]) setErrors({
            ...errors,
            [field]: null
        });
    };

    const findErrors = () => {
        const {idpersona, nombre_persona, telefono, 
            email, titulo_profesional, años_experiencia, departamento} = form
        const new_errors = {}
        if(!idpersona || idpersona === '') new_errors.idpersona = 'No puede ser vacio';
        if(!nombre_persona || nombre_persona === '') new_errors.nombre_persona = 'No puede ser vacio';
        if(!telefono || telefono === '') new_errors.telefono = 'No puede ser vacio';
        if(!email || email === '') new_errors.email = 'No puede ser vacio';
        if(!titulo_profesional || titulo_profesional === '') new_errors.titulo_profesional = 'No puede ser vacio';
        if(!años_experiencia || nombre_persona === '') new_errors.años_experiencia = 'No puede ser vacio';
        if(!departamento || departamento === '') new_errors.departamento = 'No puede ser vacio';

        return new_errors;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const newErrors = findErrors();

        if(Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            addContratacion();
            setViewAdd(false);
        }
    };


    const columns = useMemo(() => [
        {
            Header: 'Identificacion',
            accessor: 'idpersona'
        },
        {
            Header: 'Nombre',
            accessor: 'nombre_persona'
        },
        {
            Header: 'Titulo Profesional',
            accessor: 'titulo_profesional'
        },
        {
            Header: 'Opciones',
            Cell: ({cell}) => (
                <div className="btn-group" role="group" aria-label="">
                    <button type="button"  className="btn btn-outline-success" onClick={() => {setSelectPerson(cell.row.original);setViewContratar(true)}}>
                        <IoMdPersonAdd />
                    </button>
                    <button  className="btn btn-outline-danger" onClick={() => {setSelectCont(cell.row.values.idpersona); setViewDelete(true)}}>
                        <IoPersonRemove />
                    </button>
                </div>
            ),
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        //This props is for the table pagination:
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
      } = useTable({ 
          columns, data: contratacion, initialState: { pageIndex: 0, pageSize: 4 }
        }, usePagination);

  return (
    <>
        <Navbar />
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 20}}>
                <h3>Contrataciones</h3>
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
                        <Col sm="1" style={{ width: "4%", display: "flex", gap: "10%"}}>
                            <Button variant="secondary"><BiSearchAlt/></Button>
                        </Col>
                        <Col sm="1">
                            <Button variant="primary" onClick={() => setViewAdd(true)}><GrAddCircle /></Button>
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
                        width: "1050px",
                        height: "500px"
                    }}
                    >
                    <div style={{borderRadius:4, width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
                        
                        <Table striped bordered hover {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                    )
                                })}
                                </tr>
                            )
                            })}
                        </tbody>
                        </Table>
                        {/* Here is the ui for build the pagination */}
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 40, width: "100%", height: "100%", alignItems: "end"}}>
                            <Pagination>
                                <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
                                <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
                                <Pagination.Next onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}/>
                                <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BadgeRrhh />

        {/* Modal para agregar nuevas personas para vacantes */}
        <Modal size="lg" show={viewAdd} onHide={() => setViewAdd(false)} aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton style={{backgroundColor: "dodgerblue"}}>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Agregar nuevos postulantes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "aliceblue"}}>
                <div style={{display: "flex", flexDirection: "column", 
                        alignItems: "center", justifyContent: "center", paddingTop: "5%", width: "100%"}}>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">

                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Identificacion</Form.Label>
                                <Form.Control
                                    
                                    type="text"
                                    placeholder="Ej: 111111111"
                                    onChange={e => setField('idpersona', e.target.value)}
                                    isInvalid={!!errors.idpersona}
                                />
                                <Form.Control.Feedback type='invalid'>No puede ser vacio</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    
                                    type="text"
                                    placeholder="Ej: Tanaka Mitsumoto"
                                    onChange={e => setField('nombre_persona', e.target.value)}
                                    isInvalid={!!errors.nombre_persona}
                                />
                                <Form.Control.Feedback type='invalid'>No puede ser vacio</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control
                                    
                                    type="text"
                                    placeholder="Ej: 3008889999"
                                    onChange={e => setField('telefono', e.target.value)}
                                    isInvalid={!!errors.telefono}
                                />
                                <Form.Control.Feedback type='invalid'>No puede ser vacio</Form.Control.Feedback>
                            </Form.Group>

                        </Row>

                        <Row className="mb-3">

                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej: xd@gmail.com" 
                                     
                                    onChange={e => setField('email', e.target.value)}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    No puede ser vacio
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                                <Form.Label>Titulo Profesional</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej: Ing. Electronico" 
                                    
                                    onChange={e => setField('titulo_profesional', e.target.value)}
                                    isInvalid={!!errors.titulo_profesional} />
                                <Form.Control.Feedback type="invalid">
                                    No puede ser vacio
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustom05">
                                <Form.Label>Años Experiencia</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej: 10 años" 
                                    
                                    onChange={e => setField('años_experiencia', e.target.value)}
                                    isInvalid={!!errors.años_experiencia} />
                                <Form.Control.Feedback type="invalid">
                                    No puede ser vacio
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>

                        <Row className='mb-3'>
                            <Form.Group as={Col} md="4" controlId="validationCustom05">
                                <Form.Label>Departamento</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Ej: Control de gestion" 
                                     
                                    onChange={e => setField('departamento', e.target.value)}
                                    isInvalid={!!errors.departamento}/>
                                <Form.Control.Feedback type="invalid">
                                    No puede ser vacio
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type='submit'>Add</Button>
                    </Form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setViewAdd(false)}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Modal para eliminar las personas que no se van a contratar :( */}
        <Modal show={viewDelete} onHide={() => setViewDelete(false)}>
            <Modal.Header style={{backgroundColor: "crimson"}}>
                <Modal.Title>Eliminar persona postulada</Modal.Title>
            </Modal.Header>
            <ModalBody>
                ¿Estás seguro que deseas eliminar la persona postulada?
            </ModalBody>
            <ModalFooter>
                <button className="btn btn-danger" onClick={() => {deletePerson(); setViewDelete(false)}}>Sí</button>
                <button className="btn btn-secundary" onClick={()=>setViewDelete(false)}>No</button>
            </ModalFooter>
        </Modal>

        {/* Modal para aceptar a una persona dentro del personal :) */}
        <Modal show={viewContratar} onHide={() => setViewContratar(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Row className='mb-3'>
                        <Form.Group as={Col} md="5" controlId="validationCustom05">
                            <Form.Label>Identificación Jefe</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={e => setSelectJefe(parseInt(e.target.value))}>
                                    <option value={null}>ID</option>
                                    {jefes.map((j, index) => {
                                        return(
                                            <option value={j.id_jefe} key={index}>
                                                {j.id_jefe + ": " + j.cargo}
                                            </option>
                                        )
                                    })}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setViewContratar(false)}>
                    Close
                </Button>
                <Button variant="secondary" onClick={() => {contratar(selectPerson); setViewContratar(false)}}>
                    Guardar cambios
                </Button>
            </Modal.Footer>      
        </Modal>
    </>
  )
}
