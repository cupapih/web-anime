export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";

  // CONTOH API PUBLIK (AMAN DARI CORS)
  const target = `https://api.jikan.moe/v4/seasons/now?page=${page}`;

  try {
    const res = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const json = await res.json();

    // NORMALISASI DATA BIAR COCOK DENGAN SCRAPER KAMU
    const animeList = (json.data || []).map(a => ({
      id: a.mal_id,
      title: a.title,
      thumb: a.images?.jpg?.image_url || "",
    }));

    return new Response(JSON.stringify({ animeList }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500
    });
  }
}
