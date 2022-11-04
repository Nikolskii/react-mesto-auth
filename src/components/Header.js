import logo from '../images/header-logo.svg';

function Header({ onSignout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место" />

      <button onClick={onSignout} className="header__button">
        Выйти
      </button>
    </header>
  );
}

export default Header;
