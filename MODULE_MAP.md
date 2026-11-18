# MODULE MAP — Pencatat Tugas

## 1. Daftar Modul dan Tanggung Jawab

1. src/main.js : Entry point aplikasi; memasang event listener dan mengoordinasikan proses login, logout, tugas, navigasi, dan pembaruan tampilan. 
2. src/state.js : Mengelola pengguna aktif, daftar tugas, validasi, operasi tambah/ubah/hapus, filter, dan perhitungan ringkasan. 
3. src/storage.js : Membaca dan menyimpan data pengguna dan tugas melalui `localStorage`. 
4. src/ui.js : Mengelola tampilan DOM: navigasi, pergantian halaman, daftar tugas, ringkasan, dan statistik. 

## 2. Arah Dependensi

   text
index.html
   |
   | memuat sebagai ES Module
   v
src/main.js
   |--------------------|
   |                    |
   | import             | import
   v                    v
src/state.js          src/ui.js
   |
   | import
   v
src/storage.js


## 3. Rincian Import

1. index.html memuat src/main.js menggunakan <script type="module">.
2. main.js mengimpor fungsi pengelolaan data dari state.js.
3. main.js mengimpor fungsi tampilan dari ui.js.
4. state.js mengimpor fungsi baca/simpan dari storage.js.
5. ui.js tidak mengimpor modul lain.
6. storage.js tidak mengimpor modul lain.

## 4. Aturan Dependensi

Arah dependensi dibuat satu arah. storage.js tidak bergantung pada state.js, ui.js, atau main.js. ui.js tidak mengelola data aplikasi secara langsung. Tidak ada circular dependency.

## 5. Bagian yang Tidak Dipisahkan Menjadi Modul

1. index.html tetap menjadi struktur halaman.
2. style.css tetap menjadi pengatur tampilan visual.
3. gambar-selamat.jpg merupakan aset gambar, bukan modul JavaScript.

Ketiganya tidak diubah menjadi ES Modules karena bukan kode logika JavaScript yang perlu dipisahkan.