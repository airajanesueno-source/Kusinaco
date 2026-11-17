(() => {
  'use strict';

    const IMG = {
    hero: 'hero.jpg', story: 'story.jpg',
    adobo: 'adobo.jpg', karekare: 'karekare.jpg', sinigang: 'sinigang.jpg', lechon: 'lechon.jpg',
    sisig: 'sisig.jpg', tapsilog: 'tapsilog.jpg', longsilog: 'longsilog.jpg',
    pancit: 'pancit.jpg', palabok: 'palabok.jpg',
    halohalo: 'halohalo.jpg', leche: 'leche.jpg',
    buko: 'buko.jpg', calamansi: 'calamansi.jpg'
  };

    const MENU = [
    { id: 'adobo',   name: 'Chicken Adobo',       cat: 'Main Dishes', price: 245, featured: true, img: 'adobo',    g: '#8a5a3c,#4a2c1c', desc: 'Chicken braised in soy, vinegar, garlic and bay leaf until tender.' },
    { id: 'karekare',name: 'Beef Kare-Kare',      cat: 'Main Dishes', price: 395, featured: true, img: 'karekare', g: '#D9A441,#8a5a1c', desc: 'Oxtail and beef in a rich peanut sauce, served with bagoong.' },
    { id: 'sinigang',name: 'Pork Sinigang',       cat: 'Main Dishes', price: 325, featured: true, img: 'sinigang', g: '#b9c46a,#6a7a2c', desc: 'Tender pork ribs in a bright, tangy tamarind broth with vegetables.' },
    { id: 'lechon',  name: 'Crispy Lechon Kawali',cat: 'Main Dishes', price: 355, featured: true, img: 'lechon',   g: '#E0A458,#a4601c', desc: 'Golden, crackling pork belly with liver sauce on the side.' },
    { id: 'sisig',   name: 'Sizzling Sisig',      cat: 'Rice Meals',  price: 275, img: 'sisig',   g: '#c97b5a,#7a3c24', desc: 'Chopped pork, onion and chili on a hot plate, with garlic rice.' },
    { id: 'tapsilog',name: 'Beef Tapsilog',       cat: 'Rice Meals',  price: 225, img: 'tapsilog',g: '#d6a15b,#8a5a2c', desc: 'Garlic-marinated beef tapa, sunny egg and garlic fried rice.' },
    { id: 'longsilog',name:'Longganisa Silog',    cat: 'Rice Meals',  price: 195, img: 'longsilog',g:'#c4694a,#7a3020', desc: 'Sweet Filipino sausage with garlic rice and a fried egg.' },
    { id: 'pancit',  name: 'Pancit Canton',       cat: 'Noodles',     price: 215, img: 'pancit',  g: '#e2b86a,#a4742c', desc: 'Stir-fried egg noodles with chicken, shrimp and crisp vegetables.' },
    { id: 'palabok', name: 'Pancit Palabok',      cat: 'Noodles',     price: 235, img: 'palabok', g: '#e8a060,#b4602c', desc: 'Rice noodles in shrimp sauce, topped with egg, chicharon and calamansi.' },
    { id: 'halohalo',name: 'Halo-Halo',           cat: 'Desserts',    price: 165, img: 'halohalo',g: '#d98aa6,#8a3c5a', desc: 'Shaved ice, sweet beans, leche flan, ube and a scoop of ice cream.' },
    { id: 'leche',   name: 'Leche Flan',          cat: 'Desserts',    price: 125, img: 'leche',   g: '#e6b94a,#a4741c', desc: 'Silky caramel custard, slow-steamed for a smooth finish.' },
    { id: 'buko',    name: 'Fresh Buko Juice',    cat: 'Beverages',   price: 95,  img: 'buko',    g: '#cfe0b0,#7a9a5a', desc: 'Young coconut water with tender strips of buko meat.' },
    { id: 'calamansi',name:'Calamansi Iced Tea',  cat: 'Beverages',   price: 85,  img: 'calamansi',g:'#e8d05a,#a4902c', desc: 'Black tea with fresh calamansi, lightly sweet and cold.' }
  ];

  const OFFERS = [
    { id: 'bundle-handaan', name: 'Handaan Bundle',  tag: 'Meal bundle',   desc: 'Chicken Adobo, Pork Sinigang, Pancit Canton and 4 cups of rice. Feeds 4.', price: 899, was: 1030, hl: true },
    { id: 'bundle-silog',   name: 'Silog Duo',       tag: 'Best seller',   desc: 'Any 2 silog meals with 2 Calamansi Iced Teas.',                           price: 449, was: 515 },
    { id: 'bundle-kapamilya',name:'Kapamilya Feast', tag: 'Filipino combo',desc: 'Kare-Kare, Lechon Kawali, Pancit Palabok and Leche Flan. Feeds 5.',       price: 1199, was: 1350 }
  ];

    const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const peso = n => '₱' + n.toLocaleString('en-PH');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function toast(msg, type = '') {
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.textContent = msg;
    $('#toasts').append(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 2600);
  }

    function dishCard(d) {
    const [c1, c2] = d.g.split(',');
    return `
    <article class="card" data-cat="${esc(d.cat)}">
      <div class="card__img ph" style="--g:linear-gradient(150deg,${c1},${c2})">
        <img src="${IMG[d.img]}" alt="${esc(d.name)}" loading="lazy" onerror="if(!this.dataset.t){this.dataset.t=1;this.src='images/'+this.getAttribute('src')}else{this.remove()}">
      </div>
      <div class="card__body">
        <h3>${esc(d.name)}</h3>
        <p>${esc(d.desc)}</p>
        <div class="card__foot">
          <span class="price">${peso(d.price)}</span>
          <button class="btn btn--primary btn--sm" data-add="${d.id}">Add to order</button>
        </div>
      </div>
    </article>`;
  }

  function renderFeatured() {
    $('#featuredGrid').innerHTML = MENU.filter(d => d.featured).map(dishCard).join('');
  }
  function renderMenu() {
    $('#menuGrid').innerHTML = MENU.map(dishCard).join('');
  }
  function renderOffers() {
    $('#offersGrid').innerHTML = OFFERS.map(o => `
      <article class="offer ${o.hl ? 'offer--hl' : ''}">
        <small>${esc(o.tag)}</small>
        <h3>${esc(o.name)}</h3>
        <p>${esc(o.desc)}</p>
        <div><span class="price">${peso(o.price)}</span><span class="was">${peso(o.was)}</span></div>
        <button class="btn btn--primary btn--sm" data-add="${o.id}">Add bundle</button>
      </article>`).join('');
  }

    const KEY = 'kusina-cart-v1';
  const ALL = [...MENU, ...OFFERS];
  let cart = [];

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY));
      cart = Array.isArray(saved) ? saved.filter(i => ALL.some(p => p.id === i.id) && i.qty > 0) : [];
    } catch { cart = []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch {  }
  }

  function addToCart(id) {
    const p = ALL.find(x => x.id === id);
    if (!p) return;
    const line = cart.find(i => i.id === id);
    line ? line.qty++ : cart.push({ id, qty: 1 });
    save(); renderCart();
    toast(`${p.name} added to your order`);
  }
  function setQty(id, delta) {
    const line = cart.find(i => i.id === id);
    if (!line) return;
    line.qty += delta;
    if (line.qty <= 0) cart = cart.filter(i => i.id !== id);
    save(); renderCart();
  }
  function removeItem(id) { cart = cart.filter(i => i.id !== id); save(); renderCart(); }

  function renderCart() {
    const box = $('#cartItems');
    const count = cart.reduce((n, i) => n + i.qty, 0);
    const total = cart.reduce((n, i) => n + i.qty * ALL.find(p => p.id === i.id).price, 0);

    $('#cartCount').textContent = count;
    $('#cartTotal').textContent = peso(total);
    $('#checkout').disabled = !count;

    if (!count) {
      box.innerHTML = `<div class="cart__empty"><p>Your order is empty.</p><button class="btn btn--ghost btn--sm" data-close-cart>Browse the menu</button></div>`;
      return;
    }
    box.innerHTML = cart.map(i => {
      const p = ALL.find(x => x.id === i.id);
      return `
      <div class="line">
        <h4>${esc(p.name)}</h4><span class="price">${peso(p.price * i.qty)}</span>
        <div class="qty">
          <button data-dec="${i.id}" aria-label="Decrease ${esc(p.name)}">&minus;</button>
          <span>${i.qty}</span>
          <button data-inc="${i.id}" aria-label="Increase ${esc(p.name)}">+</button>
        </div>
        <button class="line__rm" data-rm="${i.id}">Remove</button>
      </div>`;
    }).join('');
  }

  function toggleCart(open) {
    $('#cart').classList.toggle('open', open);
    $('#cart').setAttribute('aria-hidden', String(!open));
    $('#overlay').classList.toggle('show', open);
    document.body.classList.toggle('lock', open);
  }

    function toggleNav(open) {
    $('#navLinks').classList.toggle('open', open);
    $('#burger').setAttribute('aria-expanded', String(open));
  }

    function filterMenu(cat) {
    $$('#filters .chip').forEach(c => c.classList.toggle('is-active', c.dataset.filter === cat));
    $$('#menuGrid .card').forEach(card => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('hide', !show);
      card.classList.remove('in');
      if (show) { void card.offsetWidth; card.classList.add('in'); }
    });
  }

    function validateField(input) {
    const v = input.value.trim();
    let msg = '';
    if (input.name === 'name' && v.length < 2) msg = 'Enter your name.';
    if (input.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Enter a valid email address.';
    if (input.name === 'message' && v.length < 10) msg = 'Write at least 10 characters.';
    const field = input.closest('.field');
    field.classList.toggle('error', !!msg);
    $('small', field).textContent = msg;
    return !msg;
  }

    function initReveal() {
    const targets = $$('.hero__text, .story, .story__img, .values, .form');
    targets.forEach(t => t.classList.add('reveal'));
    if (!('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .15 });
    targets.forEach(t => io.observe(t));
  }

    function init() {
    $('.arch img').src = IMG.hero;
    $('.story__img img').src = IMG.story;
    renderFeatured(); renderMenu(); renderOffers();
    load(); renderCart();
    $('#year').textContent = new Date().getFullYear();
    document.addEventListener('click', e => {
      const t = e.target.closest('button, a');
      if (!t) return;
      if (t.dataset.add) return addToCart(t.dataset.add);
      if (t.dataset.inc) return setQty(t.dataset.inc, 1);
      if (t.dataset.dec) return setQty(t.dataset.dec, -1);
      if (t.dataset.rm) return removeItem(t.dataset.rm);
      if (t.dataset.filter) return filterMenu(t.dataset.filter);
      if (t.id === 'cartOpen' || t.hasAttribute('data-open-cart')) return toggleCart(true);
      if (t.id === 'cartClose' || t.hasAttribute('data-close-cart')) {
        toggleCart(false);
        if (t.hasAttribute('data-close-cart')) $('#menu').scrollIntoView();
        return;
      }
      if (t.id === 'burger') return toggleNav($('#burger').getAttribute('aria-expanded') !== 'true');
      if (t.closest('#navLinks')) toggleNav(false);
    });

    $('#overlay').addEventListener('click', () => toggleCart(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { toggleCart(false); toggleNav(false); } });

    $('#clearCart').addEventListener('click', () => {
      if (!cart.length) return;
      cart = []; save(); renderCart(); toast('Order cleared');
    });
    $('#checkout').addEventListener('click', () => {
      if (!cart.length) return;
      cart = []; save(); renderCart(); toggleCart(false);
      toast('Order placed! We will confirm it shortly.');
    });
    const onScroll = () => $('#nav').classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const form = $('#contactForm');
    $$('input, textarea', form).forEach(el => el.addEventListener('blur', () => validateField(el)));
    form.addEventListener('submit', e => {
      e.preventDefault();
      const ok = $$('input, textarea', form).map(validateField).every(Boolean);
      if (!ok) return toast('Please fix the highlighted fields.', 'err');
      form.reset();
      toast('Message sent. Thank you!');
    });

    initReveal();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
