/********************************
 * 1. USER & ROLE
 ********************************/
const users = [
  { code: "BSQA-ADMIN-001", role: "ADMIN" },
  { code: "BSQA-USER-001", role: "USER" },
  { code: "BSQA-USER-002", role: "USER" }
];

let currentRole = "";

/********************************
 * 2. DATA QUESTIONNAIRE
 ********************************/
const questions = [
  { text:"Apakah Satpam ada di area banking hall?", category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Membukakan pintu banking hall?", category:"SIKAP", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Mengucapkan salam?", category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Menawarkan bantuan ?",category:"SIKAP", score:{YA:5,TIDAK:0,NA:0} },
  { text:"Suara Satpam terdengar dengan jelas",category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Sikap Satpam tidak grogi/ fokus dan ramah",category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Jika nasabah akan ke Teller/CR Satpam memberikan kartu antrian lalu mempersilahkan duduk di kursi tunggu",category:"SIKAP", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Jika Satpam tidak ada di area pintu banking hall, apakah Satpam sedang membantu nasabah/siaga di writing desk/berkeliling/mengawasi area banking hall?",category:"SIKAP", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Apakah Satpam sempat melakukan hal-hal yang non produktif, termasuk namun tidak terbatas pada:Satpam hanya berdiri di dekat pintu/menggunakan HP/mengobrol dengan sesama anggota Satpam lainnya namun bukan seputar pekerjaan ? ",category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Satpam konsisten berada di dalam banking hall dan melakukan hal yang produktif selama jam layanan",category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Membukakan pintu banking hall ?",category:"SIKAP", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Mengucapkan terima kasih atas kunjungan nasabah ?",category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Mengucapkan salam ?",category:"SIKAP", score:{YA:5,TIDAK:0,NA:0} },
  { text:"Suara Satpam terdengar dengan jelas",category:"SIKAP", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Mengisi Logbook Tamu",category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Jika Satpam tidak ada di area pintu banking hall, apakah Satpam sedang membantu nasabah/siaga di writing desk/berkeliling mengawasi area banking hall ? ",category:"SIKAP", score:{YA:7,TIDAK:0,NA:0} },

  { text:"Mengetahui biaya transaksi Teller/ATM?", category:"SKILL", score:{YA:41,TIDAK:0,NA:0} },

  { text:"Rambut Satpam rapi", category:"PENAMPILAN", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Apakah Satpam bau badan/mulut ?", category:"PENAMPILAN", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Seragam rapi & bersih", category:"PENAMPILAN", score:{YA:11,TIDAK:0,NA:0} },
  { text:"Apakah Satpam mengenakan kopel berwarna hitam ?", category:"PENAMPILAN", score:{YA:7,TIDAK:0,NA:0} },
  { text:"Apakah Satpam mengenakan tali kur & peluit ?", category:"PENAMPILAN",score:{YA:7,TIDAK:0,NA:0} },
  { text:"Apakah Satpam mengenakan tongkat/pentungan?", category:"PENAMPILAN", score:{YA:11,TIDAK:0,NA:0} },
  { text:"Apakah Satpam mengenakan badge Polda ?", category:"PENAMPILAN", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Apakah Satpam mengenakan borgol? (tidak diisi dengan barang lain)", category:"PENAMPILAN", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Apakah Satpam mengenakan nametag BTPNS ?", category:"PENAMPILAN", score:{YA:9,TIDAK:0,NA:0} },
  { text:"Apakah Satpam mengenakan nama dada ?", category:"PENAMPILAN", score:{YA:9,TIDAK:0,NA:0} }
];

/********************************
 * 3. HITUNG SCORE MAKS
 ********************************/
const maxScore = {SIKAP:0, SKILL:0, PENAMPILAN:0};
questions.forEach(q => maxScore[q.category] += q.score.YA);
}
});
/********************************
 * 4. STATE
 ********************************/
let currentIndex = 0;
let answers = [];
let namaUser = "";
let nikUser = "";
let cabangUser = "";

/********************************
 * 5. LOGIN
 ********************************/
function login() {
  const code = document.getElementById("accessCode").value.trim();
  const user = users.find(u => u.code === code);

  if (!user) {
    alert("Kode akses salah");
    return;
  }

  currentRole = user.role;

  if (currentRole === "ADMIN") {
    showAdminDashboard();
  } else {
    showMenu();
  }
}

/********************************
 * 6. MENU USER
 ********************************/
