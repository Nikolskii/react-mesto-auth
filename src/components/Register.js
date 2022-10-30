import AuthForm from './AuthForm';

function Register() {
  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <AuthForm buttonText={'Зарегистрироваться'} />
      <p className="auth__text">
        Уже зарегистрированы?&nbsp;
        <a className="auth__link" href="#">
          Войти
        </a>
      </p>
    </section>
  );
}

export default Register;
