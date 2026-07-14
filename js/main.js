/* ===== COLORIFICIO GROSSICH · main.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  function closeIntro() { if (intro) { intro.classList.add('done'); setTimeout(function () { intro.style.display = 'none'; }, 750); } }
  if (intro) { if (reduce) intro.style.display = 'none'; else { document.getElementById('intro-skip').addEventListener('click', closeIntro); setTimeout(closeIntro, 2700); } }

  var header = document.getElementById('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }); });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    setTimeout(function () { reveals.forEach(function (r) { if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('in'); }); }, 1500);
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  // hours: Mon–Fri 9–13 & 14:30–19, Sat 9:30–13 & 15–19, Sun closed
  var TABLE = { 1: [[9, 13], [14.5, 19]], 2: [[9, 13], [14.5, 19]], 3: [[9, 13], [14.5, 19]], 4: [[9, 13], [14.5, 19]], 5: [[9, 13], [14.5, 19]], 6: [[9.5, 13], [15, 19]] };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function fmt(h) { var H = Math.floor(h), M = Math.round((h - H) * 60); return H + ':' + (M >= 30 ? '30' : '00'); }
  function romeNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' })); }
  function openClose(d) { var w = TABLE[d.getDay()] || [], h = d.getHours() + d.getMinutes() / 60; for (var i = 0; i < w.length; i++) if (h >= w[i][0] && h < w[i][1]) return w[i][1]; return null; }
  function updateLive() {
    var d = romeNow(), close = openClose(d), dot = document.getElementById('live-dot'), txt = document.getElementById('live-text');
    if (!dot) return; var en = LANG === 'en', day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    if (close !== null) { dot.className = 'open'; txt.textContent = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + fmt(close); return; }
    dot.className = 'closed'; var info = null, w = TABLE[day] || [];
    for (var i = 0; i < w.length; i++) if (h < w[i][0]) { info = { d: day, t: w[i][0], off: 0 }; break; }
    if (!info) for (var k = 1; k <= 7; k++) { var nd = (day + k) % 7; if (TABLE[nd]) { info = { d: nd, t: TABLE[nd][0][0], off: k }; break; } }
    var name = info.off === 0 ? (en ? 'today' : 'oggi') : (en ? DAYS_EN[info.d] : DAYS_IT[info.d]);
    txt.textContent = (en ? 'Closed · opens ' + name + ' at ' : 'Chiuso · apre ' + name + ' alle ') + fmt(info.t);
  }

  var LANG = 'it';
  var EN = {
    'intro.skip': 'Enter →', 'brand.sub': 'Fine Arts · since 1990',
    'nav.bottega': 'The shop', 'nav.reparti': 'Departments', 'nav.consiglio': 'The advice', 'nav.dove': 'Find us', 'cta.wa': 'WhatsApp',
    'hero.kicker': '// Fine Arts · Drawing · Graphics · since 1990',
    'hero.title': "An artist's<br>paradise.",
    'hero.sub': "Since 1990, on Via Averardo Buschi, Giuseppe keeps a little shop filled to the ceiling: paints, brushes, canvas, paper and drawing supplies from the best brands. Small in size, immense in range — and in advice.",
    'hero.cta1': 'Order on WhatsApp', 'hero.cta2': 'What you\'ll find', 'hero.live': 'Checking hours…', 'hero.f2': '★ 4.6 · 164 reviews',
    'bottega.kicker': '// The shop · since 1990', 'bottega.h2': 'Thirty-four years<br>beside the artists.',
    'bottega.p1': "Colorificio Grossich is <b>Giuseppe Comerio</b>'s shop: since 1990, on the corner of Via Buschi and Via Grossich, a true <em>paradise for artists</em>. A vast range of the best brands for fine arts, technical and artistic drawing, graphics and painting.",
    'bottega.p2': "Not a superstore, but a neighbourhood shop where everything has its place — and where years of experience with products and techniques become the right advice at the right moment.",
    'reparti.kicker': '// Departments', 'reparti.h2': 'Everything to create.',
    'r.1t': 'Colours', 'r.1p': 'Oils, acrylics, watercolours, gouache, pure pigments and ecological natural paints.',
    'r.2t': 'Drawing', 'r.2p': 'Pencils, pastels, charcoal, inks, and everything for sketching and illustration.',
    'r.3t': 'Graphics &amp; technical', 'r.3p': 'Materials for graphic design, technical drawing, school and creative hobbies.',
    'r.4t': 'Canvas, paper &amp; supports', 'r.4p': 'Canvas, sketch and watercolour paper, easels, frames and modelling materials.',
    'reparti.note': "The best brands in the field. Can't find something? It's ordered and prepared for you.",
    'consiglio.kicker': '// The right advice', 'consiglio.h2': 'A shop where they actually know the answer.',
    'consiglio.p1': "The difference of a real shop is who stands behind the counter. Here the owner is patient with customers' thousand questions and knows how to recommend the most suitable purchase — whether you're a professional or a beginner.",
    'consiglio.cta1': 'Ask for advice', 'consiglio.cta2': 'Order &amp; pick up',
    'rev.kicker': '// The voices', 'rev.h2': '4.6 ★ · 164 reviews',
    'dove.kicker': '// Find us', 'dove.h2': 'In Lambrate,<br>steps from the metro.',
    'dove.addr': 'Address', 'dove.addr2': '(corner of Via Grossich)', 'dove.hours': 'Hours', 'dove.hoursv': 'Mon–Fri 9–13 & 14:30–19 · Sat 9:30–13 & 15–19 · Sun closed', 'dove.phone': 'Phone', 'dove.metro': 'Metro', 'dove.metrov': 'MM2 Lambrate, a few minutes on foot', 'dove.route': 'Get directions', 'dove.call': 'Call',
    'faq.h2': 'Frequently asked',
    'faq.q1': 'Where is Colorificio Grossich?', 'faq.a1': 'At Via Averardo Buschi 20, on the corner of Via Grossich, in Lambrate (Milan), near MM2 Lambrate.',
    'faq.q2': 'When are you open?', 'faq.a2': 'Monday to Friday 9–13 and 14:30–19, Saturday 9:30–13 and 15–19. Closed Sunday.',
    'faq.q3': 'What do you sell?', 'faq.a3': 'Supplies for fine arts, drawing, graphics and painting from the best brands: oils, acrylics, watercolours, pigments, brushes, pastels, pencils, canvas, paper, easels and more, including ecological natural paints.',
    'faq.q4': 'Can I order without coming in?', 'faq.a4': 'Yes: you can order on WhatsApp at 328 034 0337 and pick up in the shop. For info, call 02 2361543.',
    'foot.sub': 'Fine Arts · Lambrate · Milan · since 1990', 'foot.where': 'Where', 'foot.hours': 'Hours', 'foot.hours2': 'Sat 9:30–13 / 15–19 · Sun closed', 'foot.contact': 'Contact',
    'foot.disclaimer': 'Demo website. Some product/environment images are editorial (AI-generated) placeholders for illustration; content and data gathered from public sources. Hours, range and prices are indicative, to be confirmed in the shop.',
    'ab.call': 'Call', 'ab.wa': 'WhatsApp', 'ab.route': 'Directions'
  };
  var IT = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { IT[el.getAttribute('data-i18n')] = el.innerHTML; });
  function setLang(lang) {
    LANG = lang; var dict = lang === 'en' ? EN : IT;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'), v = dict[k]; if (v == null && lang === 'en') v = IT[k]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  updateLive(); setInterval(updateLive, 60000);
})();
