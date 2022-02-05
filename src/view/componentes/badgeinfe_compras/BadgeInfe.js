import React from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './badgeinfe.css';

const BadgeInfe = () => {
  return ( 
  <footer>
  <div style={{paddingLeft:25}}>
      <div>
  <Badge pill bg="primary" >
    <Link to={'/principal'} className='link'>
  1. Solicitudes internas
  </Link>
  </Badge>{' '}
  <Badge pill bg="secondary">
  <Link to={'/principal/ordenes_compra'} className='link'>
    2. Ordenes de compra
  </Link>
  </Badge>{' '}
</div>
  </div>;
  </footer>
  );
};

export default BadgeInfe;
