import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import {BiSearchAlt, BiEditAlt} from "react-icons/bi";
import {AiFillDelete, AiFillFileAdd} from "react-icons/ai";
import Navbar from '../componentes/Navbar';
import BadgeServicio from './FooterServicios/BadgeServicio';
import { FormControl, Button, Form, Row, Col, Modal, ModalBody, ModalFooter, Table, Pagination } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { NotifyToasty } from './Toasty/NotifyToasty';

const Servicios = () => {
    
    const [dato, setData] = useState([]);
    const [item, setItem] = useState([]);
    const [viewModalDelete, setModalDelete] = useState(false);
    const [viewModalEdit, setModalEdit] = useState(false);
    const [select_os, setSelect_os] = useState([]);
    const [viewModalAdd, setModalAdd] = useState(false);
    //const [saveBtn, setSaveBtn] = useState(true);
    const [selectOrden, setSelectOrden] = useState(null);
    const [selectItem, setSelectItem] = useState("");

    //Estados para editar la orden de servicio
    const [editOrden,setEditOrden] = useState([]);
    const [cliente, setCliente] = useState([{idcliente: 0, nombrecliente: ""}]);
    const [funcionario, setFuncionario] = useState([]);
    const [asigFunc, setAsigFunc] = useState(-1);
    const [estado, setEstado] = useState("");
    const [comentario, setComentario] = useState(null);
    const [costo, setCosto] = useState(-1); //Test 1
    const [comprador, setComprador] = useState(-1);

    const links_fun_com = [
        "http://localhost:5000/clientes",
        "http://localhost:5000/funcionarios"
    ];

    const links = [
        "http://localhost:5000/ordenesServicio",
        "http://localhost:5000/items",
        "http://localhost:5000/clientes",
        "http://localhost:5000/funcionarios"
    ];

    const getData = async () => {
        await axios.all(links.map(promise => axios.get(promise))).then(
            axios.spread((os, itm, cli, fun) => {
                setData(os.data);
                setItem(itm.data);
                setCliente(cli.data);
                setFuncionario(fun.data);
            })
        )
    };

    const editOS = async (obj) => {
        try {
            await axios.put("http://localhost:5000/editOS", obj).then(res => {
                NotifyToasty("Se ha editado con exito");
                getData();
                console.log(res.data);
                console.log("Se pudo cambiar la orden X]");
                clearForm();
            })
        }catch(error) {
            console.log(error);
        }
    };

    const formEditOS = () => {
        const body = {
            idOrdenServicio: select_os.idordenservicio,
            empleado: asigFunc,
            comentario: comentario,
            total: costo,
            cliente: comprador,
            estado: estado
        };
        if(asigFunc == -1)
            body.empleado = select_os.empleadoasignado;

        if(comentario == null)
            body.comentario = select_os.comentarios;

        if(costo == -1 || costo == NaN)
            body.total = select_os.costototal;

        if(comprador == -1)
            body.cliente = select_os.cliente;
        
        if(estado == "")
            body.estado = select_os.estado;

        editOS(body);
    };

    const addItems = async (obj) => {
        try {
            await axios.post("http://localhost:5000/newServicios", obj).then(res => {
                console.log("se ha agregado un item a la OS");
                setSelectItem("");
            })
        }catch(error) {
            console.log(error);
        }
    };

    const formItemsOS = () => {
        const body = {
            id_orden: selectOrden,
            servicio: selectItem
        };
        if(selectItem != "") {
            addItems(body);
        }
        else
            console.log("Dato vacio!!!");
    };

    useEffect(() => {
        getData();
    }, []);


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

    const clearForm = () => {
        setAsigFunc(-1);
        setEstado("");
        setComentario(null);
        setCosto(-1);
        setComprador(-1);
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
                    <button type="button" onClick={() => {setSelect_os(cell.row.original);setModalEdit(true)}} className="btn btn-outline-warning">
                        <BiEditAlt />
                    </button>
                    <button onClick={() => {selectOS(cell.row.values.idordenservicio); setModalDelete(true)}} className="btn btn-outline-danger">
                        <AiFillDelete />
                    </button>
                    <button type="button" onClick={() => {setSelectOrden(cell.row.values.idordenservicio);setModalAdd(true)}} className="btn btn-outline-success" >
                        <AiFillFileAdd />
                    </button>
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
          columns, data: dato, initialState: { pageIndex: 0, pageSize: 4 }
        }, usePagination); 

    return (
        <>
            <ToastContainer />
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
                                    <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage}/>
                                    <Pagination.Next onClick={() => gotoPage(pageIndex + 1)} disabled={!canNextPage}/>
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
                            <Form style={{width: "50%"}}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBasicEmail">
                                        <Form.Label>Asignar Empleado</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => setAsigFunc(parseInt(e.target.value))}>
                                            <option value={select_os.empleadoasignado}>Funcionario</option>
                                            {funcionario.map((fun, index) => {
                                                return (
                                                    <option value={fun.id_funcionario} key={index}>
                                                        {fun.id_funcionario + ": " + fun.nombre_funcionario}
                                                    </option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formBasicPassword">
                                        <Form.Label>Estado</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => setEstado(e.target.value)}>
                                            <option value={select_os.estado}>Select Estado</option>
                                            <option value="Asignada">Asignado</option>
                                            <option value="En tramite">En tramite</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" onChange={(e) => setComentario(e.target.value)}>
                                    <Form.Label>Comentarios</Form.Label>
                                    <Form.Control as="textarea" placeholder={select_os.comentarios} />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formBasicPassword" 
                                                onChange={(e) => {if(e.target.value == "" || Number.isNaN(parseInt(e.target.value))) setCosto(select_os.costototal); else setCosto(parseInt(e.target.value))}}>
                                        <Form.Label>Costo Total</Form.Label>
                                        <Form.Control type="text" placeholder={"$ " + select_os.costototal}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formBasicPassword">
                                        <Form.Label>Cliente</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={(e) => setComprador(parseInt(e.target.value))}>
                                            <option value={select_os.cliente}>Select ID</option>
                                            {cliente.map((cli, index) => {
                                                return(
                                                    <option value={cli.idcliente} key={index}>
                                                        {cli.idcliente + ": " + cli.nombrecliente}
                                                    </option>
                                                )
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {clearForm() ;setModalEdit(false)}}>
                            Cerrar
                        </Button>
                        <Button variant="primary" onClick={() => {formEditOS();setModalEdit(false)}}>
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
                                <Form.Label>Item</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => setSelectItem(e.target.value)}>
                                    <option value={""}>Servicio</option>
                                    {item.map((i_val, index) => {
                                        return(
                                            <option value={i_val.iditem} key={index}>{i_val.nombreitem}</option>
                                        )
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" type="button">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalAdd(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => {formItemsOS(); setModalAdd(false)}}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
              </div>
          </>
    );
}

export default Servicios;
