import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitDeletePopup from './SubmitDeletePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import '../index.css';

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isResponseSuccess, setIsResponseSuccess] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [infoTooltipText, setInfoTooltipText] = useState('');

  const navigate = useNavigate();

  // Состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSubmitDeletePopupOpen, setIsSubmitDeletePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  // Получение карточек и данных пользователя
  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.log(error);
        });

      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  // Проверка токена
  useEffect(() => {
    cbTokenCheck();
  }, []);

  useEffect(() => {
    setIsResponseSuccess(null);
  }, []);

  // Обработчики состояния попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleSubmitDeleteClick(card) {
    setIsSubmitDeletePopupOpen(true);

    setDeletedCard(card);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
  }

  // Закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSubmitDeletePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function closeInfoTooltipPopup() {
    closeAllPopups();

    if (isResponseSuccess) {
      navigate('sign-in');
    }
  }

  // Обработчик submit формы редактирования профиля
  function handleUpdateUser(userData) {
    api
      .updateUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);

        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Обработчик submit формы обновления аватара
  function handleUpdateAvatar(avatar) {
    api
      .updateUserAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: avatar });

        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Обработчик submit формы добавления карточки
  function handeAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Обработчик лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Обработчик удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Обработчик выхода
  function handleSignout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('sign-in');
  }

  // Обработчий формы регистрации
  function handleRegister({ email, password }) {
    setLoading(true);

    setIsInfoTooltipPopupOpen(true);

    auth
      .register({ email, password })
      .then((res) => {
        setIsResponseSuccess(true);
        setInfoTooltipText('Вы успешно зарегистрировались!');
      })
      .catch((err) => {
        console.log(err);
        setIsResponseSuccess(false);
        setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // Обработчик формы аутентификации
  const cbAuthenticate = useCallback(async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await auth.login({ email, password });

      if (!data) {
        throw new Error('Invalid credentials');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setEmail(email);
        // Убрать навигейт?
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      setIsInfoTooltipPopupOpen(true);
      setIsResponseSuccess(false);
      setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Проверка токена
  const cbTokenCheck = useCallback(async () => {
    try {
      setInitialLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No token in storage');
      }

      const user = await auth.checkToken(token);

      if (!user) {
        throw new Error('Invalid user');
      }

      setLoggedIn(true);
      setEmail(user.data.email);

      // Убрать навигейт ниже?!
      // navigate('/');
    } catch {
    } finally {
      setInitialLoading(false);
    }
  }, []);

  if (initialLoading) {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: 'black',
        }}
      >
        <h1 className="profile__title">Загрузка...</h1>
      </div>
    );
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} onSignout={handleSignout} email={email} />

        <Routes>
          <Route
            path="sign-up"
            element={<Register onRegister={handleRegister} />}
          />

          <Route path="sign-in" element={<Login onLogin={cbAuthenticate} />} />

          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onSubmitDelete={handleSubmitDeleteClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />

                <Footer />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<ProtectedRoute loggedIn={loggedIn} />} />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handeAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <SubmitDeletePopup
          isOpen={isSubmitDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          card={deletedCard}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isResponseSuccess={isResponseSuccess}
          onClose={closeInfoTooltipPopup}
          loading={loading}
          text={infoTooltipText}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
