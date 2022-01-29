import React from 'react';
import { Badge } from 'react-bootstrap';

const BadgeInfe = () => {
  return ( 
  <footer>
  <div style={{paddingLeft:25}}>
      <div>
  <Badge pill bg="primary">
  1. Solicitudes internas
  </Badge>{' '}
  <Badge pill bg="secondary">
    2. Ordenes de compra
  </Badge>{' '}
</div>
  </div>;
  </footer>
  );
};

export default BadgeInfe;
