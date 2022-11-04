import regSuccessImg from '../images/registration-success.svg';
import regUnsuccessImg from '../images/registration-unsuccess.svg';

function InfoTooltip({ isOpen, onClose, isRegistrationSuccess, loading }) {
  return (
    <section
      className={`popup ${isOpen && 'popup_opened'}`}
      aria-label="Результат регистрации"
    >
      <div className="popup__container popup__container_type_reg">
        {loading ? (
          <h2 className="popup__title popup__title_place_reg">
            Регистрация...
          </h2>
        ) : (
          <>
            <img
              className="popup__reg-image"
              src={isRegistrationSuccess ? regSuccessImg : regUnsuccessImg}
            />

            <h2 className="popup__title popup__title_place_reg">
              {isRegistrationSuccess
                ? 'Вы успешно зарегистрировались!'
                : 'Что-то пошло не так! Попробуйте ещё раз.'}
            </h2>
          </>
        )}

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

export default InfoTooltip;
