function InfoTooltip({ isOpen, isRegistrationSuccess }) {
  return (
    <section
      className={`popup ${isOpen && 'popup_opened'}`}
      // className={`popup popup_opened'`}
      aria-label="ЗАМЕНИТЬ"
    >
      <div className="popup__container">
        {/* <img src={isRegistrationSuccess ? ''} */}
      </div>
    </section>
  );
}

export default InfoTooltip;
