/* ===== EDIT YOUR LETTER: each [ ... ] is one page, each line inside is a paragraph. Add or remove pages freely. Keep pages around 250 characters or less ===== */
const LETTER = [
  ["Dear Deyah,", "Eid Milad! I wanted to do something different this year, so instead of a plain message, I made you a whole little world. Take your time with this one."],
  ["First of all, thank you. Thank you for being someone who shows up, who really listens, and who somehow always knows the right thing to say."],
  ["Some friendships just feel like they were always meant to be, and ours is one of them. Alhamdulillah for you, every single day."],
  ["You make ordinary days brighter. Even the boring ones turn into something worth laughing about when you're around. Never lose that light, okay?"],
  ["This year, I hope you rest when you're tired, laugh until your stomach hurts, and get every good thing you've been quietly wishing for. On heavy days, I'm just a message away."],
  ["Barakallahu fii umrik, Deyah. May Allah fill your year with barakah, joy, and peace, and keep us close for many more birthdays. Ameen.", "Si Tiru, Hameem"]
];
/* ====================== */

const title = document.getElementById('title');
let i = 0;
"Eid Milad, Deyah!".split(' ').forEach((word, w, arr) => {
  const wrap = document.createElement('span');
  wrap.style.display = 'inline-block';
  wrap.style.whiteSpace = 'nowrap';
  if (w === arr.length - 1) wrap.className = 'name';
  [...word].forEach(ch => {
    const s = document.createElement('span');
    s.textContent = ch; s.style.setProperty('--i', i++);
    wrap.appendChild(s);
  });
  title.appendChild(wrap);
  if (w < arr.length - 1) title.appendChild(document.createTextNode(' '));
});
title.querySelectorAll('span span').forEach(s => s.setAttribute('aria-hidden','true'));

const lt = document.getElementById('lt');
document.querySelectorAll('.lantern').forEach(el => el.appendChild(lt.content.cloneNode(true)));

const sky = document.getElementById('sky');
for (let n = 0; n < 45; n++) {
  const s = document.createElement('i'); s.className = 'tw';
  s.style.left = Math.random()*100 + '%'; s.style.top = Math.random()*100 + '%';
  s.style.setProperty('--s', (6 + Math.random()*14) + 'px');
  s.style.setProperty('--d', (2 + Math.random()*3) + 's');
  s.style.setProperty('--l', (-Math.random()*5) + 's');
  sky.appendChild(s);
}

