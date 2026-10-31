/**
 * TemuBarang — Mock Data
 * 
 * All data here is demonstration data.
 * Replace with real API/database responses during backend integration.
 */

const MOCK_USER = {
  name: 'Rizky Pratama',
  email: 'rizky.pratama@mahasiswa.ac.id',
  nim: '2021001234',
  initials: 'RP',
  role: 'Mahasiswa',
  joined: '2024-01-15'
};

const CATEGORIES = [
  'Elektronik',
  'Dompet & Tas',
  'Kunci',
  'Alat Tulis',
  'Pakaian',
  'Aksesori',
  'Dokumen',
  'Lainnya'
];

const LOCATIONS = [
  'Perpustakaan Pusat',
  'Gedung Kuliah A',
  'Gedung Kuliah B',
  'Gedung Kuliah C',
  'Laboratorium Komputer',
  'Laboratorium Fisika',
  'Area Parkir Motor',
  'Area Parkir Mobil',
  'Kantin Utama',
  'Masjid Kampus',
  'Lapangan Olahraga',
  'Sekretariat BEM',
  'Aula Utama',
  'Asrama Mahasiswa',
  'Halte Bus Kampus'
];

const STATUS_LABELS = {
  aktif:      'Aktif',
  klaim:      'Klaim Diajukan',
  verifikasi: 'Sedang Diverifikasi',
  selesai:    'Berhasil Dikembalikan',
  ditutup:    'Ditutup'
};

const MOCK_ITEMS = [
  {
    id: 1,
    nama: 'Dompet Hitam Kulit',
    tipe: 'ditemukan',
    kategori: 'Dompet & Tas',
    lokasi: 'Perpustakaan Pusat',
    tanggal: '2024-10-28',
    status: 'aktif',
    deskripsi: 'Ditemukan dompet warna hitam berbahan kulit di meja baca lantai 2 Perpustakaan Pusat. Di dalamnya terdapat beberapa kartu namun tidak ada uang. Pemilik silakan menghubungi pelapor.',
    pelapor: 'Andi S.',
    foto: null
  },
  {
    id: 2,
    nama: 'Botol Minum Biru',
    tipe: 'hilang',
    kategori: 'Lainnya',
    lokasi: 'Gedung Kuliah A',
    tanggal: '2024-10-27',
    status: 'aktif',
    deskripsi: 'Botol minum warna biru merk Tupperware ukuran 750ml hilang di ruang kelas A301. Terakhir terlihat saat kuliah Kalkulus pagi hari.',
    pelapor: 'Rizky P.',
    foto: null
  },
  {
    id: 3,
    nama: 'Kunci Motor Honda',
    tipe: 'ditemukan',
    kategori: 'Kunci',
    lokasi: 'Area Parkir Motor',
    tanggal: '2024-10-26',
    status: 'verifikasi',
    deskripsi: 'Kunci motor Honda dengan gantungan kunci warna merah ditemukan di area parkir motor dekat gedung C. Terdapat stiker merah kecil di kepala kunci.',
    pelapor: 'Siti M.',
    foto: null
  },
  {
    id: 4,
    nama: 'Charger Laptop Dell',
    tipe: 'hilang',
    kategori: 'Elektronik',
    lokasi: 'Laboratorium Komputer',
    tanggal: '2024-10-25',
    status: 'klaim',
    deskripsi: 'Charger laptop Dell warna hitam dengan daya 65W hilang di Lab Komputer 2. Ada stiker nama "Budi" di bagian kabel adaptor.',
    pelapor: 'Budi H.',
    foto: null
  },
  {
    id: 5,
    nama: 'Kacamata Minus Frame Hitam',
    tipe: 'ditemukan',
    kategori: 'Aksesori',
    lokasi: 'Kantin Utama',
    tanggal: '2024-10-24',
    status: 'aktif',
    deskripsi: 'Kacamata minus dengan frame hitam ditemukan di meja pojok kantin utama. Kacamata disimpan di kotak berwarna biru.',
    pelapor: 'Dewi A.',
    foto: null
  },
  {
    id: 6,
    nama: 'Jaket Hoodie Abu-abu',
    tipe: 'hilang',
    kategori: 'Pakaian',
    lokasi: 'Aula Utama',
    tanggal: '2024-10-23',
    status: 'aktif',
    deskripsi: 'Jaket hoodie warna abu-abu dengan logo kampus di bagian dada kiri. Hilang setelah mengikuti acara seminar nasional di Aula Utama.',
    pelapor: 'Farhan R.',
    foto: null
  },
  {
    id: 7,
    nama: 'Flashdisk 32GB',
    tipe: 'ditemukan',
    kategori: 'Elektronik',
    lokasi: 'Gedung Kuliah B',
    tanggal: '2024-10-22',
    status: 'aktif',
    deskripsi: 'Flashdisk warna orange 32GB ditemukan di kursi Ruang B201. Berisi beberapa file dokumen Word dan PDF.',
    pelapor: 'Nina P.',
    foto: null
  },
  {
    id: 8,
    nama: 'KTM / Kartu Mahasiswa',
    tipe: 'ditemukan',
    kategori: 'Dokumen',
    lokasi: 'Masjid Kampus',
    tanggal: '2024-10-21',
    status: 'selesai',
    deskripsi: 'Kartu Tanda Mahasiswa atas nama Muhammad Fahri, NIM 2022045678, ditemukan di selasar Masjid Kampus. Sudah diserahkan ke Bagian Akademik.',
    pelapor: 'Yusuf A.',
    foto: null
  }
];

const MOCK_MY_REPORTS = [
  {
    id: 'TB-2024-001',
    nama: 'Botol Minum Biru',
    tipe: 'hilang',
    tanggal: '2024-10-27',
    status: 'aktif',
    kategori: 'Lainnya',
    lokasi: 'Gedung Kuliah A'
  },
  {
    id: 'TB-2024-002',
    nama: 'Charger Laptop Dell',
    tipe: 'hilang',
    tanggal: '2024-10-25',
    status: 'klaim',
    kategori: 'Elektronik',
    lokasi: 'Laboratorium Komputer'
  },
  {
    id: 'TB-2024-003',
    nama: 'Buku Catatan Fisika',
    tipe: 'hilang',
    tanggal: '2024-10-15',
    status: 'ditutup',
    kategori: 'Alat Tulis',
    lokasi: 'Gedung Kuliah C'
  }
];

const MOCK_ACTIVITIES = [
  { tipe: 'ditemukan', icon: '✅', title: 'Kunci Motor Honda ditemukan', desc: 'Siti M. melaporkan kunci motor di Area Parkir', waktu: '2 jam lalu' },
  { tipe: 'hilang',    icon: '🔴', title: 'Laporan baru: Botol Minum Biru', desc: 'Rizky P. kehilangan botol minum di Gd. Kuliah A', waktu: '3 jam lalu' },
  { tipe: 'klaim',     icon: '📋', title: 'Klaim diajukan pada Charger Dell', desc: 'Pemilik mengajukan klaim dengan bukti kepemilikan', waktu: '5 jam lalu' },
  { tipe: 'ditemukan', icon: '✅', title: 'KTM berhasil dikembalikan', desc: 'Muhammad Fahri berhasil mendapatkan KTM-nya kembali', waktu: '1 hari lalu' },
  { tipe: 'hilang',    icon: '🔴', title: 'Laporan baru: Jaket Hoodie Abu', desc: 'Farhan R. kehilangan jaket setelah seminar', waktu: '2 hari lalu' }
];
