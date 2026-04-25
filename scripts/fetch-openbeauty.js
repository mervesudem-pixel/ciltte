/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function buildOpenBeautyUrl(searchTerm) {
  const params = new URLSearchParams({
    search_terms: searchTerm,
    search_simple: "1",
    action: "process",
    json: "1",
    page_size: "20"
  });

  return `https://world.openbeautyfacts.org/cgi/search.pl?${params.toString()}`;
}

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

function mapToUrunler(product) {
  return {
    ad: product.product_name?.trim() || "",
    marka: product.brands?.trim() || "Bilinmiyor",
    kategori: product.categories?.trim() || "Cilt Bakımı",
    barkod: product.code?.toString() || null
  };
}

async function main() {
  loadEnvFile(path.resolve(process.cwd(), ".env.local"));
  const searchTerm = (process.argv[2] || "cerave").trim();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  const openBeautyUrl = buildOpenBeautyUrl(searchTerm);
  console.log(`Fetching products from Open Beauty Facts API for "${searchTerm}"...`);
  const response = await fetch(openBeautyUrl, {
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Open Beauty Facts request failed (${response.status}): ${body}`);
  }

  const json = await response.json();
  const products = Array.isArray(json?.products) ? json.products : [];
  const rows = products
    .map(mapToUrunler)
    .filter((item) => item.ad && item.ad.trim().length > 0);

  if (rows.length === 0) {
    console.log("No valid products found after filtering. Inserted 0 products.");
    return;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);
  const { data, error } = await supabase.from("urunler").insert(rows).select("id");

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  console.log(`Inserted ${data?.length ?? 0} products into "urunler".`);
}

main().catch((error) => {
  console.error("fetch-openbeauty.js failed:");
  console.error(error);
  process.exit(1);
});
