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

/* ── MOBİL HIZLI İŞLEM (+) MENÜSÜ ── */
function openQuickMenu() {
  const fab = document.getElementById('qmFab');
  const bg = document.getElementById('qmBackdrop');
  const sheet = document.getElementById('qmSheet');
  const hint = document.getElementById('qmHint');
  if (fab) { fab.classList.add('qm-hidden'); fab.setAttribute('aria-expanded', 'true'); }
  if (bg) bg.classList.add('show');
  if (sheet) sheet.classList.add('show');
  if (hint) hint.classList.add('show');
}
function closeQuickMenu() {
  const fab = document.getElementById('qmFab');
  const bg = document.getElementById('qmBackdrop');
  const sheet = document.getElementById('qmSheet');
  const hint = document.getElementById('qmHint');
  if (fab) { fab.classList.remove('qm-hidden'); fab.setAttribute('aria-expanded', 'false'); }
  if (bg) bg.classList.remove('show');
  if (sheet) sheet.classList.remove('show');
  if (hint) hint.classList.remove('show');
}
function toggleQuickMenu() {
  try { haptic('tap'); } catch (e) {}
  const sheet = document.getElementById('qmSheet');
  if (sheet && sheet.classList.contains('show')) closeQuickMenu(); else openQuickMenu();
}
function qmAction(fn) {
  try { haptic('tap'); } catch (e) {}
  closeQuickMenu();
  try { if (typeof fn === 'function') fn(); } catch (e) {}
}
function qmOpenQuickAdd() {
  _setupMobilePanel();
  var _d = document.getElementById('qmqaDate');
  if (_d && !_d.value) _d.value = todayStr();
  showModal('modalQuickAdd');
}
try {
  var _qmMq = window.matchMedia('(max-width: 760px)');
  var _qmMqH = function (e) { if (!e.matches) { try { closeQuickMenu(); } catch (x) {} } };
  if (_qmMq.addEventListener) _qmMq.addEventListener('change', _qmMqH);
  else if (_qmMq.addListener) _qmMq.addListener(_qmMqH);
} catch (e) {}

/* ── Alt navbar: basılı tut + sürükle + bıraktığın sekmeyi aç ── */
(function () {
  var _mbnNav = document.getElementById('mobileBottomNav');
  var _mbnPill = document.getElementById('mbnPillBg');
  if (!_mbnNav || !_mbnPill) return;
  var _mbnDragging = false, _mbnMoved = false, _mbnStartX = 0, _mbnStartY = 0;

  function _mbnItems() { return Array.prototype.slice.call(_mbnNav.querySelectorAll('.mbn-item')); }

  function _mbnItemAt(clientX) {
    var items = _mbnItems();
    if (!items.length) return null;
    var first = items[0].getBoundingClientRect();
    var last = items[items.length - 1].getBoundingClientRect();
    var x = Math.max(first.left, Math.min(last.right - 1, clientX));
    for (var i = 0; i < items.length; i++) {
      var r = items[i].getBoundingClientRect();
      if (x >= r.left && x < r.right) return items[i];
    }
    return items[items.length - 1];
  }

  function _mbnFreeFollow(clientX) {
    var items = _mbnItems();
    if (!items.length) return;
    var navRect = _mbnNav.getBoundingClientRect();
    var w = items[0].getBoundingClientRect().width;
    var relX = clientX - navRect.left - w / 2;
    relX = Math.max(4, Math.min(relX, navRect.width - w - 4));
    _mbnPill.style.transform = 'translateX(' + relX + 'px)';
    _mbnPill.style.width = w + 'px';
  }

  function _mbnOnMove(e) {
    if (!_mbnDragging) return;
    var dx = Math.abs(e.clientX - _mbnStartX), dy = Math.abs(e.clientY - _mbnStartY);
    if (!_mbnMoved && (dx > 10 || dy > 10)) { _mbnMoved = true; _mbnPill.classList.add('dragging'); }
    if (_mbnMoved) { e.preventDefault(); _mbnFreeFollow(e.clientX); }
  }

  function _mbnOnUp(e) {
    if (!_mbnDragging) return;
    _mbnDragging = false;
    _mbnPill.classList.remove('dragging');
    document.removeEventListener('pointermove', _mbnOnMove);
    document.removeEventListener('pointerup', _mbnOnUp);
    document.removeEventListener('pointercancel', _mbnOnUp);
    if (_mbnMoved) {
      var it = _mbnItemAt(e.clientX);
      if (it) it.click();
    }
    _mbnMoved = false;
  }

  _mbnNav.addEventListener('pointerdown', function (e) {
    if (!e.target.closest('.mbn-item')) return;
    _mbnDragging = true; _mbnMoved = false;
    _mbnStartX = e.clientX; _mbnStartY = e.clientY;
    document.addEventListener('pointermove', _mbnOnMove, { passive: false });
    document.addEventListener('pointerup', _mbnOnUp);
    document.addEventListener('pointercancel', _mbnOnUp);
  });
})();

