export function buatKunciSimpanan(nrp) {
    return `pencatat-tugas-${nrp}`;
}

export function muatDataPengguna(nrp) {
    const dataTersimpan = localStorage.getItem(buatKunciSimpanan(nrp));
    return dataTersimpan ? JSON.parse(dataTersimpan) : {};
}

export function simpanDataPengguna(nrp, nama, tugas) {
    if (!nrp) return;

    localStorage.setItem(
        buatKunciSimpanan(nrp),
        JSON.stringify({ nama, tugas })
    );
}