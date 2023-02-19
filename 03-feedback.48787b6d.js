const e={form:document.querySelector(".feedback-form"),textarea:document.querySelector(".feedback-form textarea")};e.form.addEventListener("submit",(function(e){e.preventDefault(),e.currentTarget.reset()})),e.textarea.addEventListener("input",(function(e){const t=e.currentTarget.value;localStorage.setItem("message",t)}));
//# sourceMappingURL=03-feedback.48787b6d.js.map
