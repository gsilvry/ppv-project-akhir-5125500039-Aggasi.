import { muatDataPengguna, simpanDataPengguna } from "./storage.js";

let daftarTugas = [];
let namaAktif = "";
let nrpAktif = "";

export function loginPengguna(nama, nrp) {
    if (nama.trim().length < 3) {
        throw new Error("Nama harus minimal 3 karakter.");
    }

    if (!/^\\d{10}$/.test(nrp)) {
        throw new Error("NRP harus tepat 10 angka dan tidak boleh mengandung huruf.");
    }

    const data = muatDataPengguna(nrp);

    namaAktif = nama.trim();
    nrpAktif = nrp;
    daftarTugas = Array.isArray(data.tugas) ? data.tugas : [];

    simpanData();
    return namaAktif;
}

export function simpanData() {
    if (!nrpAktif) return;
    simpanDataPengguna(nrpAktif, namaAktif, daftarTugas);
}

export function logoutPengguna() {
    simpanData();
    namaAktif = "";
    nrpAktif = "";
    daftarTugas = [];
}

export function penggunaSedangLogin() {
    return Boolean(nrpAktif);
}

export function ambilNamaAktif() {
    return namaAktif;
}

export function ambilTugas() {
    return daftarTugas;
}

export function tambahTugas(judul, matkul, deadline) {
    const judulBersih = judul.trim();
    const matkulBersih = matkul.trim();

    if (judulBersih.length < 3) {
        throw new Error("Nama tugas harus minimal 3 karakter.");
    }
    if (matkulBersih.length < 3) {
        throw new Error("Nama mata kuliah harus minimal 3 karakter.");
    }
    if (!penggunaSedangLogin()) return;

    daftarTugas.push({
        id: Date.now() + Math.random(),
        judul: judulBersih,
        matkul: matkulBersih,
        deadline,
        selesai: false
    });

    simpanData();
}

export function ubahStatusTugas(id, selesai) {
    const tugas = daftarTugas.find((item) => item.id === id);
    if (!tugas) return;

    tugas.selesai = selesai;
    simpanData();
}

export function hapusTugas(id) {
    daftarTugas = daftarTugas.filter((item) => item.id !== id);
    simpanData();
}

export function hitungRingkasan() {
    const total = daftarTugas.length;
    const selesai = daftarTugas.filter((tugas) => tugas.selesai).length;
    const belum = total - selesai;
    const persen = total === 0 ? 0 : Math.round((selesai / total) * 100);

    return { total, selesai, belum, persen };
}

export function ambilDaftarMatkul() {
    return [...new Set(daftarTugas.map((tugas) => tugas.matkul))]
        .sort((a, b) => a.localeCompare(b));
}

export function filterTugas(filterMatkul = "", filterStatus = "") {
    return daftarTugas.filter((tugas) => {
        const cocokMatkul = !filterMatkul || tugas.matkul === filterMatkul;
        const cocokStatus =
            !filterStatus ||
            (filterStatus === "selesai" && tugas.selesai) ||
            (filterStatus === "belum" && !tugas.selesai);

        return cocokMatkul && cocokStatus;
    });
}

export function hitungRingkasanMatkul() {
    return ambilDaftarMatkul().map((matkul) => {
        const tugasMatkul = daftarTugas.filter((tugas) => tugas.matkul === matkul);
        const selesai = tugasMatkul.filter((tugas) => tugas.selesai).length;

        return { matkul, selesai, total: tugasMatkul.length };
    });
}