const bgblur = document.querySelector(".bgblur");
const searchlokasi = document.querySelector("#searchlokasi");
const plusKategori = document.querySelector("#plus_kategori");
const kategori_modal = document.querySelector(".search_kategori_modal");
const tutup_kategori_modal = document.querySelector("#tutup_kategori_modal");
const search_lokasi_modal = document.querySelector(".search_lokasi_modal");
const tutup_lokasi_modal = document.querySelector("#tutup_lokasi_modal");
const pilih_lokasi_btn = document.querySelector("#pilih_lokasi_btn");
const textlokasi_placeholder = document.querySelector("#textlokasi_placeholder");
const text_error_modal_lokasi = document.querySelector(".text-error-modal-lokasi");
const text_error_modal_kategori = document.querySelector(".text-error-modal-kategori");
const kategoriContainer = document.querySelector("#kategori_search_konten");
const kategoriItems = document.querySelectorAll(".search_kategori_modal ul li");
const delete_all_kategori = document.querySelector("#delete_all_kategori");

// Input Lokasi Modal
let selectedProvinceId = null;
let selectedKabupatenId = null;

const input_prov = document.querySelector("#input_prov input");
const list_prov = document.querySelector("#input_prov .listcontainer");

const input_kab = document.querySelector("#input_kab input");
const list_kab = document.querySelector("#input_kab .listcontainer");

const input_kec = document.querySelector("#input_kec input");
const list_kec = document.querySelector("#input_kec .listcontainer");

input_kab.setAttribute("disabled", "true");
input_kec.setAttribute("disabled", "true");

let provinsiData = [];
let kabupatenData = [];
let kecamatanData = [];

// Abort controllers untuk membatalkan fetch yang sedang berjalan
let kabAbortController = null;
let kecAbortController = null;


// ---------------- Helper UI ----------------
function hideAllLists() {
    list_prov.classList.add("hidden");
    list_kab.classList.add("hidden");
    list_kec.classList.add("hidden");
}

function hideExcept(containerToShow) {
    if (containerToShow !== list_prov) list_prov.classList.add("hidden");
    if (containerToShow !== list_kab) list_kab.classList.add("hidden");
    if (containerToShow !== list_kec) list_kec.classList.add("hidden");
}

function showList(data, container) {
    container.innerHTML = data
        .map(item => `<li data-id="${item.id}" class="px-3 py-2 hover:bg-gray-100 cursor-pointer">${item.name}</li>`)
        .join("");
    container.classList.remove("hidden");
}

function showLoading(container) {
    container.innerHTML = `
        <li data-ignore="true" class="loading px-3 py-2 flex items-center gap-2">
            <span class="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
            Memuat...
        </li>
    `;
    container.classList.remove("hidden");
}

function showNotFound(container) {
    container.innerHTML = `
        <li data-ignore="true" class="notfound px-3 py-2 text-gray-500">
            Data tidak ditemukan
        </li>
    `;
    container.classList.remove("hidden");
}


// ---------------- API Fetch ----------------
async function loadProvinsi() {
    const res = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
    return await res.json();
}

async function loadKabupaten(provinceId) {
    // abort previous kab fetch jika ada
    if (kabAbortController) kabAbortController.abort();
    kabAbortController = new AbortController();
    const signal = kabAbortController.signal;

    try {
        const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`, { signal });
        return await res.json();
    } catch (err) {
        if (err.name === "AbortError") {
            // fetch dibatalkan, kembalikan null untuk menandakan abort
            return null;
        }
        throw err;
    }
}

async function loadKecamatan(kabupatenId) {
    if (kecAbortController) kecAbortController.abort();
    kecAbortController = new AbortController();
    const signal = kecAbortController.signal;

    try {
        const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabupatenId}.json`, { signal });
        return await res.json();
    } catch (err) {
        if (err.name === "AbortError") {
            return null;
        }
        throw err;
    }
}


// ---------------- Event: buka modal (jika ada handler) ----------------
// contoh (sesuaikan nama variabel jika berbeda)
if (typeof searchlokasi != "undefined") {
    searchlokasi.addEventListener("click", () => {
        input_prov.focus();
        text_error_modal_lokasi.classList.add("hidden");
        if (typeof bgblur != "undefined") bgblur.classList.add("active");
        if (typeof search_lokasi_modal != "undefined") search_lokasi_modal.classList.add("active");
    });
}
if (typeof tutup_lokasi_modal != "undefined") {
    tutup_lokasi_modal.addEventListener("click", () => {
        if (typeof search_lokasi_modal !== "undefined") search_lokasi_modal.classList.remove("active");
        setTimeout(() => {
            if (typeof bgblur != "undefined") bgblur.classList.remove("active");
        }, 500);
    });
}


