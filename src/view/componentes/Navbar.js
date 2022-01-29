import { buildQueries } from '@testing-library/react';
import React from 'react';
import { Button, Nav } from 'react-bootstrap';

const Navbar = () => {
  return <div style={{paddingLeft:25, paddingRight:25, marginTop:30}}>
    <Nav justify variant="tabs" defaultActiveKey="/home">
  <Nav.Item>
    <Nav.Link href="/home">Cuentas Por Pagar</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1">Cuentas Por Cobrar</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-2">Compras</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-3">Inventario</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-4">Roles & Perfiles</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-5">Servicios</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-6">Datos Maestros</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Button>Logout</Button>
  </Nav.Item>
</Nav>
  </div>;
};

export default Navbar;
