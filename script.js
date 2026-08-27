const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Keep only one beat playing at a time.
const players = [...document.querySelectorAll('audio')];
players.forEach(player => {
  player.addEventListener('play', () => {
    players.forEach(other => {
      if (other !== player) other.pause();
    });
  });
});

document.querySelectorAll('.buy-link').forEach(link => {
  link.addEventListener('click', () => {
    const beat = link.dataset.beat;
    const email = 'dwightwatts87@gmail.com';
    link.href = `mailto:${email}?subject=${encodeURIComponent('Beat lease inquiry - ' + beat)}`;
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
