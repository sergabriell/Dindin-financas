import { toast } from 'react-toastify';

export const notifySucess = (mensagem) => {
    toast.success(mensagem, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        theme: 'colored',
        closeOnClick: true,
        pauseOnHover: false,
    })
}

export const notifyError = (mensagem) => {
    toast.error(mensagem, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
        theme: 'colored',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}