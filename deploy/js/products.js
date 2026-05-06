// RK Perfume — Вбудовані дані (не потребує API)

const PRODUCTS = [
  { id: 'coco_made', category:'women', brand:'Chanel', name:'Coco Mademoiselle', desc:'Свіжий квітково-oriental аромат з нотами бергамоту, трояндою та мускусом.', notes:['Бергамот','Троянда','Пачулі','Мускус'], volume:'100 мл', price:1850, type:'EDP', featured:true },
  { id: 'miss_dior', category:'women', brand:'Dior', name:'Miss Dior Blooming', desc:'Квітковий шипровий аромат — романтичний та жіночний.', notes:['Піонія','Жасмин','Сандал','Пачулі'], volume:'100 мл', price:1950, type:'EDT', featured:true },
  { id: 'black_opium', category:'women', brand:'YSL', name:'Black Opium', desc:'Адиктивний кавово-ванільний аромат. Ночі та гарячий шоколад.', notes:['Кава','Жасмин','Ваніль','Кедр'], volume:'90 мл', price:1750, type:'EDP', featured:true },
  { id: 'la_vie', category:'women', brand:'Lancôme', name:'La Vie est Belle', desc:'Оптимістичний квітковий гурман. Ірис, пралін та ваніль.', notes:['Ірис','Пралін','Ваніль','Жасмин'], volume:'100 мл', price:1700, type:'EDP', featured:false },
  { id: 'flowerbomb', category:'women', brand:'Viktor&Rolf', name:'Flowerbomb', desc:'Бомба квітів: жасмин, фрезія, троянда, пачулі.', notes:['Жасмин','Фрезія','Троянда','Пачулі'], volume:'100 мл', price:1900, type:'EDP', featured:false },
  { id: 'mon_guer', category:'women', brand:'Guerlain', name:'Mon Guerlain', desc:'Ніжний лавандово-ванільний аромат, натхненний Прованом.', notes:['Лаванда','Бергамот','Ваніль','Сандал'], volume:'100 мл', price:1800, type:'EDP', featured:false },
  { id: 'sauvage', category:'men', brand:'Dior', name:'Sauvage', desc:'Свіжий, грубий, дикий. Перець амбраван та лаванда.', notes:['Бергамот','Перець','Амбраван','Лаванда'], volume:'100 мл', price:1850, type:'EDT', featured:true },
  { id: 'bleu_chanel', category:'men', brand:'Chanel', name:'Bleu de Chanel', desc:'Свіжий деревний ароматичний шедевр.', notes:['Цитрус','Ладан','Кедр','Сандал'], volume:'100 мл', price:1900, type:'EDP', featured:true },
  { id: 'million', category:'men', brand:'Paco Rabanne', name:'1 Million', desc:'Золото у пляшці. Спеції, шкіра та деревні акорди.', notes:['Грейпфрут','Кориця','Шкіра','Пачулі'], volume:'100 мл', price:1600, type:'EDT', featured:false },
  { id: 'eros', category:'men', brand:'Versace', name:'Eros', desc:"Божественна свіжість. М'ята, зелене яблуко, ваніль.", notes:["М'ята",'Яблуко','Ваніль','Дубовий мох'], volume:'100 мл', price:1550, type:'EDT', featured:false },
  { id: 'oud_wood', category:'men', brand:'Tom Ford', name:'Oud Wood', desc:'Рідкісний уд, рожевий перець та ваніль.', notes:['Уд','Рожевий перець','Ваніль','Сандал'], volume:'50 мл', price:2800, type:'EDP', featured:false },
  { id: 'aventus', category:'men', brand:'Creed', name:'Aventus', desc:'Легендарний аромат: ананас, береза, дубовий мох.', notes:['Ананас','Береза','Дубовий мох','Мускус'], volume:'100 мл', price:5500, type:'EDP', featured:false },
  { id: 'jazz_club', category:'unisex', brand:'Maison Margiela', name:'Replica: Jazz Club', desc:'Ромовий тютюн, ваніль та деревні ноти.', notes:['Тютюн','Ром','Ваніль','Кедр'], volume:'100 мл', price:2400, type:'EDT', featured:false },
  { id: 'wood_sage', category:'unisex', brand:'Jo Malone', name:'Wood Sage & Sea Salt', desc:'Морський бриз та деревний шавлій.', notes:['Морська сіль','Шавлій','Грейпфрут','Амбра'], volume:'100 мл', price:3200, type:'Cologne', featured:false },
  { id: 'gypsy_water', category:'niche', brand:'Byredo', name:'Gypsy Water', desc:'Берлінська богема в пляшці. Ялиця, ваніль, сосна.', notes:['Береза','Ялиця','Сосна','Ваніль'], volume:'100 мл', price:4200, type:'EDP', featured:false },
  { id: 'oud_great', category:'niche', brand:'Initio', name:'Oud for Greatness', desc:'Монументальний уд з кардамоном та мускусом.', notes:['Уд','Кардамон','Мускус','Амбра'], volume:'90 мл', price:6500, type:'EDP', featured:false },
];

const RK_NEWS = [
  { id:1, tab:'promo', source:'tg', date:'27 квітня 2025', title:'🔥 Акція: -15% на всі жіночі аромати', text:'Тільки цього тижня — знижка 15% на всі жіночі аромати. Встигни замовити до кінця тижня!', tags:['Акція','Знижка','Жіночі'], link:'http://t.me/rkperfume' },
  { id:2, tab:'new', source:'ig', date:'25 квітня 2025', title:'✨ Нові надходження: Byredo та Le Labo', text:'Поповнили запаси! Byredo Gypsy Water та Le Labo Santal 33 вже доступні для замовлення.', tags:['Новинка','Нішева','Byredo'], link:'https://www.instagram.com/rk.perfume.krop' },
  { id:3, tab:'review', source:'tg', date:'22 квітня 2025', title:'📖 Огляд: Dior Sauvage — чому він №1 у світі?', text:'Розповідаємо чому Dior Sauvage вже роками залишається найпопулярнішим чоловічим ароматом.', tags:['Огляд','Dior','Чоловічі'], link:'http://t.me/rkperfume' },
  { id:4, tab:'promo', source:'ig', date:'18 квітня 2025', title:'🎁 Подарунковий набір до свята', text:'Формуємо подарункові набори з 2-3 ароматів. Ідеально для подарунка!', tags:['Подарунок','Набір','Акція'], link:'https://www.instagram.com/rk.perfume.krop' },
  { id:5, tab:'new', source:'tg', date:'15 квітня 2025', title:'🆕 Надійшли нові чоловічі аромати', text:'Creed Aventus та Tom Ford Oud Wood тепер є в наявності. Нішева парфумерія за доступними цінами.', tags:['Новинка','Нішева','Чоловічі'], link:'http://t.me/rkperfume' },
];

const RK_SETTINGS = {};

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function formatPrice(price) {
  return Number(price).toLocaleString('uk-UA') + ' грн';
}

// Сумісність зі старим кодом
async function loadSiteData() {
  setTimeout(() => document.dispatchEvent(new CustomEvent('productsLoaded')), 0);
}

// Автозапуск
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.dispatchEvent(new CustomEvent('productsLoaded'));
  });
} else {
  setTimeout(() => document.dispatchEvent(new CustomEvent('productsLoaded')), 0);
}
