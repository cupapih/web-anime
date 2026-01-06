<script>
const DB_KEY = 'BSTATIONX_DB';

function getDB(){
  return JSON.parse(localStorage.getItem(DB_KEY)) || [];
}

function saveDB(data){
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function addAnime(anime){
  const db = getDB();
  db.push(anime);
  saveDB(db);
}

function clearDB(){
  localStorage.removeItem(DB_KEY);
}
</script>
