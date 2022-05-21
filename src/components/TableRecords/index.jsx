import './styles.css';
import IconEditing from '../../assets/icon-editing.svg';
import IconDelete from '../../assets/icon-delete.svg';

import api from '../../services/api';
import { useState } from 'react'
import { getItem } from '../../utils/localStorage';
import { notifyError, notifySucess } from '../../utils/toast';
import { formatToDate, formatToMoney, formatToWeekDay } from '../../utils/formatters';
import ConfirmDelete from '../ConfirmDelete';

function TableRecords({ id_transaction, data, descricao, categoria, valor, tipo, loadTransactions }) {
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

    async function handleDelete() {
        const token = getItem('token');

        try {
            const response = await api.delete(`/transacao/${id_transaction}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status > 204) {
                return notifyError(response.data);
            }
            notifySucess('Registro excluido!');
            loadTransactions();
        } catch (error) {
            notifyError(error.response.data);
        }
    }

    return (
        <div className="data-records">
            <h4 className='format-date'>{formatToDate(data)}</h4>
            <h4>{formatToWeekDay(data)}</h4>
            <h4>{descricao}</h4>
            <h4>{categoria}</h4>
            <h4 className={tipo === 'saida' ? 'value-negative' : 'value-balance'}>{formatToMoney(Number(valor))}</h4>
            <div className="editing-area">
                <img
                    src={IconEditing}
                    alt='Editar'
                />
                <img
                    onClick={() => setOpenConfirmDelete(true)}
                    src={IconDelete}
                    alt='Excluir'
                />
                <ConfirmDelete
                    open={openConfirmDelete}
                    handleClose={() => setOpenConfirmDelete(false)}
                    handleConfirm={() => handleDelete()}
                />
            </div>
        </div>
    )
}

export default TableRecords;