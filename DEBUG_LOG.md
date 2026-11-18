# DEBUG LOG – PENCATAT TUGAS

## P1 – Navigasi Muncul Sebelum Pengguna Login

**Gejala:**  
Tombol navigasi Home, Daftar Tugas, Statistik, dan Keluar tetap terlihat ketika halaman pertama kali dibuka, meskipun pengguna belum melakukan login.

**Langkah Reproduksi:**
1. Buka aplikasi Pencatat Tugas.
2. Jangan masukkan nama dan NRP.
3. Perhatikan bagian navigasi di bawah atau sekitar halaman login.

**Dugaan Penyebab:**
- Elemen navigasi pada HTML tidak memiliki atribut `hidden`.
- Belum terdapat pengaturan untuk menyembunyikan navigasi sebelum proses login berhasil.

**Bukti Pemeriksaan:**
- File `index.html` baris 42–47 menunjukkan elemen `<nav>` langsung ditampilkan tanpa atribut `hidden`.
- File `main.js` belum mengatur visibilitas navigasi saat halaman pertama kali dibuka.

**Perbaikan:**

Pada `index.html`, ubah elemen navigasi menjadi:

```html
<nav id="navigasi" hidden>
```

Pada `main.js`, setelah proses login berhasil, tambahkan:

```javascript
$("navigasi").hidden = false;
```

Pada fungsi `logout()`, tambahkan:

```javascript
$("navigasi").hidden = true;
```

**Pengujian Ulang:**
1. Buka kembali aplikasi.
2. Pastikan navigasi tidak terlihat sebelum login.
3. Lakukan login dengan data yang valid.
4. Pastikan navigasi muncul setelah login berhasil.
5. Tekan tombol Keluar dan pastikan navigasi kembali tersembunyi.

**Status:** Perlu pengujian setelah perbaikan.

**Commit:** [Isi dengan hash commit setelah perbaikan]

---

## P2 – Form Tambah Tugas Tidak Kosong Setelah Logout

**Gejala:**  
Data yang sebelumnya dimasukkan ke dalam form tambah tugas masih dapat tertinggal ketika pengguna keluar dari akun.

**Langkah Reproduksi:**
1. Login ke aplikasi.
2. Buka halaman Daftar Tugas.
3. Masukkan nama tugas dan mata kuliah ke dalam form.
4. Tekan tombol Keluar sebelum mengosongkan form.
5. Login kembali dan periksa form tambah tugas.

**Dugaan Penyebab:**
- Fungsi `logout()` hanya mengosongkan nama, NRP, dan variabel `state`.
- Form tambah tugas belum diatur untuk melakukan reset ketika pengguna logout.

**Bukti Pemeriksaan:**
- File `main.js` baris 89–104 berisi fungsi `logout()`.
- Pada fungsi tersebut, belum terdapat perintah untuk mengosongkan form tambah tugas.

**Perbaikan:**

Tambahkan perintah berikut di dalam fungsi `logout()`, setelah `state = [];`:

```javascript
$("form").reset();
```

Perintah tersebut menggunakan ID `form` yang merujuk pada form tambah tugas di `index.html`.

**Pengujian Ulang:**
1. Login ke aplikasi.
2. Isi beberapa kolom pada form tambah tugas.
3. Tekan tombol Keluar.
4. Login kembali.
5. Buka Daftar Tugas.
6. Pastikan seluruh kolom form tambah tugas sudah kosong.

**Status:** Perlu pengujian setelah perbaikan.

**Commit:** [Isi dengan hash commit setelah perbaikan]

---

## P3 – Tugas Baru Tidak Terlihat Ketika Filter Masih Aktif

**Gejala:**  
Tugas berhasil ditambahkan, tetapi tugas tersebut tidak langsung terlihat pada daftar karena pilihan filter mata kuliah atau status sebelumnya masih aktif.

**Langkah Reproduksi:**
1. Login ke aplikasi.
2. Tambahkan beberapa tugas dengan mata kuliah berbeda.
3. Pilih salah satu mata kuliah pada filter.
4. Tambahkan tugas baru dengan mata kuliah yang berbeda dari filter terpilih.
5. Perhatikan daftar tugas setelah penambahan.

**Dugaan Penyebab:**
- Nilai filter mata kuliah dan status masih menggunakan pilihan sebelumnya.
- Fungsi `tampil()` hanya menampilkan tugas yang sesuai dengan filter aktif.

**Bukti Pemeriksaan:**
- File `main.js` baris 107–141 merupakan proses penambahan tugas.
- File `main.js` baris 235–252 merupakan proses penyaringan daftar tugas.
- Baris 239–240 mengambil nilai filter yang sedang dipilih.
- Baris 242–251 menyaring tugas berdasarkan mata kuliah dan status.

**Perbaikan:**

Pada event penambahan tugas, cari bagian:

```javascript
simpan();
$("form").reset();

tampil();
```

Ubah menjadi:

```javascript
simpan();
$("form").reset();

$("filter-matkul").value = "";
$("filter-status").value = "";

tampil();
```

Dengan demikian, filter akan kembali ke pilihan semua mata kuliah dan semua status setelah tugas baru ditambahkan.

**Pengujian Ulang:**
1. Tambahkan beberapa tugas dengan mata kuliah berbeda.
2. Aktifkan filter mata kuliah dan status.
3. Tambahkan tugas baru.
4. Pastikan filter kembali ke pilihan awal.
5. Pastikan tugas baru muncul pada daftar tugas.

**Status:** Perlu pengujian setelah perbaikan.

**Commit:** [Isi dengan hash commit setelah perbaikan]