function showMenu() {
  document.getElementById("app").innerHTML = `
    <h2>Data Penilai</h2>
    <input id="nama" placeholder="Nama Lengkap">
    <input id="nik" placeholder="NIK">
    <input id="cabang" placeholder="Nama Cabang">
    <br>
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
  cabangUser = document.getElementById("cabang").value;

  if (!namaUser || !nikUser) {
    alert("Nama , NIK & Cabang wajib diisi");
    return;
  }

  currentIndex = 0;
  answers = [];
  showQuestion();
}

/********************************
 * 8. SHOW QUESTION
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
 * 9. SAVE ANSWER
 ********************************/
function answer(val) {
  const q = questions[currentIndex];
  answers.push({category:q.category, score:q.score[val]});

  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

/********************************
 * 10. RESULT USER
 ********************************/
function showResult() {
  const total = {SIKAP:0, SKILL:0, PENAMPILAN:0};
  answers.forEach(a => total[a.category] += a.score);

  const percent = {
    SIKAP: Math.round(total.SIKAP / maxScore.SIKAP * 100),
    SKILL: Math.round(total.SKILL / maxScore.SKILL * 100),
    PENAMPILAN: Math.round(total.PENAMPILAN / maxScore.PENAMPILAN * 100)
  };

  const result = Math.round((percent.SIKAP + percent.SKILL + percent.PENAMPILAN) / 3);

  // SIMPAN KE DATABASE LOCAL
  const data = JSON.parse(localStorage.getItem("bsqaData") || "[]");
  data.push({
    nama: namaUser,
    nik: nikUser,
    cabang: cabangUser,
    sikap: total.SIKAP,
    skill: total.SKILL,
    penampilan: total.PENAMPILAN,
    result: result,
    tanggal: new Date().toLocaleString()
  });
  localStorage.setItem("bsqaData", JSON.stringify(data));

  document.getElementById("app").innerHTML = `
    <h2>HASIL PENILAIAN</h2>
    <p>Sikap: ${total.SIKAP} (${percent.SIKAP}%)</p>
    <p>Skill: ${total.SKILL} (${percent.SKILL}%)</p>
    <p>Penampilan: ${total.PENAMPILAN} (${percent.PENAMPILAN}%)</p>
    <h3>RESULT AKHIR: ${result}%</h3>

    <button onclick="downloadUserExcel(${result})">Download Excel</button>
    <button onclick="showMenu()">Kembali</button>
  `;
}

/********************************
 * 11. ADMIN DASHBOARD
 ********************************/
function showAdminDashboard() {
  const data = JSON.parse(localStorage.getItem("bsqaData") || "[]");

  let rows = data.map((d,i)=>`
    <tr>
      <td>${i+1}</td>
      <td>${d.nama}</td>
      <td>${d.nik}</td>
      <td>${d.cabang}</td>
      <td>${d.sikap}</td>
      <td>${d.skill}</td>
      <td>${d.penampilan}</td>
      <td>${d.result}%</td>
      <td>${d.tanggal}</td>
    </tr>
  `).join("");

  document.getElementById("app").innerHTML = `
    <h2>Dashboard Super Admin</h2>
    <button onclick="downloadAll()">Download Semua Excel</button>
    <button onclick="logout()">Logout</button>

    <table>
      <tr>
        <th>No</th><th>Nama</th><th>NIK</th>
        <th>Sikap</th><th>Skill</th>
        <th>Penampilan</th><th>Result</th><th>Tanggal</th>
      </tr>
      ${rows}
    </table>
  `;
}

/********************************
 * 12. DOWNLOAD EXCEL USER
 ********************************/
function downloadUserExcel(result) {
  let csv = "Nama,NIK,Cabang,Sikap,Skill,Penampilan,Result\n";
  csv += `${namaUser},${nikUser},${cabangUser},${sum("SIKAP")},${sum("SKILL")},${sum("PENAMPILAN")},${result}%`;

  downloadCSV(csv, "hasil_bsqa_user.csv");
}

/********************************
 * 13. DOWNLOAD EXCEL ADMIN
 ********************************/
function downloadAll() {
  const data = JSON.parse(localStorage.getItem("bsqaData") || "[]");
  let csv = "Nama,NIK,Sikap,Skill,Penampilan,Result,Tanggal\n";

  data.forEach(d=>{
    csv += `${d.nama},${d.nik},${d.sikap},${d.skill},${d.penampilan},${d.result}%,${d.tanggal}\n`;
  });

  downloadCSV(csv, "rekap_bsqa_admin.csv");
}

/********************************
 * 14. UTIL
 ********************************/
function sum(cat){
  return answers.filter(a=>a.category===cat).reduce((s,a)=>s+a.score,0);
}

function downloadCSV(content, filename){
  const blob = new Blob([content], {type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

/********************************
 * 15. LOGOUT
 ********************************/
function logout(){
  location.reload();
}
