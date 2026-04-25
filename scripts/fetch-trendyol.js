/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const HEPSIBURADA_API_URL =
  "https://gateway.hepsiburada.com/search/v2/arama?q=cerave&platform=HB_WEB&category=60001547";

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
    if (!process.env[key]) process.env[key] = value;
  }
}

function pickProducts(responseJson) {
  if (Array.isArray(responseJson?.data?.products)) return responseJson.data.products;
  if (Array.isArray(responseJson?.data?.items)) return responseJson.data.items;
  if (Array.isArray(responseJson?.result?.products)) return responseJson.result.products;
  if (Array.isArray(responseJson?.products)) return responseJson.products;
  if (Array.isArray(responseJson?.result)) return responseJson.result;
  return [];
}

function mapProductToUrunler(item) {
  const ad = item?.name || item?.productName || "İsimsiz Ürün";
  const marka =
    item?.brand?.name ||
    item?.brandName ||
    item?.brand ||
    item?.merchantName ||
    "Bilinmiyor";
  const kategori = item?.categoryName || item?.category?.name || "Cilt Bakımı";

  return { ad, marka, kategori };
}

async function main() {
  loadEnvFile(path.resolve(process.cwd(), ".env.local"));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  console.log("Fetching products from Hepsiburada search API...");
  const response = await fetch(HEPSIBURADA_API_URL, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Hepsiburada API request failed (${response.status}): ${body}`);
  }

  const json = await response.json();
  const products = pickProducts(json);
  const rows = products.map(mapProductToUrunler).filter((item) => item.ad);

  console.log(`Fetched ${products.length} products from Hepsiburada API.`);
  console.log("Sample mapped rows:", rows.slice(0, 5));

  if (rows.length === 0) {
    console.log("No products parsed, nothing inserted.");
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await supabase.from("urunler").insert(rows).select();

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  console.log(`Inserted ${data?.length ?? 0} rows into "urunler".`);
}

main().catch((error) => {
  console.error("fetch-trendyol.js failed:");
  console.error(error);
  process.exit(1);
});
