import React, { useState, useEffect } from "react";
import Navbar from "../componentes/Navbar";
import { Button, Form, Row, Col } from "react-bootstrap";
import useAxios from "../../useAxios";
import axios from "axios";
import { notify } from "../componentes/notify/Notify";
import {
  TablePagination,
  TableRow,
  TableCell,
} from "../componentes/TablaPagination";
import { Link, useParams } from "react-router-dom";

function CrearCuentaPorCobrar() {
  //Estados iniciales

  /*SACA EL ID POR PARAMETRO CUANDO VA A MOSTRAR LOS DETALLES DE UNA CUENTA */
  const { id_cuentaxc } = useParams();

  /*TRAE LOS DATOS DE LA CUENTA POR COBRAR SI EXISTE EN LA TABLA cuentaxcobrar*/
  const { data: cuentac } = useAxios(`/detalles/${id_cuentaxc}`);

  const titulos = ["Servicio prestado", "Encargado", "Tarifa"];
  const { data: ordenesServicio } = useAxios("/ordenservicioCxC");
  const { data: fLim } = useAxios("/detalles/fechita");

  function addDaysToDate(days) {
    var res = new Date();
    res.setDate(res.getDate() + days);
    return res;
  }
  const [datos, setDatos] = useState({
    id_orden_servicio: 0,
    fecha_limite: addDaysToDate(fLim).toISOString(),
    estado_cxc: "Activa",
  });

  console.log(cuentac);

  const [datosOrden, setDatosOrden] = useState({
    total: 0,
    encargado: "",
    tarifa: "",
    servicioPrestado: "",
  });

  useEffect(() => {
    if (cuentac !== [] && id_cuentaxc) {
      setDatos({
        ...datos,
        id_orden_servicio: cuentac.idordenservicio,
        fecha_limite: cuentac.fecha_limite,
        estado_cxc: cuentac.estado_cxc,
      });
      setDatosOrden({
        total: cuentac.costototal,
        encargado: cuentac.nombre_funcionario,
        tarifa: "",
        servicioPrestado: "",
      });
    }
    if (!id_cuentaxc) {
      setDatos({
        ...datos,
        fecha_limite: addDaysToDate(fLim).toISOString(),
      });
    }
  }, [cuentac, id_cuentaxc]);

  const onChangeOrden = (ev) => {
    setDatos({ ...datos, [ev.target.name]: ev.target.value });
    const orden = ordenesServicio.filter(
      (orden) => orden.idordenservicio == ev.target.value
    )[0];
    console.log(ordenesServicio);
    console.log(orden);
    setDatosOrden({
      ...datosOrden,
      total: orden.costototal,
      encargado: orden.nombre_funcionario,
    });
  };

  /*FUNCIÓN QUE CAMBIA EL ESTADO*/
  const onChangeEstado = (evento) => {
    setDatos({ ...datos, estado_cxc : evento.target.value });
  };

  const crearCxC = async () => {
    if (datos.id_orden_servicio > 0) {
      const guardado = await axios.post(`http://localhost:5000/cuentaxc`, datos);
      if (guardado.status === 200) {
        notify("Cuenta por cobrar creada", "", "info");
      } else {
        notify("Error al crear la cuenta");
      }
    } else {
      notify("Por favor seleccione una orden de servicio");
    }
  };

  const actualizarCxC = async () => {
    if (datos.id_orden_servicio > 0) {
      const body = {estado_cxc:datos.estado_cxc, id_cuentaxc}
      console.log(body)
      const guardado = await axios.put(`http://localhost:5000/actualizar_estado`, body);
      if (guardado.status === 200) {
        notify("Actualización de estado exitosa", "", "info");
      } else {
        notify("Error al actualizar el estado");
      }
    } else {
      notify("Por favor llene todos los campos");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        {id_cuentaxc ? (
          <h3>Detalles Cuenta Por Cobrar</h3>
        ) : (
          <h3>Crear Cuenta Por Cobrar</h3>
        )}
      </div>
      <div>
        <Form.Group as={Row} style={{ justifyContent: "center" }}>
          <Col sm="2">
            <Form.Label>Orden de servicio</Form.Label>
            <Form.Select
              name="id_orden_servicio"
              value={datos.id_orden_servicio}
              onChange={onChangeOrden}
              disabled={id_cuentaxc}
            >
              
              <option value={0}>...</option>
              {ordenesServicio.map((ordenS) => {
                return (
                  <option
                    value={ordenS.idordenservicio}
                    key={ordenS.idordenservicio}
                  >
                    {ordenS.idordenservicio}
                  </option>
                );
              })}
              
            </Form.Select>
          </Col>
          <Col sm="2">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control
                type="date"
                value={
                  datos.fecha_limite && datos.fecha_limite.substring(0, 10)
                }
                disabled
              />
            </Form.Group>
          </Col>
          {id_cuentaxc && (
            <Col sm="2">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="estadoCxC"
                value={datos.estado_cxc}
                disabled={datos.estado_cxc === "Anulada"}
                onChange = {onChangeEstado}
              >
                <option value={"Activa"}>Activa</option>
                <option value={"Pagada"}>Pagada</option>
              </Form.Select>
            </Col>
          )}
        </Form.Group>
      </div>
      <div style={{ margin: "0 250px" }}>
        <TablePagination
          titulos={titulos}
          /*CUANTOS POR PAG*/
          rowsPerPage={5}
          ornament={
            <Col sm="3">
              <Form.Label>Total cuenta</Form.Label>
              <Form.Control
                placeholder={datos.id_orden_servicio > 0 && datosOrden.total}
                name="totalC"
                disabled
              />
            </Col>
          }
        >
          {datos.id_orden_servicio > 0 && (
            <TableRow>
              <TableCell key={1}>{datosOrden.servicioPrestado}</TableCell>
              <TableCell key={2}>{datosOrden.encargado}</TableCell>
              <TableCell key={3}>{datosOrden.tarifa}</TableCell>
            </TableRow>
          )}
        </TablePagination>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Col sm="1">
          <Link className="btn btn-secondary" to={"/cuentasporcobrar"}>
            Regresar
          </Link>
        </Col>
        <Col sm="1">
          {id_cuentaxc ? (
            <Button
              variant="secondary"
              style={{ backgroundColor: "purple" }}
              onClick = {actualizarCxC}
            >
              Actualizar
            </Button>
          ) : (
            <Button
              variant="secondary"
              style={{ backgroundColor: "purple" }}
              onClick={crearCxC}
            >
              Crear
            </Button>
          )}
        </Col>
      </div>
    </>
  );
}

export default CrearCuentaPorCobrar;