const colors = ['#f48fb1','#f6b93b','#8fcfb0','#b39ddb','#ffd166','#ff9fc2'];
function burst(x, y) {
  for (let n = 0; n < 34; n++) {
    const p = document.createElement('i'); p.className = 'pc';
    p.style.background = colors[n % colors.length];
    p.style.left = x + 'px'; p.style.top = y + 'px';
    document.body.appendChild(p);
    const a = Math.random()*Math.PI*2, d = 90 + Math.random()*180;
    p.animate([
      { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 },
      { transform: `translate(${Math.cos(a)*d}px,${Math.sin(a)*d + 120}px) scale(.3) rotate(${Math.random()*540}deg)`, opacity: 0 }
    ], { duration: 1400 + Math.random()*800, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => p.remove();
  }
}

const card = document.getElementById('card');
const btn = document.getElementById('open');
btn.addEventListener('click', e => {
  const r = btn.getBoundingClientRect();
  burst(r.left + r.width/2, r.top + r.height/2);
  setTimeout(() => burst(innerWidth*0.25, innerHeight*0.35), 250);
  setTimeout(() => burst(innerWidth*0.75, innerHeight*0.35), 450);
  setTimeout(() => go(1), 450);
});

/* ===== LANTERN REASONS (edit these, add or remove lines freely, max ~5 fits best) ===== */
const REASONS = [
  "You've always been there for me, and I'll always be there for you.",
  "I always appreciate it when you're always supporting me,",
  "You're the first person I want to tell good news to.",
  "Your corny jokes always makes me laugh, and at the same time I also love making you laugh!",
  "You're very caring, loving, and kind (wih??? jokee)"
];
const LCOLORS = ['#f48fb1','#8fcfb0','#f6b93b','#b39ddb','#ff9fc2'];
const row = document.getElementById('row'), reason = document.getElementById('reason'), count = document.getElementById('count');
let litCount = 0;
function setReason(h, t) {
  reason.innerHTML = '';
  const b = document.createElement('b'); b.textContent = h;
  const s = document.createElement('span'); s.textContent = t;
  reason.append(b, s);
}
function updateCount() { count.textContent = litCount + ' / ' + REASONS.length + ' lit'; }
function shoot() {
  const s = document.createElement('i');
  s.style.cssText = 'position:fixed;z-index:5;pointer-events:none;width:140px;height:4px;border-radius:4px;left:-160px;top:12%;background:linear-gradient(90deg,transparent,var(--gold),#fff)';
  document.body.appendChild(s);
  s.animate([
    { transform: 'translate(0,0) rotate(20deg)', opacity: 1 },
    { transform: 'translate(' + (innerWidth + 320) + 'px,' + (innerWidth * 0.36 + 120) + 'px) rotate(20deg)', opacity: 0 }
  ], { duration: 1600, easing: 'ease-in' }).onfinish = () => s.remove();
}
function finale() {
  setReason('All the lanterns are lit!', "Don't forget to make dua, Deyah. Eid Milad, and barakallahu fii umrik.");
  shoot();
  document.getElementById('next2').classList.add('show');
  burst(innerWidth * 0.3, innerHeight * 0.4);
  setTimeout(() => burst(innerWidth * 0.7, innerHeight * 0.4), 300);
}
setReason('Tap a lantern', "Each one hides a reason why I'm thankful.");
updateCount();
REASONS.forEach((text, n) => {
  const b = document.createElement('button');
  b.className = 'lb'; b.type = 'button';
  b.style.setProperty('--c', LCOLORS[n % LCOLORS.length]);
  b.style.setProperty('--dl', (-n * 0.8) + 's');
  b.setAttribute('aria-label', 'Lantern ' + (n + 1));
  b.appendChild(lt.content.cloneNode(true));
  b.addEventListener('click', () => {
    const wasLit = b.classList.contains('lit');
    if (!wasLit) { b.classList.add('lit'); litCount++; updateCount(); }
    setReason('Reason ' + (n + 1), text);
    const r = b.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    if (!wasLit && litCount === REASONS.length) setTimeout(finale, 900);
  });
  row.appendChild(b);
});

/* ===== PAGES ===== */
const pages = [...document.querySelectorAll('.page')], dots = document.getElementById('dots');
pages.forEach(() => dots.appendChild(document.createElement('i')));
let cur = 0;
function mark() { [...dots.children].forEach((d, i) => d.classList.toggle('on', i === cur)); }
function go(n) {
  const from = pages[cur], to = pages[n];
  from.classList.remove('in');
  setTimeout(() => {
    from.classList.remove('show'); to.classList.add('show');
    cur = n; mark(); window.scrollTo(0, 0);
    requestAnimationFrame(() => requestAnimationFrame(() => to.classList.add('in')));
  }, 550);
}
mark();
requestAnimationFrame(() => pages[0].classList.add('in'));
document.getElementById('next2').addEventListener('click', () => go(2));
document.getElementById('next3').addEventListener('click', () => go(3));

/* ===== VIRTUAL GIFT (edit these) ===== */
const GIFT_TITLE = "One Treat, On Me";
const GIFT_DESC = "Pick any drink or snack you like and I'm paying. Our next hangout is on me, no limits, kahit ilang matcha pa yan.";
const GIFT_DUA = "I also made a special dua for you: that Allah grants you everything good your heart is hoping for. Ameen.";
document.getElementById('gTitle').textContent = GIFT_TITLE;
document.getElementById('gDesc').textContent = GIFT_DESC;
document.getElementById('gDua').textContent = GIFT_DUA;
const gift = document.getElementById('gift');
gift.addEventListener('click', () => {
  if (gift.classList.contains('open')) return;
  gift.classList.add('open');
  const r = gift.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 3);
  setTimeout(() => burst(innerWidth * 0.25, innerHeight * 0.3), 250);
  setTimeout(() => burst(innerWidth * 0.75, innerHeight * 0.3), 450);
  setTimeout(() => document.getElementById('voucher').classList.add('show'), 600);
  setTimeout(() => document.getElementById('next3').classList.add('show'), 1500);
});

/* ===== ENVELOPE ===== */
const env = document.getElementById('env'), envHint = document.getElementById('envHint');
function openEnv() {
  if (env.classList.contains('open')) return;
  env.classList.add('open');
  setTimeout(() => burst(innerWidth / 2, innerHeight * 0.4), 600);
  setTimeout(() => { env.classList.add('away'); envHint.style.opacity = 0; }, 1600);
  setTimeout(() => {
    env.style.display = 'none'; envHint.style.display = 'none';
    card.classList.add('open'); fit();
    burst(innerWidth * 0.3, innerHeight * 0.3); burst(innerWidth * 0.7, innerHeight * 0.3);
  }, 2200);
}
env.addEventListener('click', openEnv);
env.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openEnv(); } });

