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
import RolesPerfiles_rol from "./roles_y_perfiles/RolesPerfiles_rol";
import CrearUsuario from "./roles_y_perfiles/CrearUsuario";
import CrearRol from "./roles_y_perfiles/CrearRol";


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
            <Route path="/cuentasporcobrar/detalles/:id_cuentaxc" element= {<CrearCuentaPorCobrar />}/>
            <Route path="/rolesperfiles" element={<RolesPerfiles />}/>
            <Route path="/rolesperfiles/rol" element={<RolesPerfiles_rol />}/>
            <Route path="/rolesperfiles/crear" element={<CrearUsuario />}/>
            <Route path="/rolesperfiles/modificar/:id_funcionario" element={<CrearUsuario />}/>
            <Route path="/rolesperfiles/rol/crear" element={<CrearRol />}/>
            
          </Routes>
        </Router>
      </UserState>
    </div>
  );
};

export default Rutas;