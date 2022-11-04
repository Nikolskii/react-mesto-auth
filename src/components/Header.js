import { Link, useLocation } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ loggedIn, onSignout, email }) {
  // console.log(email);
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место" />

      {loggedIn ? (
        <div className="header__auth">
          <p className="header__email">{email}</p>
          <button onClick={onSignout} className="header__button">
            Выйти
          </button>
        </div>
      ) : (
        <Link
          className="header__link"
          to={location.pathname === '/sign-in' ? 'sign-up' : 'sign-in'}
        >
          {location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}
        </Link>
      )}
    </header>
  );
}

export default Header;
