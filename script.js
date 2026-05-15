/* =============================================
   PIXEL QUIZ - MAIN SCRIPT
   Retro Game Themed Programming Quiz
   ============================================= */

'use strict';

// =============================================
// QUIZ DATA - 20 Questions
// answer: index (0-4) of correct option in options array
// =============================================
const QUESTIONS = [
  {
    category: 'HTML',
    question: 'Apa fungsi utama HTML dalam pembuatan website?',
    options: [
      'Mengatur database',
      'Membuat tampilan dan struktur halaman',
      'Menghubungkan internet',
      'Mengelola server',
      'Membuat animasi game'
    ],
    answer: 1
  },
  {
    category: 'HTML',
    question: 'Tag HTML yang digunakan untuk membuat hyperlink adalah?',
    options: [
      '<img>',
      '<table>',
      '<a>',
      '<link>',
      '<href>'
    ],
    answer: 2
  },
  {
    category: 'CSS',
    question: 'CSS digunakan untuk?',
    options: [
      'Mengolah data',
      'Mengatur tampilan website',
      'Membuat database',
      'Menjalankan server',
      'Membuat file PDF'
    ],
    answer: 1
  },
  {
    category: 'CSS',
    question: 'Manakah penulisan CSS yang benar untuk mengubah warna teks menjadi merah?',
    options: [
      'font-color: red;',
      'text: red;',
      'color: red;',
      'font = red;',
      'text-color = red;'
    ],
    answer: 2
  },
  {
    category: 'JAVASCRIPT',
    question: 'JavaScript digunakan untuk?',
    options: [
      'Membuat website statis',
      'Mengatur struktur HTML',
      'Menambahkan interaksi pada website',
      'Membuat tabel database',
      'Mengedit gambar'
    ],
    answer: 2
  },
  {
    category: 'JAVASCRIPT',
    question: 'Fungsi console.log() pada JavaScript adalah?',
    options: [
      'Menampilkan output ke browser console',
      'Membuat popup',
      'Menghapus data',
      'Mengubah warna halaman',
      'Membuat tabel'
    ],
    answer: 0
  },
  {
    category: 'JAVASCRIPT',
    question: 'Cara yang benar untuk mendeklarasikan variabel konstan di JavaScript modern adalah...',
    options: [
      'var x = 10;',
      'let x = 10;',
      'static x = 10;',
      'const x = 10;',
      'define x = 10;'
    ],
    answer: 3
  },
  {
    category: 'PHP',
    question: 'Simbol yang digunakan untuk mendeklarasikan variabel di PHP adalah...',
    options: [
      '#',
      '&',
      '@',
      '$',
      '%'
    ],
    answer: 3
  },
  {
    category: 'PHP',
    question: 'Fungsi PHP yang digunakan untuk menghitung panjang string adalah...',
    options: [
      'count()',
      'size()',
      'length()',
      'strlen()',
      'strcount()'
    ],
    answer: 3
  },
  {
    category: 'DATABASE',
    question: 'Perintah SQL yang digunakan untuk mengambil data dari tabel adalah...',
    options: [
      'GET',
      'FETCH',
      'SELECT',
      'RETRIEVE',
      'READ'
    ],
    answer: 2
  },
  {
    category: 'DATABASE',
    question: 'Apa kepanjangan dari SQL?',
    options: [
      'Simple Query Language',
      'Structured Question Language',
      'System Query Logic',
      'Standard Query Language',
      'Structured Query Language'
    ],
    answer: 4
  },
  {
    category: 'DATABASE',
    question: 'Perintah SQL untuk menghapus seluruh data dalam tabel namun tabel tetap ada adalah...',
    options: [
      'DROP TABLE',
      'REMOVE ALL',
      'UPDATE TABLE',
      'DELETE TABLE',
      'CLEAR TABLE'
    ],
    answer: 3
  },
  {
    category: 'CSS',
    question: 'Apa kepanjangan dari CSS?',
    options: [
      'Creative Style Sheet',
      'Computer Style Syntax',
      'Cascading Style Sheets',
      'Colorful Style System',
      'Coding Style Sheet'
    ],
    answer: 2
  },
  {
    category: 'CSS',
    question: 'Simbol untuk komentar pada CSS adalah?',
    options: [
      '// komentar',
      '<!-- komentar -->',
      '/* komentar */',
      '## komentar',
      '** komentar **'
    ],
    answer: 2
  },
  {
    category: 'PHP',
    question: 'Bahasa pemrograman yang berjalan di sisi client adalah?',
    options: [
      'PHP',
      'MySQL',
      'JavaScript',
      'Python',
      'SQL'
    ],
    answer: 2
  },
  {
    category: 'PHP',
    question: 'Fungsi utama PHP dalam website adalah...',
    options: [
      'Mengatur style website',
      'Membuat animasi',
      'Mengolah data di server',
      'Membuat gambar',
      'Menjalankan browser'
    ],
    answer: 2
  },
  {
    category: 'JAVASCRIPT',
    question: 'Struktur pengulangan yang pasti dijalankan minimal SATU kali walaupun kondisi salah adalah...',
    options: [
      'for loop',
      'while loop',
      'do-while loop',
      'foreach loop',
      'repeat-until loop'
    ],
    answer: 2
  },
  {
    category: 'HTML',
    question: 'Manakah struktur dasar HTML yang benar...',
    options: [
      '<html><body><head></head></body></html>',
      '<html><head></head><body></body></html>',
      '<head><html></html><body></body></head>',
      '<body><head></head><html></html></body>',
      '<html><title></title><footer></footer>'
    ],
    answer: 1
  },
  {
    category: 'CSS',
    question: 'Manakah yang merupakan contoh selector class di CSS?',
    options: [
      '#header',
      '.header',
      'header()',
      '*header',
      'header{}'
    ],
    answer: 1
  },
  {
    category: 'HTML',
    question: 'Atribut HTML yang wajib ada pada tag <img> untuk aksesibilitas dan SEO adalah...',
    options: [
      'src',
      'title',
      'alt',
      'id',
      'class'
    ],
    answer: 0
  }
];

