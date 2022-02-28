import { useContext } from "react";
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ingenieria from "./imagenes/ingenieria.png";
import Univalle from "./imagenes/Univalle.png";
import "./login.css";
import useAxios from "../../useAxios";
import { useState } from "react";
import { notify } from "../componentes/notify/Notify";
import axios from "axios";
import { url } from "../../db/variabledb";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../../User/UserContext";


const Login = () => {
    //estados iniciales
    const [url2, setUrl2] = useState(`${url}cuentas`);
    const history = useNavigate();
    const [user, setUser] = useState([]);
    const [datos, setDatos] = useState({
        email: "",
        contrasena: ""
    });
    const { dispatch } = useContext(UserContext);



    // Función de escucha que obtiene el valor de los campos de texto
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
    };

    //funciones
    const logearse = async () => {

        const ususario = await getUsuario();
        if (ususario[0] != []) {
            notify("logeado");
            dispatch({ type: 'LOGIN', payload: ususario[0] });
            history("/principal");
        }
    }

    const getUsuario = async (body) => {
        try {
            const response = await axios.get(url + 'cuenta/' + datos.email + '/' + datos.contrasena);
            //setUser(response.data);
            return response.data;
        } catch (error) {
            console.log("error al ingresar");
        }
    };



    return (
        <div className="login-content ">
            <ToastContainer />
            <div className="ingenieria">
                <img src={ingenieria} className="imagen" alt="imagen Ingenieria" />
            </div>

            <Form className="formulario rounded p-4 p-sm-3">
                <div className="logo_uni">
                    <img src={Univalle} className="logo" alt="logo univalle" />
                </div>
                <h3>Ingrese con su cuenta</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="email" placeholder="John.snow@gmail.com" name="email" onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" >
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="**********" name="contrasena" onChange={handleInputChange} />
                </Form.Group>
                <div className="row align-items-center">
                    <div className="col">
                        <Form.Check type="checkbox" label="Recuérdame" />
                    </div>
                    <div className="col">
                        <Alert.Link to="#">Olvidó su contraseña</Alert.Link>
                    </div>
                </div>
                <Button className="btn_iniciar" variant="primary" type="button" onClick={() => logearse()}>
                    Ingresar
                </Button>
            </Form>
           
        </div>

    );
};
export default Login; 