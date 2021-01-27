let socket = io();

let nameSelectArea = document.getElementById("select-name");
let nameForm = document.getElementById("name-form");
let nameInput = document.getElementById("name-select");
let privatePerson = {
  username: "",
  color: "",
  id: 0,
};

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (nameInput.value.match(/^[0-9a-zA-Z\-\_]+$/)) {
    privatePerson.username = nameInput.value;
    privatePerson.color =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    privatePerson.id = Math.random() * (1000000000 - 1) + 1;
    socket.emit("username select", privatePerson);
    nameSelectArea.style.display = "none";
  } else {
    error = document.getElementById("error-message");
    error.textContent =
      'Seu nome só pode conter letras, números e os simbolos: "-", "_"';
    error.style.opacity = "1";
  }
});

let messages = document.getElementById("messages");
let form = document.getElementById("form");
let input = document.getElementById("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    if (input.value.includes("/help")) {
      let item = document.createElement("li");
      let comandos = document.createElement("h2");
      let msg = document.createElement("span");

      comandos.textContent = "Comandos:";
      msg.innerHTML =
        "<h3>/msg *alvo* mensagem</h3> <p>Para mandar mensagens privadas</p> <p>Ex: /msg João Essa é uma mensagem privada para João</p>";
      item.appendChild(comandos);
      item.appendChild(msg);
      messages.appendChild(item);
      input.value = "";
      return;
    }
    if (input.value.includes("/msg")) {
      let fullPrivateMessage = input.value.split(" ");
      let targetUser = fullPrivateMessage[1];
      let privateMessage = fullPrivateMessage.slice(2).join(" ");
      if (privateMessage) {
        socket.emit(
          "private message",
          privateMessage,
          privatePerson,
          targetUser
        );
        input.value = "";
      }
      return;
    }
    socket.emit("chat message", input.value, privatePerson);
    input.value = "";
  }
});

let userList = document.getElementById("user-list");

form.addEventListener("keypress", (e) => {
  socket.emit("user typing", privatePerson.username);
  if (e.key == "@") {
    userList.style.display = "block";
    return;
  }
  if (userList.style.display == "block") {
    userList.style.display = "none";
  }
});

socket.on("just connected", (personList) => {
  appendAllUsersToMemberList(personList);
});

socket.on("user connected", (person) => {

  let item = document.createElement("li");
  item.textContent = `${person.username} entrou no chat`;
  item.style.color = "green";
  messages.appendChild(item);
  messages.scrollTo(0, messages.scrollHeight);
});

let memberList = document.getElementById("members");
let currentMemberList = [];
appendAllUsersToMemberList = (personList) => {
  personList.forEach((person) => {
    if (!(currentMemberList.includes(person.id))) {
      console.log(currentMemberList)
      let item = document.createElement("li");
      item.textContent = person.username;
      memberList.appendChild(item);
      currentMemberList.push(person.id);
    }
  });
};
const typing = document.getElementById("typing");

socket.on("user typing", (username) => {
  if (!typing.textContent) {
    typing.textContent = username + " esta digitando...";
  }
  if (typing.textContent) {
    let userList = typing.textContent.slice(0, -18).split(", ");
    if (!userList.includes(username)) {
      userList.push(username);
      typing.textContent = "";
      for (let i = 0; i < userList.length; i++) {
        typing.textContent += userList[i] + ", ";
      }
      typing.textContent += "estão digitando...";
    }
  }
});

socket.on("user not typing anymore", (username) => {
  if (typing.textContent.includes(username)) {
    typing.textContent.replace(`${username}, `, "");
    if (typing.textContent.slice(0, -18)) {
      typing.textContent = "";
    }
  }
});

socket.on("private message", (msg, person, target) => {
  if (
    person.username === privatePerson.username ||
    target == privatePerson.username
  ) {
    let item = document.createElement("li");
    let name = document.createElement("span");
    let message = document.createElement("span");
    name.style.color = "gray";
    name.style.fontWeight = "bold";
    name.textContent = `${person.username} --> ${target}`;
    message.textContent = `: ${msg}`;

    item.appendChild(name);
    item.appendChild(message);
    messages.appendChild(item);
    messages.scrollTo(0, messages.scrollHeight);
  }
});

socket.on("chat message", (msg, person) => {
  let item = document.createElement("li");
  let name = document.createElement("span");
  let message = document.createElement("span");
  name.style.color = person.color;
  name.style.fontWeight = "bold";
  name.textContent = person.username;
  if (person.username == privatePerson.username) {
    name.textContent = "me";
  }
  message.textContent = ": " + msg;

  item.appendChild(name);
  item.appendChild(message);
  messages.appendChild(item);
  messages.scrollTo(0, messages.scrollHeight);
});

socket.on("user disconnected", (currentUser) => {
  let item = document.createElement("li");
  item.textContent = `${currentUser} saiu do chat`;
  item.style.color = "red";
  messages.appendChild(item);
  messages.scrollTo(0, messages.scrollHeight);
});
