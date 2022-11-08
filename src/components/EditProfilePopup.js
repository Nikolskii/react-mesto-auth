import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const currentUser = React.useContext(CurrentUserContext);

  const [buttonText, setButtonText] = useState('');

  React.useEffect(() => {
    setName(currentUser.name);

    setDescription(currentUser.about);

    setButtonText('Сохранить');
  }, [currentUser]);

  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  function onSubmit(data) {
    setButtonText('Сохранение...');
    console.log(JSON.stringify(data));

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <section
      className={`popup popup_purpose_${name} ${isOpen && 'popup_opened'}`}
      aria-label="Редактировать профиль"
    >
      <div className="popup__container">
        <h2 className="popup__title">Редактировать профиль</h2>

        <form
          className="form form_purpose_edit-profile"
          onSubmit={handleSubmit(onSubmit)}
          name={name}
          noValidate
        >
          <fieldset className="form__fieldset">
            <input
              {...register('Имя пользователя', {
                required: true,
              })}
              className="form__input form__input_type_name"
              value={name || ''}
              onChange={(evt) => {
                setName(evt.target.value);
              }}
              placeholder="Имя пользователя"
              type="text"
              // name="form__input_type_name"
              // id="form__input_type_name"
              // minLength="2"
              // maxLength="40"
              // required
            />
            <span
              className="form__input-error"
              id="form__input_type_name-error"
            ></span>

            <input
              className="form__input form__input_type_job"
              value={description || ''}
              onChange={(evt) => {
                setDescription(evt.target.value);
              }}
              placeholder="Краткое описание"
              type="text"
              name="form__input_type_job"
              id="form__input_type_job"
              minLength="2"
              maxLength="200"
              required
            />
            <span
              className="form__input-error"
              id="form__input_type_job-error"
            ></span>
          </fieldset>
          <button className="form__button" type="submit" value={buttonText}>
            {buttonText}
          </button>
        </form>

        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default EditProfilePopup;
