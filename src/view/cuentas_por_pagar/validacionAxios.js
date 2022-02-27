import axios from "axios";

let notifica = 1;

const getCuentasxp = async () => {
    let datos = {};
    const url = "http://localhost:5000";
    try {
        const response = await axios.get(url + `/cuentaxpagar/todo`);
        datos = response.data;
        if (datos !== "" && datos !== null){
            return datos;
            } else {
              return false;
        }
    } catch (error) {
        console.error(error);
    }
};

const postCuentaxpNueva = async (itemP) => {
    const url = "http://localhost:5000";
    let final = 0;
    let datos = 0;
    let idcntaxp = 0;
    let cobroCnta = 0;

    itemP.map((elemento) => {
        cobroCnta = cobroCnta + elemento.costoT
    });

    let ctnxp = {
        ordencompra: itemP[0].orden,
        proveedor: itemP[0].proveedor,
        cobroto: cobroCnta,
        tiempopago: itemP[0].tiempopago,
        estado: itemP[0].estado
    };

    try {
        const response = await axios.post(url + `/cuentaxpagar`, ctnxp);
        datos = response.data;
        final = 3;
        notifica = final;
        console.log("este es el primer final", final);
        datos.map((da) =>{
            idcntaxp = da.idcuentaxp;
        })
    } catch (e) {
        console.log(e);
    }

    if (final === 3){
        itemP.map(async(elemen) => {
            try {
                let articulo = {
                    iditem: elemen.id,
                    nombreitem: elemen.nombre
                }; 
                const res = await axios.post(url + `/nuevoitem`, articulo);
                final = 2;
                notifica = final;
                console.log("este es el segundo final", final);
            } catch (error) {
            console.error(error);
            }

            if(final === 2){
                try {
                    let detalle = {
                        cuentaxpagar:idcntaxp,
                        cantidad: elemen.cantidad,
                        precio: elemen.costo,
                        item: elemen.id
                    };
                    const resp = await axios.post(url + `/detalle_cobro`, detalle);
                    final = 1;
                    notifica = final;
                    console.log("este es el tercer final", final);
                    return final;
            } catch (e) {
                console.log(e);
            }
            } else {
                return final;
            }
    });
    } else {
        return final;
    }

};

const notificacion = () =>{
    return notifica;
};


export { postCuentaxpNueva, notificacion };