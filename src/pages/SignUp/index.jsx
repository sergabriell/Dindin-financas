import './styles.css';

function SignUp() {
    return (
        <div className="container-signup">
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
                </form>
            </div>
        </div>
    );
}

export default SignUp;