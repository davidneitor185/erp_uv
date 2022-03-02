import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../componentes/Navbar';
import { FormControl, Button, Form, Row, Col, Modal, ModalBody, ModalFooter, Table, Pagination, Offcanvas } from "react-bootstrap";


export const CrearNomina = () => {

  const [funcionarios, setFuncionarios] = useState([]);
  const [selectFunc, setSelectFunc] = useState([]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  const getData = async () => {
    await axios.get("http://localhost:5000/funcionarios").then(res => {
      setFuncionarios(res.data);
      console.log(res.data);
    })
  };

  const printSelect = async (target) => {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    const search = funcionarios.find(id => id.id_funcionario == target);
    //await sleep(100);
    //setName(search.nombre_funcionario);
    setSelectFunc(search);
  };

  useEffect(() => {
    getData();
  }, []);

  if(funcionarios === [])
    return (<div>..... cargando</div>);

  return (
    <>
        <Navbar />
        <div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 20}}>
              <h3>Crear Nominas</h3>
          </div>
            <div style={{ display: "flex", justifyContent: "center", margin: "0 70px", height: "90%", width:"100%"}}>
              <div
                style={{ display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: "16px 30px 30px",
                  margin: "auto",
                  width: "1100px",
                  height: "598px",
                  left: "90px",
                  top: "220px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 4px 20px rgba(77, 166, 186, 0.38)",
                  borderRadius: "20px"}}>
                      {/*<div style={{flex: "1", border: "1px solid gray", marginRight: "20px", 
                      backgroundColor: "Gainsboro", width: "100%", height: "100%"}}></div>*/}
                      <div style={{width: "510px", height: "529px", left: "20px",  padding: "20px",
                                  top: "20px", background: "rgba(241, 241, 242, 0.81)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "16px"}}>
                        <Form>
                          <Row className='mb-3'>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledTextInput">Id empleado</Form.Label>
                              <Form.Select id="disabledSelect" onChange={(e) => printSelect(e.target.value)}>
                                <option value='0'>Select Id </option>
                                {funcionarios.map((func, index) => {
                                  return(
                                    <option value={func.id_funcionario}>{func.id_funcionario}</option>
                                  )
                                })}
                              </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Nombre</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={selectFunc.nombre_funcionario} disabled/>
                            </Form.Group>
                          </Row>
                          <Row className='mb-3'>
                          <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Identificacion</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={selectFunc.identificacion} disabled/>
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Departamento</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={selectFunc.depto_funcionario} disabled/>
                            </Form.Group>
                          </Row>
                          <Row className='mb-3'>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Email</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={selectFunc.email} disabled/>
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Telefono</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={selectFunc.tel} disabled/>
                            </Form.Group>
                          </Row>
                          <Row className='mb-3'>
                              <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Label>Fecha Pago</Form.Label>
                                    <Form.Control type="date" placeholder='yy/mm/dd' value={date} onChange={event => {setDate(event.target.value)}} />
                              </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Jefe Inmediato</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={selectFunc.jefe_inmediato} disabled/>
                            </Form.Group>
                          </Row>
                          <Button type="button" onClick={() => console.log(date)}>Submit</Button>
                        </Form>
                      </div>
                      <div style={{width: "530px", height: "529px", left: "550px", padding: "20px",
                                  top: "20px", background: "rgba(241, 241, 242, 0.81)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "16px"}}>
                        <Form>
                          <Row className='mb-3'>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Concepto</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={"select concept"} />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Check type="radio" label="Devengado" onClick={() => console.log("Devengado")}/>
                            </Form.Group>
                          </Row>
                          <Row className='mb-3'>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Valor</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={"Select Value"} />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Check type="radio" label="Deduccion" onClick={() => console.log("Deduccion")}/>
                            </Form.Group>
                          </Row>
                        </Form>
                      </div>
                </div>
            </div>
        </div>
    </>
  )
}
