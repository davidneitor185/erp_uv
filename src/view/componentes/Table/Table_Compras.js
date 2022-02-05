import React, { useState } from 'react';
import './Table.css'
import Table from 'react-bootstrap/Table'
import ordenesCompra from "./data.json";
import ViewOrdenes from "../../ordenes_compra/ModalVerOrden/ViewOrdenes"
import useAxios from '../../../useAxios';
//import "bootstrap/dist/css/bootstrap.css";
//import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
//import BootstrapTable from "react-bootstrap-table-next";

function Table_Compras() {
  const {data} = useAxios("/ordenes");
  const [ordenes, setOrdenes] = useState(ordenesCompra);
  return(
    <div className='block_border'>
      <Table striped hover class="table table-striped">
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
                <td>{dat.timepo_e}</td>
                <td>{dat.est}</td>
                <td><ViewOrdenes data={dat}/></td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
    );
}


const columns = [
  {
    dataField: "IdOrden",
    text: "Id. Orden"
  },
  {
    dataField: "Proveedor",
    text: "Proveedor"
  },
  {
    dataField: "Total",
    text: "Total"
  },
  {
    dataField: "TiempoLlegada",
    text: "Tiempo de Llegada"
  },
  {
    dataField: "Estado",
    text: "Estado"
  },
  {
    text: "Opciones"
  }
];

/*function Table_Compras() {
  return(
    <div className='block_border'>
      <BootstrapTable
        bootstrap4
        keyField='IdOrden'
        data={ordenesCompra}
        columns={columns}
      />
    </div>
  );
}*/

export default Table_Compras;
