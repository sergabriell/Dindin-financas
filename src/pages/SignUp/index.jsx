import './styles.css';
import Logo from '../../components/Logo';
import api from '../../services/api';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notifyError, notifySucess } from '../../utils/toast';

function SignUp() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.name || !form.email || !form.password || !form.confPassword) {
            return notifyError('Preencha todos os campos.')
        }

        if (form.password !== form.confPassword) {
            return notifyError('As senhas precisam ser iguais.');
        }

        try {
            const response = await api.post('/usuario', {
                nome: form.name,
                email: form.email,
                senha: form.password
            })

            if (response.status > 204) {
                return notifyError(response.data);
            }

            notifySucess('Cadastro realizado!')
            navigate('/');
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    function handleChangeForm({ target }) {
        setForm({ ...form, [target.name]: target.value });
    }

    return (
        <>

            <div className="container-signup">
                <Logo />
                <div className="content-signup">
                    <div className="title-signup">
                        <h1>Cadastre-se</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Nome
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChangeForm}
                            />
                        </label>
                        <label>
                            E-mail
                            <input
                                type="text"
                                name='email'
                                value={form.email}
                                onChange={handleChangeForm}
                            />
                        </label>
                        <label>
                            Senha
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChangeForm}
                            />
                        </label>
                        <label>
                            Confirmação de senha
                            <input
                                type="password"
                                name="confPassword"
                                value={form.confPassword}
                                onChange={handleChangeForm}
                            />
                        </label>

                        <button>Cadastrar</button>
                    </form>

                    <p href='#'>Já tem cadastro? <Link to='/sign-in'> Clique aqui!</Link></p>

                </div>

            </div>
        </>
    );
}

export default SignUp;