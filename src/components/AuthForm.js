function AuthForm({ name, onSubmit, buttonText }) {
  return (
    <form
      className={`auth-form auth-form_purpose_${name}`}
      onSubmit={onSubmit}
      name={name}
      noValidate
    >
      <button className="auth-form__button" type="submit" value={buttonText}>
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
