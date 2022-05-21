import './styles.css';
import Logo from '../Logo';
import Profile from '../../assets/profile.svg';
import Logout from '../../assets/logout.svg';
import { Link } from 'react-router-dom';
import { clear } from '../../utils/localStorage';

function HeaderDashboard({ name, openModalProfile }) {

    return (
        <header>
            <Logo />
            <div className="user">
                <img
                    src={Profile}
                    alt='Profile'
                    onClick={openModalProfile}
                />
                <h3>{name}</h3>
                <Link to='/sign-in'>
                    <img
                        onClick={() => clear()}
                        className='logout'
                        src={Logout}
                        alt='Logout'
                    />
                </Link>
            </div>

        </header>
    )
}

export default HeaderDashboard;