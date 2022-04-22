import HeaderDashboard from '../../components/HeaderDashboard';
import './styles.css';


function Dashboard() {
    return (
        <div className="container-dashboard">
            <HeaderDashboard />
            <div className="content-dashboard">
                <div className="info-records">
                    <div className="infos">
                        <div className="date">
                            <h4>Data</h4>
                        </div>
                        <h4>Dia da semana</h4>
                        <h4>Descrição</h4>
                        <h4>Categoria</h4>
                        <h4>Valor</h4>
                    </div>
                </div>

                <div className="records">
                    <div className="abstract">
                        <h3>Resumo</h3>
                        <div className="entrances-and-exits">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Entradas</th>
                                        <th className='value-entries'>R$ 200,00</th>
                                    </tr>
                                    <tr className='exits'>
                                        <th>Saídas</th>
                                        <th>R$ 150,00</th>
                                    </tr>
                                    <tr className='balance'>
                                        <th>Saldo</th>
                                        <th>R$ 222222</th>
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