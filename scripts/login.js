'use strict';
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const btnLogin = document.getElementById('btn-submit');
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) || [];
let currentUser = JSON.parse(getFromStorage('CURRENT_USER')) || {};
//-----------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------

//////////////////////////////////////
// Function: Validate data
const validate = function (data) {
  // Sub function: check if username and password are correct
  const isUserCorrect = function (data) {
    return userArr.some(
      u =>
        String(u.username) === data.username &&
        String(u.password) === data.password
    );
  };
  // Sub function: Check if the user is logged in
  const isUserLoggedIn = function (data) {
    return currentUser?.username === data.username;
  };
  // Check login data all cases
  if (!data.username || !data.password) {
    alert('Please enter all data!');
  } else {
    if (!isUserCorrect(data)) {
      alert('Username or password is incorrect! ⛔');
    } else if (isUserLoggedIn(data)) {
      alert(`Username '${data.username}' already logged in! ⚠`);
    } else {
      return true;
    }
  }
  return false;
};

//-----------------------------------------------------
// EVENT HANDLERS
//-----------------------------------------------------
btnLogin.addEventListener('click', function (e) {
  // get data
  const loginData = {
    username: inputUsername.value,
    password: inputPassword.value,
  };

  // Validate data
  const isValidate = validate(loginData);
  if (isValidate) {
    alert('Logged in successfully ✔');
    //Storage data
    userArr.forEach(u => {
      if (u.username === loginData.username) currentUser = u;
    });
    saveToStorage('CURRENT_USER', JSON.stringify(currentUser));
    // Switch to home page
    window.location.href = '../index.html';
  }
});
