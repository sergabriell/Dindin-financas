import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import './styles.css';
import api from '../../services/api';
import { useState } from 'react';
import { notifyError, notifySucess } from '../../utils/toast';

function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            if (!name || !email || !password || !confPassword) {
                return;
            }

            if (password !== confPassword) {
                return notifyError('As senhas precisam ser iguais.');
            }

            const response = await api.post('/usuario', {
                nome: name,
                email,
                senha: password
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
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label>
                            E-mail
                            <input
                                type="text"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            Senha
                            <input
                                type="password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <label>
                            Confirmação de senha
                            <input
                                type="password"
                                value={confPassword}
                                required
                                onChange={(e) => setConfPassword(e.target.value)}
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