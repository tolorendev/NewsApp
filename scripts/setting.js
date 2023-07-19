'use strict';
const inputPageSize = document.getElementById('input-page-size');
const inputCategory = document.getElementById('input-category');
const btnSaveSettings = document.getElementById('btn-submit');
const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) || [];
const currentUser = JSON.parse(getFromStorage('CURRENT_USER')) || {};

//-----------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------

////////////////////////////////////////////
// Function: render current user's settings
const renderSettings = function () {
  inputPageSize.value = currentUser.newsSettings.pageSize;
  inputCategory.value = currentUser.newsSettings.category;
  inputCategory.style.backgroundColor = '#e7f5ff';
  inputPageSize.style.backgroundColor = '#e7f5ff';
};

if (Object.keys(currentUser).length > 0) {
  renderSettings();
  inputCategory.style.backgroundColor = '#fefce8';
  inputPageSize.style.backgroundColor = '#fefce8';
}

///////////////////////////////////
// Function: validate input datas
const validate = function (data) {
  // Function: check if settings is already exists
  const settingAlreadyExists = function (data) {
    return data.pageSize === currentUser.newsSettings.pageSize &&
      data.category === currentUser.newsSettings.category
      ? true
      : false;
  };
  // Checking
  if (!data.pageSize) {
    alert('Please input News number per page!');
  } else {
    if (data.pageSize < 1) {
      alert('Please input number > 0');
    } else if (settingAlreadyExists(data)) {
      alert('This settings already exists!');
    } else {
      return true;
    }
  }
  return false;
};

//-----------------------------------------------------
// EVENT HANDLERS
//-----------------------------------------------------

///////////////////////////////////
// Click Save Setting Button
btnSaveSettings.addEventListener('click', function (e) {
  //check if user is logged in
  if (Object.keys(currentUser).length === 0) {
    alert('Please login before saving settings!');
    return;
  }
  // take data
  const data = {
    pageSize: Number(inputPageSize.value),
    category: inputCategory.value,
  };
  // validate data
  const isValidate = validate(data);
  if (isValidate) {
    // Save data settings to currentUser
    currentUser.newsSettings.pageSize = data.pageSize;
    currentUser.newsSettings.category = data.category;
    // save to local storage: 'CURRENT_USER'
    saveToStorage('CURRENT_USER', JSON.stringify(currentUser));
    userArr.forEach((u, i) => {
      if (u.username === currentUser.username)
        // save to local storage: 'USER_ARRAY'
        userArr.splice(i, 1, currentUser);
      saveToStorage('USER_ARRAY', JSON.stringify(userArr));
    });
    renderSettings();
    alert('Save successfully! ✔');
  }
});
