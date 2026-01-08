export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const method = request.method;

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    if (method === "OPTIONS") return new Response(null, { headers });

    // Membaca data dari KV ANIME_DB dengan key 'bstationx-db'
    if (method === "GET") {
        const data = await env.ANIME_DB.get("bstationx-db");
        return new Response(data || "{}", { headers });
    }

    // Menyimpan data massal (100 Anime) ke KV 'bstationx-db'
    if (method === "POST") {
        try {
            const body = await request.json();
            await env.ANIME_DB.put("bstationx-db", JSON.stringify(body));
            return new Response(JSON.stringify({ success: true }), { headers });
        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
        }
    }

    return new Response("Method Not Allowed", { status: 405 });
}
