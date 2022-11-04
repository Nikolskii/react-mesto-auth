import { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onLogin({ email, password });
  }

  return (
    <section className="auth">
      <h1 className="auth__title">Вход</h1>

      <form className="auth-form" onSubmit={handleSubmit} name="login">
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
            minLength="5"
            maxLength="30"
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
            minLength="4"
            maxLength="30"
            required
          />
        </fieldset>

        <button className="auth-form__button" type="submit" value="Войти">
          Войти
        </button>
      </form>
    </section>
  );
}
export default Login;
