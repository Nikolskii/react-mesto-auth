import AuthForm from './AuthForm';

function Register() {
  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <AuthForm buttonText={'Зарегистрироваться'} />
    </section>
  );
}

export default Register;
