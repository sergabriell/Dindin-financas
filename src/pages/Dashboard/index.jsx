import HeaderDashboard from '../../components/HeaderDashboard';
import './styles.css';

import TableRecords from '../../components/TableRecords';
import HeaderTable from '../../components/TableRecords/HeaderTable';


function Dashboard() {
    return (
        <div className="container-dashboard">
            <HeaderDashboard />
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
                    <button>Adicionar Registro</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;