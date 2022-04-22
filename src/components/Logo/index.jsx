import './styles.css';
import ImgLogo from '../../assets/logo.svg';

function Logo() {
    return (
        <div className='logo'>
            <img
                src={ImgLogo}
                alt='logo'
            />
        </div>
    )
}

export default Logo;