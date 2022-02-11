import { useParams } from "react-router-dom";
import VerSoliClass from "./VerSoli.js";



export default function VerSoli() {
  let params = useParams();


  
  return (<VerSoliClass id={params.id}></VerSoliClass>);
}


