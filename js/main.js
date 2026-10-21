/* ===== LUXPLAY — demo MVP (frontend-only, localStorage) =====
   Backend yo'q: tangalar, sovg'alar va do'stlar faqat shu brauzerda. */

const GENRES = [
  { key: '',       label: 'Barchasi' },
  { key: 'shooter', label: 'Otishma' },
  { key: 'moba',    label: 'MOBA' },
  { key: 'battle',  label: 'Battle Royale' },
  { key: 'sport',   label: 'Sport' },
  { key: 'card',    label: 'Karta' },
];

const ART = [
  'linear-gradient(135deg,#6b4bf0,#3d22b8)',
  'linear-gradient(135deg,#ff4d6d,#8b1e3f)',
  'linear-gradient(135deg,#3ddc97,#15795a)',
  'linear-gradient(135deg,#ffd166,#b07d10)',
  'linear-gradient(135deg,#4cc9f0,#1a6e8e)',
  'linear-gradient(135deg,#f72585,#8a0a4d)',
];

const GAMES = [
  { id: 'g1', name: 'Zafar Arena',    genre: 'moba',    icon: '⚔️', players: 12400, rating: 4.7, mode: '5v5',  desc: 'Jamoaviy jang — 5v5 rejimida strategiya va tezkor reaksiya sinovi.' },
  { id: 'g2', name: 'Cho‘l Otishma',  genre: 'shooter', icon: '🔫', players: 8900,  rating: 4.5, mode: '4v4',  desc: 'Tezkor otishma, kichik xaritalar, qisqa raundlar.' },
  { id: 'g3', name: 'Oxirgi Qal’a',   genre: 'battle',  icon: '🪂', players: 23100, rating: 4.8, mode: '100',  desc: '100 o‘yinchi, bitta g‘olib. Xarita tobora torayadi.' },
  { id: 'g4', name: 'Paxtakor Liga',  genre: 'sport',   icon: '⚽', players: 5400,  rating: 4.3, mode: '1v1',  desc: 'Futbol simulyatori, mahalliy klublar va chempionat rejimi.' },
  { id: 'g5', name: 'Qarta Ustasi',   genre: 'card',    icon: '🃏', players: 3200,  rating: 4.1, mode: '1v1',  desc: 'Klassik karta o‘yinlari — do‘stlar bilan onlayn.' },
  { id: 'g6', name: 'Samarqand Rally', genre: 'sport',  icon: '🏎️', players: 4100,  rating: 4.4, mode: '8',    desc: 'Poyga — tarixiy shaharlar bo‘ylab trassalar.' },
  { id: 'g7', name: 'Tungi Reyd',     genre: 'shooter', icon: '🌙', players: 6700,  rating: 4.6, mode: '3v3',  desc: 'Taktik tungi missiyalar, ovozli muloqot muhim.' },
  { id: 'g8', name: 'Minora Jangi',   genre: 'moba',    icon: '🏰', players: 9800,  rating: 4.2, mode: '3v3',  desc: 'Minoralarni himoya qiling, raqib bazasini egallang.' },
];

const ROOMS = [
  { id: 'r1', name: 'Zafar Arena — reyting', host: 'Sardor', listeners: 24, live: true,  game: 'Zafar Arena' },
  { id: 'r2', name: 'Tungi otishma jamoasi', host: 'Malika', listeners: 11, live: true,  game: 'Tungi Reyd' },
  { id: 'r3', name: 'Yangi boshlovchilar',   host: 'Jasur',  listeners: 38, live: true,  game: 'Oxirgi Qal’a' },
  { id: 'r4', name: 'Qarta kechasi',         host: 'Nodira', listeners: 6,  live: false, game: 'Qarta Ustasi' },
  { id: 'r5', name: 'Futbol muhokamasi',     host: 'Bekzod', listeners: 15, live: true,  game: 'Paxtakor Liga' },
];

const PEOPLE = [
  { id: 'p1', name: 'Sardor',  level: 42, online: true,  game: 'Zafar Arena' },
  { id: 'p2', name: 'Malika',  level: 37, online: true,  game: 'Tungi Reyd' },
  { id: 'p3', name: 'Jasur',   level: 55, online: true,  game: 'Oxirgi Qal’a' },
  { id: 'p4', name: 'Nodira',  level: 21, online: false, game: '' },
  { id: 'p5', name: 'Bekzod',  level: 33, online: true,  game: 'Paxtakor Liga' },
  { id: 'p6', name: 'Zarina',  level: 18, online: false, game: '' },
  { id: 'p7', name: 'Otabek',  level: 48, online: true,  game: 'Minora Jangi' },
];

