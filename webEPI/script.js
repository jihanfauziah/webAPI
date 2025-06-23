const audio = document.getElementById('quran-audio');
const playBtn = document.getElementById('play-audio');
const pauseBtn = document.getElementById('pause-audio');
const audioControls = document.getElementById('audio-controls');
const surahSelect = document.getElementById('surah-select');
const ayatContainer = document.getElementById('ayat-container');

// Daftar arti nama surat (manual)
const surahTranslations = [
  "Pembuka", // Al-Fatihah
  "Sapi Betina", // Al-Baqarah
  "Keluarga Imran", // Ali 'Imran
  "Wanita", // An-Nisa'
  "Jamuan", // Al-Ma'idah
  "Binatang Ternak", // Al-An'am
  "Tempat yang Tertinggi", // Al-A'raf
  "Harta Rampasan Perang", // Al-Anfal
  "Pengampunan", // At-Tawbah
  "Nabi Yunus", // Yunus
  "Nabi Hud", // Hud
  "Nabi Yusuf", // Yusuf
  "Guruh", // Ar-Ra'd
  "Nabi Ibrahim", // Ibrahim
  "Gunung Al-Hijr", // Al-Hijr
  "Lebah", // An-Nahl
  "Perjalanan Malam", // Al-Isra'
  "Gua", // Al-Kahf
  "Maryam", // Maryam
  "TaHa", // Ta-Ha
  "Para Nabi", // Al-Anbiya'
  "Haji", // Al-Hajj
  "Orang=orang Mukmin", // Al-Mu'minun
  "Cahaya", // An-Nur
  "Pembeda", // Al-Furqan
  "Penyair", // Asy-Syu'ara
  "Semut", // An-Naml
  "Kisah-kisah", // Al-Qasas
  "Laba-Laba", // Al-'Ankabut
  "Bangsa Romawi", // Ar-Rum
  "Keluarga Luqman", // Luqman
  "Sajdah", // As-Sajdah
  "Golongan yang Bersekutu", // Al-Ahzab
  "Kaum Saba'", // Saba'
  "Pencipta", // Fathir
  "Yasin", // Yasin
  "Barisan-barisa", // As-Saffat
  "Yang Bersujud", // Sad
  "Rombongan-rombongan", // Az-Zumar
  "Yang mengampuni", // Ghafir
  "Yang Dijelaskan", // fussilat
  "Musyawarah", // Asy-Syura
  "Perhiasan", // Az-Zukhruf
  "Kabut", // Ad-Dukhan
  "Yang Bertekuk Lutut", // Al-Jasiyah
  "Bukit-bukit Pasir", // Al-Ahqaf
  "Nabi Muhammad", // Muhammad
  "Kemenangan", // Al-Fath
  "Kamar-Kamar", // Al-Hujurat
  "Qaaf", // Qaf
  "Angin yang Menerbangkan", // Adz-Dzariyat
  "Bukit", // At-Tur
  "Bintang", // An-Najm
  "Bulan", // Al-Qamar
  "Yang Maha Pemurah", // Ar-Rahman
  "Peristiwa Besar/ Hari kiamat", // Al-Waqi'ah
  "Besi", // Al-Hadid
  "Wanita yang Mengajukan Gugatan", // Al-Mujadilah
  "Pengusiran", // Al-Hasyr
  "Wanita yang Diuji", // Al-Mumtahanah
  "Satu Barisan", // As-Saff
  "Hari Jum'at", // Al-Jumu'ah
  "Orang-orang yang Munafik", // Al-Munafiqun
  "Hari Dinampakkan Kesalahan-kesalahan", // At-Tagabun
  "Talak", // At-Talaq
  "Penghargaan", // At-Tahrim
  "Kerajaan", // Al-Mulk
  "Pena", // Al-Qalam
  "Hari Kiamat", // Al-Haqqah
  "Tempat Naik", // Al-Ma'arij
  "Nabi Nuh", // Nuh
  "Jin", // Al-Jinn
  "Orang yang Berselimut", // Al-Muzzammil
  "Orang yang Berkumpul", // Al-Muddasir
  "Kiamat", // Al-Qiyamah
  "Manusia", // Al-Insan
  "Malaikat-malaikat yang Diutus", // Al-Mursalat
  "Berita Besar", // An-Naba
  "Malaikat-Malaikat yang Mencabut", // An-Nazi'at
  "Ia Bermuka Masam", // Abasa
  "Menggulung", // At-Takwir
  "Tebelah", // Al-infitar
  "Orang-orang yang curang", // Al-Tatfif
  "Terbelah", // Al-Insyiqaq
  "Gugusan Bintang", // Al-Buruj
  "Yang datang di Malam Hari", // At-Tariq
  "Yang Paling Tinggi", // Al-A'la
  "Hari Pembalasan", // Al-Gasyiyah
  "Fajar", // Al-Fajr
  "Negeri", // Al-Balad
  "Marahari", // Asy-Syams
  "Malam", // Al-Lail
  "Waktu Matahari Sepenggalahan Naik Duha", // Ad-Duha
  "Melapangkan", // Al-Insyirah
  "Buah Tin", // At-Tin
  "Segumpal Darah", // Al-A'laq
  "Kemuliaan", // Al-Qadr
  "Pembuktian", // Al-Bayinnah
  "Kegoncangan", // Az-Zalzalah
  "Berlari Kencang", // Al-Adiyat
  "Hari Kiamat", // Al-Qari'ah
  "Bermegah-megahan", // At-Takasur
  "Masa", // Al-Asr
  "Pengumpat", // Al-Humazah
  "Gajah", // Al-Fil
  "Suku Quraisy", // Quraisy
  "Barang-Barang yang Berguna", // Al-Ma'un
  "Nikmat yang Berlimpah", // Al-Kautsar
  "Orang-orang Kafir", // Al-Kafirun
  "Pertolongan", // An-Nasr
  "Gejolak Api", // Al-Lahab
  "Ikhlas", // Al-Ikhlas
  "Waktu Subuh", // Al-Falaq
  "Umat Manusia", // An-Nas
];


