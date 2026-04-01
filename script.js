// =========================
// KODE AKSES (ADMIN & USER)
// =========================
const validCodes = [
  "BSQA-ADMIN-001",
  "BSQA-USER-001",
  "BSQA-USER-002"
];

// =========================
// DATA PERTANYAAN (SETARA ClearCollect)
// =========================
const questions = [
  // ===== SIKAP =====
  { QID: "Q1", text: "Apakah Satpam ada di area dalam banking hall ?", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "Q2a", text: "Membukakan pintu banking hall ?", category: "SIKAP", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "Q2b", text: "Mengucapkan salam ?", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "Q2c", text: "Menawarkan bantuan ?", category: "SIKAP", score: { YA: 5, TIDAK: 0, NA: 0 } },
  { QID: "Q2d", text: "Suara Satpam terdengar dengan jelas", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "Q2e", text: "Sikap Satpam tidak grogi/fokus dan ramah", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "Q3", text: "Memberikan kartu antrian dan mempersilahkan duduk", category: "SIKAP", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "Q4", text: "Satpam membantu nasabah saat tidak di pintu", category: "SIKAP", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "Q5", text: "Tidak melakukan hal non produktif", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "Q6", text: "Konsisten produktif selama jam layanan", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "Q7a", text: "Membukakan pintu saat nasabah keluar", category: "SIKAP", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "Q7b", text: "Mengucapkan terima kasih", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "Q7c", text: "Mengucapkan salam (keluar)", category: "SIKAP", score: { YA: 5, TIDAK: 0, NA: 0 } },
  { QID: "Q7d", text: "Suara Satpam terdengar jelas (keluar)", category: "SIKAP", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "Q8", text: "Mengisi Logbook Tamu", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "Q9", text: "Membantu/mengawasi area banking hall", category: "SIKAP", score: { YA: 7, TIDAK: 0, NA: 0 } },

  // ===== SKILL =====
  { QID: "Qskill1", text: "Mengetahui biaya transaksi Teller/ATM", category: "SKILL", score: { YA: 41, TIDAK: 0, NA: 0 } },

  // ===== PENAMPILAN =====
  { QID: "QP1a", text: "Rambut Satpam rapi", category: "PENAMPILAN", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "QP1b", text: "Tidak bau badan/mulut", category: "PENAMPILAN", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "QP2a", text: "Baju rapi dan bersih", category: "PENAMPILAN", score: { YA: 11, TIDAK: 0, NA: 0 } },
  { QID: "QP2b", text: "Memakai kopel hitam", category: "PENAMPILAN", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "QP2c", text: "Memakai tali kur & peluit", category: "PENAMPILAN", score: { YA: 7, TIDAK: 0, NA: 0 } },
  { QID: "QP2d", text: "Memakai pentungan", category: "PENAMPILAN", score: { YA: 11, TIDAK: 0, NA: 0 } },
  { QID: "QP2e", text: "Memakai badge Polda", category: "PENAMPILAN", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "QP2f", text: "Memakai borgol", category: "PENAMPILAN", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "QP2g", text: "Memakai nametag BTPNS", category: "PENAMPILAN", score: { YA: 9, TIDAK: 0, NA: 0 } },
  { QID: "QP2h", text: "Memakai nama dada", category: "PENAMPILAN", score: { YA: 9, TIDAK: 0, NA: 0 } }
];

// =========================
// STATE APLIKASI
// =========================
let currentIndex = 0;
let answers = [];

// =========================
// LOGIN
// =========================
function login() {
  const input = document.getElementById("accessCode").value.trim();
  if (validCodes.includes(input)) {
    showMenu();
  } else {
    alert("Kode akses tidak valid");
  }
}

// =========================
// MENU
// =========================
function showMenu() {
  document.getElementById("app").innerHTML = `
    <h2>Menu</h2>
    <button onclick="startQuestionnaire()">Mulai Kuesioner</button>
    <button onclick="logout()">Logout</button>
  `;
}

// =========================
// START QUESTIONNAIRE
// =========================
function startQuestionnaire() {
  currentIndex = 0;
  answers = [];
  showQuestion();
}

// =========================
// SHOW QUESTION
// =========================
function showQuestion() {
  const q = questions[currentIndex];
  document.getElementById("app").innerHTML = `
    <h3>${q.category}</h3>
    <p>${q.text}</p>
    <button onclick="answerQuestion('YA')">YA</button>
    <button onclick="answerQuestion('TIDAK')">TIDAK</button>
    <button onclick="answerQuestion('NA')">N/A</button>
  `;
}

// =========================
// ANSWER QUESTION
// =========================
function answerQuestion(value) {
  const q = questions[currentIndex];

  answers.push({
    QID: q.QID,
    category: q.category,
    answer: value,
    score: q.score[value]
  });

  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// =========================
// SHOW RESULT
// =========================
function showResult() {
  const total = { SIKAP: 0, SKILL: 0, PENAMPILAN: 0 };

  answers.forEach(a => {
    total[a.category] += a.score;
  });

  document.getElementById("app").innerHTML = `
    <h2>HASIL PENILAIAN</h2>
    <p>Total Sikap: <b>${total.SIKAP}</b></p>
    <p>Total Skill: <b>${total.SKILL}</b></p>
    <p>Total Penampilan: <b>${total.PENAMPILAN}</b></p>
    <button onclick="showMenu()">Kembali ke Menu</button>
  `;
}

// =========================
// LOGOUT
// =========================
function logout() {
  location.reload();
}
