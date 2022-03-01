import { buildQueries } from '@testing-library/react';
import React from 'react';
import { Button, Nav } from 'react-bootstrap';

const Navbar = () => {
  return <div style={{ display:"flex", flexDirection:"row" }}>
    <Nav bg="light" justify variant="tabs" defaultActiveKey="/home" style={{ alignItems:"center" }}>
      <Nav.Item>
        <Nav.Link href="/principal">Compras</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/cuentasporpagar">Cuentas Por Pagar</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/cuentasporcobrar">Cuentas Por Cobrar</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/cuentascontables">Cuentas contables</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/ordenesservicio">Ordenes de Servicio</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/datosmaestros">Datos Maestros</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/rolesyperfiles">Roles & Perfiles</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/recursoshumanos">Recursos humanos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/inventario">Inventario</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Button href="/">Logout</Button>
      </Nav.Item>
    </Nav>
  </div>;
};

export default Navbar;
