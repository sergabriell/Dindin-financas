import './styles.css';
import UpArrow from '../../../assets/up-arrow.svg';

function HeaderTable() {
    return (
        <header className="infos">
            <div className="date">
                <h4>Data</h4>
                <img
                    src={UpArrow}
                    alt='Seta pra cima'
                />
            </div>
            <h4>Dia da semana</h4>
            <h4>Descrição</h4>
            <h4>Categoria</h4>
            <h4>Valor</h4>
        </header>
    )
}

export default HeaderTable;