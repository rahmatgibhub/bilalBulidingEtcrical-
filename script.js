let currentUser = "";

function register() {
  const username = document.getElementById("username").value;
  fetch('api/register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'username=' + encodeURIComponent(username)
  }).then(() => alert("Berhasil daftar!"));
}

function login() {
  const username = document.getElementById("username").value;
  fetch('api/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'username=' + encodeURIComponent(username)
  }).then(res => res.text()).then(data => {
    if (data === 'ok') {
      currentUser = username;
      document.getElementById("login").style.display = 'none';
      document.getElementById("chat").style.display = 'block';
      document.getElementById("welcome").innerText = "Halo, " + currentUser;
      setInterval(fetchMessages, 1000);
    } else {
      alert("Username tidak ditemukan!");
    }
  });
}

function sendMessage() {
  const to = document.getElementById("to").value;
  const message = document.getElementById("message").value;
  fetch('api/send.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'from=' + encodeURIComponent(currentUser) + '&to=' + encodeURIComponent(to) + '&message=' + encodeURIComponent(message)
  });
  document.getElementById("message").value = '';
}

function fetchMessages() {
  const to = document.getElementById("to").value;
  if (!to) return;
  fetch('api/fetch.php?from=' + currentUser + '&to=' + to)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("messages");
      container.innerHTML = "";
      data.forEach(msg => {
        const div = document.createElement("div");
        div.textContent = msg.from + ": " + msg.text;
        container.appendChild(div);
      });
    });
}