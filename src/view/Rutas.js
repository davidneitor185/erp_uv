import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import UserState from "../User/UserState";
import Solicitudes from "./solicitudes/Solicitudes";
import CrearSoli from "./solicitudes/CrearSoli";
import Ordenes_compra from './ordenes_compra/ordenes_compra';
import CuentasPorPagar from "./cuentas_por_pagar/CuentasPorPagar";
import CrearCuentasxPagar from "./cuentas_por_pagar/CrearCuentasxPagar";
import DatosMaestros from "./datos_maestros/datos_maestros";
import EstadoOS from "./Servicios/EstadoOS";
import Servicios from "./Servicios/Servicios";
import { CrearServicios } from "./Servicios/CrearServicios";
import { TablaBarata } from "./Servicios/TablaBarata";
import { Nomina } from "./Rrhh/Nomina";
import { CrearNomina } from "./Rrhh/CrearNomina";
import VerSoli from "./solicitudes/VerSolicitud";
import ViewOrdenes from "./ordenes_compra/verOrdenCompra/ViewOrdenes";
import CrearOrdenC from "./ordenes_compra/CrearOrdenC";
import CuentasContables from "./componentes/cuentas_contables/cuentasContables";
import Inventario from "./componentes/inventario/Inventario";
import CrearEntrada from "./componentes/inventario/CrearEntrada";
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
            <Route path="/principal" element={<Solicitudes/>}/>
            <Route path="/principal/crearsolicitud" element={<CrearSoli />}/>
            <Route path="/principal/versolicitud/:id" element={<VerSoli/>}/>            
            <Route path="/principal/ordenes_compra" element={<Ordenes_compra />}/>
            <Route path="/principal/verorden/:id" element={<ViewOrdenes/>}/>           
            <Route path="/cuentasporpagar" element={<CuentasPorPagar />}/>
            <Route path="/cuentasporpagar/crear" element={<CrearCuentasxPagar />}/>
            <Route path="/datosmaestros" element={<DatosMaestros/>}/>
            <Route path="/servicios" element={<Servicios/>}/>
            <Route path="/crearOrdenServicios" element={<CrearServicios/>}/>
            {/* Esta ruta es provisional*/}
            <Route path="/MisOrdenesServicio" element={<EstadoOS />}/>
            <Route path="/recursoshumanos" element={<Nomina />} />
            <Route path="/crear_nomina" element={<CrearNomina />} />
            <Route path="/crearoc/:id" element={<CrearOrdenC />}/>
            <Route path="/cuentascontables" element={<CuentasContables />}/>
            <Route path="/inventario" element={<Inventario />}/>
            <Route path="/crearEntrada" element={<CrearEntrada />}/>
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