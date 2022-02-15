import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import PurpleSlime from "../componentes/Imagenes/PurpleSlime.PNG";

const CrearUsuario = () => {
  return (
    <div style={{ justifyContent: "center", display: "flex", alignItems: "center", marginTop:"1.5%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alingItems: "center",
          width: "28%",
          border: "1px solid",
          borderRadius: 5,
          padding: 24,
          backgroundImage:
            "url(https://png.pngtree.com/thumb_back/fh260/background/20200425/pngtree-purple-abstract-paper-cut-slime-background-image_334593.jpg)",
          backgroundPosition: "center bottom",
          flexDirection: "column",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Crear Usuario</h3>
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
                flexDirection: "column",
              }}
            >
              <div sm="3">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control placeholder="..." name="Nombre" />
              </div>
              <div sm="3">
                <Form.Label>Identificación</Form.Label>
                <Form.Control placeholder="..." name="Id" />
              </div>
              <div sm="3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control placeholder="..." name="Email" />
              </div>
              <div sm="3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control placeholder="..." name="Tel" />
              </div>
              <div sm="3">
                <Form.Label>Rol</Form.Label>
                <Form.Select name="Rol">
                  <option>Rol 1</option>
                  <option>Rol 2</option>
                  <option>Rol 3</option>
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
              <Button variant="secondary" style={{ backgroundColor: "purple" }}>
                Registrarse
              </Button>
            </div>
            <div sm="1">
              <Link className="btn btn-secondary" to={"/rolesperfiles"}>
                Regresar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrearUsuario;
