'use strict';

///////////////////////////////////
// Function:  Save data
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
///////////////////////////////////
// Function: Get data
function getFromStorage(key) {
  return localStorage.getItem(key);
}
