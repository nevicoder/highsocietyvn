const form = document.querySelector(".signup__form");
const username = document.querySelector("#username__input");
const pwd = document.querySelector("#pwd__input");
const pwd2   = document.querySelector("#pwd2__input");
const signupBtn = document.querySelector(".signup__btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

signupBtn.addEventListener("click", () => {
  let err = 0;
  if (!username.value || !pwd.value) {
    showMsg("Vui lòng nhập đầy đủ thông tin");
    err += 1;
  }
  if (pwd.value !== pwd2.value) {
    showMsg("Mật khẩu không giống nhau");
    err += 1;
  }

  if (!err) {
    form.submit();
  }
});
