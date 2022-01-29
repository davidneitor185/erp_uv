import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import UserState from "../User/UserState";
import Solicitudes from "./solicitudes/Solicitudes";
import CrearSoli from "./solicitudes/CrearSoli";
import VerSoli from "./solicitudes/VerSoli";

function Rutas() {
  return (
    <div className="App">
      <UserState>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/principal" element={<Solicitudes />}/>
            <Route exact path="/principal/crearsolicitud" element={<CrearSoli />}/>
            <Route exact path="/principal/versolicitud" element={<VerSoli data= "1"/>}/>

          </Routes>
        </Router>
      </UserState>
    </div>
  );
};

export default Rutas;