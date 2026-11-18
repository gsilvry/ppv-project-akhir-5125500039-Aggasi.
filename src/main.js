import {
    loginPengguna,
    logoutPengguna,
    penggunaSedangLogin,
    tambahTugas,
    ubahStatusTugas,
    hapusTugas,
    hitungRingkasan,
    ambilDaftarMatkul,
    filterTugas,
    hitungRingkasanMatkul
} from "./state.js";

import {
    tampilkanHalaman,
    aturNavigasi,
    tampilkanSalam,
    resetFormLogin,
    resetFormTugas,
    resetFilter,
    ambilNilaiFilter,
    tampilkanPilihanMatkul,
    tampilkanDaftarTugas,
    tampilkanHome,
    tampilkanStatistik,
    tampilkanLoginAwal
} from "./ui.js";

const $ = (id) => document.getElementById(id);

function perbaruiSemuaTampilan() {
    const ringkasan = hitungRingkasan();
    tampilkanHome(ringkasan, hitungRingkasanMatkul());
    tampilkanStatistik(ringkasan);
    perbaruiDaftarTugas();
}

function perbaruiDaftarTugas() {
    const filter = ambilNilaiFilter();
    tampilkanPilihanMatkul(ambilDaftarMatkul(), filter.matkul);

    const filterTerpilih = ambilNilaiFilter();
    const hasil = filterTugas(filterTerpilih.matkul, filterTerpilih.status);

    tampilkanDaftarTugas(
        hasil,
        (id, selesai) => {
            ubahStatusTugas(id, selesai);
            perbaruiSemuaTampilan();
        },
        (id) => {
            hapusTugas(id);
            perbaruiSemuaTampilan();
        }
    );
}

function bukaHalaman(id) {
    if (!penggunaSedangLogin()) {
        tampilkanLoginAwal();
        return;
    }

    tampilkanHalaman(id);

    if (id === "home") {
        const ringkasan = hitungRingkasan();
        tampilkanHome(ringkasan, hitungRingkasanMatkul());
    }
    if (id === "daftar") perbaruiDaftarTugas();
    if (id === "statistik") tampilkanStatistik(hitungRingkasan());
}

function prosesLogin(event) {
    event.preventDefault();

    const nama = $("nama").value.trim();
    const nrp = $("nrp").value.trim();

    try {
        const namaAtivo = loginPengguna(nama, nrp);
        tampilkanSalam(namaAtivo);
        aturNavigasi(true);
        tampilkanHalaman("home");
        perbaruiSemuaTampilan();
    } catch (error) {
        alert(error.message || "Terjadi kesalahan saat memuat data. Periksa data penyimpanan Anda.");
    }
}

function prosesLogout() {
    logoutPengguna();
    resetFormTugas();
    resetFormLogin();
    resetFilter();
    aturNavigasi(false);
    tampilkanLoginAwal();
}

function prosesTambahTugas(event) {
    event.preventDefault();
    if (!penggunaSedangLogin()) return;

    try {
        tambahTugas($("isian").value, $("matkul").value, $("deadline").value);
        resetFormTugas();
        // Mengembalikan filter ke pilihan semua agar tugas baru langsung terlihat.
        resetFilter();
        perbaruiSemuaTampilan();

        if ("vibrate" in navigator) navigator.vibrate(100);
    } catch (error) {
        alert(error.message);
    }
}

function inisialisasiEvent() {
    $("form-login").addEventListener("submit", prosesLogin);
    $("form").addEventListener("submit", prosesTambahTugas);
    $("tombol-logout").addEventListener("click", prosesLogout);

    document.querySelectorAll("[data-page]").forEach((tombol) => {
        tombol.addEventListener("click", () => bukaHalaman(tombol.dataset.page));
    });

    $("filter-matkul").addEventListener("change", perbaruiDaftarTugas);
    $("filter-status").addEventListener("change", perbaruiDaftarTugas);
}

tampilkanLoginAwal();
inisialisasiEvent();