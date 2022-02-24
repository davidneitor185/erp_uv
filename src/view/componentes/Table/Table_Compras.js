import React, { useState } from 'react';
import './Table.css'
import Table from 'react-bootstrap/Table'
import ordenesCompra from "./data.json";
import useAxios from '../../../useAxios';
import { Link } from 'react-router-dom';


function Table_Compras() {
  const {data} = useAxios("/ordenes");
  
  return(
    <div style={{ justifyContent: "center", width:"100%" }}>
      <div
              style={{
                margin: "2%",
                padding: "5%",
                width: "70%",
                border: "0.5px solid black",
                borderRadius: "45px",
              }}
            >
      <Table  striped bordered hover>
        <thead>
          <tr>
            <th>Id. Orden</th>

            <th>Total</th>
            <th>Tiempo de Llegada</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dat, key) => {
            return(
              <tr key={key}>
                <td>{dat.id_orden_compra}</td>
                <td>{dat.total}</td>
                <td>{dat.tiempo_e}</td>
                <td>{dat.est}</td>
                <td><Link className='btn btn-secondary' to={"/principal/verorden/"+ JSON.stringify(dat)}>🔍</Link></td>
                
              </tr>
            );
          })}
        </tbody>
      </Table>
      </div>
    </div>
    );
}


export default Table_Compras;