// ==================== PROVINSI ====================
input_prov.addEventListener("focus", async () => {
    // sembunyikan list lain supaya tidak bertabrakan
    hideExcept(list_prov);

    if (provinsiData.length === 0) {
        showLoading(list_prov);
        try {
            provinsiData = await loadProvinsi();
        } catch (err) {
            console.error("Gagal load provinsi", err);
            showNotFound(list_prov);
            return;
        }
    }

    // jika sudah ada teks di input, lakukan filter
    const keyword = input_prov.value.trim().toLowerCase();
    if (keyword.length > 0) {
        const filtered = provinsiData.filter(item => item.name.toLowerCase().includes(keyword));
        filtered.length === 0 ? showNotFound(list_prov) : showList(filtered, list_prov);
    } else {
        showList(provinsiData, list_prov);
    }

    // ketika provinsi dimuat / fokus, sembunyikan list kab + kec
    list_kab.classList.add("hidden");
    list_kec.classList.add("hidden");
});

input_prov.addEventListener("input", () => {
    hideExcept(list_prov);
    const keyword = input_prov.value.trim().toLowerCase();
    const filtered = provinsiData.filter(item => item.name.toLowerCase().includes(keyword));
    filtered.length === 0 ? showNotFound(list_prov) : showList(filtered, list_prov);
});

list_prov.addEventListener("click", async (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    if (li.dataset.ignore === "true") return;

    input_prov.value = li.innerText;
    selectedProvinceId = li.dataset.id;
    list_prov.classList.add("hidden");

    // Reset & Enable kabupaten
    input_kab.removeAttribute("disabled");
    input_kab.value = "";
    selectedKabupatenId = null;
    kabupatenData = [];
    kecamatanData = [];

    // Sembunyikan other lists saat memuat kabupaten
    hideExcept(list_kab);

    // Load kabupaten dan tampilkan otomatis setelah selesai
    showLoading(list_kab);
    const kab = await loadKabupaten(selectedProvinceId);

    // jika fetch dibatalkan (return null), jangan tampilkan hasil lama
    if (kab === null) {
        // fetch dibatalkan, sembunyikan loading
        list_kab.classList.add("hidden");
        return;
    }

    kabupatenData = kab;
    if (kabupatenData.length === 0) {
        showNotFound(list_kab);
    } else {
        showList(kabupatenData, list_kab);
    }

    // pastikan kecamatan tetap tersembunyi sampai kabupaten dipilih
    list_kec.classList.add("hidden");
});


// ==================== KABUPATEN ====================
input_kab.addEventListener("focus", () => {
    // jika belum ada data kabupaten, abaikan (mungkin belum pilih provinsi)
    if (!kabupatenData || kabupatenData.length === 0) return;

    // sembunyikan list lain
    hideExcept(list_kab);

    const keyword = input_kab.value.trim().toLowerCase();
    const filtered = kabupatenData.filter(item => item.name.toLowerCase().includes(keyword));
    filtered.length === 0 ? showNotFound(list_kab) : showList(filtered, list_kab);

    // sembunyikan prov & kec saat fokus kab
    list_prov.classList.add("hidden");
    list_kec.classList.add("hidden");
});

input_kab.addEventListener("input", () => {
    hideExcept(list_kab);
    const keyword = input_kab.value.trim().toLowerCase();
    const filtered = kabupatenData.filter(item => item.name.toLowerCase().includes(keyword));
    filtered.length === 0 ? showNotFound(list_kab) : showList(filtered, list_kab);
});

list_kab.addEventListener("click", async (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    if (li.dataset.ignore === "true") return;

    input_kab.value = li.innerText;
    selectedKabupatenId = li.dataset.id;
    list_kab.classList.add("hidden");

    // Reset kecamatan & enable
    input_kec.removeAttribute("disabled");
    input_kec.value = "";
    kecamatanData = [];

    // sembunyikan prov + kab saat memuat kecamatan
    hideExcept(list_kec);

    // Load kecamatan dan tampilkan otomatis setelah selesai
    showLoading(list_kec);
    const kec = await loadKecamatan(selectedKabupatenId);

    if (kec === null) {
        list_kec.classList.add("hidden");
        return;
    }

    kecamatanData = kec;
    if (kecamatanData.length === 0) {
        showNotFound(list_kec);
    } else {
        showList(kecamatanData, list_kec);
    }
});


