import './styles.css';
import Logo from '../../components/Logo';
import api from '../../services/api';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setItem } from '../../utils/localStorage';
import { notifyError } from '../../utils/toast';
import ReactGA from 'react-ga4';

function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        

        if (!email || !password) {
            return notifyError('Informe o email e a senha!');
        }

        try {
            const response = await api.post('/login', {
                email,
                senha: password
            })

            if (response.status > 204) {
                if (response.data.erro) {
                    return notifyError(response.data.erro);
                }
                return notifyError(response.data);
            }

            const { token, usuario } = response.data;

            setItem('token', token);
            setItem('userId', usuario.id);
            ReactGA.event({
            action: "login_action",
            category: "login_category",
            label: "login_label",
            value: "xxxx"
            })
            ReactGA.set({ userId: usuario.id, ['tracker2'] });

            navigate('/dashboard');
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    return (
        <div className="container-signin">
            <Logo />
            <div className="content-signin-left">
                <h1>
                    Controle suas <span>finanças</span>, <br />
                    sem planilha chata.
                </h1>
                <p>
                    Organizar as suas finanças nunca foi tão fácil,<br /> com o DINDIN,
                    você tem tudo num único lugar <br /> e em um clique de distância.
                </p>
                <Link to='/sign-up'>
                    <button>Cadastre-se</button>
                </Link>
            </div>
            <div className="content-signin-right">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        E-mail
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <button>Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
