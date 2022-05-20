import './styles.css';
import IconEditing from '../../assets/icon-editing.svg';
import IconDelete from '../../assets/icon-delete.svg';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import api from '../../services/api';
import { getItem } from '../../utils/localStorage';
import { notifyError, notifySucess } from '../../utils/toast';

function TableRecords({ id_transaction, data, descricao, categoria, valor, tipo, loadTransactions }) {
    const diaDaSemana = format(new Date(data), 'EEEE', { locale: ptBR }).replace('-feira', '');
    const dataTratada = format(new Date(data), 'dd/MM/yy', { locale: ptBR });


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
            notifySucess('Registro excluido!');
            loadTransactions();
        } catch (error) {
            notifyError(error.response.data);
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