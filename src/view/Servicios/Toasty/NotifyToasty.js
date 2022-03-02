import { ToastContaine, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NotifyToasty = (text) => {
    toast.success(`${text}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
};


export {NotifyToasty};