// =============================================
// GAME STATE
// =============================================
const STATE = {
  playerName: '',
  currentIndex: 0,
  userAnswers: new Array(20).fill(null), // null = belum dijawab
  timer: null,
  timeLeft: 30 * 60, // 30 menit dalam detik
  isMuted: false,
  audioCtx: null,
  bgMusicNode: null,
  bgMusicGain: null,
  bgInterval: null,
  quizStarted: false,
};

const KKM = 85;
const POINT_PER_Q = 5;
const LABELS = ['A', 'B', 'C', 'D', 'E'];

// =============================================
// LOADING SCREEN
// =============================================
window.addEventListener('DOMContentLoaded', () => {
  generateLoadingStars();
  simulateLoading();
  generateBackgroundParticles();
});

function generateLoadingStars() {
  const container = document.getElementById('pixel-stars');
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.className = 'pstar';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    star.style.animationDuration = (0.5 + Math.random() * 1.5) + 's';
    star.style.width = Math.random() > 0.5 ? '6px' : '4px';
    star.style.height = star.style.width;
    container.appendChild(star);
  }
}

function simulateLoading() {
  const bar = document.getElementById('loading-bar');
  const text = document.getElementById('loading-text');
  const msgs = ['LOADING...', 'MEMUAT SOAL...', 'MENYIAPKAN ARENA...', 'SIAP!'];
  let pct = 0;
  let msgIdx = 0;

  const iv = setInterval(() => {
    pct += Math.random() * 18 + 5;
    if (pct > 100) pct = 100;
    bar.style.width = pct + '%';

    const mIdx = Math.floor((pct / 100) * msgs.length);
    if (mIdx !== msgIdx && mIdx < msgs.length) {
      msgIdx = mIdx;
      text.textContent = msgs[msgIdx];
    }

    if (pct >= 100) {
      clearInterval(iv);
      text.textContent = 'SIAP!';
      setTimeout(showHomeScreen, 600);
    }
  }, 150);
}

function showHomeScreen() {
  const loading = document.getElementById('loading-screen');
  loading.style.opacity = '0';
  loading.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    loading.style.display = 'none';
    showScreen('home-screen');
    loadHistoryPreview();
  }, 500);
}

// =============================================
// SCREEN NAVIGATION
// =============================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden');
    el.style.opacity = '0';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s ease';
      el.style.opacity = '1';
    });
  }
}

