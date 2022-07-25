const replyForms = document.querySelectorAll(".replies__form");

replyForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});

const replyBtns = document.querySelectorAll(".replies__btn");

replyBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!e.target.previousElementSibling.value.trim()) {
      showMsg("Vui lòng nhập nội dung");
    } else {
      e.target.parentNode.submit();
    }
  });
});
