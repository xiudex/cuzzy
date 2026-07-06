/* ═══ 11. TRANSACTIONS ═══ */

function setTxType(type) {
  currentTxType = type;
  document.getElementById('txTypeIncome').classList.toggle('active', type === 'income');
  document.getElementById('txTypeExpense').classList.toggle('active', type === 'expense');
}

function addTx() {
  const desc = validateString(document.getElementById('txDesc').value, 50);
  const amt = validateAmount(document.getElementById('txAmt').value);
  const cat = document.getElementById('txCat').value;
  const date = validateDate(document.getElementById('txDate').value || todayStr());
  const note = validateString(document.getElementById('txNote').value, 200);

  if (!desc || !amt) return toast('Açıklama ve tutar gerekli', 't-err');

  S.transactions.push({
    id: uid(), type: currentTxType, desc, amount: amt,
    category: cat, date, note, ts: Date.now()
  });
  save();
  notify(
    currentTxType,
    currentTxType === 'income' ? 'Gelir eklendi' : 'Gider eklendi',
    '₺' + amt.toLocaleString('tr-TR') + ' · ' + desc
  );
  toast(currentTxType === 'income' ? '+ Gelir eklendi' : '- Gider eklendi', 't-ok');

  document.getElementById('txDesc').value = '';
  document.getElementById('txAmt').value = '';
  updateNumWordHint(document.getElementById('txAmt'));
  document.getElementById('txNote').value = '';
  renderAll();
}

function quickAdd(type) {
  const amt = validateAmount(document.getElementById('qAmt').value);
  const cat = document.getElementById('qCat')?.value || 'Diğer';
  const desc = validateString(document.getElementById('qDesc').value, 50) || cat;
  if (!amt) return toast('Tutar gerekli', 't-err');
  const dateVal = validateDate(document.getElementById('qDate')?.value || todayStr());
  S.transactions.push({
    id: uid(), type, desc, amount: amt, category: cat,
    date: dateVal, note: 'Hızlı işlem', ts: new Date(dateVal + 'T12:00:00').getTime()
  });
  save();
  notify(type === 'income' ? 'income' : 'expense',
    type === 'income' ? 'Hızlı Gelir eklendi' : 'Hızlı Gider eklendi',
    '₺' + amt.toLocaleString('tr-TR') + ' · ' + desc
  );
  toast('Eklendi', 't-ok');
  document.getElementById('qAmt').value = '';
  updateNumWordHint(document.getElementById('qAmt'));
  document.getElementById('qDesc').value = '';
  const qCatEl = document.getElementById('qCat'); if (qCatEl) qCatEl.value = 'Diğer';
  const qDateEl = document.getElementById('qDate'); if (qDateEl) { qDateEl.value = ''; qDateEl.dispatchEvent(new Event('change', { bubbles: true })); }
  renderAll();
}

function deleteTx(id) {
  const t = S.transactions.find(x => x.id === id);
  S.transactions = S.transactions.filter(t => t.id !== id);
  save();
  if (t) notify(t.type, t.type === 'income' ? 'Gelir silindi' : 'Gider silindi',
                '₺' + Number(t.amount).toLocaleString('tr-TR') + ' · ' + (t.desc || ''));
  renderAll();
}

function setTxFilter(f, btn) {
  txFilter = f;
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  softModalResize(renderTxList);
}

