const back = document.querySelector("#back");
const socket = io();
const messagesContainer = document.getElementById("messages");
const messagesForm = document.getElementById("newMessage");

function goBack() {
  history.go(-1);
}

function renderMessages(messages) {
  let html = "";
  if (messages.length === 0) {
    html = "<h4>No hay mensajes</h4>";
  }
  html = messages
    .map(function (e) {
      return `
        <div>
          <strong>${e.author}</strong>
          <span>[${new Date(JSON.parse(e.timestamp)).toLocaleString(
            "es-AR"
          )}]:</span>
          <em>${e.text}</em> 
        </div>`;
    })
    .join(" ");
  messagesContainer.innerHTML = html;
}

switch (location.pathname) {
  case "/support":
    socket.on("messages", function (messages) {
      renderMessages(messages);
    });

    messagesForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = {
        author: document.getElementById("email").value,
        timestamp: Date.now(),
        text: document.getElementById("text").value,
        chat: "1",
      };
      socket.emit("addMessage", message);
      document.getElementById("text").value = "";
      document.getElementById("text").focus();
    });
    break;

  default:
    break;
}
