import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import UserState from "../User/UserState";
import Solicitudes from "./solicitudes/Solicitudes";
import CrearSoli from "./solicitudes/CrearSoli";

import Ordenes_compra from './ordenes_compra/ordenes_compra';
import CuentasPorPagar from "./cuentas_por_pagar/CuentasPorPagar";
import CuentasPorCobrar from "./cuentas_por_cobrar/CuentasPorCobrar";
import CrearCuentaPorCobrar from "./cuentas_por_cobrar/CrearCuentaPorCobrar";
import RolesPerfiles from "./roles_y_perfiles/RolesPerfiles";
import CrearUsuario from "./roles_y_perfiles/CrearUsuario";


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
            <Route path="/cuentasporcobrar" element={<CuentasPorCobrar />}/>
            <Route path="/cuentasporcobrar/crear" element={<CrearCuentaPorCobrar />}/>
            <Route path="/rolesperfiles" element={<RolesPerfiles />}/>
            <Route path="/rolesperfiles/crear" element={<CrearUsuario />}/>
          </Routes>
        </Router>
      </UserState>
    </div>
  );
};

export default Rutas;