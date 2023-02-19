import '../css/common.css';
import '../css/03-feedback.css';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', onMsgInput);

function onMsgInput(e) {
  const msg = e.currentTarget.value;

  localStorage.setItem('message', msg);
}

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
}
