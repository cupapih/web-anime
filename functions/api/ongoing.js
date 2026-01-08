export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || "1";

  const target =
    `https://otakudeso-api.vercel.app/api/ongoing?page=${page}`;

  try {
    const res = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
      }
    });

    const data = await res.text();

    return new Response(data, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
      }
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Fetch failed" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  }
}
