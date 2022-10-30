import AuthForm from './AuthForm';

function Login() {
  return (
    <section className="auth">
      <h1 className="auth__title">Вход</h1>
      <AuthForm buttonText="Войти" />
    </section>
  );
}
export default Login;
