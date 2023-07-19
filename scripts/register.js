'use strict';

const inputFisrtName = document.getElementById('input-firstname');
const inputLastName = document.getElementById('input-lastname');
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const inputPasswordConfirm = document.getElementById('input-password-confirm');
const btnRegister = document.getElementById('btn-submit');
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) || [];

//-----------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------

/////////////////////////////////
// Function: Validate data
const validate = function (data) {
  // Sub Function: Check if user already exists
  const userAlreadyExist = function (data) {
    return userArr.some(user => user.username === data.username);
  };
  // Check data all cases
  if (
    !data.firstName ||
    !data.lastName ||
    !data.username ||
    !data.password ||
    !data.passwordConfirm
  ) {
    alert('Please enter all data!');
  } else {
    if (data.password.length <= 8) {
      alert('Please enter password over 8 characters');
    } else if (data.password !== data.passwordConfirm) {
      alert('Password and password confirm  must be same');
    } else if (userAlreadyExist(data)) {
      alert('Username already exists, please try another username!');
    } else {
      return true;
    }
  }
  return false;
};

//-----------------------------------------------------
// EVENT HANDLERS
//-----------------------------------------------------

/////////////////////////////////
// Click Register Button
btnRegister.addEventListener('click', function (e) {
  // get data
  const userData = {
    firstName: inputFisrtName.value.trim(),
    lastName: inputLastName.value.trim(),
    username: inputUsername.value.trim(),
    password: inputPassword.value,
    passwordConfirm: inputPasswordConfirm.value,
  };
  // Validate data
  const isValidate = validate(userData);
  if (isValidate) {
    // Initialize user
    const newUser = parseUser(userData);
    // Storage data
    userArr.push(newUser);
    saveToStorage(KEY, JSON.stringify(userArr));
    alert('Register successfully ✔');
    // Go to login page
    window.location.href = '../pages/login.html';
  }
});
