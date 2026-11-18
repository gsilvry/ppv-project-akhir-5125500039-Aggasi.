const $ = (id) => document.getElementById(id);

export function tampilkanHalaman(id) {
    document.querySelectorAll(".view").forEach((bagian) => {
        bagian.classList.remove("aktif");
        bagian.hidden = true;
    });

    const tujuan = $(id);
    if (!tujuan) return;

    tujuan.hidden = false;
    requestAnimationFrame(() => tujuan.classList.add("aktif"));
}

export function aturNavigasi(terlihat) {
    $("navigasi").hidden = !terlihat;
}

export function tampilkanSalam(nama) {
    $("salam").textContent = `Halo, ${nama}! ♡`;
}

export function resetFormLogin() {
    $("form-login").reset();
}

export function resetFormTugas() {
    $("form").reset();
}

export function resetFilter() {
    $("filter-matkul").value = "";
    $("filter-status").value = "";
}

export function ambilNilaiFilter() {
    return {
        matkul: $("filter-matkul").value,
        status: $("filter-status").value
    };
}

export function tampilkanPilihanMatkul(daftarMatkul, pilihanLama) {
    const select = $("filter-matkul");
    select.replaceChildren();

    const semua = document.createElement("option");
    semua.value = "";
    semua.textContent = "Semua Mata Kuliah";
    select.appendChild(semua);

    daftarMatkul.forEach((matkul) => {
        const option = document.createElement("option");
        option.value = matkul;
        option.textContent = matkul;
        select.appendChild(option);
    });

    select.value = daftarMatkul.includes(pilihanLama) ? pilihanLama : "";
}

export function tampilkanDaftarTugas(daftarTugas, onUbahStatus, onHapus) {
    const list = $("list");
    list.replaceChildren();

    let nomorBelumSelesai = 0;

    daftarTugas.forEach((tugas) => {
        if (!tugas.selesai) nomorBelumSelesai++;

        const li = document.createElement("li");
        const barisAtas = document.createElement("div");
        barisAtas.className = tugas.selesai ? "selesai" : "";
        barisAtas.textContent = tugas.selesai
            ? tugas.judul
            : `${nomorBelumSelesai}. ${tugas.judul}`;

        const info = document.createElement("div");
        info.className = "tugas-info";
        info.textContent = `${tugas.matkul} | Deadline: ${
            tugas.deadline || "Tidak ada deadline"
        }`;

        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tugas.selesai;
        checkbox.style.display = "inline-block";
        checkbox.style.width = "auto";
        checkbox.style.margin = "8px";
        checkbox.addEventListener("change", () => {
            onUbahStatus(tugas.id, checkbox.checked);
        });

        label.append(checkbox, document.createTextNode(" Selesai"));

        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.textContent = "Hapus";
        tombolHapus.className = "hapus";
        tombolHapus.addEventListener("click", () => onHapus(tugas.id));

        li.append(barisAtas, info, label, document.createElement("br"), tombolHapus);
        list.appendChild(li);
    });

    $("jumlah-filter").textContent = `Jumlah tugas: ${daftarTugas.length}`;
}

export function tampilkanHome(ringkasan, ringkasanMatkul) {
    $("total-home").textContent = ringkasan.total;
    $("belum-home").textContent = ringkasan.belum;
    $("selesai-home").textContent = ringkasan.selesai;

    const wadah = $("ringkasan-matkul");
    wadah.replaceChildren();

    if (ringkasanMatkul.length === 0) {
        wadah.textContent = "Belum ada tugas.";
        return;
    }

    ringkasanMatkul.forEach(({ matkul, selesai, total }) => {
        const p = document.createElement("p");
        p.textContent = `${matkul}: ${selesai}/${total} tugas selesai`;
        wadah.appendChild(p);
    });
}

export function tampilkanStatistik({ total, selesai, belum, persen }) {
    $("angka").textContent = `${persen}%`;
    $("isi-progres").style.width = `${persen}%`;
    $("isi-progres").style.background = persen <= 50 ? "#ffd700" : "#28a745";

    $("keterangan-progres").textContent = total === 0
        ? "Belum ada tugas."
        : `${selesai} dari ${total} tugas selesai. ${belum} tugas belum selesai.`;

    const ucapan = $("ucapan-selamat");
    const gambar = $("gambar-selamat");
    const fallback = $("fallback-selamat");
    const semuaSelesai = total > 0 && persen === 100;

    ucapan.hidden = !semuaSelesai;

    if (!semuaSelesai) return;

    gambar.onerror = () => {
        gambar.hidden = true;
        fallback.hidden = false;
    };

    gambar.onload = () => {
        gambar.hidden = false;
        fallback.hidden = true;
    };

    if (gambar.complete) {
        const gambarBerhasil = gambar.naturalWidth > 0;
        gambar.hidden = !gambarBerhasil;
        fallback.hidden = gambarBerhasil;
    }
}

export function tampilkanLoginAwal() {
    tampilkanHalaman("login");
    aturNavigasi(false);
}