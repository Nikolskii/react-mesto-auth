import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextImport from './TextInput';

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
            .email('Неверно указан адрес электронной почты')
            .required('Поле обязательно к заполнению'),
          password: Yup.string()
            .min(6, 'Пароль должен содержать не менее 6 символов')
            .required('Поле обязательно к заполнению'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log(JSON.stringify(values));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="auth-form">
          <fieldset className="auth-form__fieldset">
            <TextImport name="email" type="text" placeholder="Email" />
            <TextImport name="password" type="password" placeholder="Пароль" />
          </fieldset>

          <button className="auth-form__button" type="submit">
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
