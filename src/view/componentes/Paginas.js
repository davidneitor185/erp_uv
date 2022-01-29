import React from "react";
import { Pagination } from "react-bootstrap";

const Paginas = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item active>{1}</Pagination.Item>
        {// .Item active resalta, .Item disabled no permite seleccionar
        }
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

export default Paginas;
