const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What is your name?');
appendMessage('You joined', true);
socket.emit('new-user', name);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`, false);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected`, false);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`, false);
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`, true);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

function appendMessage(message, isUser) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  if (isUser) {
    messageElement.classList.add('user-message');
  } else {
    messageElement.classList.add('other-message');
  }
  messageContainer.append(messageElement);
}
