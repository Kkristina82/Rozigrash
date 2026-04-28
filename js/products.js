// RK Perfume — Product Catalog Data
// Редагуйте цей файл для зміни товарів та цін

const PRODUCTS = [
  // ===== ЖІНОЧІ =====
  {
    id: 1,
    category: "women",
    categoryName: "Жіночі",
    brand: "Chanel",
    name: "Coco Mademoiselle",
    desc: "Свіжий квітково-oriental аромат з нотами бергамоту, трояндою та мускусом. Іконічний вибір сучасної жінки.",
    notes: ["Бергамот", "Троянда", "Пачулі", "Мускус"],
    volume: "100 мл",
    price: 1850,
    currency: "грн",
    type: "EDP",
    featured: true
  },
  {
    id: 2,
    category: "women",
    categoryName: "Жіночі",
    brand: "Dior",
    name: "Miss Dior Blooming",
    desc: "Квітковий шипровий аромат — романтичний та жіночний. Перлина ароматного мистецтва Dior.",
    notes: ["Піоніі", "Жасмин", "Сандал", "Пачулі"],
    volume: "100 мл",
    price: 1950,
    currency: "грн",
    type: "EDT",
    featured: true
  },
  {
    id: 3,
    category: "women",
    categoryName: "Жіночі",
    brand: "YSL",
    name: "Black Opium",
    desc: "Адиктивний кавово-ванільний аромат. Ночі та гарячий шоколад — втілення жіночої чарівності.",
    notes: ["Кава", "Жасмин", "Ваніль", "Кедр"],
    volume: "90 мл",
    price: 1750,
    currency: "грн",
    type: "EDP",
    featured: true
  },
  {
    id: 4,
    category: "women",
    categoryName: "Жіночі",
    brand: "Lancôme",
    name: "La Vie est Belle",
    desc: "Оптимістичний квітковий гурман. Ірис, пралін та ваніль у гармонійному тандемі.",
    notes: ["Ірис", "Пралін", "Ваніль", "Жасмин"],
    volume: "100 мл",
    price: 1700,
    currency: "грн",
    type: "EDP",
    featured: false
  },
  {
    id: 5,
    category: "women",
    categoryName: "Жіночі",
    brand: "Viktor&Rolf",
    name: "Flowerbomb",
    desc: "Бомба квітів: жасмин, фрезія, троянда, пачулі — вибуховий жіночний аромат.",
    notes: ["Жасмин", "Фрезія", "Троянда", "Пачулі"],
    volume: "100 мл",
    price: 1900,
    currency: "грн",
    type: "EDP",
    featured: false
  },
  {
    id: 6,
    category: "women",
    categoryName: "Жіночі",
    brand: "Guerlain",
    name: "Mon Guerlain",
    desc: "Ніжний лавандово-ванільний аромат, натхненний Прованом. Тонкий, романтичний, незабутній.",
    notes: ["Лаванда", "Бергамот", "Ваніль", "Сандал"],
    volume: "100 мл",
    price: 1800,
    currency: "грн",
    type: "EDP",
    featured: false
  },

  // ===== ЧОЛОВІЧІ =====
  {
    id: 7,
    category: "men",
    categoryName: "Чоловічі",
    brand: "Dior",
    name: "Sauvage",
    desc: "Свіжий, грубий, дикий. Перець амбраван та лаванда — мужність сучасного часу.",
    notes: ["Бергамот", "Перець", "Амбраван", "Лаванда"],
    volume: "100 мл",
    price: 1850,
    currency: "грн",
    type: "EDT",
    featured: true
  },
  {
    id: 8,
    category: "men",
    categoryName: "Чоловічі",
    brand: "Chanel",
    name: "Bleu de Chanel",
    desc: "Свіжий деревний ароматичний шедевр. Цитрус, ладан, кедр — сучасна класика.",
    notes: ["Цитрус", "Ладан", "Кедр", "Сандал"],
    volume: "100 мл",
    price: 1900,
    currency: "грн",
    type: "EDP",
    featured: true
  },
  {
    id: 9,
    category: "men",
    categoryName: "Чоловічі",
    brand: "Paco Rabanne",
    name: "1 Million",
    desc: "Золото у пляшці. Спеції, шкіра та деревні акорди — аромат переможця.",
    notes: ["Грейпфрут", "Кориця", "Шкіра", "Пачулі"],
    volume: "100 мл",
    price: 1600,
    currency: "грн",
    type: "EDT",
    featured: false
  },
  {
    id: 10,
    category: "men",
    categoryName: "Чоловічі",
    brand: "Versace",
    name: "Eros",
    desc: "Божественна свіжість. М'ята, зелене яблуко, ваніль — молодість та пристрасть.",
    notes: ["М'ята", "Яблуко", "Ваніль", "Дубовий мох"],
    volume: "100 мл",
    price: 1550,
    currency: "грн",
    type: "EDT",
    featured: false
  },
  {
    id: 11,
    category: "men",
    categoryName: "Чоловічі",
    brand: "Tom Ford",
    name: "Oud Wood",
    desc: "Рідкісний уд, рожевий перець та ваніль. Розкіш в кожній краплі.",
    notes: ["Уд", "Рожевий перець", "Ваніль", "Сандал"],
    volume: "50 мл",
    price: 2800,
    currency: "грн",
    type: "EDP",
    featured: false
  },
  {
    id: 12,
    category: "men",
    categoryName: "Чоловічі",
    brand: "Creed",
    name: "Aventus",
    desc: "Легендарний аромат: ананас, береза, дубовий мох. Символ успіху та сили.",
    notes: ["Ананас", "Береза", "Дубовий мос", "Мускус"],
    volume: "100 мл",
    price: 5500,
    currency: "грн",
    type: "EDP",
    featured: false
  },

  // ===== УНІСЕКС =====
  {
    id: 13,
    category: "unisex",
    categoryName: "Унісекс",
    brand: "Maison Margiela",
    name: "Replica: Jazz Club",
    desc: "Ромовий тютюн, ваніль та деревні ноти. Атмосфера джазового клубу 50-х.",
    notes: ["Тютюн", "Ром", "Ваніль", "Кедр"],
    volume: "100 мл",
    price: 2400,
    currency: "грн",
    type: "EDT",
    featured: false
  },
  {
    id: 14,
    category: "unisex",
    categoryName: "Унісекс",
    brand: "Jo Malone",
    name: "Wood Sage & Sea Salt",
    desc: "Морський бриз та деревний шавлій. Свобода та природа в одному флаконі.",
    notes: ["Морська сіль", "Шавлій", "Грейпфрут", "Амбра"],
    volume: "100 мл",
    price: 3200,
    currency: "грн",
    type: "Cologne",
    featured: false
  },
  {
    id: 15,
    category: "unisex",
    categoryName: "Унісекс",
    brand: "Le Labo",
    name: "Santal 33",
    desc: "Культовий аромат сандалу та кардамону. Мінімалізм та розкіш разом.",
    notes: ["Сандал", "Кардамон", "Береза", "Мускус"],
    volume: "100 мл",
    price: 4800,
    currency: "грн",
    type: "EDP",
    featured: false
  },

  // ===== НІШЕВА =====
  {
    id: 16,
    category: "niche",
    categoryName: "Нішева",
    brand: "Byredo",
    name: "Gypsy Water",
    desc: "Берлінська богема в пляшці. Ялиця, ваніль, сосна — дух волі та авантюри.",
    notes: ["Береза", "Ялиця", "Сосна", "Ваніль"],
    volume: "100 мл",
    price: 4200,
    currency: "грн",
    type: "EDP",
    featured: false
  },
  {
    id: 17,
    category: "niche",
    categoryName: "Нішева",
    brand: "Initio",
    name: "Oud for Greatness",
    desc: "Монументальний уд з кардамоном та мускусом. Для тих, хто не боїться бути помітним.",
    notes: ["Уд", "Кардамон", "Мускус", "Амбра"],
    volume: "90 мл",
    price: 6500,
    currency: "грн",
    type: "EDP",
    featured: false
  },
];

// Функція форматування ціни
function formatPrice(price) {
  return price.toLocaleString('uk-UA') + ' грн';
}

// Отримати товари за категорією
function getProductsByCategory(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

// Отримати featured товари
function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

// Отримати всі категорії
function getCategories() {
  const cats = [...new Set(PRODUCTS.map(p => p.category))];
  return cats;
}
