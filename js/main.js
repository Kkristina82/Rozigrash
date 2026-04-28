// RK Perfume — Main JS

// ============================================
// NAV SCROLL EFFECT
// ============================================
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
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
  if (href === currentPage) a.classList.add('active');
  else a.classList.remove('active');
});

// ============================================
// FEATURED PRODUCTS (HOME PAGE)
// ============================================
const featuredGrid = document.getElementById('featuredProducts');
if (featuredGrid && typeof PRODUCTS !== 'undefined') {
  const featured = getFeaturedProducts().slice(0, 6);
  featuredGrid.innerHTML = featured.map(p => productCardHTML(p)).join('');
}

// ============================================
// PRODUCT CARD HTML
// ============================================
function productCardHTML(p) {
  return `
    <div class="product-card" data-category="${p.category}">
      <span class="product-card__brand">${p.brand} • ${p.type}</span>
      <h3 class="product-card__name">${p.name}</h3>
      <p class="product-card__desc">${p.desc}</p>
      <div class="product-card__notes">
        ${p.notes.map(n => `<span class="note-tag">${n}</span>`).join('')}
      </div>
      <div class="product-card__footer">
        <div class="product-card__price">
          ${formatPrice(p.price)}
          <span>/ ${p.volume}</span>
        </div>
        <a href="../pages/order.html?product=${encodeURIComponent(p.name + ' ' + p.brand)}" class="product-card__btn">Замовити</a>
      </div>
    </div>
  `;
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(title, message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<strong>${title}</strong>${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .product-card, .social-card, .news-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