async function fetchSurahList() {
  const res = await fetch('https://api.alquran.cloud/v1/surah');
  const data = await res.json();
  if (data.code === 200) {
    return data.data;
  } else {
    alert('Gagal mengambil daftar surat');
    return [];
  }
}

async function fetchAyat(surahNumber) { // Tambahkan audio URL
audio.src = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
audioControls.style.display = 'block';
 
  ayatContainer.innerHTML = 'Loading...';
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`);
  const data = await res.json();

  if (data.code === 200) {
    renderAyat(data.data);
  } else {
    ayatContainer.innerHTML = 'Gagal memuat ayat.';
  }
}

function renderAyat(editions) {
  const arabicAyat = editions[0].ayahs;
  const indonesianAyat = editions[1].ayahs;

  let html = '';
  for (let i = 0; i < arabicAyat.length; i++) {
    html += `
    <div class="ayat">
      <div class="ayat-arab">${arabicAyat[i].text} <sup>${arabicAyat[i].numberInSurah}</sup></div>
      <div class="ayat-terjemahan">${indonesianAyat[i].text}</div>
    </div>
    `;
  }
  ayatContainer.innerHTML = html;
}

async function init() {
  const surahs = await fetchSurahList();
  for (const surah of surahs) {
    const option = document.createElement('option');
    const arti = surahTranslations[surah.number - 1] || " ";
    option.value = surah.number;
    option.textContent = `${surah.number}. ${surah.englishName} - ${arti} (${surah.name})`;
    surahSelect.appendChild(option);
  }
}

surahSelect.addEventListener('change', () => {
  const selected = surahSelect.value;
  if (selected) {
    fetchAyat(selected);
  } else {
    ayatContainer.innerHTML = '';
  }
});

playBtn.addEventListener('click', () => {
  audio.play();
});

pauseBtn.addEventListener('click', () => {
  audio.pause();
});

init();
