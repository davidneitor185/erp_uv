import { buildQueries } from '@testing-library/react';
import React from 'react';
import { Button, Nav, NavLink } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return <div style={{ paddingLeft: 25, paddingRight: 25, marginTop: 30 }}>
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Link to={"/principal"} className='link' >Compras</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/cuentasporpagar"} className='link'>Cuentas Por Pagar</Link>
      </Nav.Item>

      <Nav.Item>
        <Link to={"/cuentasporcobrar"} className='link'>Cuentas Por Cobrar</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/cuentascontables"} className='link'>Cuentas contables</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/servicios"} className='link'>Ordenes de Servicio</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/datosmaestros"} className='link'>Datos Maestros</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/rolesperfiles"} className='link'>Roles & Perfiles</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/recursoshumanos"} className='link'>Recursos humanos</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={"/inventario"} className='link'>Inventario</Link>
      </Nav.Item>
      <Nav.Item>
      <Link to={"/"} className="btn btn-primary" >Logout</Link>
      </Nav.Item>
    </Nav>
  </div>;
};

export default Navbar;