function goTo(page, sub) {
  try { haptic('tap'); } catch (e) {}
  if (page === 'ayarlar') { try { _hideNotifInstant(); } catch (e) {} try { if (isMobileView()) _instantShow = true; } catch (e) {} try { document.querySelectorAll('.mbn-item').forEach(function (i) { i.classList.toggle('active', i.dataset.nav === 'ayarlar'); }); } catch (e) {} try { const _fab = document.getElementById('qmFab'); if (_fab) _fab.style.display = 'none'; } catch (e) {} openSettings(sub); requestAnimationFrame(function () { try { if (typeof updateMbnPill === 'function') updateMbnPill(); } catch (e) {} }); return; }
  try { closeNotifPanel(); } catch (e) {}
  try { _hideModalInstant('modalSettings'); } catch (e) {}
  try { closeQuickMenu(); } catch (e) {}
  try {
    const _fab = document.getElementById('qmFab');
    if (_fab) _fab.style.display = (page === 'home') ? '' : 'none';
  } catch (e) {}
  // Plan erişim kontrolü
  const blocked = PLAN_BLOCKED[S.adPlan || 'many'] || [];
  if (blocked.includes(page)) {
    toast(t('toast_field_not_in_plan'), 't-err');
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
  requestAnimationFrame(function () {
    if (typeof updateMbnPill === 'function') updateMbnPill();
    if (typeof updateTopnavPill === 'function') updateTopnavPill();
  });

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
    toast(t('toast_tab_not_in_plan'), 't-err');
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

const I18N = {
  tr: {
    set_title: 'Ayarlar', set_profil: 'Profil', set_gorunum: 'Görünüm', set_guvenlik: 'Güvenlik ve veri',
    set_disaaktar: 'Dışa aktar', set_dil: 'Dil', set_gizlilik: 'Gizlilik', set_destek: 'Destek',
    home_eyebrow: 'Bugün', home_greeting: 'Merhaba, ', home_sub: 'Bu ay finansal durumun bir bakışta.',
    home_kpi_month_income: 'Bu ay gelir', home_kpi_month_expense: 'Bu ay gider',
    home_kpi_week_income: 'Haftalık gelir', home_kpi_week_expense: 'Haftalık gider',
    home_budget_label: 'Aylık bütçe', home_budget_used: 'kullanılan',
    home_quickadd_title: 'Hızlı işlem', home_goals_title: 'Hedefler', common_add: '+ Ekle', common_manage: 'Yönet →',
    home_account_title: 'Hesap özeti', common_cat_dist: 'Kategori dağılımı', common_note: 'Not',
    home_recurring_title: 'Tekrarlayan & Borç', home_recurring_desc: 'Düzenli ödemeleri ve borçlarını yönet.', home_recurring_btn: '+ Tekrarlayan ekle',
    home_multi_title: 'Çoklu işlem', home_multi_desc: 'Birden çok işlemi tek seferde ekle.',
    home_market_title: 'Canlı piyasa', common_watch: 'Takip', common_detail: 'Detay →',
    home_recent_title: 'Son hareketler', common_see_all: 'Tümünü gör →',
    qm_tx: 'İşlem ekle', qm_recurring: 'Tekrarlayan gelir gider', qm_debt: 'Borç / taksit', qm_sub: 'Abonelikler', qm_note: 'Not ekle',
    common_view: 'Görüntüle', common_title_label: 'Başlık',
    debt_type_card: 'Kredi Kartı', debt_type_installment: 'Taksit', debt_type_loan: 'Kredi', debt_type_debt: 'Borç',
    debt_due_date: 'Son ödeme', debt_installment_count: 'Taksit sayısı', debt_add_btn: 'Borç ekle',
    sub_service: 'Servis', sub_renew_day: 'Yenilenme günü', sub_add_btn: 'Abonelik ekle',
    goal_name: 'Hedef adı', goal_target: 'Hedef fiyatı (₺)', goal_current: 'Mevcut bakiye (₺)', goal_add_btn: 'Hedef ekle',
    rec_title: 'Tekrarlayan ekle', common_income_btn: '+ Gelir', common_expense_btn: '− Gider', common_desc: 'Açıklama',
    rec_day_of_month: 'Her ayın kaçında?', rec_duration: 'Kaç ay sürecek?',
    rec_add_income: '+ Gelir ekle', rec_add_expense: '− Gider ekle',
    rec_indefinite: 'Süresiz', rec_custom_duration: 'Kendim belirleyeceğim', rec_month_count_placeholder: 'Ay sayısı (1-99)',
    common_saved: 'Kaydedildi', note_placeholder: 'Kısa bir not bırak…',
    atx_title: 'Tüm hareketler', common_all: 'Tümü', common_income: 'Gelir', common_expense: 'Gider',
    atx_all_time: 'Tüm zamanlar', atx_this_month: 'Bu ay', atx_last_7: 'Son 7 gün',
    atx_start_date: 'Başlangıç', atx_end_date: 'Bitiş',
    cat_other: 'Diğer', cat_market: 'Market', cat_bill: 'Fatura', cat_rent: 'Kira', cat_transport: 'Ulaşım',
    cat_food: 'Yemek', cat_health: 'Sağlık', cat_entertainment: 'Eğlence', cat_education: 'Eğitim',
    cat_salary: 'Maaş', cat_investment: 'Yatırım', cat_eft_send: 'EFT - Para Gönderimi', cat_eft_receive: 'EFT - Para Alımı',
    cat_eft_send_short: 'EFT gönder', cat_eft_receive_short: 'EFT al',
    edittx_title: 'İşlemi düzenle', edittx_income: '↗ Gelir', edittx_expense: '↘ Gider',
    common_amount: 'Tutar (₺)', common_category: 'Kategori', common_date: 'Tarih',
    edittx_note_optional: 'Not (opsiyonel)', common_save: 'Kaydet',
    fin_tx_add_title: 'İşlem ekle', common_history: 'Geçmiş', common_active: 'Aktif', common_list: 'Liste',
    fin_statement_title: 'Ekstre yükle', fin_new_btn: '+ Yeni', common_add_btn: 'Ekle',
    toast_goal_reached: ' Hedefe ulaştın!', toast_sub_added: 'Abonelik eklendi',
        toast_survey_sent: 'Anketin gönderildi, teşekkürler! ', toast_budget_exceeded: 'Aylık bütçe aşıldı!',
        toast_desc_min10: 'Açıklama en az 10 karakter olmalı', toast_desc_amount_required: 'Açıklama ve tutar gerekli',
        toast_title_amount_required: 'Başlık ve tutar gerekli', toast_debt_added: 'Borç eklendi',
        toast_field_not_in_plan: 'Bu alan seçili paketinde kullanılamaz. Paketi değiştir →', toast_email_in_use: 'Bu e-posta zaten kullanımda',
        toast_already_current_email: 'Bu zaten mevcut e-postanız', toast_budget_saved: 'Bütçe ayarları kaydedildi',
        toast_csv_downloaded: 'CSV indirildi', toast_pick_score: 'Devam etmek için bir puan seç (1-10)',
        toast_file_max_5mb: 'Dosya 5MB altında olmalı', toast_filename_too_long: 'Dosya adı çok uzun (max 100 karakter)',
        toast_file_processing: 'Dosya işleniyor...', toast_file_read_error: 'Dosya okunamadı: ',
        toast_no_tx_in_file: 'Dosyada işlem bulunamadı', toast_verify_link_sent_new: 'Doğrulama bağlantısı yeni adrese gönderildi',
        toast_verify_email_sent: 'Doğrulama e-postası gönderildi. Gelen kutunu (ve spam) kontrol et.', toast_email_verified: 'E-posta doğrulandı',
        toast_email_updated: 'E-posta güncellendi', toast_opening_mail: 'E-posta uygulaması açılıyor…',
        toast_email_already_verified: 'E-postan zaten doğrulanmış', common_added: 'Eklendi',
        toast_no_tx_to_add: 'Eklenecek işlem yok', toast_pick_amount_col: 'En az bir tutar sütunu seçin',
        toast_max_18_watch: 'En fazla 18 takip ekleyebilirsin', toast_excel_lib_missing: 'Excel kütüphanesi yüklenmedi',
        toast_mapping_updated: 'Eşleme güncellendi', toast_valid_email: 'Geçerli bir e-posta girin',
        toast_invalid_code: 'Geçersiz Cüzzy kodu', toast_invalid_email: 'Geçersiz e-posta',
        toast_auto_logout: 'Hareketsizlik nedeniyle güvenli çıkış yapıldı', common_error_prefix: 'Hata: ',
        toast_goal_added: 'Hedef eklendi', toast_account_deleted: 'Hesap silindi',
        toast_no_tx_read: 'Hiçbir işlem okunamadı. Sütun eşlemesini kontrol edin.', toast_json_downloaded: 'JSON yedek indirildi',
        toast_code_gen_failed: 'Kod oluşturulamadı', toast_subject_required: 'Konu alanı boş bırakılamaz',
        common_copied: 'Kopyalandı', toast_answer_one: 'Lütfen en az bir soruyu yanıtla',
        toast_message_sent: 'Mesajın iletildi, teşekkürler! ', toast_balance_updated: 'Mevcut bakiye güncellendi',
        toast_current_pw_wrong: 'Mevcut şifre yanlış', toast_enter_current_pw: 'Mevcut şifrenizi girin',
        toast_note_title_required: 'Not başlığı girin', toast_note_added: 'Not eklendi',
        toast_session_not_found: 'Oturum bulunamadı', toast_pdf_downloaded: 'PDF indirildi',
        toast_pdf_lib_missing: 'PDF kütüphanesi yok', toast_pdf_lib_not_loaded: 'PDF kütüphanesi yüklenmedi',
        toast_plan_updated: 'Paket güncellendi', toast_password_min4: 'Parola en az 4 karakter olmalı',
        toast_enter_password: 'Parolayı gir', toast_file_types: 'Sadece CSV, TXT, Excel veya PDF dosyaları kabul edilir',
        toast_service_amount_required: 'Servis ve tutar gerekli', common_deleted: 'Silindi',
        toast_added_to_watch: 'Takibe eklendi', toast_tour_no_mobile: 'Tanıtım turu mobilde kullanılamaz',
        toast_recurring_added: 'Tekrarlayan eklendi', toast_recurring_deleted: 'Tekrarlayan silindi',
        toast_tour_desktop_only: 'Tur masaüstü için tasarlandı', toast_tour_completed: 'Tur tamamlandı! ',
        toast_amount_required: 'Tutar gerekli', toast_all_data_deleted: 'Tüm veriler silindi',
        toast_import_complete: 'Veriler eksiksiz içeri aktarıldı', toast_load_failed: 'Veriler yüklenemedi. Tekrar deneyin.',
        toast_new_pw_same: 'Yeni şifre eski ile aynı olamaz', toast_relogin_required: 'Yeniden giriş yapmanız gerekiyor',
        toast_relogin_retry: 'Yeniden giriş yapıp tekrar deneyin', common_renewed: 'Yenilendi',
        toast_already_listed: 'Zaten listede', toast_too_many_attempts: 'Çok fazla deneme. Sonra tekrar deneyin.',
        toast_decrypt_failed: 'Çözülemedi — parola veya kod hatalı', toast_press_back_exit: 'Çıkmak için tekrar geri tuşuna bas',
        toast_select_file_first: 'Önce dosya seç', toast_paste_code_first: 'Önce kodu yapıştır',
        toast_name_updated: 'İsim güncellendi', toast_name_target_required: 'İsim ve hedef tutarı gerekli',
        toast_import_error: 'İçeri aktarma hatası', toast_tx_not_found: 'İşlem bulunamadı',
        toast_tx_updated: 'İşlem güncellendi', toast_no_tx: 'İşlem yok',
        toast_password_changed: 'Şifre değiştirildi', toast_password_weak: 'Şifre çok zayıf',
        toast_passwords_mismatch: 'Şifreler eşleşmiyor', toast_encrypted_code_created: 'Şifreli kod oluşturuldu — kopyala ve sakla',
        toast_enter_password2: 'Şifrenizi girin', toast_tab_not_in_plan: 'Bu sekme seçili paketinde kullanılamaz. Reklam → Paket\'i değiştir.', common_no_date: 'Tarih yok',
    confirm_import_title: 'Verileri içeri aktar', confirm_import_msg: 'Bu hesaptaki MEVCUT tüm verilerin silinip koddaki verilerle değiştirilecek. Bu geri alınamaz. Devam edilsin mi?',
    confirm_del_tx_title: 'İşlemi sil', confirm_del_tx_msg: 'Bu işlem kalıcı olarak silinecek. Emin misin?',
    confirm_del_rec_title: 'Tekrarlayanı sil', confirm_del_rec_msg: 'Bu tekrarlayan işlemi silmek istediğine emin misin?',
    confirm_del_goal_title: 'Hedefi sil', confirm_del_goal_msg: 'Bu hedef kalıcı olarak silinecek. Emin misin?',
    confirm_del_account_title: ' Hesabı kalıcı sil', confirm_del_account_msg: 'Tüm verileriniz ve hesabınız kalıcı olarak silinecek. Bu işlem geri alınamaz.',
    confirm_del_alldata_title: 'Tüm verileri sil', confirm_del_alldata_msg: 'Tüm işlem, hedef, yatırım ve notlar kalıcı olarak silinecek. Hesabınız kalacak. Bu işlem geri alınamaz.',
    tour_1_title: 'Cüzzy\'ye hoş geldin! ', tour_1_text: 'Cüzzy, kişisel finanslarını tek panelde toplayan modern bir yardımcı. Birlikte hızlı bir tur atalım — 10 adım, yaklaşık 1 dakika sürecek. Logoya basınca sayfayı her zaman yenileyebilirsin.',
    tour_2_title: 'Bu ay nasıl gidiyorsun? ', tour_2_text: 'Üst panelde gelir, gider ve net bakiyeni anında görürsün. Tasarruf oranın da burada — sağlıklı bir hedef genelde %20 üstüdür.',
    tour_3_title: 'Hızlı işlem ekle', tour_3_text: 'Sağ panelden iki tıkla gelir veya gider ekleyebilirsin. Detaylı kategori için Finans sekmesini kullan.',
    tour_4_title: 'Takip listesi ', tour_4_text: 'Üst sağdaki bu çubuğa tıklayıp döviz, kripto ve hisse senedi takiplerini ekleyebilirsin. Eklediklerin sürekli gözünün önünde olur, fiyatlar canlı güncellenir.',
    tour_5_title: 'Finans merkezi ', tour_5_text: 'Tüm gelir-giderlerin, tekrarlayan ödemelerin, borçların, abonelik ve hedeflerin tek yerde. Üstteki sekmelerden geçiş yap.',
    tour_6_title: 'Yatırım takibi ', tour_6_text: 'Kripto, BIST hisseleri ve manuel yatırımları (altın, döviz, fon) ekle. Canlı fiyatla kâr/zarar otomatik hesaplanır. Detaylı piyasa burada.',
    tour_7_title: 'Görünüm ve güvenlik ', tour_7_text: 'Tema, duvar kağıdı, PIN kilidi, bütçe limiti ve bildirim ayarları... hepsi dişli ikonundaki Ayarlar penceresinde.',
    tour_8_title: 'Bütçeni belirle ', tour_8_text: 'Ayarlar > Güvenlik\'ten aylık bütçe limiti gir. Eşiğe yaklaştığında uyarırız, aştığında kırmızı banner çıkar.',
    tour_9_title: 'Profil ve senkron ', tour_9_text: 'Avatar yuvarlağına tıklayınca profil ayarlarına gidersin. Sağ alttaki minik nokta verilerinin bulutla senkron olduğunu gösterir.',
    tour_10_title: 'Hazırsın! ', tour_10_text: 'Cüzzy senin elinde. Bu turu istediğin zaman Ayarlar > Görünüm\'den tekrar başlatabilirsin. İyi kullanımlar!',
    takip_hourly: 'Bakiye trendi · Saatlik', takip_last_24h: 'son 24 saat',
    takip_daily: 'Bakiye trendi · Günlük', takip_monthly: 'Bakiye trendi · Aylık', takip_last_30d: 'son 30 gün',
    takip_monthly_income_expense: 'aylık gelir/gider', takip_year_trend: '{year} yılı trendi',
    common_no_data: 'Veri yok',
    inv_wallet_value: 'Cüzdan değeri', inv_total_portfolio: 'Toplam portföy', inv_profit_loss: 'Kâr / Zarar',
    inv_live_price: 'Canlı fiyatla', inv_asset_count: 'Varlık sayısı', inv_open_position: 'Açık pozisyon',
    inv_positions: 'Pozisyonlar', inv_new: '+ Yeni yatırım', inv_none_added: 'Yatırım eklenmedi',
    inv_forex: 'Döviz', inv_crypto: 'Kripto', inv_search_placeholder: 'Sembol veya isim ara...',
    common_loading: 'Yükleniyor...', common_loading_short: 'Yükleniyor',
  },
  en: {
    set_title: 'Settings', set_profil: 'Profile', set_gorunum: 'Appearance', set_guvenlik: 'Security & data',
    set_disaaktar: 'Export', set_dil: 'Language', set_gizlilik: 'Privacy', set_destek: 'Support',
    home_eyebrow: 'Today', home_greeting: 'Hello, ', home_sub: 'Your financial overview for this month.',
    home_kpi_month_income: "This month's income", home_kpi_month_expense: "This month's expense",
    home_kpi_week_income: 'Weekly income', home_kpi_week_expense: 'Weekly expense',
    home_budget_label: 'Monthly budget', home_budget_used: 'used',
    home_quickadd_title: 'Quick add', home_goals_title: 'Goals', common_add: '+ Add', common_manage: 'Manage →',
    home_account_title: 'Account summary', common_cat_dist: 'Category breakdown', common_note: 'Note',
    home_recurring_title: 'Recurring & Debt', home_recurring_desc: 'Manage your regular payments and debts.', home_recurring_btn: '+ Add recurring',
    home_multi_title: 'Multi transaction', home_multi_desc: 'Add multiple transactions at once.',
    home_market_title: 'Live market', common_watch: 'Watch', common_detail: 'Details →',
    home_recent_title: 'Recent activity', common_see_all: 'See all →',
    qm_tx: 'Add transaction', qm_recurring: 'Recurring income/expense', qm_debt: 'Debt / installment', qm_sub: 'Subscriptions', qm_note: 'Add note',
    common_view: 'View', common_title_label: 'Title',
    debt_type_card: 'Credit card', debt_type_installment: 'Installment', debt_type_loan: 'Loan', debt_type_debt: 'Debt',
    debt_due_date: 'Due date', debt_installment_count: 'Installment count', debt_add_btn: 'Add debt',
    sub_service: 'Service', sub_renew_day: 'Renewal day', sub_add_btn: 'Add subscription',
    goal_name: 'Goal name', goal_target: 'Target price (₺)', goal_current: 'Current balance (₺)', goal_add_btn: 'Add goal',
    rec_title: 'Add recurring', common_income_btn: '+ Income', common_expense_btn: '− Expense', common_desc: 'Description',
    rec_day_of_month: 'Which day each month?', rec_duration: 'How many months?',
    rec_add_income: '+ Add income', rec_add_expense: '− Add expense',
    rec_indefinite: 'Indefinite', rec_custom_duration: "I'll set it myself", rec_month_count_placeholder: 'Number of months (1-99)',
    common_saved: 'Saved', note_placeholder: 'Leave a quick note…',
    atx_title: 'All transactions', common_all: 'All', common_income: 'Income', common_expense: 'Expense',
    atx_all_time: 'All time', atx_this_month: 'This month', atx_last_7: 'Last 7 days',
    atx_start_date: 'Start date', atx_end_date: 'End date',
    cat_other: 'Other', cat_market: 'Grocery', cat_bill: 'Bill', cat_rent: 'Rent', cat_transport: 'Transport',
    cat_food: 'Food', cat_health: 'Health', cat_entertainment: 'Entertainment', cat_education: 'Education',
    cat_salary: 'Salary', cat_investment: 'Investment', cat_eft_send: 'Transfer - Sent', cat_eft_receive: 'Transfer - Received',
    cat_eft_send_short: 'Send', cat_eft_receive_short: 'Receive',
    edittx_title: 'Edit transaction', edittx_income: '↗ Income', edittx_expense: '↘ Expense',
    common_amount: 'Amount (₺)', common_category: 'Category', common_date: 'Date',
    edittx_note_optional: 'Note (optional)', common_save: 'Save',
    fin_tx_add_title: 'Add transaction', common_history: 'History', common_active: 'Active', common_list: 'List',
    fin_statement_title: 'Upload statement', fin_new_btn: '+ New', common_add_btn: 'Add',
    toast_goal_reached: 'You reached your goal!', toast_sub_added: 'Subscription added',
        toast_survey_sent: 'Your survey was sent, thank you! ', toast_budget_exceeded: 'Monthly budget exceeded!',
        toast_desc_min10: 'Description must be at least 10 characters', toast_desc_amount_required: 'Description and amount required',
        toast_title_amount_required: 'Title and amount required', toast_debt_added: 'Debt added',
        toast_field_not_in_plan: 'This field isn\'t available in your plan. Change plan →', toast_email_in_use: 'This email is already in use',
        toast_already_current_email: 'This is already your current email', toast_budget_saved: 'Budget settings saved',
        toast_csv_downloaded: 'CSV downloaded', toast_pick_score: 'Pick a score to continue (1-10)',
        toast_file_max_5mb: 'File must be under 5MB', toast_filename_too_long: 'Filename too long (max 100 characters)',
        toast_file_processing: 'Processing file...', toast_file_read_error: 'Couldn\'t read file: ',
        toast_no_tx_in_file: 'No transactions found in file', toast_verify_link_sent_new: 'Verification link sent to the new address',
        toast_verify_email_sent: 'Verification email sent. Check your inbox (and spam).', toast_email_verified: 'Email verified',
        toast_email_updated: 'Email updated', toast_opening_mail: 'Opening mail app…',
        toast_email_already_verified: 'Your email is already verified', common_added: 'Added',
        toast_no_tx_to_add: 'No transactions to add', toast_pick_amount_col: 'Select at least one amount column',
        toast_max_18_watch: 'You can add up to 18 watchlist items', toast_excel_lib_missing: 'Excel library didn\'t load',
        toast_mapping_updated: 'Mapping updated', toast_valid_email: 'Enter a valid email',
        toast_invalid_code: 'Invalid Cüzzy code', toast_invalid_email: 'Invalid email',
        toast_auto_logout: 'Signed out for security due to inactivity', common_error_prefix: 'Error: ',
        toast_goal_added: 'Goal added', toast_account_deleted: 'Account deleted',
        toast_no_tx_read: 'No transactions could be read. Check the column mapping.', toast_json_downloaded: 'JSON backup downloaded',
        toast_code_gen_failed: 'Couldn\'t generate code', toast_subject_required: 'Subject can\'t be empty',
        common_copied: 'Copied', toast_answer_one: 'Please answer at least one question',
        toast_message_sent: 'Your message was delivered, thank you! ', toast_balance_updated: 'Current balance updated',
        toast_current_pw_wrong: 'Current password is incorrect', toast_enter_current_pw: 'Enter your current password',
        toast_note_title_required: 'Enter a note title', toast_note_added: 'Note added',
        toast_session_not_found: 'Session not found', toast_pdf_downloaded: 'PDF downloaded',
        toast_pdf_lib_missing: 'PDF library not available', toast_pdf_lib_not_loaded: 'PDF library didn\'t load',
        toast_plan_updated: 'Plan updated', toast_password_min4: 'Password must be at least 4 characters',
        toast_enter_password: 'Enter the password', toast_file_types: 'Only CSV, TXT, Excel, or PDF files are accepted',
        toast_service_amount_required: 'Service and amount required', common_deleted: 'Deleted',
        toast_added_to_watch: 'Added to watchlist', toast_tour_no_mobile: 'The onboarding tour isn\'t available on mobile',
        toast_recurring_added: 'Recurring added', toast_recurring_deleted: 'Recurring deleted',
        toast_tour_desktop_only: 'The tour was designed for desktop', toast_tour_completed: 'Tour completed! ',
        toast_amount_required: 'Amount required', toast_all_data_deleted: 'All data deleted',
        toast_import_complete: 'Data imported successfully', toast_load_failed: 'Couldn\'t load data. Try again.',
        toast_new_pw_same: 'New password can\'t be the same as the old one', toast_relogin_required: 'You need to sign in again',
        toast_relogin_retry: 'Sign in again and retry', common_renewed: 'Renewed',
        toast_already_listed: 'Already in the list', toast_too_many_attempts: 'Too many attempts. Try again later.',
        toast_decrypt_failed: 'Couldn\'t decrypt — wrong password or code', toast_press_back_exit: 'Press back again to exit',
        toast_select_file_first: 'Select a file first', toast_paste_code_first: 'Paste the code first',
        toast_name_updated: 'Name updated', toast_name_target_required: 'Name and target amount required',
        toast_import_error: 'Import error', toast_tx_not_found: 'Transaction not found',
        toast_tx_updated: 'Transaction updated', toast_no_tx: 'No transactions',
        toast_password_changed: 'Password changed', toast_password_weak: 'Password is too weak',
        toast_passwords_mismatch: 'Passwords don\'t match', toast_encrypted_code_created: 'Encrypted code created — copy and save it',
        toast_enter_password2: 'Enter your password', toast_tab_not_in_plan: 'This tab isn\'t available in your plan. Ads → Plan', common_no_date: 'No date',
    confirm_import_title: 'Import data', confirm_import_msg: "All EXISTING data in this account will be deleted and replaced with the data from the code. This can't be undone. Continue?",
    confirm_del_tx_title: 'Delete transaction', confirm_del_tx_msg: 'This transaction will be permanently deleted. Are you sure?',
    confirm_del_rec_title: 'Delete recurring', confirm_del_rec_msg: 'Are you sure you want to delete this recurring transaction?',
    confirm_del_goal_title: 'Delete goal', confirm_del_goal_msg: 'This goal will be permanently deleted. Are you sure?',
    confirm_del_account_title: ' Permanently delete account', confirm_del_account_msg: "All your data and your account will be permanently deleted. This can't be undone.",
    confirm_del_alldata_title: 'Delete all data', confirm_del_alldata_msg: "All transactions, goals, investments, and notes will be permanently deleted. Your account will remain. This can't be undone.",
    tour_1_title: 'Welcome to Cüzzy! ', tour_1_text: "Cüzzy is a modern assistant that brings your personal finances together in one place. Let's take a quick tour — 10 steps, about a minute. Tap the logo anytime to refresh the page.",
    tour_2_title: 'How is this month going? ', tour_2_text: 'The top panel shows your income, expenses, and net balance at a glance. Your savings rate is here too — a healthy target is usually above 20%.',
    tour_3_title: 'Quick add', tour_3_text: 'Add income or an expense in two taps from the side panel. Use the Finance tab for detailed categories.',
    tour_4_title: 'Watchlist ', tour_4_text: 'Tap this bar at the top right to add currencies, crypto, and stocks to your watchlist. Whatever you add stays in view with live-updating prices.',
    tour_5_title: 'Finance hub ', tour_5_text: 'All your income/expenses, recurring payments, debts, subscriptions, and goals in one place. Switch between tabs at the top.',
    tour_6_title: 'Investment tracking ', tour_6_text: 'Add crypto, BIST stocks, and manual investments (gold, currency, funds). Profit/loss is calculated automatically at live prices. Full market view is here.',
    tour_7_title: 'Appearance & security ', tour_7_text: 'Theme, wallpaper, PIN lock, budget limit, and notification settings... all in the Settings window under the gear icon.',
    tour_8_title: 'Set your budget ', tour_8_text: "Enter a monthly budget limit under Settings > Security. We'll warn you as you approach it, and show a red banner if you go over.",
    tour_9_title: 'Profile & sync ', tour_9_text: 'Tap the avatar circle to go to profile settings. The small dot at the bottom right shows your data is synced with the cloud.',
    tour_10_title: "You're all set! ", tour_10_text: "Cüzzy is in your hands now. You can restart this tour anytime from Settings > Appearance. Enjoy!",
    takip_hourly: 'Balance trend · Hourly', takip_last_24h: 'last 24 hours',
    takip_daily: 'Balance trend · Daily', takip_monthly: 'Balance trend · Monthly', takip_last_30d: 'last 30 days',
    takip_monthly_income_expense: 'monthly income/expense', takip_year_trend: '{year} trend',
    common_no_data: 'No data',
    inv_wallet_value: 'Wallet value', inv_total_portfolio: 'Total portfolio', inv_profit_loss: 'Profit / Loss',
    inv_live_price: 'At live price', inv_asset_count: 'Number of assets', inv_open_position: 'Open position',
    inv_positions: 'Positions', inv_new: '+ New investment', inv_none_added: 'No investments added',
    inv_forex: 'Forex', inv_crypto: 'Crypto', inv_search_placeholder: 'Search symbol or name...',
    common_loading: 'Loading...', common_loading_short: 'Loading',
  }
};

function t(key) {
  const lang = (S.language === 'en') ? 'en' : 'tr';
  return (I18N[lang] && I18N[lang][key]) || (I18N.tr[key]) || key;
}
function localeCode() { return (typeof S !== 'undefined' && S.language === 'en') ? 'en-US' : 'tr-TR'; }

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-prefix]').forEach(el => {
    const txt = t(el.getAttribute('data-i18n-prefix'));
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) { node.textContent = txt; break; }
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
}

