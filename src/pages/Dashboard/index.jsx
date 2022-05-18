import './styles.css';
import HeaderDashboard from '../../components/HeaderDashboard';
import TableRecords from '../../components/TableRecords';
import HeaderTable from '../../components/TableRecords/HeaderTable';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/localStorage';
import api from '../../services/api';
import ModalTransaction from '../../components/ModalTransaction';
import { notifyError } from '../../utils/toast';


function Dashboard() {
    const token = getItem('token');

    const [modal, setModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState('');
    const [entry, setEntry] = useState('');
    const [exit, setExit] = useState('');
    const [sum, setSum] = useState('');

    async function loadTransactions() {
        try {
            const response = await api.get(`/transacao`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTransactions(response.data);
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    useEffect(() => {
        async function handleEntryAndExits() {
            let valueEntries = 0;
            let valueExits = 0;
            let valueSum = 0;

            const transactionsData = await transactions;
            const entries = transactionsData.filter((transaction) => {
                return transaction.tipo === 'entrada';
            })

            entries.forEach((transaction) => {
                valueEntries += Number(transaction.valor);
            })

            const exits = transactionsData.filter((transaction) => {
                return transaction.tipo === 'saida'
            })

            exits.forEach((transaction) => {
                valueExits += Number(transaction.valor);
            })
            valueSum = valueEntries - valueExits;

            setEntry(valueEntries);
            setExit(valueExits);
            setSum(valueSum)
        }
        handleEntryAndExits();
    })

    useEffect(() => {
        loadTransactions();

    })

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
                notifyError(error.response.data);
            }
        }
        handleUser()
    })


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
                            loadTransactions={loadTransactions}
                            id_transaction={transaction.id}
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
                                        <th className='value-balance'>R$ {sum}</th>
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