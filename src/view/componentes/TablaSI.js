import { findByLabelText } from "@testing-library/react";
import React from "react";
import { Button, Table } from "react-bootstrap";
import Paginas from "./Paginas";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModalVerSoli from "../solicitudes/modalVerSolicitud";
import VerDetalleCuentas from "../cuentas_por_pagar/VerDetalleCuentas";
import PagarCuenta from "../cuentas_por_pagar/PagarCuenta";
import AnularCuentas from "../cuentas_por_pagar/AnularCuentas";
import './Table/TablaSI.css';

export const TablaSI = ({titulos, datos, tipo}) => {

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
            {tipo && datos && datos.map((dato) => {
              if(tipo =="solicitudes"){
                return (
                  <tr>
                    {dato.map((datico, index) => {
                      return <td key={index}>{datico}</td>;
                    })}
                    <td><ModalVerSoli/></td>
                  </tr>
                );
              }else if(tipo == "cuentasxpagar"){
                return (
                  <tr>
                    {dato.map((datico, index) => {
                      return <td key={index}>{datico}</td>;
                    })}
                    <td>
                      <AnularCuentas />
                      <VerDetalleCuentas />
                      <PagarCuenta />
                      </td>
                  </tr>
                );
              }
              
            })}
          </tbody>
        </Table>
      </div>
      <Paginas />
    </div>
  );
};
