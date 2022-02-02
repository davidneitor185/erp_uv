import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Button, Table } from "react-bootstrap";
import Paginas from "./Paginas";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModalVerSoli from "../solicitudes/modalVerSolicitud";
import './Table/TablaSI.css';

export const TablaSI = ({titulos, datos}) => {

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
        
        <Table striped bordered hover>
          <thead>
            <tr>
              { titulos.map((titulo, index) => {
                return <th key={index}>{titulo}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {datos && datos.map((dato, index) => {
              return (
                <tr key={index}>
                  {dato.map((datico, i) => {
                    return <td key={i}>{datico}</td>;
                  })}
                  <td className="tb"><ModalVerSoli data_solicitud={dato[0]}/></td>
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
