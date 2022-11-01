import regSuccessImg from '../images/registration-success.svg';
import regUnsuccessImg from '../images/registration-unsuccess.svg';

function InfoTooltip({ isOpen, isRegistrationSuccess }) {
  return (
    <section
      className={`popup ${isOpen && 'popup_opened'}`}
      aria-label="Результат регистрации"
    >
      <div className="popup__container popup__container_type_reg">
        <img
          className="popup__reg-image"
          src={isRegistrationSuccess ? regSuccessImg : regUnsuccessImg}
        />
        <h2 className="popup__title popup__title_place_reg">
          {isRegistrationSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
