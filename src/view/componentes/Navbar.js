import { buildQueries } from '@testing-library/react';
import React from 'react';
import { Button, Nav } from 'react-bootstrap';

const Navbar = () => {
  return <div style={{ paddingLeft: 25, paddingRight: 25, marginTop: 30 }}>
    <Nav justify variant="tabs" defaultActiveKey="/home">
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
        <Nav.Link href="/rolesperfiles">Roles & Perfiles</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/recursoshumanos">Recursos humanos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/inventario">Inventario</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Button>Logout</Button>
      </Nav.Item>
    </Nav>
  </div>;
};

export default Navbar;
