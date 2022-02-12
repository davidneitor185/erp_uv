import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import UserState from "../User/UserState";
import Solicitudes from "./solicitudes/Solicitudes";
import CrearSoli from "./solicitudes/CrearSoli";
import Ordenes_compra from './ordenes_compra/ordenes_compra';
import CuentasPorPagar from "./cuentas_por_pagar/CuentasPorPagar";
import CrearCuentasxPagar from "./cuentas_por_pagar/CrearCuentasxPagar";



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
            <Route path="/cuentasporpagar/crear" element={<CrearCuentasxPagar />}/>
          </Routes>
        </Router>
      </UserState>
    </div>
  );
};

export default Rutas;