const GIFTS = [
  { id: 'gf1', icon: '🌹', name: 'Atirgul',  price: 10 },
  { id: 'gf2', icon: '🎁', name: 'Quticha',  price: 50 },
  { id: 'gf3', icon: '💍', name: 'Uzuk',     price: 150 },
  { id: 'gf4', icon: '🚀', name: 'Raketa',   price: 300 },
  { id: 'gf5', icon: '👑', name: 'Toj',      price: 500 },
  { id: 'gf6', icon: '🦁', name: 'Arslon',   price: 1000 },
];

const AVATAR_COLORS = ['#6b4bf0', '#ff4d6d', '#3ddc97', '#ffd166', '#4cc9f0', '#f72585'];

/* ---------- Saqlash ---------- */
const COINS_KEY = 'luxplay_coins';
const PREMIUM_KEY = 'luxplay_premium';
const FRIENDS_KEY = 'luxplay_friends';
const ROOM_KEY = 'luxplay_room';
const SENT_KEY = 'luxplay_sent';

const state = { genre: '', query: '', view: 'home', giftTo: null };
let toastTimer = null;

function qs(id) { return document.getElementById(id); }

/* HTML'ga qo'yiladigan har qanday ma'lumot shu yerdan o'tadi (XSS himoyasi) */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function readJson(key, fallback) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch (e) { return fallback; }
}
function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}

function getCoins() { const v = readJson(COINS_KEY, null); return v === null ? 1200 : Number(v); }
function setCoins(n) { writeJson(COINS_KEY, Math.max(0, n)); renderCoins(); }
function isPremium() { return readJson(PREMIUM_KEY, false) === true; }
function getFriends() { return readJson(FRIENDS_KEY, ['p1', 'p3']); }
function getRoom() { return readJson(ROOM_KEY, null); }
function getSent() { return readJson(SENT_KEY, []); }

function colorFor(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function artFor(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 17 + id.charCodeAt(i)) >>> 0;
  return ART[h % ART.length];
}
function nFmt(n) { return Number(n).toLocaleString('ru-RU'); }
function gameById(id) { return GAMES.find((g) => g.id === id); }
function personById(id) { return PEOPLE.find((p) => p.id === id); }

