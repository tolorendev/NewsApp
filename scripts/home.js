'use strict';

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMsg = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');

const KEY = 'USER_ARRAY';
const userArr = JSON.parse(getFromStorage(KEY)) || [];
let currentUser = JSON.parse(getFromStorage('CURRENT_USER')) || {};

//-----------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------

///////////////////////////////////
// Function: Render home page
const renderHomePage = function () {
  // Case 1: Logged in
  if (currentUser && Object.keys(currentUser).length > 0) {
    console.log(1434343);
    loginModal.style.display = 'none';
    mainContent.style.display = 'block';
    welcomeMsg.textContent = `Welcome ${currentUser.username} !!!`;
    // Case 2: Not logged in
  } else {
    loginModal.style.display = 'block';
    mainContent.style.display = 'none';
  }
};
renderHomePage();

//-----------------------------------------------------
// EVENT HANDLERS
//-----------------------------------------------------

///////////////////////////////////
// Click Logout Button
btnLogout.addEventListener('click', function (e) {
  if (confirm('Are your sure?')) {
    // Delete current user
    currentUser = undefined;
    localStorage.removeItem('CURRENT_USER');
    // render homepage
    renderHomePage();
  }
});

//___________________________________________________________
//___________________________________________________________
//
// * OPTION : INITIALIZE STARTER DATA
//___________________________________________________________

if (userArr.length === 0) {
  // Initialize User data
  const user1 = new User('Sang', 'Tran', 'user1', '111111111');
  const user2 = new User('Long', 'Nguyen', 'user2', '222222222');
  saveToStorage('USER_ARRAY', JSON.stringify([user1, user2]));

  // Initialize todo list data
  const todoList = [
    {
      task: 'Go fishing',
      owner: 'user1',
      isDone: false,
    },
    {
      task: 'Go hiking',
      owner: 'user1',
      isDone: false,
    },
    {
      task: 'Go to church',
      owner: 'user1',
      isDone: true,
    },
    {
      task: 'Go to church',
      owner: 'user2',
      isDone: true,
    },
    {
      task: 'Go to the beach',
      owner: 'user2',
      isDone: false,
    },
  ];
  saveToStorage('TODO_ARRAY', JSON.stringify(todoList));
}
