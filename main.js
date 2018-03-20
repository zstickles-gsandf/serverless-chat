// Initialize Firebase
var config = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "serverless-chat-1130d.firebaseapp.com",
  databaseURL: "https://serverless-chat-1130d.firebaseio.com",
  projectId: "serverless-chat-1130d",
  storageBucket: "",
  messagingSenderId: "1022508217813"
};
firebase.initializeApp(config);

const db = firebase.database().ref('posts');
const auth = firebase.auth();
const authProvider = new firebase.auth.GoogleAuthProvider();

const $message = document.getElementById('message');
const $send = document.getElementById('send');
const $login = document.getElementById('login');
const $chat = document.getElementById('chat');

let username = '';

$send.style.display = 'none';
$message.style.display = 'none';

$login.addEventListener('click', () => {
  auth.signInWithPopup(authProvider);
});

$send.addEventListener('click', () => {
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

// when the user logs in
auth.onAuthStateChanged(data => {
  if (data) {
    username = data.displayName;
    $send.style.display = 'block';
    $message.style.display = 'block';
    $login.style.display = 'none';
  }
});