// ==================== KECAMATAN ====================
input_kec.addEventListener("focus", () => {
    if (!kecamatanData || kecamatanData.length === 0) return;

    hideExcept(list_kec);

    const keyword = input_kec.value.trim().toLowerCase();
    const filtered = kecamatanData.filter(item => item.name.toLowerCase().includes(keyword));
    filtered.length === 0 ? showNotFound(list_kec) : showList(filtered, list_kec);

    // sembunyikan prov + kab saat fokus kec
    list_prov.classList.add("hidden");
    list_kab.classList.add("hidden");
});

input_kec.addEventListener("input", () => {
    hideExcept(list_kec);
    const keyword = input_kec.value.trim().toLowerCase();
    const filtered = kecamatanData.filter(item => item.name.toLowerCase().includes(keyword));
    filtered.length === 0 ? showNotFound(list_kec) : showList(filtered, list_kec);
});

list_kec.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    if (li.dataset.ignore === "true") return;

    input_kec.value = li.innerText;
    list_kec.classList.add("hidden");
});


// ---------------- close lists when click outside ----------------
document.addEventListener("click", (e) => {
    // jika klik di dalam salah satu input container, jangan tutup
    if (e.target.closest("#input_prov") || e.target.closest("#input_kab") || e.target.closest("#input_kec")) {
        return;
    }
    hideAllLists();
});

pilih_lokasi_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const provText = input_prov.value.trim();
    const kabText = input_kab.value.trim();
    const kecText = input_kec.value.trim();

    if(provText == "") {
        text_error_modal_lokasi.classList.remove("hidden");
        return;
    }

    // Susun text lokasi
    let lokasiText = provText;

    if (kabText !== "") lokasiText += ", " + kabText;
    if (kecText !== "") lokasiText += ", " + kecText;
    textlokasi_placeholder.textContent = "Lokasi " + lokasiText;

    if (typeof search_lokasi_modal !== "undefined") search_lokasi_modal.classList.remove("active");
        setTimeout(() => {
            if (typeof bgblur != "undefined") bgblur.classList.remove("active");
    }, 500);
});

// KATEGORI SEARCH
plusKategori.addEventListener("click", () => {
    bgblur.classList.add("active");
    kategori_modal.classList.add("active");
})
tutup_kategori_modal.addEventListener("click", () => {
    kategori_modal.classList.remove("active");
    setTimeout(() => {
        bgblur.classList.remove("active");
    }, 500);
})

let selectedKategories = [];

function renderKategori() {
    kategoriContainer.innerHTML = "";

    if(selectedKategories.length === 0) {
        kategoriContainer.innerHTML = "<p>Belum Ada Kategori Dipilih</p>"
    } else {
        selectedKategories.forEach((k, i) => {
            const wrap = document.createElement("div");
            wrap.innerHTML = `<span>${k}</span>
                <i class="fa-solid fa-x hapus_kategori"></i>`;
    
            wrap.querySelector(".hapus_kategori").addEventListener("click", () => {
                selectedKategories.splice(i, 1);
                renderKategori();
            });
    
            kategoriContainer.appendChild(wrap);
        });
    }

    if (selectedKategories.length >= 3) {
        plusKategori.setAttribute("disabled", true);
        plusKategori.classList.add("disabled");
        text_error_modal_kategori.innerText = "Sudah Terdapat 3 Kategori";
        text_error_modal_kategori.classList.remove("hidden");
    } else {
        plusKategori.removeAttribute("disabled");
        plusKategori.classList.remove("disabled");
    }
}

// EVENT Ketika LI diklik
kategoriItems.forEach(items => {
    items.addEventListener("click", () => {
        const namaKategori = items.querySelector("h5").innerText;

        // Cek Duplicate
        if(selectedKategories.includes(namaKategori)) {
            text_error_modal_kategori.innerText = "Kategori Sudah Dipilih";
            text_error_modal_kategori.classList.remove("hidden");
            return;
        }

        // Maksimal 3 Kategori
        if(selectedKategories.length >= 3) {
            text_error_modal_kategori.innerText = "Sudah Terdapat 3 Kategori";
            text_error_modal_kategori.classList.remove("hidden");
            return;
        }

        selectedKategories.push(namaKategori);
        renderKategori();
        kategori_modal.classList.remove("active");
        setTimeout(() => {
            bgblur.classList.remove("active");
        }, 500);
    })
})

delete_all_kategori.addEventListener("click", () => {
    selectedKategories = [];
    renderKategori();
});

document.querySelectorAll(".cardterdekatberanda").forEach(el => {
    el.addEventListener('click', () => {
        window.location = '/detailwisata.html'
    })
})