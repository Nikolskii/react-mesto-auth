import { NavLink } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register() {
  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <AuthForm buttonText="Зарегистрироваться" />
      <p className="auth__text">
        Уже зарегистрированы?&nbsp;
        <NavLink className="auth__link" to="sign-in">
          Войти
        </NavLink>
      </p>
    </section>
  );
}

export default Register;
