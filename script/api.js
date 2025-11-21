const APIURL ="https://script.google.com/macros/s/AKfycbyjzeWqByYRhTV39Q2SKUqmVTjuVAfSwrS4A_QHKy1wHbUULWL0DifUVYNX1Q5KlqiFxQ/exec"

window.getAllCategories = async () => {
    try {
        const response = await fetch(APIURL + "?sheet=KATEGORI");
        const data = await response.text();
        return JSON.parse(data);
    } catch {
        return null;
    }
}


window.getAllWisataAndCategories = async () => {
    try {
        // 1. Ambil data wisata
        const response = await fetch(APIURL + "?sheet=WISATA");
        let wisata = await response.text();
        wisata = JSON.parse(wisata);

        // 2. Ambil kategori
        const categories = await window.getAllCategories();

        // 3. Gabungkan kategori
        const merged = wisata.map((item) => {

            // --- PARSE KATEGORI DENGAN AMAN ---
            let kategoriIDs = [];
            try {
                kategoriIDs = JSON.parse(item.KATEGORI);
            } catch (e) {
                console.warn("Kategori tidak valid untuk item ID:", item.ID, item.KATEGORI);
                kategoriIDs = []; // fallback
            }

            // Ambil daftar kategori
            const kategoriList = kategoriIDs.map((id) => {
                const found = categories.find((cat) => cat.ID == id);
                return found
                    ? { id: found.ID, kategori: found.KATEGORI }
                    : { id, kategori: "Tidak Diketahui" };
            });

            return {
                ...item,
                kategori: kategoriList
            };
        });

        return merged;

    } catch (err) {
        console.log("ERROR:", err);
        return null;
    }
}