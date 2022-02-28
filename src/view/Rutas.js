import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import UserState from "../User/UserState";
import Solicitudes from "./solicitudes/Solicitudes";
import CrearSoli from "./solicitudes/CrearSoli";
import EstadoOS from "./Servicios/EstadoOS";
import Ordenes_compra from './ordenes_compra/ordenes_compra';
import CuentasPorPagar from "./cuentas_por_pagar/CuentasPorPagar";
import Servicios from "./Servicios/Servicios";
import { CrearServicios } from "./Servicios/CrearServicios";
import { TablaBarata } from "./Servicios/TablaBarata";
import { Nomina } from "./Rrhh/Nomina";
import { CrearNomina } from "./Rrhh/CrearNomina";



function Rutas() {
  return (
    <div className="App">
      <UserState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/principal" element={<Solicitudes />}/>
            <Route path="/principal/crearsolicitud" element={<CrearSoli />}/>
            <Route path="/principal/ordenes_compra" element={<Ordenes_compra />}/>         
            <Route path="/cuentasporpagar" element={<CuentasPorPagar />}/>
            <Route path="/servicios" element={<Servicios/>}/>
            <Route path="/crearOrdenServicios" element={<CrearServicios/>}/>
            {/* Esta ruta es provisional*/}
            <Route path="/MisOrdenesServicio" element={<EstadoOS />}/>
            <Route path="/recursoshumanos" element={<Nomina />} />
            <Route path="/crear_nomina" element={<CrearNomina />} />
          </Routes>
        </Router>
      </UserState>
    </div>
  );
};

export default Rutas;