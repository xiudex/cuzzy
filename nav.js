/* ═══ 9. NAVIGATION ═══ */

const SUBNAVS = {
  home: null,
  finans: null,
  yatirim: null,
  ayarlar: [
    { id: 'profil', label: 'Profil', icon: '' },
    { id: 'gorunum', label: 'Görünüm', icon: '' },
    { id: 'guvenlik', label: 'Güvenlik', icon: '' },
    { id: 'veri', label: 'Veri', icon: '' },
    { id: 'gizlilik', label: 'Gizlilik', icon: '' }
  ]
};

let currentPage = 'home';
let currentSub = null;

/* ── MOBİL MENÜ ÇEKMECESİ ── */
function openNavDrawer() {
  document.querySelectorAll('.nav-drawer-item').forEach(i =>i.classList.toggle('active', i.dataset.nav === currentPage));
  const d = document.getElementById('navDrawer');
  const b = document.getElementById('navDrawerBackdrop');
  const bg = document.getElementById('navBurger');
  if (d) { d.classList.add('open'); d.setAttribute('aria-hidden', 'false'); }
  if (b) b.classList.add('show');
  if (bg) bg.classList.add('open');
}
function closeNavDrawer() {
  const d = document.getElementById('navDrawer');
  const b = document.getElementById('navDrawerBackdrop');
  const bg = document.getElementById('navBurger');
  if (d) { d.classList.remove('open'); d.setAttribute('aria-hidden', 'true'); }
  if (b) b.classList.remove('show');
  if (bg) bg.classList.remove('open');
}
function toggleNavDrawer() {
  const d = document.getElementById('navDrawer');
  if (d && d.classList.contains('open')) closeNavDrawer(); else openNavDrawer();
}

function goTo(page, sub) {
  if (page === 'ayarlar') { var _wn = (function () { var p = document.getElementById('notifPanel'); return !!(p && p.style.display !== 'none'); })(); try { _hideNotifInstant(); } catch (e) {} if (_wn) { try { _instantShow = true; } catch (e) {} } try { document.querySelectorAll('.mbn-item').forEach(function (i) { i.classList.toggle('active', i.dataset.nav === 'ayarlar'); }); } catch (e) {} openSettings(sub); return; }
  try { closeNotifPanel(); } catch (e) {}
  try { closeModal('modalSettings'); } catch (e) {}
  // Plan erişim kontrolü
  const blocked = PLAN_BLOCKED[S.adPlan || 'many'] || [];
  if (blocked.includes(page)) {
    toast('Bu alan seçili paketinde kullanılamaz. Paketi değiştir →', 't-err');
    // Kendisi plan sayfası değilse oraya yönlendir
    if (page !== 'ayarlar') { currentPage = 'ayarlar'; goTo('ayarlar', 'plan'); } return;
  }
  const _prevPage = currentPage;
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) {
    const _NAV = ['home', 'finans', 'takip', 'yatirim', 'ayarlar'];
    const _oi = _NAV.indexOf(_prevPage), _ni = _NAV.indexOf(page);
    target.classList.remove('page-from-left', 'page-from-right');
    target.classList.add('active');
    if (_oi !== -1 && _ni !== -1 && _oi !== _ni) {
      void target.offsetWidth;
      target.classList.add(_ni > _oi ? 'page-from-right' : 'page-from-left');
    }
  }
  document.querySelectorAll('.topnav-item').forEach(i => {
    i.classList.toggle('active', i.dataset.nav === page);
  });
  document.querySelectorAll('.mbn-item').forEach(i => i.classList.toggle('active', i.dataset.nav === page));
  // Aktif pill'i kaydır
  if (typeof updateTopnavPill === 'function') updateTopnavPill();

  const subnavEl = document.getElementById('subnav');
  const layoutEl = document.getElementById('appLayout');
  const subs = SUBNAVS[page];

  if (subs) {
    subnavEl.innerHTML = '<div class="subnav-pill-bg" id="subnavPillBg"></div>' + subs.map((s, i) => `
      <button class="subnav-item ${i === 0 ? 'active' : ''}" data-sub="${s.id}" onclick="setSub('${page}','${s.id}')">${s.label}</button>
    `).join('');
    subnavEl.classList.add('show');
    layoutEl.classList.remove('no-subnav');
    // Plan kısıtlaması yoksa istenen sub, varsa ilk izinli sub
    const planBlocked = PLAN_BLOCKED[S.adPlan || 'many'] || [];
    const defaultSub = sub
      || subs.find(s => !planBlocked.includes(page + '-' + s.id))?.id
      || subs[0].id;
    setSub(page, defaultSub);
  } else {
    subnavEl.classList.remove('show');
    layoutEl.classList.add('no-subnav');
    currentSub = null;
    if (sub) { const _se = document.getElementById(page + '-' + sub); if (_se) setTimeout(() => { const _y = _se.getBoundingClientRect().top + window.pageYOffset - 96; window.scrollTo({ top: Math.max(0, _y), behavior: 'smooth' }); }, 460); }
  }

  // Sayfa değişince ilgili render
  if (page === 'yatirim') {
    if (sub === 'analiz' || (!sub && currentSub === 'analiz')) renderCharts();
    refreshMarketPagesIfNeeded();
  }
  if (page === 'takip') { requestAnimationFrame(function () { requestAnimationFrame(renderCharts); }); }
  // Plan kısıtlamalarını subnav üzerinde güncelle
  applyPlanRestrictions();
}

