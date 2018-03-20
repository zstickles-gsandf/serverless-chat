// Initialize Firebase
var config = {
  apiKey: "AIzaSyCJgPTrSKwWhZyD5nCZi8OGxPxvkZKHzYk",
  authDomain: "serverless-chat-1130d.firebaseapp.com",
  databaseURL: "https://serverless-chat-1130d.firebaseio.com",
  projectId: "serverless-chat-1130d",
  storageBucket: "",
  messagingSenderId: "1022508217813"
};
firebase.initializeApp(config);

const db = firebase.database().ref('posts');

const $username = document.getElementById('username');
const $message = document.getElementById('message');
const $send = document.getElementById('send');
const $chat = document.getElementById('chat');

$send.addEventListener('click', () => {
  const username = $username.value;
  const message = $message.value;
  db.push({ username, message });
  $message.value = '';
});

db.on('child_added', (snapshot) => {
  const content = snapshot.val();
  const $name = document.createElement('b');
  const $text = document.createElement('span');
  const $entry = document.createElement('div');
  $name.textContent = content.username + ': ';
  $text.textContent = content.message;
  $entry.appendChild($name);
  $entry.appendChild($text);
  $chat.appendChild($entry);
});