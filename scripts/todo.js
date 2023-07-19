'use strict';
const inputTask = document.getElementById('input-task');
const btnAdd = document.getElementById('btn-add');
const todoListEl = document.getElementById('todo-list');
const currentUser = JSON.parse(getFromStorage('CURRENT_USER')) || {};
const todoArr = JSON.parse(getFromStorage('TODO_ARRAY')) || [];

//------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------

///////////////////////////////////
// Class: Task
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
///////////////////////////////////
// Function: Validate data
const validate = function (taskData) {
  // Function: Check if task is dupplicated
  const taskIsDuplicated = function (taskData) {
    return todoArr.some(
      todo => todo.task === taskData.task && todo.owner === currentUser.username
    );
  };
  // Check data
  if (!taskData.task) {
    alert('Please enter a task!');
  } else if (taskIsDuplicated(taskData)) {
    alert('This task is duplicated!');
  } else {
    return true;
  }
  return false;
};

///////////////////////////////////
// Function: Render tasks
const renderTasks = function (tasks) {
  todoListEl.innerHTML = '';
  tasks.forEach(t => {
    // check if task is belong to current user
    if (t.owner === currentUser.username) {
      //
      const html = `
      <li class="${t.isDone ? 'checked' : ''}" data-task-name="${t.task}">${
        t.task
      }
        <span class="close">×</span>
      </li>
      `;
      todoListEl.insertAdjacentHTML('afterbegin', html);
    }
  });
};
if (Object.keys(currentUser).length > 0) renderTasks(todoArr);

///////////////////////////////////
// Function: Adding task (todo)
const addTask = function () {
  // Alert as user is NOT logged in
  if (Object.keys(currentUser).length === 0) {
    alert('Please login before adding task!');
    return;
  }
  // Get data
  const taskData = {
    task: inputTask.value,
  };
  // Validate data
  const isValidate = validate(taskData);
  if (isValidate) {
    // Initialize task data
    const task = new Task(taskData.task, currentUser.username, false);
    // Storage task data to local Storage
    todoArr.push(task);
    saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
    // Render task
    renderTasks(todoArr);
    // cleear input
    inputTask.value = '';
  }
};

///////////////////////////////////
// Function: Taggle task
const toggleTask = function (e) {
  // toggle class name 'checked'
  e.target.classList.toggle('checked');
  // check if task is done
  const isTaskDone = e.target.classList.contains('checked') ? true : false;
  // // Find current task (task be clicked)
  todoArr.forEach(t => {
    if (
      t.task === e.target.dataset.taskName &&
      t.owner === currentUser.username
    ) {
      // Save to local storage
      t.isDone = isTaskDone;
      saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
    }
  });
};

///////////////////////////////////
// Function: Delete task
const deleteTask = function (e) {
  if (e.target.classList.contains('close')) {
    // Find current task
    todoArr.forEach((t, i) => {
      if (
        t.owner === currentUser.username &&
        t.task === e.target.closest('li').dataset.taskName
      ) {
        // Delete task
        if (confirm('Are you sure?')) {
          todoArr.splice(i, 1);
          saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
          renderTasks(todoArr);
        }
      }
    });
  }
};

//------------------------------------------------------
// EVENT HANDLERS
//------------------------------------------------------

///////////////////////////////////
// Adding task: Click Add button
btnAdd.addEventListener('click', addTask);

///////////////////////////////////
// Adding task: Press 'Enter' key at task input area
inputTask.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

///////////////////////////////////
// Toggle Task (Click to task area)
todoListEl.addEventListener('click', toggleTask);

///////////////////////////////////
// Delete Task (Click "X" button)
todoListEl.addEventListener('click', deleteTask);
