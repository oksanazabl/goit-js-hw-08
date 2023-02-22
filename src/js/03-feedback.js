import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const SAVE_KEY = 'feedback-form-state';
const formObj = {};
const parseData = JSON.parse(localStorage.getItem(SAVE_KEY, JSON.stringify(formObj)));

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMsgInput, 500));
form.addEventListener('input', e => {
  formObj[e.target.name] = e.target.value;
  onMsgInput();
});

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  console.log(formObj);

  e.currentTarget.reset();
  localStorage.removeItem(SAVE_KEY);
}

function onMsgInput(e) {
  return localStorage.setItem(SAVE_KEY, JSON.stringify(formObj));
}

function populateTextarea() {
  const saveMsg = localStorage.getItem(SAVE_KEY);
  if (saveMsg) {
    form.email.value = parseData.email;

    form.message.value = parseData.message;
  }
}
