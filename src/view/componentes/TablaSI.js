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
  const roluser = JSON.parse(window.localStorage.getItem('user')).id_rol;
  return (
    <div
      className = "tablaSi-content"
      style={ tipo === "cuentaxpdetalle" ? {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "890px",
        height: "300px",
        maxWidth: "890px",
        maxHeight: "300px",
        margin: "1%",
        borderRadius: "45px",
      } : {
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        width: "890px",
        height: "350px",
        maxWidth: "890px",
        maxHeight: "350px",
        margin: "3%",
        padding: "5%",
        border: "0.5px solid black",
        borderRadius: "45px",
      } }
    >
      <div style={{borderRadius:4, maxHeight:"290px", overflowY:"scroll"}}>
        
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              { titulos.map((titulo, index) => {
                return <th key={index}>{titulo}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {tipo && datos && datos.map((dato) => {
              if(tipo === "solicitudes"){
                return (
                  <tr>
                    {dato.map((datico, index) => {
                      return <td key={index}>{datico}</td>;
                    })}
                    <td><ModalVerSoli/></td>
                  </tr>
                );
              }else if(tipo === "cuentasxpagar"){
                
                return (
                  <tr>
                    { dato !== undefined && dato.length !== 0 && dato.map((datico, index) => {
                      return<td key={index}>{datico}</td>;
                      })
                     }
                     <td>
                      { roluser === 7 && dato[3] !== "Anulado" && 
                      <AnularCuentas
                       id={dato[0]} />}

                      <VerDetalleCuentas 
                      info={dato[0]}
                      recibo={dato[4]}
                      estado={dato[3]} />

                      {roluser === 6 && dato[4] === "No aplica" &&
                       <PagarCuenta 
                      dato={dato[0]}
                      total={dato[2]}/> }
                    </td> 
                  </tr>
                );
              }else if(tipo === "cuentaxpdetalle"){
                return (
                  <tr>
                    { dato.length !== 0 && dato.map((datico, index) => {
                      return <td key={index}>{datico}</td>;
                    })}
                  </tr>
                );
              }
              
            })}
          </tbody>
        </Table>
      </div>
      {tipo !== "cuentasxpagar" && tipo !== "cuentaxpdetalle" &&
        <Paginas />
      }
    </div>
  );
};
