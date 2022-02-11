import { buildQueries } from '@testing-library/react';
import React from 'react';
import { Button, Nav, NavLink } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return <div style={{ paddingLeft: 25, paddingRight: 25, marginTop: 30 }}>
    <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link>
        <Link to={"/principal"} className='link' >Compras</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link>
        <Link to={"/cuentasporpagar"} className='link'>Cuentas Por Pagar</Link>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
      <Nav.Link>
        <Link to={"/cuentasporcobrar"} className='link'>Cuentas Por Cobrar</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link>
        <Link to={"/cuentascontables"} className='link'>Cuentas contables</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link>
        <Link to={"/ordenesservicio"} className='link'>Ordenes de Servicio</Link>
      </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link>
        <Link to={"/datosmaestros"} className='link'>Datos Maestros</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link>
        <Link to={"/rolesyperfiles"} className='link'>Roles & Perfiles</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link>
        <Link to={"/recursoshumanos"} className='link'>Recursos humanos</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link>
        <Link to={"/inventario"} className='link'>Inventario</Link>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Button>Logout</Button>
      </Nav.Item>
    </Nav>
  </div>;
};

export default Navbar;
