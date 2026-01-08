// storage.js
const PREFIX = "BSX_DATA_";
const INDEX_KEY = "BSX_INDEX";

// KV: Simpan data tunggal berdasarkan Key (Slug)
const saveToKV = (anime) => {
    const slug = anime.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    localStorage.setItem(PREFIX + slug, JSON.stringify(anime));
    
    // Update Daftar Indeks (Kunci Utama)
    const index = JSON.parse(localStorage.getItem(INDEX_KEY) || "[]");
    if (!index.includes(slug)) {
        index.push(slug);
        localStorage.setItem(INDEX_KEY, JSON.stringify(index));
    }
};

// KV: Ambil satu data spesifik berdasarkan Key
const getAnimeBySlug = (slug) => JSON.parse(localStorage.getItem(PREFIX + slug));

// KV: Ambil semua data (Iterasi melalui Indeks)
const getDB = () => {
    const index = JSON.parse(localStorage.getItem(INDEX_KEY) || "[]");
    return index.map(slug => JSON.parse(localStorage.getItem(PREFIX + slug))).filter(n => n !== null);
};

// KV: Hapus semua data
const clearDB = () => {
    const index = JSON.parse(localStorage.getItem(INDEX_KEY) || "[]");
    index.forEach(slug => localStorage.removeItem(PREFIX + slug));
    localStorage.removeItem(INDEX_KEY);
};

// KV: Ambil semua genre dari seluruh data
const getAllGenres = () => {
    const db = getDB();
    const genres = new Set();
    db.forEach(item => item.genres?.forEach(g => genres.add(g)));
    return Array.from(genres).sort();
};