function setSub(page, sub) {
  // Plan erişim kontrolü
  const blocked = PLAN_BLOCKED[S.adPlan || 'many'] || [];
  if (blocked.includes(page + '-' + sub)) {
    toast('Bu sekme seçili paketinde kullanılamaz. Reklam → Paket\'i değiştir.', 't-err');
    goTo('ayarlar', 'plan');
    return;
  }
  const prevSub = currentSub;
  currentSub = sub;
  document.querySelectorAll('.subnav-item').forEach(i => {
    i.classList.toggle('active', i.dataset.sub === sub);
  });
  if (typeof updateSubnavPill === 'function') updateSubnavPill();

  // Yön: önceki ve yeni sub'ın subnav'daki sırasına göre
  let direction = 'right';
  if (prevSub && SUBNAVS[page]) {
    const ids = SUBNAVS[page].map(s => s.id);
    const prevIdx = ids.indexOf(prevSub);
    const newIdx = ids.indexOf(sub);
    if (prevIdx >= 0 && newIdx >= 0 && newIdx < prevIdx) direction = 'left';
  }

  document.querySelectorAll(`#page-${page} .subpage`).forEach(s => {
    s.classList.remove('active', 'from-right', 'from-left');
  });
  const target = document.getElementById(`${page}-${sub}`);
  if (target) {
    target.classList.add('active', direction === 'left' ? 'from-left' : 'from-right');
  }

  if (page === 'yatirim' && sub === 'analiz') renderCharts();
  if (page === 'takip') { requestAnimationFrame(function(){ requestAnimationFrame(renderCharts); }); }
  if (page === 'yatirim' && sub === 'piyasa') refreshMarketPagesIfNeeded();
}

function updateSubnavPill() {
  const pill = document.getElementById('subnavPillBg');
  if (!pill) return;
  const active = document.querySelector('.subnav-item.active');
  if (!active) { pill.classList.remove('ready'); return; }
  const navRect = active.parentElement.getBoundingClientRect();
  const itemRect = active.getBoundingClientRect();
  const left = itemRect.left - navRect.left;
  const apply = () => {
    pill.style.transform = `translateX(${left}px)`;
    pill.style.width = itemRect.width + 'px';
  };
  if (!pill.classList.contains('ready')) {
    apply();
    requestAnimationFrame(() => pill.classList.add('ready'));
  } else {
    apply();
  }
}

/* ═══ 10. SETTINGS APPLY ═══ */

