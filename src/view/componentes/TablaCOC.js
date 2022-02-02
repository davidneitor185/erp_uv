import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Paginas from "./Paginas";
import ModalVerSoli from "../solicitudes/modalVerSolicitud";
import './Table/TablaSI.css';
import {BiXCircle} from "react-icons/bi";
import useAxios from "../../useAxios";

export const TablaCOC = ({titulos, ref}) => {
    const [row_ordes, setRowOrdenes] = useState([]);
    const data = useAxios(`/ordenCompraBySolci/${ref}`);

    /*useEffect(() => {
        const get_row = [];
        if(data){
            data.map((elm) => {
                const elements_row=[];

                elements_row.push(elm.id_orden_compra);
                elements_row.push(elm.jefe_compra);
                elements_row.push(elm.aprob_grte);
                elements_row.push(elm.id_solicitud);
                elements_row.push(elm.total)
                get_row.push(elements_row);     
          })
          setRowOrdenes(get_row);      
        }  
      }, [data])*/

      const get_row = [];
        if(data){
            data.map((elm) => {
                const elements_row=[];

                elements_row.push(elm.id_orden_compra);
                elements_row.push(elm.jefe_compra);
                elements_row.push(elm.aprob_grte);
                elements_row.push(elm.id_solicitud);
                elements_row.push(elm.total)
                get_row.push(elements_row);     
          })
          setRowOrdenes(get_row); 
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
        
        <Table striped bordered hover>
          <thead>
            <tr>
              { titulos.map((titulo, index) => {
                return <th key={index}>{titulo}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {row_ordes && row_ordes.map((dato, index) => {
              return (
                <tr key={index}>
                  {dato.map((datico, i) => {
                    return <td key={i}>{datico}</td>;
                  })}
                  <td className="tb">
                    <Button>
                        <BiXCircle />
                    </Button>
                  </td>
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

export default TablaCOC;