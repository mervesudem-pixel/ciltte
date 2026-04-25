/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const URUNAPI_ENDPOINT = "https://api.urunapi.com/v1/extract";
const TRENDYOL_URL = "https://www.trendyol.com/cilt-bakimi-x-c85";
const FETCH_LIMIT = 10;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;

    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function pickProductArray(responseJson) {
  if (Array.isArray(responseJson)) return responseJson;
  if (Array.isArray(responseJson?.products)) return responseJson.products;
  if (Array.isArray(responseJson?.items)) return responseJson.items;
  if (Array.isArray(responseJson?.data)) return responseJson.data;
  if (Array.isArray(responseJson?.data?.products)) return responseJson.data.products;
  if (Array.isArray(responseJson?.data?.items)) return responseJson.data.items;
  return [];
}

function toUrunlerRow(item) {
  const ad = item.name || item.title || item.productName || item.ad || "İsimsiz Ürün";
  const marka = item.brand || item.marka || item.manufacturer || "Bilinmiyor";
  const kategori = item.category || item.kategori || "Cilt Bakımı";
  return { ad, marka, kategori };
}

async function fetchFromUrunApi(apiKey) {
  const response = await fetch(URUNAPI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "x-api-key": apiKey
    },
    body: JSON.stringify({
      url: TRENDYOL_URL,
      limit: FETCH_LIMIT
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`UrunAPI request failed (${response.status}): ${body}`);
  }

  return response.json();
}

async function main() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  loadEnvFile(envPath);

  const urunApiKey = process.env.URUNAPI_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!urunApiKey) {
    throw new Error("Missing URUNAPI_API_KEY in .env.local or process env.");
  }

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Fetching products from UrunAPI...");
  const responseJson = await fetchFromUrunApi(urunApiKey);
  const extracted = pickProductArray(responseJson).slice(0, FETCH_LIMIT);
  const mappedProducts = extracted.map(toUrunlerRow);

  console.log(`Fetched ${mappedProducts.length} products from Trendyol URL.`);
  console.log("Sample mapped products:", mappedProducts.slice(0, 3));

  if (mappedProducts.length === 0) {
    console.log("No products to insert. Exiting.");
    return;
  }

  const { data, error } = await supabase.from("urunler").insert(mappedProducts).select();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  console.log(`Inserted ${data?.length ?? 0} rows into 'urunler'.`);
  console.log("Inserted rows:", data);
}

main().catch((err) => {
  console.error("fetch-products.js failed:");
  console.error(err);
  process.exit(1);
});
