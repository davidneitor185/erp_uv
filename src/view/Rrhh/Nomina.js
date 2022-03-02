import React, { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import axios from 'axios';
import NavBar from '../componentes/Navbar';
import BadgeRrhh from './FooterRrhh/BadgeRrhh';
import {BiSearchAlt} from "react-icons/bi";
import {MdOutlinePayments} from "react-icons/md";
import {AiFillDelete, AiFillFileAdd} from "react-icons/ai";
import {GrView} from "react-icons/gr";
import { FormControl, Button, Form, Row, Col, Modal, ModalBody, ModalFooter, Table, Pagination, Offcanvas } from "react-bootstrap";
import { Test } from './Test';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { red } from '@mui/material/colors';

export const Nomina = () => {

    const [dato, setDato] = useState([]);
    const [cuentaBancaria, setCuentaBancaria] = useState([]);
    const [selectNomina, setNomina] = useState("");
    const [viewCanva, setViewCanva] = useState(false);
    const [viewModalDelete, setModalDelete] = useState(false);
    const [viewModalPay, setModalPay] = useState(false);
    const [consulta, setConsulta] = useState("");
    const [date, setDate] = useState("");
    const [banco, setBanco] = useState(0);
    const [btnSave, setBtnSave] = useState(true);
    const [view_obj, setViewObj] = useState({
        idnomina: "",
        nombre_funcionario: "",
        fechadepago: "",
    });
    const links = [
        "http://localhost:5000/nominas",
        "http://localhost:5000/cuentaContable"
    ];

    //Funcion para conseguir los registros de las Nominas
    /*const getData = async () => {
        await axios.get("http://localhost:5000/nominas").then(res => {
            const map_data = res.data;
            map_data.forEach(obj => {
                obj.fechadepago = obj.fechadepago.substring(0, 9);
                obj.totaldevengos = new Intl.NumberFormat('en-US').format(obj.totaldevengos);
                obj.totaldeducciones = new Intl.NumberFormat('en-US').format(obj.totaldeducciones);
                obj.pagototal = new Intl.NumberFormat('en-US').format(obj.pagototal);
            });
            setDato(map_data);
        });
    };*/
    const getData = async () => {
        await axios.all(links.map(promise => axios.get(promise))).then(
            axios.spread((nomina, cuenta) => {
                const map_data = nomina.data;
                map_data.forEach(obj => {
                    obj.fechadepago = obj.fechadepago.substring(0, 9);
                    obj.totaldevengos = new Intl.NumberFormat('en-US').format(obj.totaldevengos);
                    obj.totaldeducciones = new Intl.NumberFormat('en-US').format(obj.totaldeducciones);
                    obj.pagototal = new Intl.NumberFormat('en-US').format(obj.pagototal);
                });
                setDato(map_data);
                setCuentaBancaria(cuenta.data);
            })
        );
    };

    const deleteNomina = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deleteNomina/${id}`).then(res => {
                console.log("la mierdaaaa sirvio");
                getData();
            });
        }catch(error) {
            console.log(error);
        };
    };

    const postPagoNomina = async (body) => {
        try {
            const res = await axios.post("http://localhost:5000/pagarNomina", body).then(res => {
                console.log("Exito!!!!!!");
            });
        }catch(e) {
            console.log(e);
        }
    }

    const formPagoNomina = (nomina) => {
        const body_form = {
            nopago: cadenaAleatoria(aleatorio(1, 500)),
            nomina: nomina,
            cuentacontable: banco,
            fecharealizacion: date,
        }
        if(body_form.cuentacontable != 0) {
            postPagoNomina(body_form);
        }
        else
            console.log("No has ingresado todos los datos");
    };

    //Funcion substring 
    const sub_string = (str, init, end) => {
        if(str != undefined)
            return str.subString(init, end);
    }

    //Columnas de la tabla:
    const columns = useMemo(() => [
        {
            Header: 'ID',
            accessor: 'identificacion'
        },
        {
            Header: 'nombre',
            accessor: 'nombre_funcionario'
        },
        {
            Header: 'No nomina',
            accessor: 'idnomina'
        },
        {
            Header: 'Fecha de pago',
            accessor: 'fechadepago',
        },
        {
            Header: 'Valor Total',
            accessor: 'pagototal',
        },
        {
            Header: 'Opciones',
            Cell: ({cell}) => (
                <div className="btn-group" role="group" aria-label="">
                    <button type="button" onClick={() => {setViewObj(cell.row.original); setViewCanva(true)}} className="btn btn-outline-warning"><GrView /></button>
                    {/* cell.row.objects para traerlos datos */}
                    <button  className="btn btn-outline-danger" onClick={() => {setNomina(cell.row.values.idnomina);setModalDelete(true)}}><AiFillDelete /></button>
                    <button type="button"  onClick={() => {setConsulta(cell.row.values.idnomina);setModalPay(true)}} className="btn btn-outline-success"><MdOutlinePayments /></button>
                </div>
            ),
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: dato});

    useEffect(() => {
        getData();
    }, []);

    const cadenaAleatoria = (num) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1= Math.random().toString(36).substring(2,num);       

        return result1;
    };

    const aleatorio = (inferior, superior) => {
        var numPosibilidades = superior - inferior;
        var aleatorio = Math.random() * (numPosibilidades + 1);
        aleatorio = Math.floor(aleatorio);
        return inferior + aleatorio;
    };

  return (
    <>
        <NavBar />
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 20}}>
                <h3>Lista de nominas</h3>
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
            <div style={{ display: "flex", justifyContent: "center", margin: "0 70px" }}>
                <div
                    style={{
                        margin: "2% 5% 5% 5%",
                        padding: "5%",
                        border: "0.5px solid black",
                        borderRadius: "45px",
                        
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
                            {rows.map(row => {
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
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 40, width: "100%", height: "100%", alignItems: "end"}}>
                            <Pagination>
                                <Pagination.First />
                                <Pagination.Prev  />
                                <Pagination.Next  />
                                <Pagination.Last  />
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <BadgeRrhh />

            {/* Canva de vista */}
            <Offcanvas show={viewCanva} onHide={() => setViewCanva(false)} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Información Nomina</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {view_obj.nombre_funcionario.substring(0,1)}
                            </Avatar>
                            }
                            title={view_obj.nombre_funcionario}
                            subheader={view_obj.fechadepago.substring(0, 9)}
                            style={{backgroundImage: "linear-gradient(rgb(254, 102, 125), rgb(255, 163, 117))", color: "#424242"}}
                        />
                        <CardContent style={{backgroundImage: "linear-gradient( 109.6deg, rgba(242,241,242,0.68) 44.1%, rgba(187,211,245,1) 91.1% )"}}>
                            <Typography gutterBottom variant="h6" component="div">
                                No. Nomina:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {view_obj.idnomina}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                No. Funcionario:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {view_obj.funcionario}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                Departamento:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {view_obj.depto_funcionario}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                Total Devengado:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {'$' + view_obj.totaldevengos}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                Total Deducciones:
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {'$' + view_obj.totaldeducciones}
                            </Typography>
                        </CardContent>
                    </Card>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Borrar nomina */}
            <Modal show={viewModalDelete} onHide={() => setModalDelete(false)}>
                <Modal.Header style={{backgroundColor: "crimson"}}>
                    <Modal.Title>Eliminar Nomina</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    ¿Estás seguro que deseas eliminar la Nomina: {selectNomina} y todos sus registros asociados?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => {deleteNomina(selectNomina); setModalDelete(false)}}>Sí</button>
                    <button className="btn btn-secundary" onClick={()=>setModalDelete(false)}>No</button>
                </ModalFooter>
            </Modal>

            {/* Realizar pago de la nomina */}
            <Modal show={viewModalPay} onHide={() => setModalPay(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Items en la Orden</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Label>Cuenta contable</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => {setBanco(e.target.value); setBtnSave(false)}}>
                                        <option value='0'>Select cuenta</option>
                                        {cuentaBancaria.map((cuenta, index) => {
                                            return(
                                                <option value={cuenta.idcuentactle} key={index}>
                                                    {cuenta.numerocuenta + " " + cuenta.entidadbancaria}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Label>Fecha Realizacion</Form.Label>
                                    <Form.Control type="date" placeholder='yy/mm/dd' value={date} onChange={event => {setDate(event.target.value); console.log(date)}} />
                                </Form.Group>
                            </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalPay(false)}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={btnSave} onClick={() => {setModalPay(false); formPagoNomina(consulta)}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </>
  )
}