function applySettings() {
  if (!S.themeReset4) { S.theme = 'light'; S.wallpaper = 'light'; S.themeReset4 = true; try { save(); } catch {} }
  document.documentElement.setAttribute('data-theme', S.theme);
  document.documentElement.setAttribute('data-wallpaper', S.wallpaper);
  document.documentElement.setAttribute('lang', S.language);

  const greetEl = document.getElementById('greetName');
  const setNameEl = document.getElementById('setName');
  const setEmailEl = document.getElementById('setEmail');
  if (greetEl) greetEl.textContent = sanitize(S.profile.name);
  if (setNameEl) setNameEl.value = S.profile.name;
  if (setEmailEl) setEmailEl.value = maskEmail(currentUser?.email || '');
  const _alSel = document.getElementById('autoLogoutSelect');
  if (_alSel) _alSel.value = String(parseInt(S.autoLogout) || 0);

  const setBudget = document.getElementById('setBudget');
  const setBudgetWarn = document.getElementById('setBudgetWarn');
  if (setBudget) setBudget.value = S.monthlyBudget > 0 ? S.monthlyBudget : '';
  if (setBudgetWarn) setBudgetWarn.value = S.budgetWarningThreshold;

  const ni = document.getElementById('notifIncome');
  const ne = document.getElementById('notifExpense');
  const ng = document.getElementById('notifGoals');
  if (ni) ni.checked = S.notifications.income;
  if (ne) ne.checked = S.notifications.expense;
  if (ng) ng.checked = S.notifications.goals;

  // Theme/wallpaper card active states
  document.querySelectorAll('.theme-card').forEach(c => {
    c.classList.toggle('active', c.dataset.themeSet === S.theme);
  });
  document.querySelectorAll('.wallpaper-card').forEach(c => {
    c.classList.toggle('active', c.dataset.wpSet === S.wallpaper);
  });

}

function setTheme(t) {
  if (t === 'grey') t = 'black'; // gri tema kaldırıldı — siyaha düşer
  S.theme = t;
  document.documentElement.setAttribute('data-theme', t);
  S.wallpaper = t;
  document.documentElement.setAttribute('data-wallpaper', t);
  document.querySelectorAll('.theme-card').forEach(c => {
    c.classList.toggle('active', c.dataset.themeSet === t);
  });
  document.querySelectorAll('.wallpaper-card').forEach(c => c.classList.remove('active'));
  save();
}

function openBudgetModal() { showModal('modalBudget'); try { applySettings(); } catch (e) {} }
function openNameChange() {
  showModal('modalChangeName');
  var el = document.getElementById('setName');
  if (el) el.value = (S.profile && S.profile.name) || '';
}
function saveName() {
  try { updateName(); } catch (e) {}
  var pl = document.getElementById('profNameLbl');
  if (pl) pl.textContent = sanitize((S.profile && S.profile.name) || 'Kullanıcı');
  closeModal();
  toast('İsim güncellendi', 't-ok');
}

function openSettings(tab) {
  showModal('modalSettings');
  try { updateSettingsExtra(); } catch (e) {}
  var name = (S.profile && S.profile.name) || 'Kullanıcı';
  var av = document.getElementById('setProfileAv'), nm = document.getElementById('setProfileName'), ml = document.getElementById('setProfileMail');
  if (av) av.textContent = ((name.trim()[0]) || 'K').toUpperCase();
  if (nm) nm.textContent = sanitize(name);
  var pl = document.getElementById('profNameLbl'); if (pl) pl.textContent = sanitize(name);
  if (ml) ml.textContent = maskEmail((typeof currentUser !== 'undefined' && currentUser && currentUser.email) || '');
  document.querySelectorAll('.theme-card').forEach(c => c.classList.toggle('active', c.dataset.themeSet === S.theme));
  document.querySelectorAll('.wallpaper-card').forEach(c => c.classList.toggle('active', c.dataset.wpSet === S.wallpaper));
  setSettingsTab(tab && document.querySelector('#modalSettings .set-panel[data-panel="' + tab + '"]') ? tab : 'profil');
  if (window.innerWidth <= 760) {
    const _sm = document.querySelector('#modalSettings .set-modal');
    if (_sm) _sm.classList.remove('set-detail');
  }
  // Ağır render'ı bir sonraki frame'e ertele — ilk açılış akıcı olsun
  requestAnimationFrame(() => {
    try { if (typeof applySettings === 'function') applySettings(); } catch (e) {}
    try { if (typeof renderKvkkSettings === 'function') renderKvkkSettings(); } catch (e) {}
  });
}

