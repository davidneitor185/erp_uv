import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import UserState from "../User/UserState";
import Solicitudes from "./solicitudes/Solicitudes";
import CrearSoli from "./solicitudes/CrearSoli";
import Navbar from './componentes/Navbar';
import CuentasPorPagar from "./cuentas_por_pagar/CuentasPorPagar";



function Rutas() {
  return (
    <div className="App">
      <UserState>
        <Navbar/>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/principal" element={<Solicitudes />}/>
            <Route path="/principal/crearsolicitud" element={<CrearSoli />}/>
            <Route path="/cuentasporpagar" element={<CuentasPorPagar />}/>

          </Routes>
        </Router>
      </UserState>
    </div>
  );
};

export default Rutas;