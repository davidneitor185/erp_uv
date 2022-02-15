import React from "react";
import { Pagination } from "react-bootstrap";

const Paginas = ({count, page, onChange}) => {

  const handelChange =(e, v) => {
    onChange(parseInt(e.target.outerText) - 1)
  }

  const pages = () =>{
    const paginas = []
    for (var i = 0; i < count ; i++ ){
      paginas.push(<Pagination.Item active={page === i} onClick={handelChange} value={i}>{ i + 1}</Pagination.Item>)
    }
    return paginas
  }


  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
      <Pagination>
        <Pagination.First disabled={page === 0}  onClick={() => onChange(0)}/>
        <Pagination.Prev disabled={page === 0} onClick={() => onChange(page - 1)}/>
        {pages()}
        <Pagination.Next disabled={page === count-1} onClick={() => onChange(page + 1)}/>
        <Pagination.Last disabled={page === count-1} onClick={() => onChange(count-1)} />
      </Pagination>
    </div>
  );
};

export default Paginas;