// =============================================
// HOME SCREEN
// =============================================
function loadHistoryPreview() {
  const history = getHistory();
  const preview = document.getElementById('history-preview');
  const listEl = document.getElementById('history-list-home');

  if (history.length > 0) {
    preview.classList.remove('hidden');
    listEl.innerHTML = '';
    const last3 = history.slice(-3).reverse();
    last3.forEach(h => {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <span class="h-name">${escHtml(h.name)}</span>
        <span class="h-score">${h.score}/100</span>
        <span class="h-status ${h.passed ? 'lulus' : 'tidak'}">${h.passed ? 'LULUS' : 'TIDAK LULUS'}</span>
        <span style="font-family:var(--font-vt);font-size:1rem;color:var(--pixel-gray)">${formatDate(h.date)}</span>
      `;
      listEl.appendChild(div);
    });
  }
}

// Enter key triggers start
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('player-name');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') startQuiz();
    });
  }
});

function startQuiz() {
  const input = document.getElementById('player-name');
  const name = input.value.trim().toUpperCase();
  const err = document.getElementById('name-error');

  if (!name) {
    err.classList.remove('hidden');
    input.focus();
    playBeep(200, 'square', 0.3, 0.2);
    return;
  }

  err.classList.add('hidden');
  STATE.playerName = name;
  STATE.currentIndex = 0;
  STATE.userAnswers = new Array(20).fill(null);
  STATE.timeLeft = 30 * 60;
  STATE.quizStarted = true;

  initAudio();
  buildQuizUI();
  showScreen('quiz-screen');
  startTimer();
  setTimeout(() => playBgMusic(), 500);
}

// =============================================
// QUIZ UI BUILD
// =============================================
function buildQuizUI() {
  // Set player name in HUD
  document.getElementById('player-name-display').textContent = STATE.playerName;

  // Build number navigation
  buildNumNav();

  // Render first question
  renderQuestion(0);
}

function buildNumNav() {
  const nav = document.getElementById('num-nav');
  nav.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    const btn = document.createElement('button');
    btn.className = 'num-btn';
    btn.textContent = i + 1;
    btn.dataset.index = i;
    btn.onclick = () => goToQuestion(i);
    nav.appendChild(btn);
  }
  updateNumNav();
}

function updateNumNav() {
  const btns = document.querySelectorAll('.num-btn');
  btns.forEach((btn, i) => {
    btn.className = 'num-btn';
    if (STATE.userAnswers[i] !== null) btn.classList.add('answered');
    if (i === STATE.currentIndex) btn.classList.add('active');
  });
}

function renderQuestion(index) {
  const q = QUESTIONS[index];
  STATE.currentIndex = index;

  // Update HUD
  document.getElementById('current-q-display').textContent = index + 1;
  document.getElementById('q-number').textContent = `SOAL #${index + 1}`;
  document.getElementById('q-category').textContent = q.category;
  document.getElementById('q-text').textContent = q.question;

  // Update progress
  const answered = STATE.userAnswers.filter(a => a !== null).length;
  const pct = Math.round((answered / 20) * 100);
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-text').textContent = pct + '%';

  // Update live score
  const score = calcScore();
  document.getElementById('live-score').textContent = score;

  // Render options
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn' + (STATE.userAnswers[index] === i ? ' selected' : '');
    btn.innerHTML = `
  <span class="option-label">${LABELS[i]}</span>
  <span class="option-text">${escHtml(opt)}</span>
`;
    btn.onclick = () => selectAnswer(index, i, btn);
    container.appendChild(btn);
  });

  // Panel animation
  const panel = document.getElementById('question-panel');
  panel.style.animation = 'none';
  requestAnimationFrame(() => { panel.style.animation = 'slide-in 0.3s ease'; });
  container.style.animation = 'none';
  requestAnimationFrame(() => { container.style.animation = 'slide-in 0.35s ease'; });

  // Update Mario speech
  updateMarioSpeech(index);

  // Update nav buttons
  document.getElementById('prev-btn').disabled = (index === 0);
  const nextBtn = document.getElementById('next-btn');
  if (index === 19) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = '';
    nextBtn.disabled = false;
  }

  updateNumNav();
}

