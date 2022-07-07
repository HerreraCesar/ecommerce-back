const back = document.querySelector("#back");

function goBack() {
  history.go(-1);
}

switch (location.pathname) {
  case "/users/logout":
    setTimeout(() => {
      location.href = "/users/login";
    }, 2000);
    break;

  default:
    break;
}
