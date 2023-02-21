import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  email: document.querySelector('input'),
};

const SAVE_KEY = 'feedback-form-state';
const formObj = {};
const parseData = JSON.parse(localStorage.getItem(SAVE_KEY, JSON.stringify(formObj)));

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onMsgInput, 500));
refs.form.addEventListener('input', e => {
  formObj[e.target.name] = e.target.value;
});

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem(SAVE_KEY);
}

function onMsgInput(e) {
  return localStorage.setItem(SAVE_KEY, JSON.stringify(formObj));
}

function populateTextarea() {
  const saveMsg = localStorage.getItem(SAVE_KEY);
  if (saveMsg) {
    refs.form.email.value = parseData.email;
    refs.form.message.value = parseData.message;
  }
}
