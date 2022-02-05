import React from 'react';

import Table_Compras from '../componentes/Table/Table_Compras';
import './Body.css';
import BadgeInfe from '../componentes/badgeinfe_compras/BadgeInfe';
import Navbar from '../componentes/Navbar';



const Ordenes_compra = () => {
  return(
    <>
      <Navbar/>
      <div className='body_container' >
          <div>
            <h2>Ordenes de Compra</h2>
          </div>
          <div> 
          </div>
          <div className='ancho'>
            <Table_Compras />
          </div>
          
      </div>
      <BadgeInfe></BadgeInfe>
      </>
  );
};

export default Ordenes_compra;
