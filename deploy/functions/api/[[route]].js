// RK Perfume — Cloudflare Pages Function (API)
// Обробляє всі запити до /api/*

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
  'Content-Type': 'application/json',
};

const ADMIN_TOKEN = 'rk2025admin'; // змініть на свій пароль

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: CORS });
}

function err(msg, status = 400) {
  return new Response(JSON.stringify({ error: msg }), { status, headers: CORS });
}

function checkAuth(request) {
  const token = request.headers.get('X-Admin-Token');
  return token === ADMIN_TOKEN;
}

// ── Ініціалізація таблиць ──────────────────────────────────────
async function initDB(db) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      brand TEXT,
      name TEXT,
      desc TEXT,
      notes TEXT,
      volume TEXT,
      price INTEGER,
      type TEXT,
      featured INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tab TEXT,
      source TEXT,
      date TEXT,
      title TEXT,
      text TEXT,
      tags TEXT,
      link TEXT
    );
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
    CREATE TABLE IF NOT EXISTS auth (
      id INTEGER PRIMARY KEY,
      password TEXT
    );
  `);
}

// ── DEFAULT дані ──────────────────────────────────────────────
const DEFAULT_PRODUCTS = [
  { category:'women', brand:'Chanel', name:'Coco Mademoiselle', desc:'Свіжий квітково-oriental аромат з нотами бергамоту, трояндою та мускусом.', notes:'Бергамот,Троянда,Пачулі,Мускус', volume:'100 мл', price:1850, type:'EDP', featured:1 },
  { category:'women', brand:'Dior', name:'Miss Dior Blooming', desc:'Квітковий шипровий аромат — романтичний та жіночний.', notes:'Піоніі,Жасмин,Сандал,Пачулі', volume:'100 мл', price:1950, type:'EDT', featured:1 },
  { category:'women', brand:'YSL', name:'Black Opium', desc:'Адиктивний кавово-ванільний аромат. Ночі та гарячий шоколад.', notes:'Кава,Жасмин,Ваніль,Кедр', volume:'90 мл', price:1750, type:'EDP', featured:1 },
  { category:'women', brand:'Lancôme', name:'La Vie est Belle', desc:'Оптимістичний квітковий гурман. Ірис, пралін та ваніль.', notes:'Ірис,Пралін,Ваніль,Жасмин', volume:'100 мл', price:1700, type:'EDP', featured:0 },
  { category:'women', brand:'Viktor&Rolf', name:'Flowerbomb', desc:'Бомба квітів: жасмин, фрезія, троянда, пачулі.', notes:'Жасмин,Фрезія,Троянда,Пачулі', volume:'100 мл', price:1900, type:'EDP', featured:0 },
  { category:'women', brand:'Guerlain', name:'Mon Guerlain', desc:'Ніжний лавандово-ванільний аромат, натхненний Прованом.', notes:'Лаванда,Бергамот,Ваніль,Сандал', volume:'100 мл', price:1800, type:'EDP', featured:0 },
  { category:'men', brand:'Dior', name:'Sauvage', desc:'Свіжий, грубий, дикий. Перець амбраван та лаванда.', notes:'Бергамот,Перець,Амбраван,Лаванда', volume:'100 мл', price:1850, type:'EDT', featured:1 },
  { category:'men', brand:'Chanel', name:'Bleu de Chanel', desc:'Свіжий деревний ароматичний шедевр.', notes:'Цитрус,Ладан,Кедр,Сандал', volume:'100 мл', price:1900, type:'EDP', featured:1 },
  { category:'men', brand:'Paco Rabanne', name:'1 Million', desc:'Золото у пляшці. Спеції, шкіра та деревні акорди.', notes:'Грейпфрут,Кориця,Шкіра,Пачулі', volume:'100 мл', price:1600, type:'EDT', featured:0 },
  { category:'men', brand:'Versace', name:'Eros', desc:"Божественна свіжість. М'ята, зелене яблуко, ваніль.", notes:"М'ята,Яблуко,Ваніль,Дубовий мох", volume:'100 мл', price:1550, type:'EDT', featured:0 },
  { category:'men', brand:'Tom Ford', name:'Oud Wood', desc:'Рідкісний уд, рожевий перець та ваніль.', notes:'Уд,Рожевий перець,Ваніль,Сандал', volume:'50 мл', price:2800, type:'EDP', featured:0 },
  { category:'men', brand:'Creed', name:'Aventus', desc:'Легендарний аромат: ананас, береза, дубовий мох.', notes:'Ананас,Береза,Дубовий мос,Мускус', volume:'100 мл', price:5500, type:'EDP', featured:0 },
  { category:'unisex', brand:'Maison Margiela', name:'Replica: Jazz Club', desc:'Ромовий тютюн, ваніль та деревні ноти.', notes:'Тютюн,Ром,Ваніль,Кедр', volume:'100 мл', price:2400, type:'EDT', featured:0 },
  { category:'unisex', brand:'Jo Malone', name:'Wood Sage & Sea Salt', desc:'Морський бриз та деревний шавлій.', notes:'Морська сіль,Шавлій,Грейпфрут,Амбра', volume:'100 мл', price:3200, type:'Cologne', featured:0 },
  { category:'niche', brand:'Byredo', name:'Gypsy Water', desc:'Берлінська богема в пляшці. Ялиця, ваніль, сосна.', notes:'Береза,Ялиця,Сосна,Ваніль', volume:'100 мл', price:4200, type:'EDP', featured:0 },
  { category:'niche', brand:'Initio', name:'Oud for Greatness', desc:'Монументальний уд з кардамоном та мускусом.', notes:'Уд,Кардамон,Мускус,Амбра', volume:'90 мл', price:6500, type:'EDP', featured:0 },
];

const DEFAULT_NEWS = [
  { tab:'promo', source:'tg', date:'27 квітня 2025', title:'🔥 Акція: -15% на всі жіночі аромати', text:'Тільки цього тижня — знижка 15% на всі жіночі аромати.', tags:'Акція,Знижка,Жіночі', link:'http://t.me/rkperfume' },
  { tab:'new', source:'ig', date:'25 квітня 2025', title:'✨ Нові надходження: Byredo та Le Labo', text:'Поповнили запаси! Byredo Gypsy Water та Le Labo Santal 33.', tags:'Новинка,Нішева,Byredo', link:'https://www.instagram.com/rk.perfume.krop' },
  { tab:'review', source:'tg', date:'22 квітня 2025', title:'📖 Огляд: Dior Sauvage — чому він №1 у світі?', text:'Розповідаємо чому Dior Sauvage вже роками залишається найпопулярнішим чоловічим ароматом.', tags:'Огляд,Dior,Чоловічі', link:'http://t.me/rkperfume' },
];

const DEFAULT_SETTINGS = [
  ['shopName','RK Perfume'], ['city','Кропивницький'],
  ['slogan','Топові аромати • Доставка по Україні'],
  ['telegram','@rkperfume'], ['instagram','@rk.perfume.krop'],
  ['tiktok','@rk.perfume.krop'],
  ['facebook','https://www.facebook.com/people/Rkperfume-Krop/61577462221644/'],
  ['banner',''], ['bannerColor','gold'], ['minDelivery','2000'],
  ['hoursWeek','9:00 – 20:00'], ['hoursWeekend','10:00 – 18:00'],
];

async function seedIfEmpty(db) {
  const { results: existing } = await db.prepare('SELECT COUNT(*) as c FROM products').all();
  if (existing[0].c > 0) return;

  for (let i = 0; i < DEFAULT_PRODUCTS.length; i++) {
    const p = DEFAULT_PRODUCTS[i];
    await db.prepare(
      'INSERT INTO products (category,brand,name,desc,notes,volume,price,type,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).bind(p.category, p.brand, p.name, p.desc, p.notes, p.volume, p.price, p.type, p.featured, i).run();
  }
  for (const n of DEFAULT_NEWS) {
    await db.prepare(
      'INSERT INTO news (tab,source,date,title,text,tags,link) VALUES (?,?,?,?,?,?,?)'
    ).bind(n.tab, n.source, n.date, n.title, n.text, n.tags, n.link).run();
  }
  for (const [k, v] of DEFAULT_SETTINGS) {
    await db.prepare('INSERT OR IGNORE INTO settings (key,value) VALUES (?,?)').bind(k, v).run();
  }
  await db.prepare('INSERT OR IGNORE INTO auth (id,password) VALUES (1,?)').bind(ADMIN_TOKEN).run();
}

function parseProduct(row) {
  return {
    id: row.id,
    category: row.category,
    brand: row.brand,
    name: row.name,
    desc: row.desc,
    notes: row.notes ? row.notes.split(',') : [],
    volume: row.volume,
    price: row.price,
    type: row.type,
    featured: row.featured === 1,
  };
}

function parseNews(row) {
  return {
    id: row.id,
    tab: row.tab,
    source: row.source,
    date: row.date,
    title: row.title,
    text: row.text,
    tags: row.tags ? row.tags.split(',') : [],
    link: row.link,
  };
}

// ── ROUTER ────────────────────────────────────────────────────
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, '').replace(/\/$/, '') || '/';
  const method = request.method;

  if (method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

  const db = env.DB;
  await initDB(db);
  await seedIfEmpty(db);

  // ── GET /api/products ──────────────────────────────────────
  if (path === '/products' && method === 'GET') {
    const { results } = await db.prepare('SELECT * FROM products ORDER BY sort_order, id').all();
    return json(results.map(parseProduct));
  }

  // ── POST /api/products (add) ───────────────────────────────
  if (path === '/products' && method === 'POST') {
    if (!checkAuth(request)) return err('Unauthorized', 401);
    const body = await request.json();
    const notes = Array.isArray(body.notes) ? body.notes.join(',') : (body.notes || '');
    const { meta } = await db.prepare(
      'INSERT INTO products (category,brand,name,desc,notes,volume,price,type,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)'
    ).bind(body.category, body.brand, body.name, body.desc, notes, body.volume, body.price, body.type, body.featured ? 1 : 0, 9999).run();
    return json({ id: meta.last_row_id, ...body });
  }

  // ── PUT /api/products/:id ──────────────────────────────────
  if (path.startsWith('/products/') && method === 'PUT') {
    if (!checkAuth(request)) return err('Unauthorized', 401);
    const id = parseInt(path.split('/')[2]);
    const body = await request.json();
    const notes = Array.isArray(body.notes) ? body.notes.join(',') : (body.notes || '');
    await db.prepare(
      'UPDATE products SET category=?,brand=?,name=?,desc=?,notes=?,volume=?,price=?,type=?,featured=? WHERE id=?'
    ).bind(body.category, body.brand, body.name, body.desc, notes, body.volume, body.price, body.type, body.featured ? 1 : 0, id).run();
    return json({ ok: true });
  }

  // ── DELETE /api/products/:id ───────────────────────────────
  if (path.startsWith('/products/') && method === 'DELETE') {
    if (!checkAuth(request)) return err('Unauthorized', 401);
    const id = parseInt(path.split('/')[2]);
    await db.prepare('DELETE FROM products WHERE id=?').bind(id).run();
    return json({ ok: true });
  }

  // ── GET /api/news ──────────────────────────────────────────
  if (path === '/news' && method === 'GET') {
    const { results } = await db.prepare('SELECT * FROM news ORDER BY id DESC').all();
    return json(results.map(parseNews));
  }

  // ── POST /api/news ─────────────────────────────────────────
  if (path === '/news' && method === 'POST') {
    if (!checkAuth(request)) return err('Unauthorized', 401);
    const body = await request.json();
    const tags = Array.isArray(body.tags) ? body.tags.join(',') : (body.tags || '');
    const { meta } = await db.prepare(
      'INSERT INTO news (tab,source,date,title,text,tags,link) VALUES (?,?,?,?,?,?,?)'
    ).bind(body.tab, body.source, body.date, body.title, body.text, tags, body.link).run();
    return json({ id: meta.last_row_id });
  }

  // ── PUT /api/news/:id ──────────────────────────────────────
  if (path.startsWith('/news/') && method === 'PUT') {
    if (!checkAuth(request)) return err('Unauthorized', 401);
    const id = parseInt(path.split('/')[2]);
    const body = await request.json();
    const tags = Array.isArray(body.tags) ? body.tags.join(',') : (body.tags || '');
    await db.prepare(
      'UPDATE news SET tab=?,source=?,date=?,title=?,text=?,tags=?,link=? WHERE id=?'
    ).bind(body.tab, body.source, body.date, body.title, body.text, tags, body.link, id).run();
    return json({ ok: true });
  }

  // ── DELETE /api/news/:id ───────────────────────────────────
  if (path.startsWith('/news/') && method === 'DELETE') {
    if (!checkAuth(request)) return err('Unauthorized', 401);
    const id = parseInt(path.split('/')[2]);
    await db.prepare('DELETE FROM news WHERE id=?').bind(id).run();
    return json({ ok: true });
  }

  // ── GET /api/settings ─────────────────────────────────────
  if (path === '/settings' && method === 'GET') {
    const { results } = await db.prepare('SELECT key,value FROM settings').all();
    const obj = {};
    results.forEach(r => { obj[r.key] = r.value; });
    return json(obj);
  }

  // ── POST /api/settings ────────────────────────────────────
  if (path === '/settings' && method === 'POST') {
    if (!checkAuth(request)) return err('Unauthorized', 401);
    const body = await request.json();
    for (const [k, v] of Object.entries(body)) {
      await db.prepare('INSERT OR REPLACE INTO settings (key,value) VALUES (?,?)').bind(k, String(v)).run();
    }
    return json({ ok: true });
  }

  // ── POST /api/auth ─────────────────────────────────────────
  if (path === '/auth' && method === 'POST') {
    const body = await request.json();
    const { results } = await db.prepare('SELECT password FROM auth WHERE id=1').all();
    const storedPass = results[0]?.password || ADMIN_TOKEN;
    if (body.password === storedPass) return json({ ok: true, token: storedPass });
    return err('Невірний пароль', 401);
  }

  // ── POST /api/auth/change ──────────────────────────────────
  if (path === '/auth/change' && method === 'POST') {
    if (!checkAuth(request)) return err('Unauthorized', 401);
    const body = await request.json();
    await db.prepare('INSERT OR REPLACE INTO auth (id,password) VALUES (1,?)').bind(body.newPassword).run();
    return json({ ok: true });
  }

  return err('Not found', 404);
}
