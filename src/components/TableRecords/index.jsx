import './styles.css';
import IconEditing from '../../assets/icon-editing.svg';
import IconDelete from '../../assets/icon-delete.svg';
import { format } from 'date-fns';
import api from '../../services/api';
import { getItem } from '../../utils/localStorage';

function TableRecords({ id_transaction, data, descricao, categoria, valor, tipo, loadTransactions }) {

    const diaDaSemana = format(new Date(data), 'EEEE');
    const dataTratada = format(new Date(data), 'dd/MM/yy');

    async function handleDelete() {
        const token = getItem('token');

        try {
            const response = await api.delete(`/transacao/${id_transaction}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status > 204) {
                return;
            }
            loadTransactions();
        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="data-records">
            <h4 className='format-date'>{dataTratada}</h4>
            <h4>{diaDaSemana}</h4>
            <h4>{descricao}</h4>
            <h4>{categoria}</h4>
            <h4 className={tipo === 'saida' ? 'value-negative' : 'value-balance'}>R$ {valor}</h4>
            <div className="editing-area">
                <img
                    src={IconEditing}
                    alt='Editar'
                />
                <img
                    onClick={() => handleDelete()}
                    src={IconDelete}
                    alt='Excluir'
                />
            </div>
        </div>
    )
}

export default TableRecords;