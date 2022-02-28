import React from "react";
import { useState, useEffect } from "react";
import { TablaSI } from "../componentes/TablaSI";
import Navbar from "../componentes/Navbar";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAxios from "../../useAxios";
import { ToastContainer } from "react-toastify";
import { notify } from "../componentes/notify/Notify";
import { postCuentaxpNueva, notificacion } from "./validacionAxios";

const CrearCuentasxPagar = () => {

    //Declaraciones
    const [datos, setDatos] = useState({
        orden: 0,
        proveedor: 0,
        fecha:"",
        nombre: "", 
        cantidad: "",
        costo:"",
        estado:"Activo"
    });

    //Estado de errores
    const [errores, setErrores] = useState({
        orden : false,
        proveedor: false,
        fecha: false,
        nombre: false,
        costo: false,
        cantidad: false
    });

    const [item, setItem] = useState([]);
    const [list, setList] = useState([]);
    const [cobroto, setCobroto] = useState({valor:0});
    const [turn, setTurn] = useState(false);
    const [full, setFull] = useState(true);
    const [notifica, setNotifica] = useState(0);

    const titulos = [
     "ID", "Item", "Cantidad", "Costo", "Costo Total"
    ];
    const tipo = "cuentaxpdetalle";

    //Lista de órdenes de compras. Select01
   const listOrd = useAxios("/soloorden_c");
   const orden = listOrd.data;

   //Lista de proveedores. Select02
   const listProv = useAxios("/proveedor/todos");
   const prov = listProv.data;
  

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        });
    };

    const cadenaAleatoria = (num) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result1= Math.random().toString(36).substring(0,num);       

        return result1;
    };

    const aleatorio = (inferior, superior) => {
        var numPosibilidades = superior - inferior;
        var aleatorio = Math.random() * (numPosibilidades + 1);
        aleatorio = Math.floor(aleatorio);
        return inferior + aleatorio;
    };
    
    //validaciones del form
    const validaFecha = () =>{
        const feDa = new Date();
        const fechaAct = new Date(
            feDa.getFullYear(),
            feDa.getMonth(),
            feDa.getDate()
        );
        const fec = Date.parse(datos.fecha);
        const fecAc = Date.parse(fechaAct);
        if (fec > fecAc) {
            return 1;
        } else {
            return 0;
        }
    };
    const validaForm = () =>{
        const fechita = validaFecha();
        if (datos.orden === 0 && fechita === 0 && datos.proveedor === 0 && (datos.cantidad == "" || datos.cantidad <= 0) &&
            datos.nombre === "" && (datos.costo === "" || datos.costo <= 0)) {
            setErrores({
                orden: true,
                fecha: true,
                proveedor: true,
                cantidad: true,
                nombre: true,
                costo: true
            });
            return 0;
        } else if (datos.orden === 0) {
            setErrores({
                orden: true
            });
            return 0;
        } else if (datos.proveedor === 0) {
            setErrores({
                proveedor: true
            });
            return 0;
        } else if (fechita === 0) {
            setErrores({
                fecha: true
            });
            return 0;
        }else if (datos.nombre === "") {
            setErrores({
                nombre: true
            });
            return 0;
        } else if (datos.costo === "" || datos.costo <= 0) {
            setErrores({
                costo: true
            });
            return 0;
        } else if (datos.cantidad === "" || datos.cantidad <= 0) {
            setErrores({
                cantidad: true
            });
            return 0;
        }  else {
            setErrores({
                orden: false,
                proveedor: false,
                fecha: false,
                nombre: false,
                costo: false,
                cantidad: false
            });
            
            return 1;
        }
        
    };


    const agregarItem = () =>{
        
        const valida = validaForm();
        console.log(valida);
            if(valida === 0){
                //Digite otro
            } else {
                console.log("Pasó la validación")
                let numAle = aleatorio(1, 999);
                let dato = [
                    cadenaAleatoria(numAle),
                    datos.nombre,
                    datos.cantidad,
                    datos.costo,
                    datos.costo * datos.cantidad
                ];
                setCobroto({
                    ...cobroto,
                    valor: cobroto.valor + (datos.costo * datos.cantidad)
                });
                setList([
                    ...list,
                    dato
                ]);
                setTurn(true);
                setFull(false);
                let it = { 
                    id: cadenaAleatoria(numAle),
                    nombre: datos.nombre,
                    cantidad: datos.cantidad,
                    costo: datos.costo,
                    costoT: datos.costo * datos.cantidad,
                    estado: datos.estado,
                    orden: datos.orden,
                    proveedor: datos.proveedor,
                    tiempopago: datos.fecha
                };
                item.push(it);
            }
    }; 


    const guardar = () =>{
        let respuesta = postCuentaxpNueva(item);
        let ntcn = notificacion();
        if(ntcn === 1){
            notify("Se ha creado exitosamente", "", "info");
        } else if(ntcn === 3 || ntcn === 2 || ntcn === 0){
            notify("Ha ocurrido un error, por favor recargue la página", "", "error");
        }
    };


    return (
        <div className="contePpal" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Navbar />
            <ToastContainer />
            <div style={{ marginTop: 20 }}>
                <h3>Registrar nueva cuenta</h3>
            </div>
            <div style={{
                 alignItems: "center",
                  width: "80%",
                  margin: "1%",
                  padding: "1%",
                  border: "0.5px solid black",
                  borderRadius: "45px" }}>
                <Form className="form rounded p-4 p-sm-3">
                    <Form.Group as={Row} className="mb-3" controlId="primera_linea" >
                        <Col className="mb-3">
                            <Form.Label>Orden de compra asociada</Form.Label>
                            <Form.Select name="orden" onChange={handleInputChange} disabled = {turn}>
                                <option value={0}>Orden De Compra</option>
                                {orden.map((elemento) => (
                                    <option key={elemento.id_orden_compra} value={elemento.id_orden_compra}>{elemento.id_orden_compra}</option>
                                ))}
                            </Form.Select>
                            {errores && errores.orden &&
                                <span className="span text-danger text-small d-block">
                                    Seleccione una orden de compra
                                </span>}
                        </Col>
                        <Col className="mb-3">
                        <Form.Label>Proveedor</Form.Label>
                        <Form.Select name="proveedor" onChange={handleInputChange} disabled = {turn}>
                                <option value={0}>Proveedor</option>
                                {prov.map((elemento) => (
                                    <option key={elemento.proveedor} value={elemento.id_proveedor}>{elemento.proveedor}</option>
                                ))}
                            </Form.Select>
                            {errores && errores.proveedor &&
                                <span className="span text-danger text-small d-block">
                                    Seleccione un proveedor
                                </span>}
                           </Col>
                        <Col className="mb-3">
                            <Form.Label>Fecha límite para pago</Form.Label>
                            <Form.Control placeholder="Ingrese la fecha" name="fecha" onChange={handleInputChange} />
                            <Form.Text className="text-muted">
                                 Año-Mes-Día.
                            </Form.Text>
                            {errores && errores.fecha &&
                                <span className="span text-danger text-small d-block">
                                    Ingrese fecha mayor a la actual
                                </span>} 
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="segunda_linea" >
                    <Col className="mb-3">
                            <Form.Label>Nombre item</Form.Label>
                            <Form.Control placeholder="Ingrese el nombre" name="nombre" onChange={handleInputChange} />
                            {errores && errores.nombre &&
                                <span className="span text-danger text-small d-block">
                                    Ingrese el nombre
                                </span>} 
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Costo</Form.Label>
                            <Form.Control placeholder="Ingrese el costo" name="costo" onChange={handleInputChange} />
                            {errores && errores.costo &&
                                datos.costo === "" ?
                                <span className="span text-danger text-small d-block">
                                    Campo obligatorio.
                                </span>
                                : errores && errores.costo && datos.costo <= 0 &&
                                <span className="span text-danger text-small d-block">
                                    Ingrese números mayores que cero.
                                </span>
                            }
                        </Col>
                        <Col className="mb-3">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control placeholder="Ingrese la cantidad" name="cantidad" onChange={handleInputChange} />
                            {errores && errores.cantidad &&
                                datos.cantidad === "" ?
                                <span className="span text-danger text-small d-block">
                                    Campo obligatorio.
                                </span>
                                : errores && errores.cantidad && datos.cantidad <= 0 &&
                                <span className="span text-danger text-small d-block">
                                    Ingrese números mayores que cero.
                                </span>
                            }
                        </Col>
                        <Button type="button" variant="warning" size="lg" onClick = {() => agregarItem()}>Añadir a la tabla</Button>
                        <div style={{ display:"flex", justifyContent:"center", height: "290px" }}>
                            <TablaSI titulos={titulos} datos={list} tipo={tipo} />
                        </div>
                        <Col className="mb-2 p-2">
                                <Form.Label>Cobro Total</Form.Label>
                                <Form.Control value={cobroto.valor} name="cobroT" disabled/>
                        </Col>
                        <Col className="mb-2 p-2">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control value={datos.estado} name="estado" disabled/>
                        </Col>
                        <Col className="mb-2 p-2">
                            <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", width:"250px", margin: "32px 45px 0"}}>
                                <Button type="button" variant="warning" onClick = {() => guardar()} disabled={full} >Guardar</Button>
                                <Link className="btn btn-secondary" to={"/cuentasporpagar"}>Regresar</Link>
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
                
            </div>
        </div>
    );
};

export default CrearCuentasxPagar;