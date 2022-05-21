import './styles.css';

function ConfirmDelete({ open, handleConfirm, handleClose }) {
    return (
        <>
            {open &&
                <div className="container-confirm-delete">
                    <div className="arrow-up"></div>
                    <span>Apagar item?</span>
                    <div className="buttons-delete">
                        <button
                            className="button-confirm button-blue"
                            onClick={() => handleConfirm()}
                        >
                            Sim
                        </button>
                        <button
                            className="button-close button-red"
                            onClick={() => handleClose()}
                        >
                            Não
                        </button>
                    </div>
                </div>}
        </>
    )
}

export default ConfirmDelete;