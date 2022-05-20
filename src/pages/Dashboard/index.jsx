/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import HeaderDashboard from '../../components/HeaderDashboard';
import TableRecords from '../../components/TableRecords';
import HeaderTable from '../../components/TableRecords/HeaderTable';
import { useEffect, useState } from 'react';
import { getItem } from '../../utils/localStorage';
import api from '../../services/api';
import ModalTransaction from '../../components/ModalTransaction';
import { notifyError } from '../../utils/toast';
import { formatToMoney } from '../../utils/formatters';


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

            if (!response.data) {
                return;
            }

            setTransactions(response.data);
            handleEntryAndExits();
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    async function handleEntryAndExits() {
        try {
            const response = await api.get('/transacao/extrato', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status > 204) {
                return notifyError(response.data);
            }
            setEntry(response.data.entrada);
            setExit(response.data.saida);
            setSum(Number(response.data.entrada) - Number(response.data.saida));
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    async function handleUser() {
        try {
            const response = await api.get('/usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status > 204) {
                return notifyError(response.data);
            }
            setUser(response.data.nome);
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    useEffect(() => {
        loadTransactions()
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
                                        <th className='value'>{formatToMoney(Number(entry))}</th>
                                    </tr>
                                    <tr className='exits'>
                                        <th>Saídas</th>
                                        <th className='value-negative'>{formatToMoney(Number(exit))}</th>
                                    </tr>
                                    <tr className='balance'>
                                        <th>Saldo</th>
                                        <th className='value-balance'>{formatToMoney(sum)}</th>
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
                    loadTransactions={loadTransactions}
                /> : ''}
        </div>
    );
}

export default Dashboard;