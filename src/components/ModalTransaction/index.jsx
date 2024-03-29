/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import Close from '../../assets/close.svg';

import { useEffect, useState } from 'react';
import { getItem } from '../../utils/localStorage';
import { notifyError, notifySucess } from '../../utils/toast';
import api from '../../services/api';

function ModalTransaction({ modal, setModal, loadTransactions }) {
    const userId = getItem('userId');
    const token = getItem('token');

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
            return notifyError('Preencha todos os campos.');
        }

        try {
            const dataTransaction = {
                tipo,
                descricao,
                valor,
                data,
                usuario_id: userId,
                categoria_id: categoria
            }
            const response = await api.post(`/transacao`, dataTransaction, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status > 204) {
                return notifyError(response.data);
            }
            notifySucess('Registro realizado!')
            loadTransactions()
            setModal(!modal);
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    async function handleCategories() {
        try {
            const response = await api.get(`/categoria`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCategories([...response.data])
        } catch (error) {
            notifyError(error.response.data)
        }
    }

    useEffect(() => {
        handleCategories();
    }, []);

    useEffect(() => {
        entry ? setTipo('entrada') : setTipo('saida');
    }, [entry])

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
                    <div className="button-modal">
                        <button>Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalTransaction;