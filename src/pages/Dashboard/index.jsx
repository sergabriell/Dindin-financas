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

    async function handleTransactions() {

    }

    useEffect(() => {
        async function loadTransactions() {
            try {
                const response = await api.get(`/transacao`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(response.data);
            } catch (error) {
                console.log(error.response.data.message);
            }
        }

        loadTransactions();
    }, [])

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
                    <TableRecords />
                </div>

                <div className="records">
                    <div className="abstract">
                        <h3>Resumo</h3>
                        <div className="entrances-and-exits">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Entradas</th>
                                        <th className='value'>R$ 100,00</th>
                                    </tr>
                                    <tr className='exits'>
                                        <th>Saídas</th>
                                        <th className='value-negative'>R$ 80,00</th>
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