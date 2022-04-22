import './styles.css';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';

function SignIn() {
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
                <form>
                    <label>
                        E-mail
                        <input
                            type='text'
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type='password'
                        />
                    </label>

                    <Link to='/dashboard'>
                        <button>Entrar</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default SignIn;