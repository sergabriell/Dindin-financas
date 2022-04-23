import './styles.css';
import IconEditing from '../../assets/icon-editing.svg';
import IconDelete from '../../assets/icon-delete.svg';

function TableRecords() {
    return (
        <div className="data-records">
            <h4 className='format-date'>01/09/21</h4>
            <h4>Quarta</h4>
            <h4>Venda dos brigadeiros</h4>
            <h4>Pix</h4>
            <h4 className='value'>R$ 100,00</h4>
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