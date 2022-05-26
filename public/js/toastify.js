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
  