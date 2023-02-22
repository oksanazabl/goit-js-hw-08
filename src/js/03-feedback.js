import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const SAVE_KEY = 'feedback-form-state';
const formData = {};

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMsgInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formData);

  e.currentTarget.reset();
  localStorage.removeItem(SAVE_KEY);
}

function onMsgInput(e) {
  formData[e.target.name] = e.target.value;
  return localStorage.setItem(SAVE_KEY, JSON.stringify(formData));
}

// const parseData = JSON.parse(localStorage.setItem(SAVE_KEY, JSON.stringify(formData)));

function populateTextarea() {
  const saveMsg = JSON.parse(localStorage.getItem(SAVE_KEY));
  if (saveMsg === 0) {
    return;
  }
  form.email.value.value = saveMsg.email;
  form.message.value = saveMsg.message;
}
