const DB_KEY = "BSTATIONX_DB";

function getDB(){
  const raw = localStorage.getItem(DB_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function clearDB(){
  saveDB([]);
  console.log("DB CLEARED");
}

function addAnime(anime){
  const db = getDB();
  db.push(anime);
  saveDB(db);
  console.log("SAVED:", anime.title);
}
