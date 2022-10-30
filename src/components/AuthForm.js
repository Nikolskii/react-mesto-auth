function AuthForm({ name, onSubmit, buttonText }) {
  return (
    <form
      className={`auth-form auth-form_purpose_${name}`}
      onSubmit={onSubmit}
      name={name}
      noValidate
    >
      <fieldset className="auth-form__fieldset">
        <input
          // onChange={}
          // value={}
          className="auth-form__input"
          type="text"
          // name=""
          placeholder="Email"
          // id="form__input_type_place"
          required
        />

        <input
          // onChange={}
          // value={}
          className="auth-form__input"
          type="password"
          // name=""
          placeholder="Пароль"
          // id="form__input_type_place"
          required
        />
      </fieldset>

      <button className="auth-form__button" type="submit" value={buttonText}>
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
