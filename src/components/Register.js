import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // function handleSubmit(evt) {
  //   evt.preventDefault();

  //   onRegister({ email, password });
  // }

  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .min(4, 'Must be 4 characters or more')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="auth-form">
          <fieldset className="auth-form__fieldset">
            <Field
              name="email"
              type="text"
              placeholder="Email"
              className="auth-form__input"
            />
            <span style={{ color: 'red' }}>
              <ErrorMessage name="email" />
            </span>

            <Field
              name="password"
              type="text"
              placeholder="password"
              className="auth-form__input"
            />
            <ErrorMessage name="password" />
          </fieldset>

          <button
            className="auth-form__button"
            type="submit"
            // value={'Зарегистрироваться'}
          >
            Зарегистрироваться
          </button>
        </Form>
      </Formik>

      <p className="auth__text">
        Уже зарегистрированы?&nbsp;
        <NavLink className="auth__link" to="/sign-in">
          Войти
        </NavLink>
      </p>
    </section>
  );
}

export default Register;
