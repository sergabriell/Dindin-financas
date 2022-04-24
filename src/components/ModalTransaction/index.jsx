import './styles.css';
import Close from '../../assets/close.svg';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';

function ModalTransaction({ modal, setModal }) {
    const token = getItem('token');
    const userId = getItem('userId');

    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [data, setData] = useState('');
    const [descricao, setDescricao] = useState('');

    const [categories, setCategories] = useState([]);

    const [entry, setEntry] = useState(true);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!valor || !categoria || !data) {
            return;
        }
        try {
            const response = await api.post(`/transacao`, {
                tipo,
                descricao,
                valor,
                data,
                usuario_id: userId,
                categoria_id: categoria
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status > 204) {
                return;
            }

            setModal(!modal);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        entry ? setTipo('entrada') : setTipo('saida');
    }, [entry])

    useEffect(() => {
        async function handleCategories() {
            try {
                const response = await api.get('/categoria', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCategories([...response.data])
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        handleCategories()
    }, [])

    return (
        <div className="container-modal">
            <div className="modal">
                <div className="header-modal">
                    <h1>Adicionar Registro</h1>
                    <img
                        src={Close}
                        alt="close"
                        onClick={() => setModal(!modal)}
                    />
                </div>
                <div className="options-values">
                    <section
                        className={entry ? 'option-entry' : 'option'}
                        onClick={() => setEntry(true)}
                    >Entrada</section>
                    <section
                        className={entry ? 'option' : 'option-exit'}
                        onClick={() => setEntry(false)}
                    >Saída</section>
                </div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Valor
                        <input
                            type="text"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                        />
                    </label>
                    <label>
                        Categoria
                        <select
                            name="categoria"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option></option>
                            {categories.map((categorie) => (
                                <option
                                    key={categorie.id}
                                    value={categorie.id}
                                >{categorie.descricao}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Data
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                        />
                    </label>
                    <label>
                        Descrição
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </label>
                    <button>Confirmar</button>
                </form>
            </div>
        </div>
    )
}

export default ModalTransaction;