let dashTxType = 'all';
let dashTxRange = 'all';
function setDashTxFilter(f) {
  const sy = window.scrollY;
  dashTxType = f;
  document.querySelectorAll('#dashTxFilters .dtf-btn[data-f]').forEach(b => b.classList.toggle('active', b.dataset.f === f));
  softModalResize(renderDashRecent, document.getElementById('dashRecentTx'));
  window.scrollTo(0, sy);
}
function setDashTxRange(r) {
  const sy = window.scrollY;
  dashTxRange = r;
  document.querySelectorAll('#dashTxFilters .dtf-btn[data-r]').forEach(b => b.classList.toggle('active', b.dataset.r === r));
  softModalResize(renderDashRecent, document.getElementById('dashRecentTx'));
  window.scrollTo(0, sy);
}
function renderDashRecent() {
  const dr = document.getElementById('dashRecentTx');
  if (!dr) return;
  let txs = [...S.transactions];
  if (dashTxType !== 'all') txs = txs.filter(t => t.type === dashTxType);
  if (dashTxRange !== 'all') {
    const now = new Date();
    const from = dashTxRange === 'month'
      ? new Date(now.getFullYear(), now.getMonth(), 1)
      : (() => { const d = new Date(); d.setDate(d.getDate() - 7); return d; })();
    const fromStr = from.getFullYear() + '-' + String(from.getMonth() + 1).padStart(2, '0') + '-' + String(from.getDate()).padStart(2, '0');
    txs = txs.filter(t => t.date >= fromStr);
  }
  txs.sort((a, b) => b.ts - a.ts);
  const recent = txs.slice(0, 8);
  dr.innerHTML = recent.length
    ? recent.map(txItemHTML).join('')
    : '<div class="empty-state">Bu filtreye uygun işlem yok.</div>';
  if (typeof _censorOn !== 'undefined' && _censorOn) { try { applyCensor(); } catch (e) {} }
}

