import Logo from '../../components/Logo';
import './styles.css';

function SignUp() {
    return (
        <div className="container-signup">
            <Logo />
            <div className="content-signup">
                <div className="title-signup">
                    <h1>Cadastre-se</h1>
                </div>
                <form>
                    <label>
                        Nome
                        <input
                            type="text"
                        />
                    </label>
                    <label>
                        E-mail
                        <input
                            type="text"
                        />
                    </label>
                    <label>
                        Senha
                        <input
                            type="password"
                        />
                    </label>
                    <label>
                        Confirmação de senha
                        <input
                            type="password"
                        />
                    </label>

                    <button>Cadastrar</button>
                </form>
                <a href='#'>Já tem cadastro? Clique aqui!</a>
            </div>
        </div>
    );
}

export default SignUp;