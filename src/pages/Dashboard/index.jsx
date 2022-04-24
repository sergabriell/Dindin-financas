import './styles.css';
import HeaderDashboard from '../../components/HeaderDashboard';
import TableRecords from '../../components/TableRecords';
import HeaderTable from '../../components/TableRecords/HeaderTable';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import ModalTransaction from '../../components/ModalTransaction';


function Dashboard() {
    const token = getItem('token');
    const userId = getItem('userId');

    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState('');
    const [entry, setEntry] = useState('');
    const [exit, setExit] = useState('');

    async function loadTransactions() {
        try {
            const response = await api.get(`/transacao`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTransactions(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    // useEffect(() => {
    //     async function handleEntryAndExits() {
    //         const transactionsData = await transactions;
    //         const entries = transactionsData.filter((transaction) => {
    //             return transaction.tipo === 'entrada';
    //         })

    //         entries.forEach((transaction) => {
    //             setEntry(transaction.valor + entry);
    //         })

    //         const exits = transactionsData.filter((transaction) => {
    //             return transaction.tipo === 'saida'
    //         })

    //         exits.forEach((transaction) => {
    //             setExit(transaction.valor + exit);
    //         })
    //     }
    //     handleEntryAndExits();
    // }, [modal])

    useEffect(() => {
        loadTransactions();

    }, [modal])

    useEffect(() => {
        async function handleUser() {
            try {
                const response = await api.get('/usuario', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setUser(response.data.nome);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }
        handleUser()
    }, [])


    return (
        <div className="container-dashboard">
            <HeaderDashboard
                name={user}
            />
            <div className="content-dashboard">
                <div className="info-records">
                    <HeaderTable />
                    {transactions.map((transaction) => (
                        <TableRecords
                            key={transaction.id}
                            data={transaction.data}
                            descricao={transaction.descricao}
                            categoria={transaction.categoria_nome}
                            valor={transaction.valor}
                            tipo={transaction.tipo}
                        />
                    ))}
                </div>

                <div className="records">
                    <div className="abstract">
                        <h3>Resumo</h3>
                        <div className="entrances-and-exits">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Entradas</th>
                                        <th className='value'>R$ {entry}</th>
                                    </tr>
                                    <tr className='exits'>
                                        <th>Saídas</th>
                                        <th className='value-negative'>R$ {exit}</th>
                                    </tr>
                                    <tr className='balance'>
                                        <th>Saldo</th>
                                        <th className='value-balance'>R$ 20,00</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <button onClick={() => setModal(!modal)}>Adicionar Registro</button>

                </div>
            </div>
            {modal ?
                <ModalTransaction
                    modal={modal}
                    setModal={setModal}
                /> : ''}
        </div>
    );
}

export default Dashboard;