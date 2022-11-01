import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onRegister({ email, password });
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>

      <AuthForm
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        name="register"
      >
        <fieldset className="auth-form__fieldset">
          <input
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
            value={email}
            className="auth-form__input"
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            required
          />

          <input
            onChange={(evt) => {
              setPassword(evt.target.value);
            }}
            value={password}
            className="auth-form__input"
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            required
          />
        </fieldset>
      </AuthForm>

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
