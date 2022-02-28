import React from "react";
import Navbar from "../Navbar";
import { Form, Row, Col, FormControl, Button, Table  } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

class Inventario extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isDataLoaded: false }
    }
    state = {  }
    render() { 
        return (<>

            <Navbar />
    
            <div>
    
              <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                <h3>Inventario</h3>
              </div>
              <div>
                <Form>
                  <Form.Group as={Row} style={{ justifyContent: "center" }}>
                    <Col sm="3">
                      <FormControl
                        placeholder="   Search..."
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </Col>
                    <Col sm="1" style={{ width: "4%", display: "flex" }}>
                      <Button variant="secondary">🔍</Button>
                    </Col>
                    <Col sm="1">
                      <Link className="btn btn-secondary" to={"/crearEntrada"}>➕</Link>
                    </Col>
                  </Form.Group>
                </Form>
              </div>
              <div style={{ justifyContent: "center", margin: "0 250px" }}>
                <div
                  style={{
                    margin: "5%",
                    padding: "5%",
                    border: "0.5px solid black",
                    borderRadius: "45px",
                  }}
                >
                  <div style={{ borderRadius: 4 }}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Articulo</th>
                          <th>Cantidad</th>
                          <th>Valor Unitario</th>
                          <th>Valor Total</th>
                        </tr>
                       
                      </thead>
                    </Table>
                  </div>
                </div>
              </div>
             
            </div>
          </>);
    }
}
 
export default Inventario;