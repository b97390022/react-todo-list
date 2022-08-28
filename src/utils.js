import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const mySwal = ({title, text, timer})=>{
    return MySwal.fire({
        title: title || '',
        text: text || '',
        timer: timer,
    });
}                