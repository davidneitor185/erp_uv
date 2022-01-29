import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Button, Table } from "react-bootstrap";
import Paginas from "./Paginas";
import { useNavigate } from "react-router-dom";

export const TablaSI = (props) => {

  const history = useNavigate();
  const verSoli = (data) =>{
    history(`/principal/versolicitud/${data}`);
  }
  return (
    <div
      style={{
        margin: "5%",
        padding: "5%",
        border: "0.5px solid black",
        borderRadius: "45px",
      }}
    >
      <div style={{borderRadius:4}}>
        {props.children && <props.children/>}
        <Table striped bordered hover>
          <thead>
            <tr>
              {props.titulos.map((titulo) => {
                return <th>{titulo}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {props.datos && props.datos.map((dato) => {
              return (
                <tr>
                  {dato.map((datico) => {
                    return <td>{datico}</td>;
                  })}
                  <td><Button onClick={()=>verSoli(dato)}>holi</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <Paginas />
    </div>
  );
};