function txItemHTML(t) {
  const safeDesc = sanitize(t.desc);
  const safeCat = sanitize(t.category);
  const dateStr = new Date(t.date).toLocaleDateString('tr-TR');
  const safeId = t.id.replace(/"/g, '&quot;');
  const sign = t.type === 'income' ? '+' : '-';
  return `<div class="tx-item ${t.type}">
    <div class="tx-icon ${t.type}">${t.type === 'income' ? '↗' : '↘'}</div>
    <div class="tx-body">
      <div class="tx-name">${safeDesc}</div>
      <div class="tx-meta">${dateStr} · ${safeCat}</div>
    </div>
    <div class="tx-amt ${t.type}">${sign}${fmt(t.amount)}</div>
    <button class="tx-edit" onclick="showEditTx('${safeId}')" title="Düzenle">✎</button>
    <button class="tx-del" onclick="deleteTx('${safeId}')" title="Sil">✕</button>
  </div>`;
}

function renderTxList() {
  const list = document.getElementById('txList');
  if (!list) return;
  let txs = [...S.transactions];
  if (txFilter !== 'all') txs = txs.filter(t => t.type === txFilter);
  txs.sort((a, b) => b.ts - a.ts);
  if (!txs.length) { list.innerHTML = '<div class="empty-state">İşlem yok</div>'; return; }

  const _td   = todayStr();
  const _ydObj = new Date(); _ydObj.setDate(_ydObj.getDate() - 1);
  const _yd   = _ydObj.getFullYear() + '-' + String(_ydObj.getMonth() + 1).padStart(2, '0') + '-' + String(_ydObj.getDate()).padStart(2, '0');
  const _wkObj = new Date(); _wkObj.setDate(_wkObj.getDate() - 7);
  const _wk   = _wkObj.getFullYear() + '-' + String(_wkObj.getMonth() + 1).padStart(2, '0') + '-' + String(_wkObj.getDate()).padStart(2, '0');
  const _moObj = new Date(); _moObj.setDate(1);
  const _mo   = _moObj.getFullYear() + '-' + String(_moObj.getMonth() + 1).padStart(2, '0') + '-01';

  const getGroup = d => {
    if (d >= _td)  return 'Bugün';
    if (d >= _yd)  return 'Dün';
    if (d >= _wk)  return 'Bu hafta';
    if (d >= _mo)  return 'Bu ay';
    return new Date(d + 'T12:00:00').toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
  };

  let html = '', lastG = null;
  for (const t of txs) {
    const g = getGroup(t.date);
    if (g !== lastG) { html += '<div class="tx-date-header">' + g + '</div>'; lastG = g; }
    html += txItemHTML(t);
  }
  list.innerHTML = html;
  if (typeof _censorOn !== 'undefined' && _censorOn) { try { applyCensor(); } catch (e) {} }
}

/* ═══ 12. RECURRING ═══ */

function setRecType(type) {
  currentRecType = type;
  document.getElementById('recTypeIncome').classList.toggle('active', type === 'income');
  document.getElementById('recTypeExpense').classList.toggle('active', type === 'expense');
}

function addRecurring() {
  const desc = validateString(document.getElementById('recDesc').value, 50);
  const amt = validateAmount(document.getElementById('recAmt').value);
  const day = Math.min(31, Math.max(1, parseInt(document.getElementById('recDay').value) || 1));
  if (!desc || !amt) return toast('Açıklama ve tutar gerekli', 't-err');

  S.recurring.push({ id: uid(), type: currentRecType, desc, amount: amt, day });
  save();
  toast('Tekrarlayan eklendi', 't-ok');
  document.getElementById('recDesc').value = '';
  document.getElementById('recAmt').value = '';
  const _rd = document.getElementById('recDay'); if (_rd) _rd.value = '';
  renderAll();
}

function deleteRecurring(id) {
  S.recurring = S.recurring.filter(r => r.id !== id);
  save();
  renderAll();
}


/* ═══ 11b. İŞLEM DÜZENLEME ═══ */

let _editTxType = 'income';

function setEditTxType(type) {
  _editTxType = type;
  document.getElementById('editTxTypeIncome').classList.toggle('active', type === 'income');
  document.getElementById('editTxTypeExpense').classList.toggle('active', type === 'expense');
  document.getElementById('editTxTypeIncome').classList.toggle('income', type === 'income');
  document.getElementById('editTxTypeExpense').classList.toggle('expense', type === 'expense');
}

function showEditTx(id) {
  const t = S.transactions.find(x => x.id === id);
  if (!t) return toast('İşlem bulunamadı', 't-err');
  _editTxType = t.type;
  document.getElementById('editTxId').value = t.id;
  document.getElementById('editTxDesc').value = t.desc;
  document.getElementById('editTxAmt').value = t.amount;
  document.getElementById('editTxCat').value = t.category || 'Diğer';
  document.getElementById('editTxDate').value = t.date;
  document.getElementById('editTxNote').value = t.note || '';
  setEditTxType(t.type);
  showModal('modalEditTx');
}

function saveEditTx() {
  const id = document.getElementById('editTxId').value;
  const idx = S.transactions.findIndex(x => x.id === id);
  if (idx === -1) return toast('İşlem bulunamadı', 't-err');

  const desc = validateString(document.getElementById('editTxDesc').value, 50);
  const amt  = validateAmount(document.getElementById('editTxAmt').value);
  const cat  = document.getElementById('editTxCat').value;
  const date = validateDate(document.getElementById('editTxDate').value || todayStr());
  const note = validateString(document.getElementById('editTxNote').value, 200);

  if (!desc || !amt) return toast('Açıklama ve tutar gerekli', 't-err');

  S.transactions[idx] = { ...S.transactions[idx], type: _editTxType, desc, amount: amt, category: cat, date, note };
  save();
  closeModal();
  toast('İşlem güncellendi', 't-ok');
  renderAll();
}

/* ═══ 12b. OTOMATİK TEKRARLAYANlar ═══ */

function applyRecurringForMonth() {
  if (!S.recurring.length && !S.subscriptions.length) return;

  const now   = new Date();
  const year  = now.getFullYear();
  const mm    = String(now.getMonth() + 1).padStart(2, '0');
  const today = now.getDate();
  const monthPrefix = year + '-' + mm;

  if (!Array.isArray(S.recurringApplied)) S.recurringApplied = [];

  let added = 0;
  const newKeys = [];

  // — Tekrarlayan işlemler —
  for (const r of S.recurring) {
    const _rLastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    const _rChargeDay = Math.min(r.day, _rLastDay);
    if (_rChargeDay > today) continue;
    const key = monthPrefix + '-r-' + r.id;
    if (S.recurringApplied.includes(key)) continue;
    // Bu ay aynı açıklama+tutar+tür zaten varsa duplicate oluşturma
    const exists = S.transactions.some(t =>t.desc === r.desc && t.amount === r.amount && t.type === r.type && t.date.startsWith(monthPrefix)
    );
    if (!exists) {
      const dateStr = monthPrefix + '-' + String(_rChargeDay).padStart(2, '0');
      S.transactions.push({
        id: uid(), type: r.type, desc: r.desc, amount: r.amount,
        category: r.type === 'income' ? 'Maaş' : 'Fatura',
        date: dateStr, note: 'Otomatik — Tekrarlayan', ts: new Date(dateStr + 'T00:00:00').getTime()
      });
      added++;
    }
    newKeys.push(key);
  }

  // — Abonelikler —
  for (const sub of S.subscriptions) {
    const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
    const chargeDay = Math.min(sub.day, lastDay);
    if (chargeDay > today) continue;
    const key = monthPrefix + '-s-' + sub.id;
    if (S.recurringApplied.includes(key)) continue;
    const exists = S.transactions.some(t =>t.desc === sub.name && t.amount === sub.amount && t.type === 'expense' && t.date.startsWith(monthPrefix)
    );
    if (!exists) {
      const dateStr = monthPrefix + '-' + String(chargeDay).padStart(2, '0');
      S.transactions.push({
        id: uid(), type: 'expense', desc: sub.name, amount: sub.amount,
        category: 'Fatura', date: dateStr, note: 'Otomatik — Abonelik',
        ts: new Date(dateStr + 'T00:00:00').getTime()
      });
      added++;
    }
    newKeys.push(key);
  }

  if (newKeys.length > 0) {
    S.recurringApplied.push(...newKeys);
    save();
    if (added > 0) {
      renderAll();
      notify('general', 'Otomatik işlemler oluşturuldu', added + ' tekrarlayan/abonelik işlemi bu ay için eklendi.');
      toast(added + ' otomatik işlem eklendi', 't-ok');
    }
  }
}

function renderRecurring() {
  const c = document.getElementById('recList');
  if (!c) return;
  if (!S.recurring.length) {
    c.innerHTML = '<div class="empty-state">Yok</div>';
    return;
  }
  c.innerHTML = '<div class="planner-list">' + S.recurring.map(r => {
    const safeDesc = sanitize(r.desc);
    const safeId = r.id.replace(/"/g, '&quot;');
    const color = r.type === 'income' ? 'var(--income)' : 'var(--expense)';
    const sign = r.type === 'income' ? '+' : '-';
    return `<div class="planner-item">
      <div>
        <div class="planner-item-title">${safeDesc}</div>
        <div class="planner-item-meta">Her ayın ${r.day}. günü · ${r.type === 'income' ? 'Gelir' : 'Gider'}</div>
      </div>
      <div>
        <div class="planner-item-amount" style="color:${color}">${sign}${fmt(r.amount)}</div>
        <div class="planner-item-actions">
          <button class="btn btn-sm btn-danger" onclick="deleteRecurring('${safeId}')">Sil</button>
        </div>
      </div>
    </div>`;
  }).join('') + '</div>';
}

/* ═══ 13. DEBTS ═══ */

function addDebt() {
  const name = validateString(document.getElementById('debtName').value, 60);
  const amount = validateAmount(document.getElementById('debtAmt').value);
  const dueDate = validateString(document.getElementById('debtDue').value, 12);
  const type = validateString(document.getElementById('debtType').value, 30) || 'Borç';
  if (!name || !amount) return toast('Başlık ve tutar gerekli', 't-err');
  S.debts.push({ id: uid(), name, amount, dueDate, type, paid: false, ts: Date.now() });
  save();
  notify(type === 'Alacak' ? 'income' : 'expense', type === 'Alacak' ? 'Alacak eklendi' : 'Borç eklendi', '₺' + amount.toLocaleString('tr-TR') + ' · ' + name);
  toast('Borç eklendi', 't-ok');
  document.getElementById('debtName').value = '';
  document.getElementById('debtAmt').value = '';
  updateNumWordHint(document.getElementById('debtAmt'));
  document.getElementById('debtDue').value = '';
  renderAll();
}

function toggleDebtPaid(id) {
  const d = S.debts.find(x => x.id === id);
  if (!d) return;
  d.paid = !d.paid;
  save();
  renderAll();
}

function deleteDebt(id) {
  S.debts = S.debts.filter(d => d.id !== id);
  save();
  renderAll();
  toast('Silindi', 't-ok');
}

function renderDebts() {
  const c = document.getElementById('debtList');
  if (!c) return;
  const debts = [...S.debts].sort((a, b) => Number(a.paid) - Number(b.paid) || a.ts - b.ts);
  if (!debts.length) {
    c.innerHTML = '<div class="empty-state">Borç yok</div>';
    return;
  }
  c.innerHTML = debts.map(d => {
    const safeName = sanitize(d.name);
    const safeType = sanitize(d.type);
    const safeId = d.id.replace(/"/g, '&quot;');
    const due = d.dueDate ? new Date(d.dueDate).toLocaleDateString('tr-TR') : 'Tarih yok';
    return `<div class="planner-item" style="opacity:${d.paid ? '.65' : '1'}">
      <div>
        <div class="planner-item-title">${safeName}</div>
        <div class="planner-item-meta">${safeType} · Son ödeme: ${due}${d.paid ? ' · Ödendi' : ''}</div>
      </div>
      <div>
        <div class="planner-item-amount" style="color:${d.paid ? 'var(--text-muted)' : 'var(--expense)'}">${fmt(d.amount)}</div>
        <div class="planner-item-actions">
          <button class="btn btn-sm" onclick="toggleDebtPaid('${safeId}')">${d.paid ? 'Geri aç' : 'Ödendi'}</button>
          <button class="btn btn-sm btn-danger" onclick="deleteDebt('${safeId}')">Sil</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ═══ 14. SUBSCRIPTIONS ═══ */

function toggleDayPicker(e, inputId, popId) {
  if (e) e.stopPropagation();
  const pop = document.getElementById(popId);
  if (!pop) return;
  document.querySelectorAll('.subday-pop.open').forEach(p => { if (p !== pop) p.classList.remove('open'); });
  if (pop.classList.contains('open')) { pop.classList.remove('open'); return; }
  pop.innerHTML = '';
  for (let d = 1; d <= 31; d++) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = d;
    b.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const inp = document.getElementById(inputId);
      if (inp) inp.value = d;
      pop.classList.remove('open');
    });
    pop.appendChild(b);
  }
  pop.classList.add('open');
}
function toggleSubDayPicker(e) { toggleDayPicker(e, 'subDay', 'subDayPop'); }
document.addEventListener('click', (e) => {
  if (!e.target.closest('.subday-wrap')) document.querySelectorAll('.subday-pop.open').forEach(p => p.classList.remove('open'));
});
// Tutar alanlarına yalnızca rakam ve ayraç (,.) — harf/metin engellenir
document.addEventListener('input', (e) => {
  const el = e.target;
  if (el && el.tagName === 'INPUT' && el.type === 'text' && el.getAttribute('inputmode') === 'numeric') {
    const cleaned = el.value.replace(/[^0-9.,]/g, '');
    if (cleaned !== el.value) {
      const pos = Math.max(0, (el.selectionStart || cleaned.length) - 1);
      el.value = cleaned;
      try { el.setSelectionRange(pos, pos); } catch (_) {}
    }
  }
}, true);

function addSubscription() {
  const name = validateString(document.getElementById('subName').value, 60);
  const amount = validateAmount(document.getElementById('subAmt').value);
  const day = Math.min(31, Math.max(1, parseInt(document.getElementById('subDay').value) || 1));
  if (!name || !amount) return toast('Servis ve tutar gerekli', 't-err');
  S.subscriptions.push({ id: uid(), name, amount, day, ts: Date.now() });
  save();
  toast('Abonelik eklendi', 't-ok');
  document.getElementById('subName').value = '';
  document.getElementById('subAmt').value = '';
  updateNumWordHint(document.getElementById('subAmt'));
  document.getElementById('subDay').value = '';
  renderAll();
}

function deleteSubscription(id) {
  S.subscriptions = S.subscriptions.filter(s => s.id !== id);
  save();
  renderAll();
  toast('Silindi', 't-ok');
}

function renderSubscriptions() {
  const c = document.getElementById('subList');
  if (!c) return;
  const subs = [...S.subscriptions].sort((a, b) => a.day - b.day);
  if (!subs.length) {
    c.innerHTML = '<div class="empty-state">Abonelik yok</div>';
    return;
  }
  c.innerHTML = subs.map(s => {
    const safeName = sanitize(s.name);
    const safeId = s.id.replace(/"/g, '&quot;');
    return `<div class="planner-item">
      <div>
        <div class="planner-item-title">${safeName}</div>
        <div class="planner-item-meta">Her ayın ${s.day}. günü yenilenir</div>
      </div>
      <div>
        <div class="planner-item-amount" style="color:var(--warning)">${fmt(s.amount)}</div>
        <div class="planner-item-actions">
          <button class="btn btn-sm btn-danger" onclick="deleteSubscription('${safeId}')">Sil</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ═══ 15. GOALS ═══ */

function addGoal() {
  const name = validateString(document.getElementById('goalName').value, 50);
  const target = validateAmount(document.getElementById('goalTarget').value);
  const current = Math.max(0, parseInputAmt(document.getElementById('goalCurrent').value) || 0);
  const date = validateString(document.getElementById('goalDate').value, 12);
  if (!name || !target) return toast('İsim ve hedef tutarı gerekli', 't-err');
  S.goals.push({ id: uid(), name, target, current, date });
  save();
  notify('goals', 'Hedef eklendi', name + ' · ₺' + target.toLocaleString('tr-TR'));
  closeModal();
  document.getElementById('goalName').value = '';
  document.getElementById('goalTarget').value = '';
  updateNumWordHint(document.getElementById('goalTarget'));
  document.getElementById('goalCurrent').value = '0';
  updateNumWordHint(document.getElementById('goalCurrent'));
  toast('Hedef eklendi', 't-ok');
  renderAll();
}

function addToGoal(id) {
  const amount = prompt('Eklenecek tutar (₺):');
  const v = validateAmount(amount);
  if (!v) return;
  const g = S.goals.find(x => x.id === id);
  if (g) {
    g.current = (g.current || 0) + v;
    save();
    renderAll();
    if (g.current >= g.target) toast(' Hedefe ulaştın!', 't-ok');
    else toast('Eklendi', 't-ok');
  }
}

function deleteGoal(id) {
  showConfirm({
    title: 'Hedefi sil',
    msg: 'Bu hedef kalıcı olarak silinecek. Emin misin?',
    danger: true,
    onOk: () => {
      S.goals = S.goals.filter(g => g.id !== id);
      save(); renderAll(); toast('Silindi', 't-ok');
    }
  });
}

function renderGoals() {
  const c = document.getElementById('goalList');
  if (!c) return;
  if (!S.goals.length) {
    c.innerHTML = '<div class="card"><div class="empty-state">Henüz hedef yok</div></div>';
    return;
  }
  c.innerHTML = S.goals.map(g => {
    const safeName = sanitize(g.name);
    const safeId = g.id.replace(/"/g, '&quot;');
    const pct = Math.min(100, Math.round((g.current / g.target) * 100));
    const remaining = Math.max(0, g.target - g.current);
    const fillClass = pct >= 100 ? '' : pct >= 70 ? '' : pct >= 30 ? 'warning' : 'danger';
    return `<div class="card">
      <div class="row-between" style="margin-bottom:10px">
        <div>
          <div style="font-size:1rem;font-weight:700"> ${safeName}</div>
          <div style="font-size:0.74rem;color:var(--text-muted);margin-top:2px">Kalan: ${fmt(remaining)}</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:'JetBrains Mono';font-size:0.85rem;font-weight:700">${fmt(g.current)} / ${fmt(g.target)}</div>
          <div style="font-size:0.78rem;color:var(--accent);font-weight:700">%${pct}</div>
        </div>
      </div>
      <div class="progress"><div class="progress-fill ${fillClass}" style="width:${pct}%"></div></div>
      <div class="row-flex" style="margin-top:12px">
        <button class="btn btn-sm" style="flex:1" onclick="addToGoal('${safeId}')">+ Para ekle</button>
        <button class="btn btn-sm btn-danger" onclick="deleteGoal('${safeId}')">Sil</button>
      </div>
    </div>`;
  }).join('');
}

function renderDashboardGoals() {
  const c = document.getElementById('dashGoals');
  if (!c) return;
  if (!S.goals.length) {
    c.innerHTML = '<div class="empty-state">Henüz hedef yok</div>';
    return;
  }
  const top3 = S.goals.slice(0, 3);
  c.innerHTML = top3.map(g => {
    const pct = Math.min(100, Math.round((g.current / g.target) * 100));
    return `<div style="padding:10px 0;border-bottom:1px solid var(--glass-border)">
      <div class="row-between" style="margin-bottom:6px">
        <span style="font-size:0.84rem;font-weight:600">${sanitize(g.name)}</span>
        <span style="font-size:0.78rem;color:var(--accent);font-weight:700">%${pct}</span>
      </div>
      <div class="progress"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

/* ═══ 16. NOTES ═══ */

function addNote() {
  const t = validateString(document.getElementById('noteTitle').value, 200);
  if (!t) return toast('Not başlığı girin', 't-err');
  S.notes.push({ id: uid(), title: t, date: todayStr() });
  save();
  document.getElementById('noteTitle').value = '';
  renderNotes();
  toast('Not eklendi', 't-ok');
}

function deleteNote(id) {
  S.notes = S.notes.filter(n => n.id !== id);
  save();
  renderNotes();
  toast('Silindi', 't-ok');
}

function renderNotes() {
  const c = document.getElementById('noteList');
  if (!c) return;
  if (!S.notes.length) {
    c.innerHTML = '<div class="empty-state">Not yok</div>';
    return;
  }
  c.innerHTML = S.notes.map(n => {
    const safeTitle = sanitize(n.title);
    const safeId = n.id.replace(/"/g, '&quot;');
    return `<div class="note-item">
      <div>
        <div class="note-title-text"> ${safeTitle}</div>
        <div class="note-date">${n.date}</div>
      </div>
      <button class="btn btn-sm btn-ghost" onclick="deleteNote('${safeId}')">✕</button>
    </div>`;
  }).join('');
}

function openBalanceModal() {
  const inp = document.getElementById('baseBalanceInput');
  if (inp) {
    const _net = S.transactions.reduce((a, t) => a + (t.type === 'income' ? t.amount : -t.amount), 0);
    const _cur = S.baseBalanceSet ? ((S.baseBalance || 0) + _net) : 0;
    inp.value = _cur ? _cur.toLocaleString('tr-TR') : '';
    updateNumWordHint(inp);
  }
  showModal('modalBalance');
}

function saveBaseBalance() {
  const v = parseInputAmt(document.getElementById('baseBalanceInput').value);
  const x = (isNaN(v) || v < 0) ? 0 : v;
  const _net = S.transactions.reduce((a, t) => a + (t.type === 'income' ? t.amount : -t.amount), 0);
  S.baseBalance = x - _net;
  S.baseBalanceSet = true;
  saveNow(); // kritik: debounce yok, anında Firestore'a yaz (yenileme ile kaybolmasın)
  renderAll();
  closeModal();
  toast('Mevcut bakiye güncellendi', 't-ok');
}