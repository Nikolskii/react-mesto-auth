function AuthForm({ name, onSubmit, buttonText, children }) {
  return (
    <form className="auth-form" onSubmit={onSubmit} name={name} noValidate>
      {children}
      <button className="auth-form__button" type="submit" value={buttonText}>
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
