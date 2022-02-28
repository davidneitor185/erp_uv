import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {BiSearchAlt, BiEditAlt} from "react-icons/bi";
import {AiFillDelete, AiFillFileAdd} from "react-icons/ai";
import Navbar from '../componentes/Navbar';
import BadgeServicio from './FooterServicios/BadgeServicio';
import { FormControl, Button, Form, Row, Col, Modal, ModalBody, ModalFooter, Table, Pagination } from "react-bootstrap";

const Servicios = () => {
    
    const [dato, setData] = useState([]);
    const getData = async () => {
         await axios.get("http://localhost:5000/ordenesServicio").then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    //************************************************************************ */

    //***************** */
    const [viewModalDelete, setModalDelete] = useState(false);
    const [viewModalEdit, setModalEdit] = useState(false);
    const [viewModalAdd, setModalAdd] = useState(false);
    const [selectOrden, setSelectOrden] = useState(null);
    /****************** */

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

    //Quitar estos :
    const handleAddFormSubmit = () => {};
    const handleAddFormChange = () => {};


    const columns = useMemo(
        () => [
          {
            Header: 'No',
            accessor: 'idordenservicio', // accessor is the "key" in the data
          },
          {
            Header: 'Servicio',
            accessor: 'comentarios',
          },
          {
            Header: 'Valor',
            accessor: 'costototal',
          },
          {
            Header: 'Empleado',
            accessor: 'empleadoasignado',
          },
          {
            Header: 'Estado',
            accessor: 'estado',
          },
          {
            Header: 'Opciones',
            Cell: ({cell}) => (
                <div className="btn-group" role="group" aria-label="">
                    <button type="button" onClick={() => setModalEdit(true)} className="btn btn-outline-warning"><BiEditAlt /></button>
                    <button onClick={() => {selectOS(cell.row.values.idordenservicio); setModalDelete(true)}} className="btn btn-outline-danger"><AiFillDelete /></button>
                    <button type="button" onClick={() => setModalAdd(true)} className="btn btn-outline-success"><AiFillFileAdd /></button>
                </div>
            )
          },
        ],
        []
      )

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
          columns, data: dato, initialState: { pageIndex: 0, pageSize: 2 }
        }, usePagination); 

    return (
        <>
            <Navbar />
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
                <div style={{ display: "flex",justifyContent: "center", alignItems: "center" }}>
                    {/*<TablaSI titulos={titles} datos={listOrdenes} tipo={type}/>*/}
                    <div
                        style={{
                            marginTop: "2%",
                            padding: "5%",
                            border: "0.5px solid black",
                            borderRadius: "45px",
                            width: "60%"
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
                                    <Pagination.Prev onClick={() => previousPage()} disable={!canPreviousPage}/>
                                    <Pagination.Next onClick={() => gotoPage(pageIndex + 1)} disable={!canNextPage}/>
                                    <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
                <BadgeServicio/>

                {/* Modal de Eliminar Orden de Servicio */}
                <Modal show={viewModalDelete} onHide={() => setModalDelete(false)}>
                    <Modal.Header style={{backgroundColor: "crimson"}}>
                        <Modal.Title>Eliminar Orden de Servicio</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar la orden {selectOrden} y todos sus registros asociados?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => {deleteOrdenServicio(selectOrden); setModalDelete(false)}}>Sí</button>
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
