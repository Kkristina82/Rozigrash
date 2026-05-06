// RK Perfume — Main JS

// ============================================
// NAV SCROLL EFFECT
// ============================================
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ============================================
// BURGER MENU
// ============================================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ============================================
// ACTIVE NAV LINK
// ============================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  a.classList.toggle('active', href === currentPage);
});

// ============================================
// CART SYSTEM
// ============================================
let cart = [];
try { cart = JSON.parse(localStorage.getItem('rk_cart') || '[]'); } catch(e) { cart = []; }

function saveCart() {
  localStorage.setItem('rk_cart', JSON.stringify(cart));
  refreshCartBadge();
}

function refreshCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.nav__cart-badge').forEach(b => {
    b.textContent = total;
    b.classList.toggle('nav__cart-badge--visible', total > 0);
  });
}

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(Object.assign({}, product, { qty: 1 }));
  }
  saveCart();
  document.querySelectorAll('.nav__cart-badge').forEach(b => {
    b.classList.add('nav__cart-badge--bump');
    setTimeout(() => b.classList.remove('nav__cart-badge--bump'), 350);
  });
  showToast('Додано до кошика ✦', product.name);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function getCartTotal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
}

// Init badge on load
refreshCartBadge();

// ============================================
// PRODUCT CARD HTML
// ============================================
function productCardHTML(p) {
  const id = p.id || (p.name + p.brand).replace(/\W/g, '_');
  const sn = (p.name  || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;');
  const sb = (p.brand || '').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'&quot;');
  const sv = (p.volume|| '').replace(/'/g,"\\'");
  const notesArr = Array.isArray(p.notes)
    ? p.notes
    : (p.notes || '').split(',').map(n => n.trim()).filter(Boolean);
  const imgHTML = p.image_url
    ? '<div class="product-card__img"><img src="' + p.image_url + '" alt="' + p.name + '" loading="lazy" /></div>'
    : '<div class="product-card__img product-card__img--empty"><span>✦</span></div>';
  return (
    '<div class="product-card" data-category="' + p.category + '">' +
      imgHTML +
      '<span class="product-card__brand">' + p.brand + ' \u2022 ' + p.type + '</span>' +
      '<h3 class="product-card__name">' + p.name + '</h3>' +
      '<p class="product-card__desc">' + p.desc + '</p>' +
      '<div class="product-card__notes">' +
        notesArr.map(n => '<span class="note-tag">' + n + '</span>').join('') +
      '</div>' +
      '<div class="product-card__footer">' +
        '<div class="product-card__price">' + formatPrice(p.price) + '<span>/ ' + p.volume + '</span></div>' +
        '<button class="product-card__btn product-card__btn--cart" ' +
          'onclick="addToCart({id:\'' + id + '\',name:\'' + sn + '\',brand:\'' + sb + '\',price:' + p.price + ',volume:\'' + sv + '\'})">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
            '<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>' +
            '<line x1="3" y1="6" x2="21" y2="6"/>' +
            '<path d="M16 10a4 4 0 01-8 0"/>' +
          '</svg> До кошика' +
        '</button>' +
      '</div>' +
    '</div>'
  );
}

// ============================================
// TOAST
// ============================================
function showToast(title, message) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.innerHTML = '<strong>' + title + '</strong><span>' + (message || '') + '</span>';
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ============================================
// SCROLL REVEAL
// ============================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

function initScrollReveal() {
  document.querySelectorAll('.feature-card, .product-card, .social-card, .news-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initScrollReveal);

// ============================================
// FIX 5: PROMO BANNER FROM SETTINGS
// ============================================
(function initPromoBanner() {
  // Try to load settings from API (Cloudflare), fall back to localStorage
  async function loadBannerSettings() {
    let settings = null;
    // Try API first
    try {
      const r = await fetch('/api/settings', { signal: AbortSignal.timeout(2000) });
      if (r.ok) settings = await r.json();
    } catch(e) {}
    // Fallback: localStorage (admin saves preview here)
    if (!settings) {
      try { settings = JSON.parse(localStorage.getItem('rk_settings_preview') || 'null'); } catch(e) {}
    }
    if (settings && settings.banner) {
      const banner = document.getElementById('promoBanner');
      const text   = document.getElementById('promoBannerText');
      if (banner && text) {
        text.textContent = settings.banner;
        banner.className = 'promo-banner visible promo-banner--' + (settings.bannerColor || 'gold');
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBannerSettings);
  } else {
    loadBannerSettings();
  }
})();

// ============================================
// FIX 10: PRICELIST "ЗАМОВИТИ" → CART
// ============================================
function pricelistAddToCart(id, name, brand, price, volume) {
  addToCart({ id, name, brand, price, volume });
  // Visual feedback on the button
  const btns = document.querySelectorAll('.order-btn[data-id="' + id + '"]');
  btns.forEach(btn => {
    const orig = btn.textContent;
    btn.textContent = '✓ Додано';
    btn.style.color = 'var(--gold)';
    setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1800);
  });
}
