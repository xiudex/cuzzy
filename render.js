/* ═══ 17. RENDER ALL ═══ */

function getCurrentMonthExpense() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  return S.transactions
    .filter(t => t.type === 'expense')
    .filter(t => {
      const d = new Date(t.date || t.ts);
      return d.getFullYear() === y && d.getMonth() === m;
    })
    .reduce((s, t) => s + t.amount, 0);
}

function getCurrentMonthIncome() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  return S.transactions
    .filter(t => t.type === 'income')
    .filter(t => {
      const d = new Date(t.date || t.ts);
      return d.getFullYear() === y && d.getMonth() === m;
    })
    .reduce((s, t) => s + t.amount, 0);
}

function currentMonthKey() {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}`;
}

function updateBudgetBanner() {
  const banner = document.getElementById('budgetBanner');
  const text = document.getElementById('budgetText');
  const chip = document.getElementById('budgetChip');
  if (!banner) return;

  banner.className = 'summary-budget';
  const limit = S.monthlyBudget;
  if (limit <= 0) {
    text.textContent = 'Bütçe belirlenmedi. Ayarlar > Güvenlik bölümünden ekleyebilirsin.';
    chip.textContent = '—';
    banner.classList.add('show');
    return;
  }

  const exp = getCurrentMonthExpense();
  const usage = (exp / Math.max(limit, 1)) * 100;
  const left = Math.max(0, limit - exp);
  const monthKey = currentMonthKey();
  const threshold = S.budgetWarningThreshold || 80;

  text.textContent = `Bu ay ${fmt(exp)} harcandı · Kalan ${fmt(left)}`;
  chip.textContent = `%${usage.toFixed(0)}`;
  banner.classList.add('show');

  if (usage >= 100) {
    banner.classList.add('danger');
    if (S.budgetAlertSentMonth !== `${monthKey}-d` && S.notifications.expense) {
      toast('Aylık bütçe aşıldı!', 't-err');
      S.budgetAlertSentMonth = `${monthKey}-d`;
      save();
    }
  } else if (usage >= threshold) {
    banner.classList.add('warn');
    if (S.budgetAlertSentMonth !== monthKey && S.notifications.expense) {
      toast(`Bütçe %${usage.toFixed(0)} doldu`, 't-info');
      S.budgetAlertSentMonth = monthKey;
      save();
    }
  }
}

let mRecType = 'income';
function mSetRecType(t) {
  mRecType = t === 'expense' ? 'expense' : 'income';
  const inc = document.getElementById('mRecTypeIncome'), exp = document.getElementById('mRecTypeExpense');
  if (inc) inc.classList.toggle('active', mRecType === 'income');
  if (exp) exp.classList.toggle('active', mRecType === 'expense');
}
function openRecurringModal() {
  mSetRecType('income');
  ['mRecDesc','mRecAmt'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const day = document.getElementById('mRecDay'); if (day) day.value = '1';
  showModal('modalRecurring');
}
function addRecurringQuick() {
  const desc = validateString(document.getElementById('mRecDesc').value, 50);
  const amt = validateAmount(document.getElementById('mRecAmt').value);
  const day = Math.min(31, Math.max(1, parseInt(document.getElementById('mRecDay').value) || 1));
  if (!desc || !amt) return toast('Açıklama ve tutar gerekli', 't-err');
  S.recurring.push({ id: uid(), type: mRecType, desc, amount: amt, day });
  save();
  renderAll();
  closeModal();
  toast('Tekrarlayan eklendi', 't-ok');
}

function openAllTx() {
  const c = document.getElementById('allTxList');
  if (!c) return;
  const all = [...S.transactions].sort((a, b) => b.ts - a.ts);
  c.innerHTML = all.length ? all.map(txItemHTML).join('') : '<div class="empty-state">Henüz işlem yok.</div>';
  showModal('modalAllTx');
}

function onStickyInput(el) {
  S.stickyNote = (el.value || '').slice(0, 2000);
  clearTimeout(window._snTimer);
  window._snTimer = setTimeout(() => { try { save(); } catch (e) {} }, 600);
}

function renderAll() {
  try { renderPanelDate(); } catch (e) {}
  // KPI
  const monthInc = getCurrentMonthIncome();
  const monthExp = getCurrentMonthExpense();
  const totalInc = S.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExp = S.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = totalInc - totalExp;
  const savingRate = monthInc > 0 ? Math.max(0, Math.round(((monthInc - monthExp) / monthInc) * 100)) : 0;
  const _wk = new Date(); _wk.setDate(_wk.getDate() - 6); // son 7 gün (bugün dahil)
  const _wkStr = _wk.getFullYear() + '-' + String(_wk.getMonth() + 1).padStart(2, '0') + '-' + String(_wk.getDate()).padStart(2, '0');
  const weekInc = S.transactions.filter(t => t.type === 'income' && t.date >= _wkStr).reduce((a, t) => a + t.amount, 0);
  const weekExp = S.transactions.filter(t => t.type === 'expense' && t.date >= _wkStr).reduce((a, t) => a + t.amount, 0);

  const setText = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setText('kpiIncome', fmt(monthInc));
  const _acct = document.getElementById('acctSummary');
  if (_acct) _acct.innerHTML =
    '<div class="acct-row"><span>Toplam gelir</span><strong class="pos">'+fmt(totalInc)+'</strong></div>'+
    '<div class="acct-row"><span>Toplam gider</span><strong class="neg">'+fmt(totalExp)+'</strong></div>'+
    '<div class="acct-row"><span>Net</span><strong>'+fmt(balance)+'</strong></div>'+
    '<div class="acct-row"><span>İşlem sayısı</span><strong>'+S.transactions.length+'</strong></div>'+
    '<div class="acct-row"><span>Bu ay net</span><strong>'+fmt(monthInc - monthExp)+'</strong></div>'+
    '<div class="acct-row"><span>Aktif hedef</span><strong>'+((S.goals&&S.goals.length)||0)+'</strong></div>';
  const _sn = document.getElementById('stickyNote');
  if (_sn && document.activeElement !== _sn) _sn.value = S.stickyNote || '';
  setText('kpiExpense', fmt(monthExp));
  setText('kpiWeekIncome', fmt(weekInc));
  setText('kpiWeekExpense', fmt(weekExp));
  setText('kpiBalance', fmt(monthInc - monthExp));
  const _curBal = S.baseBalanceSet ? ((S.baseBalance || 0) + balance) : 0;
  setText('kpiCurrentBalance', fmt(_curBal));
  setText('kpiCurBalTrend', S.transactions.length + ' işlem');
  setText('kpiIncomeTotal', fmt(totalInc));
  setText('kpiExpenseTotal', fmt(totalExp));
  setText('kpiSavingRate', monthInc > 0 ? `%${savingRate}` : '—');

  updateBudgetBanner();

  // Dashboard recent tx (filtreli)
  renderDashRecent();
  if (window.czRefresh) window.czRefresh();

  renderDashboardGoals();
  renderTxList();
  renderRecurring();
  renderDebts();
  renderSubscriptions();
  renderGoals();
  renderNotes();
  renderInvest();
  renderUploadHistory();
  renderRpRecentTx();
  renderRpGoalSummary();
  renderTicker();
  updateDashboardMarkets();
  updateAvatar();
  applyPlanRestrictions();
  updateNotifBadge();
  const _sb = document.getElementById('surveyNavBtn');
  if (_sb) _sb.style.display = S.surveyVersion === 'v3.8.2' ? 'none' : '';
  const _tk = document.getElementById('page-takip');
  if (_tk && _tk.classList.contains('active')) { try { renderCharts(); } catch (e) {} }
  if (_censorOn) applyCensor();
}

/* ═══ Sağ panel widget'ları ═══ */

function renderRpRecentTx() {
  const c = document.getElementById('rpRecentTx');
  if (!c) return;
  const recent = [...S.transactions].sort((a, b) => b.ts - a.ts).slice(0, 3);
  if (!recent.length) {
    c.innerHTML = '<div class="empty-state" style="padding:20px 12px;font-size:0.78rem">Henüz işlem yok</div>';
    return;
  }
  c.innerHTML = recent.map(t => {
    const safeDesc = sanitize(t.desc);
    const sign = t.type === 'income' ? '+' : '-';
    return `<div class="rp-mini-tx">
      <div class="rp-mini-tx-icon ${t.type}">${t.type === 'income' ? '↗' : '↘'}</div>
      <div class="rp-mini-tx-body">
        <div class="rp-mini-tx-name">${safeDesc}</div>
        <div class="rp-mini-tx-date">${new Date(t.date).toLocaleDateString('tr-TR', {day:'2-digit',month:'short'})}</div>
      </div>
      <div class="rp-mini-tx-amt ${t.type}">${sign}${fmt(t.amount)}</div>
    </div>`;
  }).join('');
}

function renderRpGoalSummary() {
  const c = document.getElementById('rpGoalSummary');
  if (!c) return;
  if (!S.goals.length) {
    c.innerHTML = '<div class="empty-state" style="padding:20px 12px;font-size:0.78rem">Hedef yok<br><a onclick="goTo(\'finans\',\'hedefler\');closeModal()" style="color:var(--accent);cursor:pointer;font-size:0.78rem;display:inline-block;margin-top:8px">+ Hedef ekle</a></div>';
    return;
  }
  // En yakın 2 hedef (en yüksek tamamlanma oranı)
  const top = [...S.goals]
    .map(g => ({ ...g, pct: Math.min(100, (g.current / g.target) * 100) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 3);
  c.innerHTML = top.map(g => `
    <div class="rp-goal-item">
      <div class="row-between" style="margin-bottom:4px">
        <span style="font-size:0.78rem;font-weight:600;color:var(--text)">${sanitize(g.name)}</span>
        <span style="font-size:0.72rem;color:var(--accent);font-weight:700">%${Math.round(g.pct)}</span>
      </div>
      <div class="progress" style="height:5px"><div class="progress-fill" style="width:${g.pct}%"></div></div>
    </div>
  `).join('');
}

/* ═══ Üst nav: ticker (takip listesi) ═══ */

function renderTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  if (!S.watchlist || !S.watchlist.length) {
    track.innerHTML = '<span class="ticker-empty">+ Takip ekle</span>';
    return;
  }
  const usd = livePrices.usdtry || 0;
  track.innerHTML = S.watchlist.map((w, i) => {
    let label = w.symbol;
    let value = '—';
    if (w.type === 'forex') {
      const fxKey = (w.symbol === 'USD' ? 'usdtry' : w.symbol === 'EUR' ? 'eurtry' : w.symbol === 'GBP' ? 'gbptry' : w.symbol === 'TRYJPY' ? 'tryjpy' : null);
      const v = fxKey ? livePrices[fxKey] : null;
      if (v) value = '₺' + v.toFixed(w.symbol === 'TRYJPY' ? 3 : 4);
      label = w.symbol === 'TRYJPY' ? 'TRY/JPY' : w.symbol + '/TRY';
    } else if (w.type === 'crypto') {
      const k = KriptoListesi.find(x => x.sembol === w.symbol);
      if (k && livePrices[k.id] && usd) {
        const tryPrice = livePrices[k.id] * usd;
        value = '₺' + tryPrice.toLocaleString('tr-TR', { maximumFractionDigits: tryPrice > 100 ? 0 : 2 });
      }
    } else if (w.type === 'bist') {
      const v = bistPrices[w.symbol];
      if (v) value = '₺' + v.toFixed(2);
    }
    const sep = i < S.watchlist.length - 1 ? '<span class="ticker-divider"></span>' : '';
    return `<span class="ticker-item">
      <span class="ticker-item-symbol">${sanitize(label)}</span>
      <span class="ticker-item-value">${value}</span>
    </span>${sep}`;
  }).join('');
}

function populateWatchlistSymbols() {
  const type = document.getElementById('wlType').value;
  const sel = document.getElementById('wlSymbol');
  const q = (document.getElementById('wlSearch')?.value || '').trim().toLowerCase();
  let items = [];
  if (type === 'forex') {
    items = ['USD','EUR','GBP','TRYJPY'].map(x => ({ value: x, label: x === 'TRYJPY' ? 'TRY/JPY' : x + '/TRY' }));
  } else if (type === 'crypto') {
    items = KriptoListesi.map(k => ({ value: k.sembol, label: k.sembol + ' — ' + k.isim }));
  } else if (type === 'bist') {
    items = BIST100.map(x => ({ value: x, label: x }));
  }
  if (q) items = items.filter(it => it.label.toLowerCase().includes(q) || String(it.value).toLowerCase().includes(q));
  sel.innerHTML = items.length
    ? items.map(it => `<option value="${it.value}">${it.label}</option>`).join('')
    : '<option value="">Sonuç bulunamadı</option>';
}

function addToWatchlist() {
  const type = document.getElementById('wlType').value;
  const symbol = document.getElementById('wlSymbol').value.toUpperCase();
  if (!symbol) return;
  if (S.watchlist.some(w => w.type === type && w.symbol === symbol)) return toast('Zaten listede', 't-info');
  if (S.watchlist.length >= 18) return toast('En fazla 18 takip ekleyebilirsin', 't-err');
  S.watchlist.push({ type, symbol });
  save();
  renderTicker();
  renderWatchlistCurrent();
  toast('Takibe eklendi', 't-ok');
}

function removeFromWatchlist(idx) {
  S.watchlist.splice(idx, 1);
  save();
  renderTicker();
  renderWatchlistCurrent();
}

function renderWatchlistCurrent() {
  const c = document.getElementById('watchlistCurrent');
  const countLabel = document.getElementById('wlCountLabel');
  if (!c) return;
  if (countLabel) countLabel.textContent = `${S.watchlist.length}/18 takip`;

  if (!S.watchlist.length) {
    c.innerHTML = '<div class="empty-state" style="padding:24px 14px;font-size:0.82rem">Henüz takip yok.<br><span style="font-size:0.76rem;color:var(--text-muted);margin-top:6px;display:block">Soldan ekle, listene düşsün.</span></div>';
    return;
  }

  const usd = livePrices.usdtry || 0;
  c.innerHTML = S.watchlist.map((w, i) => {
    const icon = w.type === 'forex' ? '' : w.type === 'crypto' ? '' : '';
    let symbolLabel = w.symbol;
    let metaLabel = '';
    let priceLabel = '—';

    if (w.type === 'forex') {
      symbolLabel = w.symbol === 'TRYJPY' ? 'TRY/JPY' : w.symbol + '/TRY';
      metaLabel = 'Döviz kuru';
      const fxKey = (w.symbol === 'USD' ? 'usdtry' : w.symbol === 'EUR' ? 'eurtry' : w.symbol === 'GBP' ? 'gbptry' : w.symbol === 'TRYJPY' ? 'tryjpy' : null);
      const v = fxKey ? livePrices[fxKey] : null;
      if (v) priceLabel = '₺' + v.toFixed(w.symbol === 'TRYJPY' ? 3 : 4);
    } else if (w.type === 'crypto') {
      const k = KriptoListesi.find(x => x.sembol === w.symbol);
      metaLabel = k ? k.isim : 'Kripto';
      if (k && livePrices[k.id] && usd) {
        const tryPrice = livePrices[k.id] * usd;
        priceLabel = '₺' + tryPrice.toLocaleString('tr-TR', { maximumFractionDigits: tryPrice > 100 ? 0 : 2 });
      }
    } else if (w.type === 'bist') {
      metaLabel = 'BIST hissesi';
      const v = bistPrices[w.symbol];
      if (v) priceLabel = '₺' + v.toFixed(2);
    }

    return `<div class="wl-item">
      <div class="wl-item-icon">${icon}</div>
      <div class="wl-item-body">
        <div class="wl-item-symbol">${sanitize(symbolLabel)}</div>
        <div class="wl-item-meta">${metaLabel}</div>
      </div>
      <div class="wl-item-price">${priceLabel}</div>
      <button class="wl-item-remove" onclick="removeFromWatchlist(${i})" title="Listeden çıkar">✕</button>
    </div>`;
  }).join('');
}

/* ═══ Üst nav: avatar ═══ */

function updateAvatar() {
  const el = document.getElementById('navAvatarText');
  if (!el) return;
  const name = (S.profile?.name || 'K').trim();
  el.textContent = name.charAt(0).toUpperCase();
}

/* ═══ Topnav pill kayma ═══ */

function updateTopnavPill() {
  const pill = document.getElementById('topnavPillBg');
  if (!pill) return;
  const active = document.querySelector('.topnav-item.active');
  if (!active) { pill.classList.remove('ready'); return; }
  pill.style.transform = `translateX(${active.offsetLeft}px)`;
  pill.style.width = active.offsetWidth + 'px';
  // İlk girişte transition'sız konumlandır, sonra hazırla
  if (!pill.classList.contains('ready')) {
    requestAnimationFrame(() => pill.classList.add('ready'));
  }
}

window.addEventListener('resize', () => {
  updateTopnavPill();
  updateSubnavPill();
});

/* ═══ Sayfa yenileme ═══ */

function refreshApp() {
  if (currentUser) {
    // Manuel re-render + manuel canlı veri çekme
    renderAll();
    toast('Yenilendi', 't-ok'); // anında geri bildirim — market verisini beklemez
    if (typeof startLiveMarkets === 'function') {
      // Marketleri arka planda zorla yenile
      Promise.allSettled([fetchForex(), fetchCrypto(), fetchBIST()]).then(() => {
        renderTicker();
        if (typeof updateDashboardMarkets === 'function') updateDashboardMarkets();
      });
    }
  } else {
    location.reload();
  }
}


/* ═════════════════════════════════════════════════════════════════ */

/* ─── Panel basligi tarihi + tutar sansuru ─── */
function renderPanelDate() {
  var el = document.getElementById('panelDate');
  if (el) el.textContent = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' });
}
var _censorOn = false;
function _maskNum(s) { return String(s).replace(/[0-9]/g, '\u2022'); }
function applyCensor() {
  document.querySelectorAll('.kpi-value, .tx-amt, .acct-row strong').forEach(function (el) {
    if (_censorOn) {
      var cur = el.textContent;
      if (cur.indexOf('\u2022') === -1) el.dataset.real = cur;
      el.textContent = _maskNum(el.dataset.real != null ? el.dataset.real : cur);
    } else if (el.dataset.real != null) {
      el.textContent = el.dataset.real; delete el.dataset.real;
    }
  });
}
function toggleTxCensor() {
  _censorOn = !_censorOn;
  document.body.classList.toggle('tx-censored', _censorOn);
  document.querySelectorAll('.pb-eye, .tx-eye-desk').forEach(function (b) { b.classList.toggle('eye-off', _censorOn); b.setAttribute('title', _censorOn ? 'Rakamları göster' : 'Rakamları gizle'); });
  applyCensor();
}
try {
  var _censorMq = window.matchMedia('(max-width: 760px)');
  var _censorMqH = function () { if (_censorOn) { _censorOn = false; document.body.classList.remove('tx-censored'); document.querySelectorAll('.pb-eye, .tx-eye-desk').forEach(function (b) { b.classList.remove('eye-off'); b.setAttribute('title', 'Rakamları gizle'); }); applyCensor(); } };
  if (_censorMq.addEventListener) _censorMq.addEventListener('change', _censorMqH);
  else if (_censorMq.addListener) _censorMq.addListener(_censorMqH);
} catch (e) {}