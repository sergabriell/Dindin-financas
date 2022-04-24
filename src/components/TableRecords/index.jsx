import './styles.css';
import IconEditing from '../../assets/icon-editing.svg';
import IconDelete from '../../assets/icon-delete.svg';
import { format } from 'date-fns';

function TableRecords({ data, descricao, categoria, valor, tipo }) {

    const diaDaSemana = format(new Date(data), 'EEEE');
    const dataTratada = format(new Date(data), 'dd/MM/yy');

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
                    src={IconDelete}
                    alt='Excluir'
                />
            </div>
        </div>
    )
}

export default TableRecords;