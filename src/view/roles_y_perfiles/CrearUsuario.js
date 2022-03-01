import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import useAxios from "../../useAxios";
import axios from "axios";
import { notify } from "../componentes/notify/Notify";
import { ToastContainer } from "react-toastify";

const CrearUsuario = () => {
  /* LOGICA*/
  //Estados iniciales

  /*SACA EL ID POR PARAMETRO CUANDO SE VA A MODIFICAR UN USUARIO */
  const { id_funcionario } = useParams();

  /*TRAE LOS DATOS DEL FUNCIONARIO SI EXISTE EN LA TABLA FUNCIONARIOS Y TIENE UNA CUENTA*/
  const { data: funcionario } = useAxios(`/usuarioID/${id_funcionario}`);

  const [datos, setDatos] = useState({
    nombre: "",
    id: "",
    email: "",
    contra: "",
    tel: "",
    rol: 0,
    departamento: "",
    jefe: 0,
  });

  useEffect(() => {
    if (funcionario && id_funcionario) {
      setDatos({
        nombre: funcionario.nombre_funcionario,
        id: funcionario.identificacion,
        email: funcionario.email,
        contra: funcionario.contraseña,
        tel: funcionario.tel,
        rol: funcionario.id_rol,
        departamento: funcionario.depto_funcionario,
        jefe: funcionario.jefe_inmediato,
      });
    }
  }, [funcionario]);

  const verifi = () => {
    if (
      datos.nombre.length < 1 ||
      datos.id.length < 1 ||
      datos.email.length < 1 ||
      datos.contra.length < 1 ||
      datos.tel.length < 1 ||
      datos.rol < 1 ||
      datos.departamento.length < 1 ||
      datos.jefe < 1
    )
      return false;
    else return true;
  };

  const { data: roles } = useAxios("/roles");
  const { data: jefes } = useAxios("/jefes");

  /*FUNCIÓN QUE CAMBIA LOS DATOS*/
  const onChange = (evento) => {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
  };

  /*FUNCIÓN MODIFICAR*/

  /*FUNCIÓN REGISTRAR*/

  const registrar = async () => {
    if (verifi) {
      const guardado = await axios.post(`http://localhost:5000/usuario`, datos);
      if (guardado.status === 200) {
        notify("Usuario registrado", "", "info");
      } else {
        notify("Error al registrar el usuario");
      }
    } else {
      notify("Por favor llene todos los campos");
    }
  };

  const modificar = async () => {
    if (verifi) {
      const body = {...datos, id_funcionario}
      console.log(body)
      const guardado = await axios.put(`http://localhost:5000/modificar_usuario`, body);
      if (guardado.status === 200) {
        notify("Actualización de datos exitosa", "", "info");
      } else {
        notify("Error al actualizar el usuario");
      }
    } else {
      notify("Por favor llene todos los campos");
    }
  };

  /*VISTA*/
  return (
    <>
      <ToastContainer />
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          marginTop: "1.5%",
          marginBottom: "1.5%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alingItems: "center",
            width: "40.5%",
            border: "1px solid",
            borderRadius: 5,
            padding: 24,
            backgroundImage: "url('/fondoSlime.jpg')",
            backgroundPosition: "center bottom",
            flexDirection: "column",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            {id_funcionario ? (
              <h3>Modificar Usuario</h3>
            ) : (
              <h3>Crear Usuario</h3>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <HiUserCircle style={{ fontSize: 160 }} />
          </div>

          <div
            style={{
              border: "1px solid",
              borderRadius: 5,
              margin: "auto 0",
              padding: 24,
              background: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form.Group
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  columnGap: 50,
                }}
              >
                <div sm="3">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    placeholder="..."
                    name="nombre"
                    value={datos.nombre}
                    onChange={onChange}
                  />
                </div>
                <div sm="3">
                  <Form.Label>Identificación</Form.Label>
                  <Form.Control
                    placeholder="..."
                    name="id"
                    value={datos.id}
                    onChange={onChange}
                  />
                </div>
                <div sm="3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    placeholder="..."
                    name="email"
                    value={datos.email}
                    onChange={onChange}
                  />
                </div>
                <div sm="3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    placeholder="..."
                    name="contra"
                    value={datos.contra}
                    onChange={onChange}
                  />
                </div>
                <div sm="3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    placeholder="..."
                    name="tel"
                    value={datos.tel}
                    onChange={onChange}
                  />
                </div>
                <div sm="3" style={{ width: 206.8 }}>
                  <Form.Label>Rol</Form.Label>
                  <Form.Select name="rol" value={datos.rol} onChange={onChange}>
                    <option value={0}>...</option>
                    {roles.map((rol) => {
                      return (
                        <option value={rol.id_rol} key={rol.id_rol}>
                          {rol.nombre_rol}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
                <div sm="3" style={{ width: 206.8 }}>
                  <Form.Label>Departamento</Form.Label>
                  <Form.Select
                    name="departamento"
                    value={datos.departamento}
                    onChange={onChange}
                  >
                    <option value={""}>...</option>
                    <option value={"compras"}>Compras</option>
                    <option value={"ventas"}>Ventas</option>
                  </Form.Select>
                </div>
                <div sm="3" style={{ width: 206.8 }}>
                  <Form.Label>Jefe inmediato</Form.Label>
                  <Form.Select
                    name="jefe"
                    value={datos.jefe}
                    onChange={onChange}
                  >
                    <option value={0}>...</option>
                    {jefes.map((jefe) => {
                      return (
                        <option value={jefe.id_jefe} key={jefe.id_jefe}>
                          {jefe.cargo}
                        </option>
                      );
                    })}
                  </Form.Select>
                </div>
              </Form.Group>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <div sm="1">
                <Link className="btn btn-secondary" to={"/rolesperfiles"}>
                  Regresar
                </Link>
              </div>
              <div sm="1">
                {id_funcionario ? (
                  <Button
                    variant="secondary"
                    style={{ backgroundColor: "purple" }}
                    onClick = {modificar}
                  >
                    Modificar
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    style={{ backgroundColor: "purple" }}
                    onClick={registrar}
                  >
                    Registrar
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrearUsuario;
