import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import UserState from "../User/UserState";
import Solicitudes from "./solicitudes/Solicitudes";
import CrearSoli from "./solicitudes/CrearSoli";
import VerSoli from "./solicitudes/VerSoli";
import Navbar from './componentes/Navbar';
;


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
            <Route path="/principal/versolicitud" element={<VerSoli/>}/>

          </Routes>
        </Router>
      </UserState>
    </div>
  );
};

export default Rutas;