function showToast(message) {
  const el = qs('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Chizish ---------- */
function renderCoins() { qs('coins-label').textContent = nFmt(getCoins()); }

function renderPromo() {
  qs('promo').innerHTML = isPremium()
    ? `<span class="promo-icon">👑</span><div><b>Premium faol</b><span>Oltin nik, reklamasiz interfeys va oylik 💎 sovg'a</span></div>`
    : `<span class="promo-icon">👑</span><div><b>LUXPLAY Premium</b><span>Oltin nik, reklamasiz interfeys — oyiga 29 000 so'm</span></div>`;
}

function renderGenres() {
  qs('genre-tabs').innerHTML = GENRES.map((g) =>
    `<button type="button" data-genre="${esc(g.key)}" class="${state.genre === g.key ? 'active' : ''}">${esc(g.label)}</button>`
  ).join('');
}

function filteredGames() {
  const q = state.query.trim().toLowerCase();
  return GAMES.filter((g) => {
    if (state.genre && g.genre !== state.genre) return false;
    if (q && !g.name.toLowerCase().includes(q)) return false;
    return true;
  });
}

function renderGames() {
  const list = filteredGames();
  qs('game-grid').innerHTML = list.length ? list.map((g) => `
    <article class="game-card" data-action="game" data-id="${esc(g.id)}">
      <div class="game-art" style="background:${artFor(g.id)}">
        <span>${g.icon}</span>
        <span class="game-players">👥 ${esc(nFmt(g.players))}</span>
      </div>
      <div class="game-body">
        <div class="game-name">${esc(g.name)}</div>
        <div class="game-genre">⭐ ${esc(g.rating)} · ${esc(g.mode)}</div>
      </div>
    </article>
  `).join('') : '<div class="empty-state">O‘yin topilmadi.</div>';
  qs('games-count').textContent = list.length + ' ta';
}

function renderRooms() {
  const joined = getRoom();
  qs('room-list').innerHTML = ROOMS.map((r) => {
    const isJoined = joined === r.id;
    return `
      <div class="row-card${isJoined ? ' joined' : ''}">
        <div class="row-avatar" style="background:${colorFor(r.id)}">🎙</div>
        <div class="row-body">
          <div class="row-title">${esc(r.name)}</div>
          <div class="row-meta">
            ${r.live ? '<span class="live-badge"><span class="live-dot"></span>JONLI</span>' : ''}
            ${esc(r.host)} · 👥 ${esc(r.listeners)} · ${esc(r.game)}
          </div>
        </div>
        <button type="button" class="row-action${isJoined ? ' ghost' : ''}" data-action="room" data-id="${esc(r.id)}">
          ${isJoined ? 'Chiqish' : 'Kirish'}
        </button>
      </div>
    `;
  }).join('');
  qs('rooms-count').textContent = ROOMS.filter((r) => r.live).length + ' ta jonli';
}

function renderFriends() {
  const friends = getFriends();
  qs('friend-list').innerHTML = PEOPLE.map((p) => {
    const isFriend = friends.includes(p.id);
    return `
      <div class="row-card">
        <div class="row-avatar" style="background:${colorFor(p.id)}">
          ${esc(p.name[0])}
          <span class="online-dot${p.online ? '' : ' off'}"></span>
        </div>
        <div class="row-body">
          <div class="row-title">${esc(p.name)}</div>
          <div class="row-meta">${esc(p.level)}-daraja · ${p.online ? esc(p.game || 'Onlayn') : 'Oflayn'}</div>
        </div>
        <button type="button" class="row-action ghost" data-action="gift" data-id="${esc(p.id)}">🎁</button>
        <button type="button" class="row-action${isFriend ? ' ghost' : ''}" data-action="friend" data-id="${esc(p.id)}">
          ${isFriend ? '✓' : '+'}
        </button>
      </div>
    `;
  }).join('');
  qs('friends-count').textContent = friends.length + ' ta do‘st';
}

function renderProfile() {
  const sent = getSent();
  const room = getRoom();
  const roomName = room ? (ROOMS.find((r) => r.id === room) || {}).name : null;
  const prem = isPremium();

  const counts = {};
  sent.forEach((g) => { counts[g] = (counts[g] || 0) + 1; });
  const inv = Object.entries(counts).map(([id, n]) => {
    const g = GIFTS.find((x) => x.id === id);
    return g ? `<span class="inv-item">${g.icon} ${esc(g.name)} ×${esc(n)}</span>` : '';
  }).join('');

  qs('profile-view').innerHTML = `
    <div class="profile-card${prem ? ' premium' : ''}">
      <div class="profile-avatar">S</div>
      <div class="profile-id">
        <b>Siz${prem ? ' 👑' : ''}</b>
        <span>24-daraja · ${esc(nFmt(getCoins()))} 💎</span>
        ${prem ? '<span class="crown">PREMIUM</span>' : ''}
      </div>
    </div>

    <div class="block">
      <h4>Ovozli xona</h4>
      <p>${roomName ? esc(roomName) : 'Hozir hech qanday xonada emassiz'}</p>
    </div>

    <div class="block">
      <h4>Yuborilgan sovg'alar</h4>
      ${inv ? `<div class="inv-grid">${inv}</div>` : '<p class="muted">Hali sovg‘a yubormadingiz.</p>'}
    </div>

    <div class="block">
      <h4>Do'stlar</h4>
      <p>${esc(getFriends().length)} ta</p>
    </div>

    ${prem
      ? '<button type="button" class="btn btn-secondary btn-block" data-action="premium-off">Premiumni bekor qilish</button>'
      : '<button type="button" class="btn btn-primary btn-block" data-action="premium">👑 Premium olish</button>'}
    <button type="button" class="btn btn-secondary btn-block" data-action="topup">💎 1000 tanga qo'shish (demo)</button>
  `;
}

function renderAll() {
  renderCoins(); renderPromo(); renderGenres(); renderGames();
  renderRooms(); renderFriends(); renderProfile();
}

/* ---------- Modallar ---------- */
function openGame(id) {
  const g = gameById(id);
  if (!g) return;
  qs('game-content').innerHTML = `
    <div class="game-hero" style="background:${artFor(g.id)}">${g.icon}</div>
    <h3>${esc(g.name)}</h3>
    <p class="muted">${esc(GENRES.find((x) => x.key === g.genre) ? GENRES.find((x) => x.key === g.genre).label : g.genre)}</p>
    <div class="stat-row">
      <div class="stat-cell"><b>${esc(nFmt(g.players))}</b><span>o'yinchi</span></div>
      <div class="stat-cell"><b>⭐ ${esc(g.rating)}</b><span>reyting</span></div>
      <div class="stat-cell"><b>${esc(g.mode)}</b><span>rejim</span></div>
    </div>
    <p>${esc(g.desc)}</p>
    <div class="btn-row">
      <button type="button" class="btn btn-primary" data-action="play" data-id="${esc(g.id)}">O'ynash</button>
      <button type="button" class="btn btn-secondary" data-action="rooms-go">Xonalar</button>
    </div>
  `;
  qs('modal-game').classList.add('open');
}

function openGift(personId) {
  const p = personById(personId);
  if (!p) return;
  state.giftTo = personId;
  qs('gift-target').textContent = p.name + ' uchun · balans: ' + nFmt(getCoins()) + ' 💎';
  qs('gift-list').innerHTML = GIFTS.map((g) => `
    <button type="button" class="gift-card" data-action="send-gift" data-id="${esc(g.id)}">
      <span class="gift-icon">${g.icon}</span>
      <span class="gift-name">${esc(g.name)}</span>
      <span class="gift-price">${esc(g.price)} 💎</span>
    </button>
  `).join('');
  qs('modal-gift').classList.add('open');
}

function sendGift(giftId) {
  const g = GIFTS.find((x) => x.id === giftId);
  const p = personById(state.giftTo);
  if (!g || !p) return;
  if (getCoins() < g.price) { showToast('Tanga yetarli emas'); return; }
  setCoins(getCoins() - g.price);
  const sent = getSent(); sent.push(g.id); writeJson(SENT_KEY, sent);
  qs('modal-gift').classList.remove('open');
  renderProfile();
  showToast(p.name + ' ga ' + g.icon + ' ' + g.name + ' yuborildi');
}

/* ---------- Amallar ---------- */
function toggleRoom(id) {
  const cur = getRoom();
  if (cur === id) { writeJson(ROOM_KEY, null); showToast('Xonadan chiqdingiz'); }
  else {
    writeJson(ROOM_KEY, id);
    const r = ROOMS.find((x) => x.id === id);
    showToast((r ? r.name : 'Xona') + ' — kirdingiz');
  }
  renderRooms(); renderProfile();
}

function toggleFriend(id) {
  const friends = getFriends();
  const p = personById(id);
  const i = friends.indexOf(id);
  if (i >= 0) { friends.splice(i, 1); showToast((p ? p.name : '') + ' do‘stlardan olindi'); }
  else { friends.push(id); showToast((p ? p.name : '') + ' do‘st sifatida qo‘shildi'); }
  writeJson(FRIENDS_KEY, friends);
  renderFriends(); renderProfile();
}

function showView(name) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  qs('view-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.view === name));
  qs('appbar').classList.toggle('compact', name !== 'home');
  state.view = name;
  window.scrollTo(0, 0);
  if (name === 'rooms') renderRooms();
  if (name === 'friends') renderFriends();
  if (name === 'profile') renderProfile();
}

/* ---------- Ishga tushirish ---------- */
function init() {
  renderAll();

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => showView(btn.dataset.view));
  });

  qs('genre-tabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-genre]');
    if (!b) return;
    state.genre = b.dataset.genre;
    renderGenres(); renderGames();
  });

  qs('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    state.query = qs('search-input').value;
    renderGames();
    showView('home');
  });

  qs('promo').addEventListener('click', () => qs('modal-premium').classList.add('open'));
  qs('coins-pill').addEventListener('click', () => showView('profile'));

  qs('premium-buy').addEventListener('click', () => {
    writeJson(PREMIUM_KEY, true);
    setCoins(getCoins() + 500);
    qs('modal-premium').classList.remove('open');
    renderAll();
    showToast('Premium faollashtirildi (demo)');
  });

  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => btn.closest('.modal').classList.remove('open'));
  });
  document.querySelectorAll('.modal').forEach((m) => {
    m.addEventListener('click', (e) => { if (e.target === m) m.classList.remove('open'); });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modal.open').forEach((m) => m.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const a = el.dataset.action;
    if (a === 'game') openGame(el.dataset.id);
    if (a === 'room') toggleRoom(el.dataset.id);
    if (a === 'friend') toggleFriend(el.dataset.id);
    if (a === 'gift') openGift(el.dataset.id);
    if (a === 'send-gift') sendGift(el.dataset.id);
    if (a === 'play') {
      qs('modal-game').classList.remove('open');
      showToast('Demo rejim: o‘yin ishga tushmaydi');
    }
    if (a === 'rooms-go') { qs('modal-game').classList.remove('open'); showView('rooms'); }
    if (a === 'premium') qs('modal-premium').classList.add('open');
    if (a === 'premium-off') { writeJson(PREMIUM_KEY, false); renderAll(); showToast('Premium bekor qilindi'); }
    if (a === 'topup') { setCoins(getCoins() + 1000); renderProfile(); showToast('1000 💎 qo‘shildi (demo)'); }
  });
}

document.addEventListener('DOMContentLoaded', init);
