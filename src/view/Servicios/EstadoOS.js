import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {BiSearchAlt, BiEditAlt} from "react-icons/bi";
import {AiFillDelete, AiFillFileAdd} from "react-icons/ai";
import Navbar from '../componentes/Navbar';
import BadgeServicio from './FooterServicios/BadgeServicio';
import { FormControl, Button, Form, Row, Col, Modal, ModalBody, ModalFooter, Table, Pagination } from "react-bootstrap";

const EstadoOS = () => {
    
    const [idEmpleado, setIdEmpleado] = useState(2);
    const [dato, setData] = useState([]);
    const [id, setId] = useState(null);
    const [estado, setEstado] = useState("");
    const [comentario, setComentario] = useState("");
    const [viewComment, setViewComment] = useState(true);

    const getData = async () => {
         /*await axios.get("http://localhost:5000/ordenesServicio").then((res) => {
            setData(res.data);
            console.log(res.data);
        });*/ // Sirve pero necesito solo las ordenes donde aparece cada empleado
        await axios.get(`http://localhost:5000/osEmpleado/${idEmpleado}`).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    };

    const EditEstado = async (obj) => {
        try {
            await axios.put("http://localhost:5000/editStateOS", obj).then((res) => {
                getData();
                console.log("Metio ese malpartido.....");
                setId(null);
                setEstado("");
                setComentario("");
            });
        }catch(error) {
            console.log("No, No se pudo asi F");
        };
    };

    const formEditEstado = () => {
        const body = {
            idOrdenServicio: id,
            estado: estado,
            comentario: comentario,
        };

        if(estado != "") {
            EditEstado(body);
        }
        else
            console.log("Falta el estado");
    };

    useEffect(() => {
        getData();
    }, []);

    //************************************************************************ */

    //***************** */
    const [viewModalEdit, setModalEdit] = useState(false);
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
                    <button type="button" onClick={() => {setId(cell.row.values.idordenservicio);setModalEdit(true)}} className="btn btn-outline-warning"><BiEditAlt /></button>
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
          columns, data: dato, initialState: { pageIndex: 0, pageSize: 5 }
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
                <BadgeServicio/>


                {/* Modal de Editar Estado */}
                <Modal size="lg" show={viewModalEdit} onHide={() => setModalEdit(false)} aria-labelledby="example-modal-sizes-title-lg">
                    <Modal.Header closeButton style={{backgroundColor: "dodgerblue"}}>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Editar Estado de mis Ordenes de Servicio asignadas
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor: "aliceblue"}}>
                        <div style={{display: "flex", flexDirection: "column", 
                                alignItems: "center", justifyContent: "center", paddingTop: "5%", width: "100%"}}>
                            <Form style={{width: "50%"}}>
                                {['radio'].map((type) => (
                                    <div style={{display: "flex", flexDirection: "column"}} key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="Asignada"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        onClick={() => {setEstado("Asignada");setViewComment(true)}}
                                    />
                                    <Form.Check
                                        inline
                                        label="Cerrada"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        onClick={() => {setEstado("Cerrada");setViewComment(true)}}
                                    />
                                    <Form.Check
                                        inline
                                        label="Cancelada"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-3`}
                                        onClick={() => {setEstado("Cancelada");setViewComment(false)}}
                                    />
                                    </div>
                                ))}
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
                                    <Form.Label>Comentarios de Cierre</Form.Label>
                                    <Form.Control name="phoneNumber" as="textarea" disabled={viewComment} onChange={(e) => setComentario(e.target.value)}/>
                                </Form.Group>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalEdit(false)}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={() => {formEditEstado();setModalEdit(false)}}>
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Modal>
              </div>
          </>
    );
}

export default EstadoOS;