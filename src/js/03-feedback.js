import throttle from 'lodash.throttle';
// import '../css/common.css';
// import '../css/03-feedback.css';

const SAVE_KEY = 'feedback-form-state';
const formData = {};

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('textarea');
const input = document.querySelector('input');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMsgInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  if (form.value === '') {
    return;
  }
  console.log(formData);

  e.currentTarget.reset();
  localStorage.removeItem(SAVE_KEY);
}

function onMsgInput(e) {
  formData[e.target.name] = e.target.value.trim();

  return localStorage.setItem(SAVE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const saveMsg = JSON.parse(localStorage.getItem(SAVE_KEY));

  if (saveMsg) {
    input.value = saveMsg.email || '';
    textarea.value = saveMsg.message || '';
  }
  return;
}
