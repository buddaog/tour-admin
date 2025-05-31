const GITHUB_TOKEN = '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';
const REPO = 'buddaog/tour-data';
const API_BASE = 'https://api.github.com/repos/' + REPO + '/contents/';

const loginBlock = document.getElementById('login-block');
const panel = document.getElementById('admin-panel');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');

const requestsPre = document.getElementById('requests');

const USERS = [{ login: 'Ruvsh4n', password: 'LifeP579518660' }];

function login() {
  const login = loginInput.value;
  const password = passwordInput.value;
  const user = USERS.find(u => u.login === login && u.password === password);
  if (user) {
    loginBlock.style.display = 'none';
    panel.style.display = 'block';
    fetchRequests();
  } else {
    alert('Неверный логин или пароль');
  }
}

async function fetchRequests() {
  const res = await fetch(API_BASE + 'requests.json', {
    headers: { Authorization: 'Bearer ' + GITHUB_TOKEN }
  });
  const data = await res.json();
  const content = JSON.parse(atob(data.content));
  requestsPre.textContent = JSON.stringify(content, null, 2);
}

function addUser() {
  const newLogin = prompt('Введите логин:');
  const newPassword = prompt('Введите пароль:');
  if (newLogin && newPassword) {
    alert(`Пользователь "${newLogin}" добавлен. (Локально)`);
    // В проде — обновить users.json на GitHub
  }
}