function selectAnswer(qIndex, optIndex, btn) {
  STATE.userAnswers[qIndex] = optIndex;

  // Visual feedback
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  // Update number nav
  updateNumNav();

  // Update progress & score
  const answered = STATE.userAnswers.filter(a => a !== null).length;
  const pct = Math.round((answered / 20) * 100);
  document.getElementById('progress-bar').style.width = pct + '%';
  document.getElementById('progress-text').textContent = pct + '%';
  document.getElementById('live-score').textContent = calcScore();

  playBeep(660, 'sine', 0.2, 0.1);
}

function goToQuestion(index) {
  if (index < 0 || index > 19) return;
  renderQuestion(index);
  playBeep(440, 'sine', 0.1, 0.08);
}

function prevQuestion() {
  if (STATE.currentIndex > 0) goToQuestion(STATE.currentIndex - 1);
}

function nextQuestion() {
  if (STATE.currentIndex < 19) goToQuestion(STATE.currentIndex + 1);
}

function calcScore() {
  let correct = 0;
  STATE.userAnswers.forEach((ans, i) => {
    if (ans !== null && ans === QUESTIONS[i].answer) correct++;
  });
  return correct * POINT_PER_Q;
}

// =============================================
// TIMER
// =============================================
function startTimer() {
  updateTimerDisplay();
  STATE.timer = setInterval(() => {
    STATE.timeLeft--;
    updateTimerDisplay();
    if (STATE.timeLeft <= 0) {
      clearInterval(STATE.timer);
      finalSubmit(true); // time up
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(STATE.timeLeft / 60);
  const s = STATE.timeLeft % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  const el = document.getElementById('timer-display');
  const box = document.getElementById('timer-box');
  el.textContent = `${mm}:${ss}`;

  if (STATE.timeLeft <= 60) {
    box.classList.add('warning');
  } else {
    box.classList.remove('warning');
  }
}

// =============================================
// SUBMIT
// =============================================
function confirmSubmit() {
  const unanswered = STATE.userAnswers.filter(a => a === null).length;
  const info = document.getElementById('unanswered-info');

  if (unanswered > 0) {
    info.textContent = `⚠ ${unanswered} SOAL BELUM DIJAWAB! SOAL KOSONG DIANGGAP SALAH.`;
  } else {
    info.textContent = '✅ SEMUA SOAL SUDAH DIJAWAB!';
  }

  document.getElementById('submit-modal').classList.remove('hidden');
  playBeep(550, 'square', 0.2, 0.15);
}

function closeSubmitModal() {
  document.getElementById('submit-modal').classList.add('hidden');
}

function finalSubmit(timeUp = false) {
  // Stop timer
  if (STATE.timer) clearInterval(STATE.timer);
  STATE.quizStarted = false;

  // Close modals
  closeSubmitModal();

  // Stop music
  stopBgMusic();
  playBeep(880, 'sine', 0.3, 0.4);

  // Calculate result
  const score = calcScore();
  const correct = Math.round(score / POINT_PER_Q);
  const wrong = 20 - correct;
  const passed = score >= KKM;

  // Wrong question indices
  const wrongList = [];
  QUESTIONS.forEach((q, i) => {
    const ans = STATE.userAnswers[i];
    if (ans === null || ans !== q.answer) wrongList.push(i + 1);
  });

  // Save to history if not passed (or always save)
  const attempt = {
    name: STATE.playerName,
    score,
    correct,
    wrong,
    passed,
    date: new Date().toISOString(),
    answers: [...STATE.userAnswers],
    wrongList,
  };
  saveToHistory(attempt);

  // Show result screen
  showResultScreen(attempt, timeUp);
}

// =============================================
// RESULT SCREEN
// =============================================
function showResultScreen(attempt, timeUp) {
  const { score, correct, wrong, passed, wrongList } = attempt;

  showScreen('result-screen');

  document.getElementById('result-name-display').textContent = `👤 ${attempt.name}`;
  document.getElementById('result-score').textContent = score;
  document.getElementById('stat-correct').textContent = correct;
  document.getElementById('stat-wrong').textContent = wrong;

  // Status
  const statusEl = document.getElementById('result-status');
  if (passed) {
    statusEl.textContent = timeUp ? '⏱ WAKTU HABIS - LULUS! 🎉' : '🎉 LULUS! 🎉';
    statusEl.className = 'result-status status-lulus';
    launchConfetti();
    playSuccessSound();
  } else {
    statusEl.textContent = timeUp ? '⏱ WAKTU HABIS - TIDAK LULUS' : '😢 TIDAK LULUS';
    statusEl.className = 'result-status status-tidak';
    playFailSound();
  }

  // Score box color
  const scoreBox = document.getElementById('result-score-box');
  const scoreEl = document.getElementById('result-score');
  scoreEl.style.color = passed ? 'var(--pixel-correct)' : 'var(--pixel-wrong)';

  // Wrong list
  const wrongSection = document.getElementById('wrong-list-section');
  const wrongNums = document.getElementById('wrong-numbers');
  if (wrongList.length > 0) {
    wrongSection.classList.remove('hidden');
    wrongNums.innerHTML = wrongList.map(n =>
      `<span class="wrong-num-badge">NO.${n}</span>`
    ).join('');
  } else {
    wrongSection.classList.add('hidden');
  }
}

function launchConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#e74c3c', '#f39c12', '#27ae60', '#3498db', '#9b59b6', '#f7c948', '#1abc9c'];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '-10px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2 + Math.random() * 2) + 's';
    piece.style.animationDelay = (Math.random() * 1.5) + 's';
    piece.style.width = (6 + Math.random() * 6) + 'px';
    piece.style.height = piece.style.width;
    container.appendChild(piece);
  }
  // Clean up after animation
  setTimeout(() => { container.innerHTML = ''; }, 6000);
}

// =============================================
// NAVIGATION (result screen)
// =============================================
function restartQuiz() {
  showScreen('home-screen');
  loadHistoryPreview();
  document.getElementById('player-name').value = '';
  document.getElementById('confetti-container').innerHTML = '';
}

function goHome() {
  restartQuiz();
}

// =============================================
// HISTORY (localStorage)
// =============================================
const HISTORY_KEY = 'pixelQuizHistory';

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch { return []; }
}

