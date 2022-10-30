import { NavLink } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место" />
      <NavLink className="header__link" to="sign-in">
        Войти
      </NavLink>
    </header>
  );
}

export default Header;
