// storage.js
// GANTI dengan URL Worker Anda yang BENAR
const WORKER_URL = "https://restless-lake-1e7d.seins3002.workers.dev";

async function getDB() {
  try {
    const response = await fetch(`${WORKER_URL}/data`);
    if (!response.ok) return [];
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function getAllGenres() {
  return [];
}