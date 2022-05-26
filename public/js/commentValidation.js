const form = document.querySelector(".comment__form");
const input = document.querySelector(".comment__input");
const btn = document.querySelector(".comment__btn");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
btn.addEventListener("click", () => {
  if (!input.value.trim()) {
    showMsg("Vui lòng nhập nội dung");
  }
  else {
      form.submit();
  }
});
