import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../src/contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

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
              {...register('name', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа',
                },
                maxLength: {
                  value: 40,
                  message: 'Максимум 40 символов',
                },
              })}
              className="form__input form__input_type_name"
              // className={`form__input form__input_type_name ${
              //   !isValid && 'form__input_type_error'
              // }`}
              value={name || ''}
              onChange={(evt) => {
                setName(evt.target.value);
              }}
              placeholder="Имя пользователя"
              type="text"
              // name="form__input_type_name"
              // id="form__input_type_name"
            />

            {errors?.name && (
              <span>
                <p
                  className="form__input-error_active"
                  id="form__input_type_name-error"
                >
                  {errors?.name?.message}
                </p>
              </span>
            )}

            <input
              {...register('description', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа',
                },
                maxLength: {
                  value: 200,
                  message: 'Максимум 200 символов',
                },
              })}
              className="form__input form__input_type_job"
              value={description || ''}
              onChange={(evt) => {
                setDescription(evt.target.value);
              }}
              placeholder="Краткое описание"
              type="text"
              // name="form__input_type_job"
              // id="form__input_type_job"
            />

            {errors?.description && (
              <span>
                <p
                  className="form__input-error_active"
                  id="form__input_type_name-error"
                >
                  {errors?.description?.message}
                </p>
              </span>
            )}
          </fieldset>
          <button
            className="form__button"
            type="submit"
            value={buttonText}
            disabled={!isValid}
          >
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
