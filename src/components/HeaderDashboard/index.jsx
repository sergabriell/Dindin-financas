import './styles.css';
import Logo from '../Logo';
import Profile from '../../assets/profile.svg';
import Logout from '../../assets/logout.svg';
import { Link } from 'react-router-dom';

function HeaderDashboard() {
    return (
        <header>
            <Logo />
            <div className="user">
                <img
                    src={Profile}
                    alt='Profile'
                />
                <h3>Sérgio</h3>
                <Link to='/sign-in'>
                    <img
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