/* ===== BOOK LETTER ===== */
const sheetsEl = document.getElementById('sheets'), bprev = document.getElementById('bprev'), bnext = document.getElementById('bnext'), bpg = document.getElementById('bpg');
let idx = 0;
const sheets = LETTER.map((paras, i) => {
  const s = document.createElement('div'); s.className = 'sheet'; s.style.zIndex = LETTER.length - i;
  const f = document.createElement('div'); f.className = 'face';
  const t = document.createElement('div'); t.className = 'txt';
  paras.forEach((p, j) => {
    const el = document.createElement('p'); el.textContent = p;
    if (i === 0 && j === 0) el.className = 'hd';
    t.appendChild(el);
  });
  const n = document.createElement('div'); n.className = 'pnum'; n.textContent = (i + 1) + ' / ' + LETTER.length;
  f.append(t, n);
  const k = document.createElement('div'); k.className = 'back';
  s.append(f, k);
  s.addEventListener('click', () => turn(1));
  sheetsEl.appendChild(s);
  return s;
});
function showPage() {
  bpg.textContent = (idx + 1) + ' / ' + LETTER.length;
  bprev.disabled = idx === 0;
  bnext.disabled = idx === LETTER.length - 1;
}
function turn(d) {
  const n = idx + d;
  if (n < 0 || n >= LETTER.length) return;
  if (d > 0) sheets[idx].classList.add('flipped'); else sheets[n].classList.remove('flipped');
  idx = n; showPage();
  if (idx === LETTER.length - 1) setTimeout(() => burst(innerWidth / 2, innerHeight * 0.4), 700);
}
bprev.addEventListener('click', () => turn(-1));
bnext.addEventListener('click', () => turn(1));
document.addEventListener('keydown', e => {
  if (!card.classList.contains('open')) return;
  if (e.key === 'ArrowRight') turn(1);
  if (e.key === 'ArrowLeft') turn(-1);
});
function fit() {
  document.querySelectorAll('.txt').forEach(t => {
    let s = 22; t.style.fontSize = s + 'px';
    while (t.scrollHeight > t.clientHeight + 1 && s > 13) { s -= 0.5; t.style.fontSize = s + 'px'; }
  });
}
showPage();
if (document.fonts && document.fonts.load) document.fonts.load('500 22px Caveat').then(fit, fit); else fit();