function updateSettingsExtra() {
  var foot = document.getElementById("setExtraFoot");
  var vr = document.getElementById("setVerifyRow");
  var sr = document.getElementById("setSurveyRow");
  var showV = !!(typeof currentUser !== "undefined" && currentUser && currentUser.emailVerified === false);
  var showS = !!(typeof S !== "undefined" && S && S.surveyVersion !== "v3.8.2");
  if (vr) vr.style.display = showV ? "" : "none";
  if (sr) sr.style.display = showS ? "" : "none";
  var _mob = (typeof isMobileView === "function" && isMobileView());
  if (foot) foot.style.display = (_mob && (showV || showS)) ? "" : "none";
}
function moveSidePill() {
  var pill = document.getElementById('setSidePill');
  var act = document.querySelector('#modalSettings .set-side-item.active');
  if (!pill || !act) return;
  pill.style.height = act.offsetHeight + 'px';
  pill.style.transform = 'translateY(' + act.offsetTop + 'px)';
}
function setSettingsTab(id) {
  document.querySelectorAll('#modalSettings .set-side-item').forEach(b => b.classList.toggle('active', b.dataset.set === id));
  document.querySelectorAll('#modalSettings .set-panel').forEach(pn => pn.classList.toggle('active', pn.dataset.panel === id));
  requestAnimationFrame(moveSidePill);
  if (id === 'gizlilik') { try { if (typeof renderKvkkSettings === 'function') renderKvkkSettings(); } catch (e) {} }
  if (window.innerWidth <= 760) {
    const _sm = document.querySelector('#modalSettings .set-modal');
    if (_sm) _sm.classList.add('set-detail');
    const _mn = document.querySelector('#modalSettings .set-main'); if (_mn) _mn.scrollTop = 0;
  }
}

/* Mobil ayarlar: detaydan kategori listesine geri dön */
function settingsBackToList() {
  const _sm = document.querySelector('#modalSettings .set-modal');
  if (_sm) _sm.classList.remove('set-detail');
  const _sd = document.querySelector('#modalSettings .set-side'); if (_sd) _sd.scrollTop = 0;
}

function setWallpaper(w) {
  S.wallpaper = w;
  document.documentElement.setAttribute('data-wallpaper', w);
  document.querySelectorAll('.wallpaper-card').forEach(c => {
    c.classList.toggle('active', c.dataset.wpSet === w);
  });
  save();
}

function updateName() {
  const v = validateString(document.getElementById('setName').value, 30) || 'Kullanıcı';
  S.profile.name = v;
  save();
  applySettings();
}


function saveBudget() {
  S.monthlyBudget = Math.max(0, parseInputAmt(document.getElementById('setBudget').value) || 0);
  S.budgetWarningThreshold = Math.min(100, Math.max(50, toFiniteNumber(document.getElementById('setBudgetWarn').value, 80)));
  if (S.monthlyBudget <= 0) S.budgetAlertSentMonth = '';
  save();
  renderAll();
  toast('Bütçe ayarları kaydedildi', 't-ok');
}

function saveNotifications() {
  S.notifications = {
    income: document.getElementById('notifIncome').checked,
    expense: document.getElementById('notifExpense').checked,
    goals: document.getElementById('notifGoals').checked
  };
  save();
  toast('Bildirim tercihleri kaydedildi', 't-ok');
}

// Theme/wallpaper card click bağla
window.addEventListener('DOMContentLoaded', () => {
  const _np = document.getElementById('notifPanel');
  if (_np && _np.parentElement !== document.body) document.body.appendChild(_np);
  document.querySelectorAll('.theme-card').forEach(c => {
    c.addEventListener('click', () => setTheme(c.dataset.themeSet));
  });
  document.querySelectorAll('.wallpaper-card').forEach(c => {
    c.addEventListener('click', () => setWallpaper(c.dataset.wpSet));
  });
});


/* ═════════════════════════════════════════════════════════════════ */