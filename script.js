/********************************
 * 1. KODE AKSES (LOGIN)
 ********************************/
const validCodes = [
  "BSQA-ADMIN-001",
  "BSQA-USER-001",
  "BSQA-USER-002"
];

/********************************
 * 2. DATA QUESTIONNAIRE
 ********************************/
const questions = [
  // ===== SIKAP =====
  { QID:"Q1", text:"Apakah Satpam ada di area dalam banking hall ?", category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { QID:"Q2a", text:"Membukakan pintu banking hall ?", category:"SIKAP", score:{YA:9,TIDAK:0,NA:0} },
  { QID:"Q2b", text:"Mengucapkan salam ?", category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { QID:"Q2c", text:"Menawarkan bantuan ?", category:"SIKAP", score:{YA:5,TIDAK:0,NA:0} },
  { QID:"Q2d", text:"Suara Satpam terdengar jelas", category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { QID:"Q3", text:"Memberikan kartu antrian", category:"SIKAP", score:{YA:9,TIDAK:0,NA:0} },

  // ===== SKILL =====
  { QID:"Qskill1", text:"Mengetahui biaya transaksi Teller/ATM", category:"SKILL", score:{YA:41,TIDAK:0,NA:0} },

  // ===== PENAMPILAN =====
  { QID:"QP1a", text:"Rambut Satpam rapi", category:"PENAMPILAN", score:{YA:9,TIDAK:0,NA:0} },
  { QID:"QP1b", text:"Tidak bau badan/mulut", category:"PENAMPILAN", score:{YA:9,TIDAK:0,NA:0} },
  { QID:"QP2a", text:"Seragam rapi dan bersih", category:"PENAMPILAN", score:{YA:11,TIDAK:0,NA:0} }
];

/********************************
 * 3. HITUNG SKOR MAKSIMUM
 ********************************/
const maxScore = { SIKAP:0, SKILL:0, PENAMPILAN:0 };
questions.forEach(q => {
  maxScore[q.category] += q.score.YA;
});

/********************************
 * 4. STATE GLOBAL
 ********************************/
let currentIndex = 0;
let answers = [];
let namaUser = "";
let nikUser = "";

/********************************
 * 5. LOGIN
 ********************************/
function login() {
  const code = document.getElementById("accessCode").value.trim();
  if (!validCodes.includes(code)) {
    alert("Kode akses tidak valid");
    return;
  }
  showMenu();
}

/********************************
 * 6. MENU + INPUT USER
 ********************************/
function showMenu() {
  document.getElementById("app").innerHTML = `
    <h2>Data Penilai</h2>
    <input id="nama" placeholder="Nama Lengkap"><br><br>
    <input id="nik" placeholder="NIK"><br><br>

    <button onclick="start()">Mulai Kuesioner</button>
    <button onclick="logout()">Logout</button>
  `;
}

/********************************
 * 7. START QUESTIONNAIRE
 ********************************/
function start() {
  namaUser = document.getElementById("nama").value;
  nikUser = document.getElementById("nik").value;

  if (!namaUser || !nikUser) {
    alert("Nama dan NIK wajib diisi");
    return;
  }

  currentIndex = 0;
  answers = [];
  showQuestion();
}

/********************************
 * 8. TAMPILKAN PERTANYAAN
 ********************************/
function showQuestion() {
  const q = questions[currentIndex];
  document.getElementById("app").innerHTML = `
    <h3>${q.category}</h3>
    <p>${q.text}</p>

    <button onclick="answer('YA')">YA</button>
    <button onclick="answer('TIDAK')">TIDAK</button>
    <button onclick="answer('NA')">N/A</button>
  `;
}

/********************************
 * 9. SIMPAN JAWABAN
 ********************************/
function answer(val) {
  const q = questions[currentIndex];

  answers.push({
    QID: q.QID,
    category: q.category,
    answer: val,
    score: q.score[val]
  });

  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

/********************************
 * 10. TAMPILKAN HASIL + PERSENTASE
 ********************************/
function showResult() {
  const total = { SIKAP:0, SKILL:0, PENAMPILAN:0 };

  answers.forEach(a => total[a.category] += a.score);

  const percent = {
    SIKAP: Math.round((total.SIKAP / maxScore.SIKAP) * 100),
    SKILL: Math.round((total.SKILL / maxScore.SKILL) * 100),
    PENAMPILAN: Math.round((total.PENAMPILAN / maxScore.PENAMPILAN) * 100)
  };

  const resultAkhir = Math.round(
    (percent.SIKAP + percent.SKILL + percent.PENAMPILAN) / 3
  );

  document.getElementById("app").innerHTML = `
    <h2>HASIL PENILAIAN</h2>

    <p>Sikap: ${total.SIKAP} (${percent.SIKAP}%)</p>
    <p>Skill: ${total.SKILL} (${percent.SKILL}%)</p>
    <p>Penampilan: ${total.PENAMPILAN} (${percent.PENAMPILAN}%)</p>

    <h3>RESULT AKHIR: ${resultAkhir}%</h3>

    <button onclick="downloadExcel(${resultAkhir})">Download Excel</button>
    <button onclick="showMenu()">Kembali</button>
  `;
}

/********************************
 * 11. DOWNLOAD EXCEL (CSV)
 ********************************/
function downloadExcel(resultAkhir) {
  const total = {
    SIKAP: sum("SIKAP"),
    SKILL: sum("SKILL"),
    PENAMPILAN: sum("PENAMPILAN")
  };

  let csv = "Nama,NIK,Total Sikap,Total Skill,Total Penampilan,Result (%)\n";
  csv += `${namaUser},${nikUser},${total.SIKAP},${total.SKILL},${total.PENAMPILAN},${resultAkhir}%`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "hasil_penilaian_bsqa.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/********************************
 * 12. HELPER
 ********************************/
function sum(cat) {
  return answers
    .filter(a => a.category === cat)
    .reduce((s, a) => s + a.score, 0);
}

/********************************
 * 13. LOGOUT
 ********************************/
function logout() {
  location.reload();
}
