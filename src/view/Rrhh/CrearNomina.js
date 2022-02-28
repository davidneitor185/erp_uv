import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../componentes/Navbar';
import BadgeRrhh from './FooterRrhh/BadgeRrhh';
import { FormControl, Button, Form, Row, Col, Modal, ModalBody, ModalFooter, Table, Pagination, Offcanvas } from "react-bootstrap";


export const CrearNomina = () => {

  const [funcionarios, setFuncionarios] = useState([]);
  const [selectFunc, setSelectFunc] = useState([]);
  const [submitBtn, setSubmitBtn] = useState(true);
  const [addBtn, setAddBtn] = useState(true);
  const [option, setOption] = useState('');
  const [value, setValue] = useState(0);
  const [id, setId] = useState('')
  const [date, setDate] = useState('');
  const [devengado, setDevengado] = useState(0);
  const [deduccion, setDeduccion] = useState(0);
  const [name, setName] = useState("");

  const getData = async () => {
    await axios.get("http://localhost:5000/funcionarios").then(res => {
      setFuncionarios(res.data);
      console.log(res.data);
    })
  };

  const createNomina = async (body) => {
    try {
      await axios.post("http://localhost:5000/addNomina", body).then(res => {
        console.log(body);
      });
    }catch(error) {
      console.log(error);
    }
  }

  const formAddNomina = () => {
    const body_form = {
      idnomina: cadenaAleatoria(aleatorio(1, 999)),
      funcionario: id,
      fechadepago: date,
      totaldevengos: devengado,
      totaldeducciones: deduccion,
      pagototal: (devengado - deduccion),
    };
    if(id != 0 && date != '' && devengado != 0)
      createNomina(body_form);
    else
      console.log("Datos erroneos");
      //console.log(body);
  };

  const addValue = () => {
    switch(option) {
      case 'devengado':
        setDevengado(value);
        break;
      case 'deduccion':
        setDeduccion(value);
        console.log(value);
        break;
      default:
        console.log("please select a option");
    }
  }

  const printSelect = async (target) => {
    function sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    const search = funcionarios.find(id => id.id_funcionario == target);
    //await sleep(100);
    //setName(search.nombre_funcionario);
    setSelectFunc(search);
  };

  //Crear una clase para estas funciones
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
  //**************************************************************************************** */

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
            <div style={{ justifyContent: "center", margin: "0 70px" }}>
              <div
                style={{ display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  padding: "16px 30px 30px",
                  position: "initial",
                  width: "1100px",
                  height: "598px",
                  left: "90px",
                  top: "220px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 4px 20px rgba(77, 166, 186, 0.38)",
                  borderRadius: "20px",
                  gap: "2.5%"}}>
                      {/*<div style={{flex: "1", border: "1px solid gray", marginRight: "20px", 
                      backgroundColor: "Gainsboro", width: "100%", height: "100%"}}></div>*/}
                      <div style={{position: "absolut", width: "510px", height: "529px", left: "20px", position: "initial", padding: "20px",
                                  top: "20px", background: "rgba(241, 241, 242, 0.81)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "16px"}}>
                        <Form>
                          <Row className='mb-3'>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledTextInput">Id empleado</Form.Label>
                              <Form.Select id="disabledSelect" onChange={(e) => {printSelect(e.target.value); setId(e.target.value); setSubmitBtn(false)}}>
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
                          <Button type="button" disabled={submitBtn} onClick={() => formAddNomina()}>Submit</Button>
                        </Form>
                      </div>
                      <div style={{position: "absolut", width: "530px", height: "529px", left: "550px", position: "initial", padding: "20px",
                                  top: "20px", background: "rgba(241, 241, 242, 0.81)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "16px"}}>
                        <Form>
                          <Row className='mb-3'>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Concepto</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={"select concept"} />
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label htmlFor="disabledSelect">Valor</Form.Label>
                              <Form.Control id="disabledTextInput" placeholder={"Select Value"} onChange={(e) => setValue(e.target.value)}/>
                            </Form.Group>
                          </Row>

                              {/*<Form.Check inline type="radio" label="Devengado" id={`inline-radio-1`} onClick={() => console.log("Devengado")}/>
                              <Form.Check inline type="radio" label="Deduccion" id={'inline-radio-2'} onClick={() => console.log("Deduccion")}/>*/}
                              {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                  <Form.Check
                                    inline
                                    label="Devengado"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    onClick={() => {setOption('devengado'); setAddBtn(false)}}
                                  />
                                  <Form.Check
                                    inline
                                    label="Deducciones"
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    onClick={() => {setOption('deduccion'); setAddBtn(false)}}
                                  />
                                </div>
                              ))}

                            <Button color='black' disabled={addBtn} onClick={() => addValue()}>add</Button>
                        </Form>
                      </div>
                </div>
            </div>
        </div>
        <BadgeRrhh />
    </>
  )
}
