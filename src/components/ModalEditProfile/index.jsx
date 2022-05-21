/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import Close from '../../assets/close.svg';

import { useEffect, useState } from 'react';
import { getItem } from '../../utils/localStorage';
import { notifyError, notifySucess } from '../../utils/toast';
import api from '../../services/api';

const defaultForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function ModalEditProfile({ open, handleClose }) {
    const token = getItem('token');

    const [form, setForm] = useState({ ...defaultForm });


    function handleChangeForm({ target }) {
        setForm({ ...form, [target.name]: target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            return notifyError('Informe todos os campos para atualização.')
        }

        if (form.password !== form.confirmPassword) {
            return notifyError('As senhas precisam ser iguais.')
        }


        try {
            const response = await api.put('/usuario',
                {
                    nome: form.name,
                    email: form.email,
                    senha: form.password
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            handleClose();
            handleClearForm();

            if (response.status > 204) {
                return notifyError(response.data);
            }
            notifySucess('Perfil atualizado!')
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    function handleClearForm() {
        setForm({ ...defaultForm });
    }

    useEffect(() => {
        async function loadUserProfile() {
            try {
                const response = await api.get('/usuario', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const { nome, email } = response.data;

                setForm({
                    name: nome,
                    email: email,
                });

            } catch (error) {
                notifyError(error.response.data)
            }
        }

        if (open) {
            loadUserProfile();
        }
    }, [open]);

    return (
        <>
            {open &&
                <div className='container-modal'>
                    <div className='modal-profile'>
                        <div className="header-modal-profile">
                            <h1>Editar Perfil</h1>
                            <img
                                src={Close}
                                alt="close"
                                onClick={handleClose}
                            />
                        </div>
                        <form onSubmit={handleSubmit}>

                            <label>Nome</label>
                            <input
                                type="text"
                                name='name'
                                value={form.name}
                                onChange={handleChangeForm}
                            />


                            <label>E-mail</label>
                            <input
                                type="text"
                                name='email'
                                value={form.email}
                                onChange={handleChangeForm}
                            />


                            <label>Senha</label>
                            <input
                                type="password"
                                name='password'
                                value={form.password}
                                onChange={handleChangeForm}
                            />


                            <label>Confirmação de senha</label>
                            <input
                                type="password"
                                name='confirmPassword'
                                value={form.confirmPassword}
                                onChange={handleChangeForm}
                            />


                            <div className="button-modal">
                                <button>Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default ModalEditProfile;