function setLanguage(lang) {
  S.language = (lang === 'en') ? 'en' : 'tr';
  save();
  document.documentElement.setAttribute('lang', S.language);
  document.querySelectorAll('.lang-card').forEach(c => c.classList.toggle('active', c.dataset.langSet === S.language));
  applyI18n();
}

function applySettings() {
  if (!S.themeReset4) { S.theme = 'light'; S.wallpaper = 'light'; S.themeReset4 = true; try { save(); } catch {} }
  if (!S.themeReset5) { S.theme = 'royal'; S.wallpaper = 'royal'; S.themeReset5 = true; try { save(); } catch {} }
  document.documentElement.setAttribute('data-theme', S.theme);
  document.documentElement.setAttribute('data-wallpaper', S.wallpaper);
  document.documentElement.setAttribute('lang', S.language);
  try { applyI18n(); } catch (e) {}

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
  toast(t('toast_name_updated'), 't-ok');
}

function openSettings(tab) {
  showModal('modalSettings');
  try { var _ms = document.getElementById('modalSettings'); if (_ms) _ms.style.zIndex = ''; } catch (e) {}
  try { var _fab = document.getElementById('qmFab'); if (_fab) _fab.style.display = 'none'; } catch (e) {}
  try { updateSettingsExtra(); } catch (e) {}
  var name = (S.profile && S.profile.name) || 'Kullanıcı';
  var av = document.getElementById('setProfileAv'), nm = document.getElementById('setProfileName'), ml = document.getElementById('setProfileMail');
  if (av) av.textContent = ((name.trim()[0]) || 'K').toUpperCase();
  if (nm) nm.textContent = sanitize(name);
  var pl = document.getElementById('profNameLbl'); if (pl) pl.textContent = sanitize(name);
  if (ml) ml.textContent = maskEmail((typeof currentUser !== 'undefined' && currentUser && currentUser.email) || '');
  document.querySelectorAll('.theme-card').forEach(c => c.classList.toggle('active', c.dataset.themeSet === S.theme));
  document.querySelectorAll('.wallpaper-card').forEach(c => c.classList.toggle('active', c.dataset.wpSet === S.wallpaper));
  document.querySelectorAll('.lang-card').forEach(c => c.classList.toggle('active', c.dataset.langSet === S.language));
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
  toast(t('toast_budget_saved'), 't-ok');
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

/* ── Android geri tuşu: siteden direkt çıkmasın, önce popup kapat / ana panele dön ── */
(function () {
  var _exitArmed = false, _exitTimer = null;
  function _pushBackBuffer() { try { history.pushState({ cuzzyBack: true }, '', location.href); } catch (e) {} }
  try { _pushBackBuffer(); } catch (e) {}

  window.addEventListener('popstate', function () {
    var openModal = document.querySelector('.modal-bg.show');
    if (openModal) { try { openModal.click(); } catch (e) {} _pushBackBuffer(); return; }
    var qmSheet = document.getElementById('qmSheet');
    if (qmSheet && qmSheet.classList.contains('show')) { try { closeQuickMenu(); } catch (e) {} _pushBackBuffer(); return; }
    var onHome = (typeof currentPage === 'undefined') || currentPage === 'home';
    if (!onHome) { try { goTo('home'); } catch (e) {} _pushBackBuffer(); return; }
    if (_exitArmed) { clearTimeout(_exitTimer); return; } // ikinci basış: gerçekten çıkışa izin ver
    _exitArmed = true;
    try { toast(t('toast_press_back_exit'), 't-info'); } catch (e) {}
    _pushBackBuffer();
    _exitTimer = setTimeout(function () { _exitArmed = false; }, 2000);
  });
})();

/* ═════════════════════════════════════════════════════════════════ */