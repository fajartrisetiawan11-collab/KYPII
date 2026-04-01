// ====== DATA ADMIN (KAMU) ======
const validCodes = [
  "BSQA-ADMIN-001",
  "BSQA-USER-001",
  "BSQA-USER-002"
];

// ====== LOGIN LOGIC ======
function login() {
  const input = document.getElementById("accessCode").value.trim();

  if (validCodes.includes(input)) {
    showMenu();
  } else {
    alert("Kode akses tidak valid");
  }
}

// ====== MENU ======
function showMenu() {
  document.getElementById("app").innerHTML = `
    <h2>Menu</h2>
    <button onclick="startQuestionnaire()">Mulai Kuesioner</button>
    <button onclick="logout()">Logout</button>
  `;
}

// ====== QUESTIONNAIRE ======
function startQuestionnaire() {
  document.getElementById("app").innerHTML = `
    <h3>Pertanyaan</h3>
    <p>Apakah Satpam mengucapkan salam?</p>

    <button onclick="answer('YA')">YA</button>
    <button onclick="answer('TIDAK')">TIDAK</button>
    <button onclick="answer('NA')">NA</button>
  `;
}

// ====== ANSWER LOGIC ======
function answer(value) {
  let score = value === "YA" ? 7 : 0;

  document.getElementById("app").innerHTML = `
    <h3>Hasil</h3>
    <p>Jawaban: <b>${value}</b></p>
    <p>Skor: <b>${score}</b></p>
    <button onclick="showMenu()">Kembali ke Menu</button>
  `;
}

// ====== LOGOUT ======
function logout() {
  location.reload();
}
