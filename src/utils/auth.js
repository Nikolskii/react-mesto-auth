export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => {
    try {
      if (res.status === 201) {
        return res.json();
      }
    } catch (err) {
      return err;
    }
  });
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => {
    return res.json();
  });
};