function saveToHistory(attempt) {
  const history = getHistory();
  history.push(attempt);
  // Keep last 50 attempts max
  if (history.length > 50) history.splice(0, history.length - 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

function showHistoryModal() {
  const modal = document.getElementById('history-modal');
  const content = document.getElementById('history-modal-content');
  const history = getHistory();

  content.innerHTML = '';

  if (history.length === 0) {
    content.innerHTML = '<div style="padding:1rem;text-align:center;font-family:var(--font-vt);font-size:1.2rem;color:var(--pixel-gray)">BELUM ADA HISTORI</div>';
  } else {
    // Clear all button at top
    const clearAllDiv = document.createElement('div');
    clearAllDiv.style.cssText = 'padding:0.6rem 1rem;display:flex;justify-content:flex-end;border-bottom:2px solid rgba(255,255,255,0.08);';
    clearAllDiv.innerHTML = `<button class="pixel-btn btn-danger" style="font-size:0.45rem;padding:0.35rem 0.7rem;" onclick="clearAllHistory()">🗑 HAPUS SEMUA</button>`;
    content.appendChild(clearAllDiv);

    history.slice().reverse().forEach((h, idx) => {
      const div = document.createElement('div');
      div.className = 'history-attempt';
      const realIdx = history.length - 1 - idx;
      div.innerHTML = `
        <div>
          <div class="ha-name">${escHtml(h.name)}</div>
          <div class="ha-date">${formatDate(h.date)}</div>
        </div>
        <div class="ha-score">${h.score}/100</div>
        <div class="ha-status ${h.passed ? 'lulus' : 'tidak'}">${h.passed ? '✅ LULUS' : '❌ TIDAK'}</div>
        <div style="display:flex;gap:0.4rem;align-items:center;">
          <button class="ha-review-btn" onclick="openReview(${realIdx})">🔍 REVIEW</button>
          <button class="ha-review-btn" style="background:var(--pixel-red);border-color:var(--pixel-dark-red);" onclick="deleteHistoryItem(${realIdx})">🗑</button>
        </div>
      `;
      content.appendChild(div);
    });
  }

  modal.classList.remove('hidden');
}

function deleteHistoryItem(index) {
  const history = getHistory();
  history.splice(index, 1);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  showHistoryModal();
  loadHistoryPreview();
  playBeep(300, 'square', 0.2, 0.15);
}

function clearAllHistory() {
  if (!confirm('Hapus SEMUA histori quiz? Tindakan ini tidak bisa dibatalkan.')) return;
  localStorage.removeItem(HISTORY_KEY);
  showHistoryModal();
  loadHistoryPreview();
  document.getElementById('history-preview').classList.add('hidden');
  playBeep(200, 'sawtooth', 0.25, 0.2);
}

function closeHistoryModal() {
  document.getElementById('history-modal').classList.add('hidden');
}

function openReview(historyIndex) {
  const history = getHistory();
  const attempt = history[historyIndex];
  if (!attempt) return;

  const modal = document.getElementById('review-modal');
  const content = document.getElementById('review-content');
  content.innerHTML = '';

  QUESTIONS.forEach((q, i) => {
    const userAns = attempt.answers[i];
    const isCorrect = userAns !== null && userAns === q.answer;
    const hasAns = userAns !== null;

    const div = document.createElement('div');
    div.className = 'review-item';

    let ansText, ansClass;
    if (!hasAns) {
      ansText = 'Tidak dijawab';
      ansClass = 'no-ans';
    } else {
      const label = LABELS[userAns];
      const optText = q.options[userAns];
      ansText = `${label}. ${optText} — ${isCorrect ? '✅ BENAR' : '❌ SALAH'}`;
      ansClass = isCorrect ? 'correct-ans' : 'wrong-ans';
    }

    div.innerHTML = `
      <div class="review-q-num">SOAL #${i + 1} — ${q.category}</div>
      <div class="review-q-text">${escHtml(q.question)}</div>
      <div class="review-answer ${ansClass}">${escHtml(ansText)}</div>
    `;
    content.appendChild(div);
  });

  closeHistoryModal();
  modal.classList.remove('hidden');
}

function closeReviewModal() {
  document.getElementById('review-modal').classList.add('hidden');
}

// =============================================
// AUDIO - Web Audio API (no external files)
// =============================================
function initAudio() {
  try {
    STATE.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch (e) {
    console.warn('Web Audio API not supported');
  }
}

/* General beep/click sound */
function playBeep(freq = 440, type = 'sine', vol = 0.2, duration = 0.1) {
  if (STATE.isMuted || !STATE.audioCtx) return;
  try {
    const osc = STATE.audioCtx.createOscillator();
    const gain = STATE.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(STATE.audioCtx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, STATE.audioCtx.currentTime);
    gain.gain.setValueAtTime(vol, STATE.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, STATE.audioCtx.currentTime + duration);
    osc.start();
    osc.stop(STATE.audioCtx.currentTime + duration);
  } catch (e) { }
}

/* Play a simple melody note sequence */
function playNote(ctx, freq, start, dur, type = 'square', vol = 0.15) {
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
    gain.gain.setValueAtTime(0, ctx.currentTime + start);
    gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
    osc.start(ctx.currentTime + start);
    osc.stop(ctx.currentTime + start + dur + 0.05);
  } catch (e) { }
}

/* Background music - simple retro loop */
function playBgMusic() {
  if (!STATE.audioCtx || STATE.isMuted) return;
  stopBgMusic();

  // Simple 8-bar NES-style melody (Mario-esque scale pattern)
  const melody = [
    659, 659, 0, 659, 0, 523, 659, 0,
    784, 0, 0, 0, 392, 0, 0, 0,
    523, 0, 0, 392, 0, 0, 330, 0,
    0, 440, 0, 494, 0, 466, 440, 0,
    392, 659, 784, 880, 0, 698, 784, 0,
    659, 0, 523, 587, 494, 0, 0, 0,
    523, 0, 0, 392, 0, 0, 330, 0,
    0, 440, 0, 494, 0, 466, 440, 0,
  ];

  const bass = [
    131, 0, 131, 0, 156, 0, 156, 0,
    196, 0, 196, 0, 147, 0, 147, 0,
    131, 0, 131, 0, 156, 0, 156, 0,
    175, 0, 175, 0, 196, 0, 196, 0,
    131, 0, 131, 0, 156, 0, 156, 0,
    196, 0, 196, 0, 147, 0, 147, 0,
    131, 0, 131, 0, 156, 0, 156, 0,
    175, 0, 175, 0, 196, 0, 196, 0,
  ];

  const BPM = 180;
  const beat = 60 / BPM;
  const loopDuration = melody.length * beat;

  function playLoop() {
    if (STATE.isMuted || !STATE.audioCtx) return;
    melody.forEach((freq, i) => {
      if (freq > 0) playNote(STATE.audioCtx, freq, i * beat, beat * 0.85, 'square', 0.08);
    });
    bass.forEach((freq, i) => {
      if (freq > 0) playNote(STATE.audioCtx, freq, i * beat, beat * 0.5, 'triangle', 0.12);
    });
  }

  playLoop();
  STATE.bgInterval = setInterval(playLoop, loopDuration * 1000);
}

function stopBgMusic() {
  if (STATE.bgInterval) {
    clearInterval(STATE.bgInterval);
    STATE.bgInterval = null;
  }
}

function toggleMute() {
  STATE.isMuted = !STATE.isMuted;
  const btn = document.getElementById('mute-btn');
  if (STATE.isMuted) {
    stopBgMusic();
    btn.textContent = '🔇';
  } else {
    btn.textContent = '🔊';
    if (STATE.quizStarted) playBgMusic();
  }
}

/* Success sound - rising arpeggio */
function playSuccessSound() {
  if (!STATE.audioCtx) return;
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => {
    setTimeout(() => playBeep(f, 'sine', 0.3, 0.3), i * 150);
  });
}

/* Fail sound - descending */
function playFailSound() {
  if (!STATE.audioCtx) return;
  const notes = [392, 330, 262, 196];
  notes.forEach((f, i) => {
    setTimeout(() => playBeep(f, 'sawtooth', 0.25, 0.25), i * 150);
  });
}

// =============================================
// BACKGROUND PIXEL PARTICLES (decorative)
// =============================================
function generateBackgroundParticles() {
  const shapes = ['⭐', '🌟', '✨', '💫'];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className = 'pixel-particle';
    el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (8 + Math.random() * 10) + 'px';
    el.style.animationDuration = (8 + Math.random() * 15) + 's';
    el.style.animationDelay = -(Math.random() * 15) + 's';
    el.style.opacity = '0.15';
    document.body.appendChild(el);
  }
}

