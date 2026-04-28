// RK Perfume — дані завантажуються з Cloudflare D1 через API
// Не редагуйте вручну — використовуйте адмін панель

let PRODUCTS = [];
let RK_NEWS = [];
let RK_SETTINGS = {};

async function loadSiteData() {
  try {
    const [productsRes, newsRes, settingsRes] = await Promise.all([
      fetch('/api/products'),
      fetch('/api/news'),
      fetch('/api/settings'),
    ]);
    PRODUCTS = await productsRes.json();
    RK_NEWS = await newsRes.json();
    RK_SETTINGS = await settingsRes.json();
  } catch (e) {
    console.error('Помилка завантаження даних:', e);
    PRODUCTS = [];
    RK_NEWS = [];
    RK_SETTINGS = {};
  }
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function formatPrice(price) {
  return Number(price).toLocaleString('uk-UA') + ' грн';
}
