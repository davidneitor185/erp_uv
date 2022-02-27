import React from "react";
import { Table } from "react-bootstrap";
import Paginas from "./Paginas";
import "./Table/TablaSI.css";

const TableRow = ({ children, ...other }) => {
  return <tr {...other}>{children}</tr>;
};

const TableCell = ({ children, ...other }) => {
  return <th {...other}>{children}</th>;
};

const TablePagination = ({ titulos, children, rowsPerPage, ornament }) => {
  const count = Math.ceil(children ? children.length / rowsPerPage : 0);
  const [page, setPage] = React.useState(0);

  return (
    <div
      style={{
        margin: "35px 0",
        padding: 35,
        border: "0.5px solid black",
        borderRadius: "45px",
      }}
    >
      <div style={{ borderRadius: 4 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              {titulos && titulos.map((titulo, index) => {
                return <th key={index}>{titulo}</th>;
              })}
            </tr>
          </thead>
          {children && <tbody>
            {rowsPerPage && children &&
              children.length > rowsPerPage ?
              children.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ):children}
          </tbody>}
        </Table>
        <div>
          {ornament && ornament}
        </div>
      </div>
      {children && <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {rowsPerPage && children.length > rowsPerPage && (
          <>
            <Paginas count={count} page={page} onChange={setPage} style={{margiBottom: 0}} />
          </>
        )}
      </div>}
    </div>
  );
};

export { TableCell, TableRow, TablePagination };