// =============================================
// UTILITIES
// =============================================
function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      + ' ' + d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  } catch { return iso; }
}

// =============================================
// CLOSE MODALS ON OVERLAY CLICK
// =============================================
document.addEventListener('click', e => {
  if (e.target.id === 'history-modal') closeHistoryModal();
  if (e.target.id === 'review-modal') closeReviewModal();
  if (e.target.id === 'submit-modal') closeSubmitModal();
});

// =============================================
// KEYBOARD SHORTCUTS
// =============================================
document.addEventListener('keydown', e => {
  if (!STATE.quizStarted) return;
  switch (e.key) {
    case 'ArrowLeft': prevQuestion(); break;
    case 'ArrowRight': nextQuestion(); break;
    case '1': case '2': case '3': case '4': case '5':
      const idx = parseInt(e.key) - 1;
      const btns = document.querySelectorAll('.option-btn');
      if (btns[idx]) btns[idx].click();
      break;
  }
});

// =============================================
// MARIO SPEECH BUBBLE - changes per question
// =============================================
const MARIO_SPEECHES = [
  'MULAI! 🍄', 'BISA! 💪', 'MANTAP! ⭐', 'LANJUT! 🏃',
  'HAYUK! 🎯', 'YOK! 🔥', 'SERU! 🕹️', 'GAS! 🚀',
  'JAGO! 🏆', 'SETENGAH! 🌟', 'IYA! 👍', 'BAGUS! ✨',
  'TINGGAL! ⏰', 'DIKIT! 💫', 'HAMPIR! 🎉', 'HEBAT! 🌈',
  'KEREN! 🔑', 'DETAIL! 🎮', 'MAU MENANG! 🏅', 'TERAKHIR! 🏁'
];

function updateMarioSpeech(index) {
  const el = document.getElementById('mario-speech');
  if (!el) return;
  el.textContent = MARIO_SPEECHES[index] || 'YOSH! ⭐';
  // restart animation
  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = 'speech-pop 0.3s ease'; });
}

// =============================================
// ABOUT PAGE NAVIGATION
// =============================================
function goToAbout() {
  window.location.href = "about.html";
}
