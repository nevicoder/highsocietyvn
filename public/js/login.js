const form = document.querySelector(".signup__form");
const username = document.querySelector("#username__input");
const pwd = document.querySelector("#pwd__input");
const signinBtn = document.querySelector(".signin__btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
function showMsg(message) {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      fontSize: "20",
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}

signinBtn.addEventListener("click", () => {
  if (!username.value || !pwd.value) {
    showMsg("Vui lòng nhập đầy đủ thông tin");
  } else {
    form.submit();
  }
});

