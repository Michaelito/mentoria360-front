import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "@/styles/alert.css";

// PROPS MODAL
type ModalProps = {
    icon?  : "success" | "error" | "warning" | "info" | "question";
    title? : string;
    text?  : string;
    html?  : string;
    description?: string;
    showConfirmButton?: boolean;
    showCancelButton? : boolean;
    showDenyButton?   : boolean;
    confirmButtonText?: string;
    cancelButtonText? : string;
    allowOutsideClick?: boolean;
    allowEscapeKey?   : boolean;
    callback?: (result: SweetAlertResult) => void;
};

// PROPS TOAST
type ToastProps = {
    icon : "success" | "error" | "warning" | "info" | "question";
    title: string;
};

/*---- =======================
TOAST START ----------------*/
export function Toast({
    icon,
    title
}: ToastProps) {
    const Toast = Swal.mixin({
        toast: true,
        timer: 3000,
        position: "top",
        timerProgressBar: false,
        showConfirmButton: false,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    // FUNÇÃO PARA EXIBIR O TOAST
    Toast.fire({
        icon,
        title
    });
};
/*---- =======================
TOAST END ------------------*/

/*---- =======================
MODAL START ----------------*/
export function Modal({
    icon,
    title,
    text,
    html,
    showConfirmButton = true,
    showCancelButton  = false,
    showDenyButton    = false,
    confirmButtonText = "OK",
    cancelButtonText  = "Cancelar",
    allowOutsideClick = false,
    allowEscapeKey    = false,
    callback
}: ModalProps) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        icon,
        title,
        text,
        html,
        showConfirmButton,
        showCancelButton,
        showDenyButton,
        confirmButtonText,
        cancelButtonText,
        allowOutsideClick,
        allowEscapeKey,
        reverseButtons: true,
        customClass: {
            popup: "meu-modal",
            icon : "meu-icone",
            title: "meu-titulo",
            htmlContainer: "meu-html",
            confirmButton: "meu-confirmar",
            cancelButton : "meu-cancelar",
            denyButton   : "meu-negar"
        }
    }).then((result) => {
        if (callback) callback(result);
    });
};
/*---- =======================
MODAL END ------------------*/

/*---- =======================
LOADING START --------------*/
export function ModalLoading(show: boolean) {
    if (show) {
        Swal.fire({
            title: "Carregando...",
            text : "Estamos preparando tudo por aqui...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                popup: "meu-modal",
                title: "meu-titulo",
                htmlContainer: "meu-html"
            },
            didOpen: () => {
                Swal.showLoading();
            }
        });
    } else {
        Swal.close();
    }
};
/*---- =======================
LOADING END ----------------*/