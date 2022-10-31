import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';
import * as auth from '../utils/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();

    auth.register({ email, password }).then((res) => {
      if (res) {
        console.log('пока все ок');
        navigate('/sign-in');
      } else {
        console.log('Что-то пошло не так!');
      }
    });
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
