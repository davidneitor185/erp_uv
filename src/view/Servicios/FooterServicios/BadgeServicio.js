import { Badge } from 'react-bootstrap';
import { BiNoEntry } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const BadgeServicio = () => {

    const list_badge = [
        {
            "title": 'Listar Ordenes Servicio',
            "link": '/servicios',
        },
        {
            "title": 'Crear Orden de servicio',
            "link": '/crearOrdenServicios',
        },
        //This title is provivional
        {
            "title": 'Editar estado OS',
            "link": '/MisOrdenesServicio',
        }
    ];

    return(
        <footer>
            <div style={{padding: 20, gap: 10}}>
                <div style={{display: "flex",gap: 10}}>
                    {list_badge.map((bg) => {
                        return <Badge pill bg='primary' >
                            <Link to={bg.link} style={{textDecoration: "none", color: "white"}}>
                                {bg.title}
                            </Link>
                        </Badge>;
                    })}
                </div>
            </div>
        </footer>
    );
}

export default BadgeServicio;