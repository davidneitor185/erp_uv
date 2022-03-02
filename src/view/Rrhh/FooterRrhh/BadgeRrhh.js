import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BadgeServicio = () => {

    const list_badge = [
        {
            "title": 'Listar Nominas',
            "link": '/recursoshumanos',
        },
        {
            "title": 'Crear Nomina',
            "link": '/crear_nomina',
        },
        {
            "title": "Contrataciones",
            "link": '/contrataciones'
        }
        //This title is provivional
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