import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import UserState from "../User/UserState";
import Solicitudes from "./solicitudes/Solicitudes";
import CrearSoli from "./solicitudes/CrearSoli";
import VerSoli from "./solicitudes/VerSolicitud";
import Ordenes_compra from './ordenes_compra/ordenes_compra';
import CuentasPorPagar from "./cuentas_por_pagar/CuentasPorPagar";
import ViewOrdenes from "./ordenes_compra/verOrdenCompra/ViewOrdenes";
import CrearOrdenC from "./ordenes_compra/CrearOrdenC";


function Rutas() {
  return (
    <div className="App">
      <UserState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/principal" element={<Solicitudes/>}/>
            <Route path="/principal/crearsolicitud" element={<CrearSoli />}/>
            <Route path="/principal/versolicitud/:id" element={<VerSoli/>}/>            
            <Route path="/principal/ordenes_compra" element={<Ordenes_compra />}/>
            <Route path="/principal/verorden/:id" element={<ViewOrdenes/>}/>           
            <Route path="/cuentasporpagar" element={<CuentasPorPagar />}/>
            <Route path="/crearoc/:id" element={<CrearOrdenC />}/>
          </Routes>
        </Router>
      </UserState>
    </div>
  );
};

export default Rutas;