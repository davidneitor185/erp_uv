import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Table } from "react-bootstrap";
import Paginas from "./Paginas";

export const TablaSI = (props) => {
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
