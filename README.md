# Pencatat Tugas — Refactoring ES Modules

## Deskripsi
Aplikasi Pencatat Tugas untuk mencatat tugas kuliah, mengelompokkan berdasarkan mata kuliah, menandai tugas selesai, menghapus tugas, dan melihat ringkasan serta statistik penyelesaian.

Proyek ini direfactor dari satu file JavaScript monolit menjadi empat ES Modules.

## Struktur Folder

```text
pencatat-tugas-modular/
├── index.html
├── style.css
├── gambar-selamat.jpg
├── README.md
├── MODULE_MAP.md
├── DEBUG_LOG.md
└── src/
    ├── main.js
    ├── storage.js
    ├── state.js
    └── ui.js
```

## Tanggung Jawab Modul
- `main.js`: entry point, memasang event listener, dan mengoordinasikan modul.
- `storage.js`: membaca dan menyimpan data pengguna pada `localStorage`.
- `state.js`: mengelola data pengguna, daftar tugas, validasi, filter, dan perhitungan ringkasan.
- `ui.js`: menampilkan halaman, navigasi, daftar tugas, ringkasan, dan statistik.

## Cara Menjalankan
Karena aplikasi menggunakan ES Modules, jalankan melalui server lokal, bukan membuka `index.html` langsung dari file explorer.

1. Buka terminal di folder proyek.
2. Jalankan:

   ```bash
   python -m http.server 3000
   ```

3. Buka `http://127.0.0.1:3000/` di browser.

## Fitur
1. Login menggunakan nama dan NRP 10 digit.
2. Data tugas disimpan terpisah berdasarkan NRP di `localStorage`.
3. Menambah tugas dengan nama tugas dan mata kuliah minimal 3 karakter.
4. Menyaring tugas berdasarkan mata kuliah dan status.
5. Menandai tugas selesai atau belum selesai.
6. Menghapus tugas.
7. Melihat ringkasan tugas dan statistik penyelesaian.
8. Menampilkan ucapan selamat ketika seluruh tugas selesai.

## Catatan
- Data tersimpan pada browser/perangkat yang digunakan.
- `gambar-selamat.jpg` adalah gambar ucapan selamat yang digunakan pada halaman statistik.
- `DEBUG_LOG.md` disertakan sebagai catatan temuan debugging sebelumnya.