/* ═══ 18. INVESTMENTS ═══ */

const KriptoListesi = [
  // Top 10 by market cap
  { id: 'bitcoin', sembol: 'BTC', isim: 'Bitcoin' },
  { id: 'ethereum', sembol: 'ETH', isim: 'Ethereum' },
  { id: 'tether', sembol: 'USDT', isim: 'Tether' },
  { id: 'ripple', sembol: 'XRP', isim: 'XRP' },
  { id: 'binancecoin', sembol: 'BNB', isim: 'BNB' },
  { id: 'solana', sembol: 'SOL', isim: 'Solana' },
  { id: 'usd-coin', sembol: 'USDC', isim: 'USD Coin' },
  { id: 'dogecoin', sembol: 'DOGE', isim: 'Dogecoin' },
  { id: 'cardano', sembol: 'ADA', isim: 'Cardano' },
  { id: 'tron', sembol: 'TRX', isim: 'TRON' },
  // 11–25
  { id: 'the-open-network', sembol: 'TON', isim: 'Toncoin' },
  { id: 'avalanche-2', sembol: 'AVAX', isim: 'Avalanche' },
  { id: 'shiba-inu', sembol: 'SHIB', isim: 'Shiba Inu' },
  { id: 'chainlink', sembol: 'LINK', isim: 'Chainlink' },
  { id: 'polkadot', sembol: 'DOT', isim: 'Polkadot' },
  { id: 'sui', sembol: 'SUI', isim: 'Sui' },
  { id: 'litecoin', sembol: 'LTC', isim: 'Litecoin' },
  { id: 'bitcoin-cash', sembol: 'BCH', isim: 'Bitcoin Cash' },
  { id: 'hyperliquid', sembol: 'HYPE', isim: 'Hyperliquid' },
  { id: 'near', sembol: 'NEAR', isim: 'NEAR Protocol' },
  { id: 'pepe', sembol: 'PEPE', isim: 'Pepe' },
  { id: 'aptos', sembol: 'APT', isim: 'Aptos' },
  { id: 'uniswap', sembol: 'UNI', isim: 'Uniswap' },
  { id: 'internet-computer', sembol: 'ICP', isim: 'Internet Computer' },
  { id: 'monero', sembol: 'XMR', isim: 'Monero' },
  // 26-50
  { id: 'ethereum-classic', sembol: 'ETC', isim: 'Ethereum Classic' },
  { id: 'kaspa', sembol: 'KAS', isim: 'Kaspa' },
  { id: 'aave', sembol: 'AAVE', isim: 'Aave' },
  { id: 'render-token', sembol: 'RENDER', isim: 'Render' },
  { id: 'cosmos', sembol: 'ATOM', isim: 'Cosmos' },
  { id: 'arbitrum', sembol: 'ARB', isim: 'Arbitrum' },
  { id: 'fetch-ai', sembol: 'FET', isim: 'Fetch.ai' },
  { id: 'algorand', sembol: 'ALGO', isim: 'Algorand' },
  { id: 'optimism', sembol: 'OP', isim: 'Optimism' },
  { id: 'pyth-network', sembol: 'PYTH', isim: 'Pyth Network' },
  { id: 'jupiter-exchange-solana', sembol: 'JUP', isim: 'Jupiter' },
  { id: 'dogwifcoin', sembol: 'WIF', isim: 'Dogwifhat' },
  { id: 'bonk', sembol: 'BONK', isim: 'Bonk' },
  { id: 'stellar', sembol: 'XLM', isim: 'Stellar' },
  { id: 'filecoin', sembol: 'FIL', isim: 'Filecoin' },
  { id: 'maker', sembol: 'MKR', isim: 'Maker' },
  { id: 'vechain', sembol: 'VET', isim: 'VeChain' },
  { id: 'hedera-hashgraph', sembol: 'HBAR', isim: 'Hedera' },
  { id: 'injective-protocol', sembol: 'INJ', isim: 'Injective' },
  { id: 'matic-network', sembol: 'MATIC', isim: 'Polygon' },
  { id: 'sei-network', sembol: 'SEI', isim: 'Sei' },
  { id: 'the-graph', sembol: 'GRT', isim: 'The Graph' },
  { id: 'tezos', sembol: 'XTZ', isim: 'Tezos' },
  { id: 'theta-token', sembol: 'THETA', isim: 'Theta Network' },
  { id: 'sandbox', sembol: 'SAND', isim: 'The Sandbox' },
  { id: 'decentraland', sembol: 'MANA', isim: 'Decentraland' },
  { id: 'axie-infinity', sembol: 'AXS', isim: 'Axie Infinity' },
  { id: 'pancakeswap-token', sembol: 'CAKE', isim: 'PancakeSwap' },
  { id: 'fantom', sembol: 'FTM', isim: 'Fantom' },
  { id: 'mantle', sembol: 'MNT', isim: 'Mantle' },
  { id: 'jasmycoin', sembol: 'JASMY', isim: 'JasmyCoin' },
  { id: 'flare-networks', sembol: 'FLR', isim: 'Flare' },
  { id: 'eos', sembol: 'EOS', isim: 'EOS' }
];

// BIST 100 endeksindeki gerçek hisseler (alfabetik)
const BIST100 = [
  'AEFES','AGHOL','AGROT','AKBNK','AKFGY','AKFYE','AKSA','AKSEN','ALARK','ALBRK',
  'ALFAS','ANSGR','ARCLK','ARDYZ','ASELS','ASTOR','BERA','BFREN','BIENY','BIMAS',
  'BINHO','BJKAS','BRISA','BRSAN','BRYAT','BTCIM','CANTE','CCOLA','CIMSA','CWENE',
  'DOAS','DOHOL','ECILC','ECZYT','EGEEN','EKGYO','ENJSA','ENKAI','EREGL','EUPWR',
  'FROTO','GARAN','GENIL','GESAN','GUBRF','HALKB','HEKTS','IMASM','ISCTR','ISDMR',
  'ISMEN','IZENR','KARSN','KCHOL','KLSER','KMPUR','KONTR','KONYA','KOZAA','KOZAL',
  'KRDMD','KRSER','KZBGY','MAGEN','MAVI','MGROS','MIATK','OBAMS','ODAS','ONCSM',
  'OTKAR','OYAKC','PASEU','PEKGY','PETKM','PGSUS','REEDR','SAHOL','SASA','SDTTR',
  'SISE','SKBNK','SMRTG','SOKM','TABGD','TAVHL','TCELL','THYAO','TKFEN','TMSN',
  'TOASO','TSKB','TTKOM','TUKAS','TUPRS','TURSG','ULKER','VAKBN','VESTL','YKBNK','ZOREN'
];

// En popüler 25 hisse (varsayılan görünüm)
const PopulerBIST = ['THYAO','GARAN','AKBNK','ASELS','SISE','EREGL','ISCTR','TUPRS','BIMAS','KCHOL','TCELL','PGSUS','FROTO','SAHOL','ARCLK','KOZAL','TOASO','HALKB','VAKBN','YKBNK','SASA','HEKTS','TTKOM','MGROS','EKGYO'];

function setInvMode(mode) {
  currentInvMode = mode;
  document.getElementById('invModeLive').classList.toggle('active', mode === 'live');
  document.getElementById('invModeManual').classList.toggle('active', mode === 'manual');
  document.getElementById('invFieldsLive').style.display = mode === 'live' ? 'block' : 'none';
  document.getElementById('invFieldsManual').style.display = mode === 'manual' ? 'block' : 'none';
  if (mode === 'live') populateInvSymbols();
}

function populateInvSymbols() {
  const type = document.getElementById('invLiveType').value;
  const sel = document.getElementById('invLiveSymbol');
  sel.innerHTML = '';
  if (type === 'Kripto') {
    KriptoListesi.forEach(k => {
      sel.innerHTML += `<option value="${k.sembol}">${k.sembol} — ${k.isim}</option>`;
    });
  } else {
    BIST100.forEach(s => {
      sel.innerHTML += `<option value="${s}">${s}</option>`;
    });
  }
}

function addInvestment() {
  const name = validateString(document.getElementById('invName').value, 50) || 'Yatırım';
  const note = validateString(document.getElementById('invNote').value, 200);

  if (currentInvMode === 'live') {
    const type = document.getElementById('invLiveType').value;
    const symbol = document.getElementById('invLiveSymbol').value.toUpperCase();
    const qty = Math.max(0, toFiniteNumber(document.getElementById('invQty').value, 0));
    const buyPrice = Math.max(0, parseInputAmt(document.getElementById('invBuyPrice').value) || 0);
    if (qty <= 0 || buyPrice <= 0) return toast('Adet ve fiyat gerekli', 't-err');
    const totalCost = qty * buyPrice;
    S.investments.push({
      id: uid(), name, note, date: todayStr(), mode: 'live',
      type, symbol, quantity: qty, buyPrice, amount: totalCost
    });
  } else {
    const type = document.getElementById('invManualType').value;
    const amount = validateAmount(document.getElementById('invManualAmount').value);
    if (!amount) return toast('Tutar gerekli', 't-err');
    S.investments.push({
      id: uid(), name, note, date: todayStr(), mode: 'manual',
      type, symbol: '', quantity: 0, buyPrice: 0, amount
    });
  }

  save();
  closeModal();
  toast('Yatırım eklendi', 't-ok');

  document.getElementById('invName').value = '';
  document.getElementById('invQty').value = '';
  document.getElementById('invBuyPrice').value = '';
  document.getElementById('invManualAmount').value = '';
  document.getElementById('invNote').value = '';
  renderAll();
}

function deleteInvestment(id) {
  showConfirm({
    title: 'Yatırımı sil',
    msg: 'Bu yatırım kalıcı olarak silinecek. Emin misin?',
    danger: true,
    onOk: () => {
      S.investments = S.investments.filter(i => i.id !== id);
      save(); renderAll(); toast('Silindi', 't-ok');
    }
  });
}

function getInvestmentCurrentValue(inv) {
  if (inv.mode === 'manual') return inv.amount;
  if (inv.type === 'Kripto') {
    const k = KriptoListesi.find(x => x.sembol === inv.symbol);
    if (k && livePrices[k.id]) {
      const usdRate = livePrices.usdtry || 0;
      const priceTRY = livePrices[k.id] * usdRate;
      return inv.quantity * priceTRY;
    }
  }
  if (inv.type === 'Hisse') {
    if (bistPrices[inv.symbol]) return inv.quantity * bistPrices[inv.symbol];
  }
  return inv.amount; // fallback to cost
}

function renderInvest() {
  const c = document.getElementById('investList');
  if (!c) return;
  if (!S.investments.length) {
    c.innerHTML = '<div class="empty-state">Yatırım eklenmedi</div>';
    document.getElementById('invTotalVal').textContent = fmt(0);
    document.getElementById('invTotalPnl').textContent = fmt(0);
    document.getElementById('invCount').textContent = '0';
    return;
  }

  let totalVal = 0, totalCost = 0;

  c.innerHTML = S.investments.map(inv => {
    const safeName = sanitize(inv.name);
    const safeId = inv.id.replace(/"/g, '&quot;');
    const safeSymbol = sanitize(inv.symbol);
    const safeType = sanitize(inv.type);
    const cost = inv.amount;
    const current = getInvestmentCurrentValue(inv);
    const pnl = current - cost;
    const pnlPct = cost > 0 ? (pnl / cost) * 100 : 0;
    totalVal += current;
    totalCost += cost;
    const pnlClass = pnl >= 0 ? 'up' : 'down';
    const pnlSign = pnl >= 0 ? '+' : '';
    const symbolText = inv.mode === 'live' ? `${safeSymbol} · ${safeType}` : safeType;
    const qtyText = inv.mode === 'live' ? `${inv.quantity} adet × ${fmt(inv.buyPrice)}` : 'Manuel giriş';

    return `<div class="invest-item">
      <div class="invest-body">
        <div class="invest-name">${safeName}</div>
        <div class="invest-meta">${symbolText}</div>
        <div class="invest-cost">Maliyet: ${fmt(cost)} · ${qtyText}</div>
      </div>
      <div class="invest-right">
        <div class="invest-current">${fmt(current)}</div>
        <div class="invest-pnl ${pnlClass}">${pnlSign}${fmt(pnl)} (${pnlSign}${pnlPct.toFixed(1)}%)</div>
        <button class="btn btn-sm btn-danger" style="margin-top:8px" onclick="deleteInvestment('${safeId}')">Sil</button>
      </div>
    </div>`;
  }).join('');

  const totalPnl = totalVal - totalCost;
  document.getElementById('invTotalVal').textContent = fmt(totalVal);
  const pnlEl = document.getElementById('invTotalPnl');
  pnlEl.textContent = (totalPnl >= 0 ? '+' : '') + fmt(totalPnl);
  pnlEl.style.color = totalPnl >= 0 ? 'var(--income)' : 'var(--expense)';
  document.getElementById('invCount').textContent = S.investments.length;
}

/* ═══ 19. LIVE MARKETS ═══ */

let livePrices = {};   // { usdtry, eurtry, gbptry, tryjpy, bitcoin, ethereum, ... }
let bistPrices = {};   // { THYAO: 250.5, ... }
let marketStatus = { forex: 'loading', crypto: 'loading', bist: 'loading', lastUpdate: 0 };
let marketIntervals = [];
let liveMarketsStarted = false;

// BIST API çalışıyor mu?
function bistAvailable() {
  // En az 1 fiyat geldi mi?
  return Object.keys(bistPrices).length > 0 && marketStatus.bist === 'ok';
}

const CORS_PROXIES = [
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
];

function safeFetch(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => { ctrl.abort(); reject(new Error('timeout')); }, timeoutMs);
    fetch(url, { signal: ctrl.signal })
      .then(r => { clearTimeout(timer); if (!r.ok) reject(new Error('HTTP ' + r.status)); else resolve(r); })
      .catch(e => { clearTimeout(timer); reject(e); });
  });
}

async function fetchFirstSuccess(urls, parser) {
  for (const url of urls) {
    try {
      const r = await safeFetch(url, 8000);
      const data = await r.json();
      const result = parser(data);
      if (result !== null && result !== undefined) return result;
    } catch (e) {
      // try next
    }
  }
  throw new Error('all proxies failed');
}

async function fetchForex() {
  // ER-API + ExchangeRate.host fallback
  const targetUrls = [
    'https://open.er-api.com/v6/latest/USD',
    'https://api.exchangerate-api.com/v4/latest/USD'
  ];
  const proxiedUrls = [];
  for (const t of targetUrls) for (const p of CORS_PROXIES) proxiedUrls.push(p(t));
  // Direct first (some browsers ok)
  proxiedUrls.unshift(...targetUrls);

  try {
    const rates = await fetchFirstSuccess(proxiedUrls, data => {
      const r = data?.rates || data?.conversion_rates;
      if (!r) return null;
      const tryRate = Number(r.TRY);
      if (!Number.isFinite(tryRate) || tryRate <= 0) return null;

      // Helper: X/TRY hesapla (X bir başka para birimi)
      // ER-API USD bazlı: r.X = 1 USD kaç X eder
      // X/TRY = (1 USD = tryRate TL) / (1 USD = r.X X) = tryRate / r.X TL/X
      const xtryRate = (xCode) => {
        const rate = Number(r[xCode]);
        return rate > 0 ? tryRate / rate : null;
      };

      return {
        usdtry: tryRate,
        eurtry: xtryRate('EUR'),
        gbptry: xtryRate('GBP'),
        tryjpy: r.JPY > 0 ? r.JPY / tryRate : null,  // 1 TL kaç JPY (geleneksel gösterim)
        chftry: xtryRate('CHF'),
        audtry: xtryRate('AUD'),
        cadtry: xtryRate('CAD'),
        cnytry: xtryRate('CNY'),
        rubtry: xtryRate('RUB'),
        sartry: xtryRate('SAR'),
        aedtry: xtryRate('AED'),
        sektry: xtryRate('SEK'),
        noktry: xtryRate('NOK'),
        dkktry: xtryRate('DKK'),
        kwdtry: xtryRate('KWD'),
        jpytry: xtryRate('JPY')  // 1 JPY kaç TL (alternatif)
      };
    });
    Object.assign(livePrices, rates);
    marketStatus.forex = 'ok';
    marketStatus.lastUpdate = Date.now();
  } catch (e) {
    console.warn('Forex fetch failed:', e.message);
    marketStatus.forex = 'error';
  }
}

async function fetchCrypto() {
  const ids = KriptoListesi.map(k => k.id).join(',');
  const targetUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;
  const proxiedUrls = [targetUrl, ...CORS_PROXIES.map(p => p(targetUrl))];
  try {
    const data = await fetchFirstSuccess(proxiedUrls, d => {
      if (!d || typeof d !== 'object') return null;
      const out = {};
      let count = 0;
      KriptoListesi.forEach(k => {
        if (d[k.id]?.usd) { out[k.id] = Number(d[k.id].usd); count++; }
      });
      return count > 0 ? out : null;
    });
    Object.assign(livePrices, data);
    marketStatus.crypto = 'ok';
    marketStatus.lastUpdate = Date.now();
  } catch (e) {
    console.warn('Crypto fetch failed:', e.message);
    marketStatus.crypto = 'error';
  }
}

async function fetchBIST() {
  // Yahoo Finance'in chart endpoint'i v7/quote'dan daha güvenilir (auth gerektirmiyor)
  // Her sembol için ayrı istek gerekli ama küçük tutuyoruz (POPULER_BIST sadece 20 sembol)

  // Önce local proxy'yi dene
  const localUrl = `/api/bist?symbols=${PopulerBIST.join(',')}`;
  let success = false;

  try {
    const r = await safeFetch(localUrl, 5000);
    const data = await r.json();
    const out = {};
    let count = 0;
    // Cloudflare function şekli: { prices: { THYAO: 327.0, ... } }
    if (data && data.prices && typeof data.prices === 'object') {
      for (const [k, v] of Object.entries(data.prices)) {
        const sym = String(k).replace('.IS', '').toUpperCase();
        const price = Number(v);
        if (sym && Number.isFinite(price) && price > 0) { out[sym] = price; count++; }
      }
    }
    // Geri uyum: eski dizi şekli (quoteResponse.result / results / düz dizi)
    if (count === 0) {
      const arr = data?.quoteResponse?.result || data?.results || (Array.isArray(data) ? data : null);
      if (Array.isArray(arr) && arr.length > 0) {
        arr.forEach(item => {
          if (!item) return;
          const sym = (item.symbol || item.sym || '').replace('.IS', '').toUpperCase();
          const price = Number(item.regularMarketPrice ?? item.price ?? item.last);
          if (sym && Number.isFinite(price) && price > 0) { out[sym] = price; count++; }
        });
      }
    }
    if (count > 0) {
      Object.assign(bistPrices, out);
      marketStatus.bist = 'ok';
      marketStatus.lastUpdate = Date.now();
      success = true;
    }
  } catch (e) { /* local yok, devam */ }

  if (success) return;

  // Local yoksa: Yahoo chart endpoint için her sembol için ayrı istek (paralel)
  // Sadece Top 10 sembol — diğerleri için kullanıcı tek tek arar
  const topSymbols = PopulerBIST.slice(0, 10);

  const fetchOne = async (sym) => {
    const targetUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}.IS?interval=1d&range=1d`;
    const urls = [targetUrl, ...CORS_PROXIES.map(p => p(targetUrl))];
    for (const url of urls) {
      try {
        const r = await safeFetch(url, 6000);
        const data = await r.json();
        const result = data?.chart?.result?.[0];
        const price = result?.meta?.regularMarketPrice;
        if (Number.isFinite(price) && price > 0) {
          return { sym, price };
        }
      } catch (e) { /* try next */ }
    }
    return null;
  };

  try {
    const results = await Promise.allSettled(topSymbols.map(fetchOne));
    let count = 0;
    results.forEach(r => {
      if (r.status === 'fulfilled' && r.value) {
        bistPrices[r.value.sym] = r.value.price;
        count++;
      }
    });
    if (count > 0) {
      marketStatus.bist = 'ok';
      marketStatus.lastUpdate = Date.now();
    } else {
      marketStatus.bist = 'error';
    }
  } catch (e) {
    console.warn('BIST fetch failed:', e.message);
    marketStatus.bist = 'error';
  }
}

function renderMarketStatus() {
  const dot = document.getElementById('rpStatusDot');
  const txt = document.getElementById('rpStatusText');

  // Aktif sekmenin durumu
  const status = marketStatus[currentMarketTab];
  if (dot) dot.className = 'status-dot ' + (status === 'ok' ? 'ok' : status === 'error' ? 'error' : 'loading');

  if (marketStatus.lastUpdate > 0) {
    const sec = Math.floor((Date.now() - marketStatus.lastUpdate) / 1000);
    if (txt) {
      if (sec < 60) txt.textContent = `Güncel · ${sec}s önce`;
      else txt.textContent = `${Math.floor(sec / 60)}dk önce`;
    }
  } else {
    if (txt) txt.textContent = status === 'loading' ? 'Yükleniyor...' : status === 'error' ? 'Bağlantı hatası' : 'Bekleniyor';
  }

  // Kart durum göstergeleri (dashboard + piyasa sayfası)
  const ids = [['mktDot1','mktText1'],['mktDot2','mktText2']];
  let dotCls, label;
  if (marketStatus.lastUpdate === 0) {
    dotCls = 'mkt-dot loading'; label = 'Yükleniyor';
  } else {
    const sec = Math.floor((Date.now() - marketStatus.lastUpdate) / 1000);
    if (sec < 150) { dotCls = 'mkt-dot ok'; label = 'Güncel'; }
    else { dotCls = 'mkt-dot inactive'; label = 'Şu an aktif değil'; }
  }
  for (const [dId, tId] of ids) {
    const d = document.getElementById(dId);
    const t = document.getElementById(tId);
    if (d) d.className = dotCls;
    if (t) t.textContent = label;
  }
}

function renderForexWidget() {
  const c = document.getElementById('rpForex');
  if (!c) return;
  const items = [
    { label: 'USD/TRY', val: livePrices.usdtry, decimals: 4 },
    { label: 'EUR/TRY', val: livePrices.eurtry, decimals: 4 },
    { label: 'GBP/TRY', val: livePrices.gbptry, decimals: 4 },
    { label: 'TRY/JPY', val: livePrices.tryjpy, decimals: 3 }
  ];
  c.innerHTML = items.map(it => `
    <div class="rp-item">
      <div class="rp-item-label"> ${it.label}</div>
      <div class="rp-item-value">${it.val ? '₺' + it.val.toFixed(it.decimals) : '—'}</div>
    </div>
  `).join('');
}

function renderCryptoWidget() {
  const c = document.getElementById('rpCrypto');
  if (!c) return;
  const usd = livePrices.usdtry || 0;
  const top = KriptoListesi.slice(0, 8);
  c.innerHTML = top.map(k => {
    const usdPrice = livePrices[k.id];
    const tryPrice = usdPrice && usd ? usdPrice * usd : null;
    return `<div class="rp-item" onclick="openInvestWithSymbol('Kripto','${k.sembol}')">
      <div class="rp-item-label">${k.sembol}</div>
      <div class="rp-item-value">${tryPrice ? '₺' + tryPrice.toLocaleString('tr-TR', {maximumFractionDigits: 2}) : '—'}</div>
    </div>`;
  }).join('');
}

function renderBistList(filter = '') {
  const c = document.getElementById('rpBistList');
  if (!c) return;
  const f = filter.trim().toUpperCase();
  let symbols = PopulerBIST;
  if (f) symbols = BIST100.filter(s => s.includes(f));
  c.innerHTML = symbols.slice(0, 30).map(s => {
    const price = bistPrices[s];
    return `<div class="rp-item" onclick="openInvestWithSymbol('Hisse','${s}')">
      <div class="rp-item-label"> ${s}</div>
      <div class="rp-item-value">${price ? '₺' + price.toFixed(2) : '—'}</div>
    </div>`;
  }).join('');
}

function filterBistRP() {
  const v = document.getElementById('bistSearch').value;
  renderBistList(v);
}

let currentMarketCategory = 'all';

function setMarketCategory(cat) {
  currentMarketCategory = cat;
  document.querySelectorAll('.market-cat-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
  renderMarketPage();
}

function renderMarketPage() {
  const grid = document.getElementById('marketGridPage');
  if (!grid) return;
  const search = (document.getElementById('marketSearchInput')?.value || '').trim().toUpperCase();

  const usd = livePrices.usdtry || 0;
  const items = [];

  // Forex — genişletilmiş liste
  if (currentMarketCategory === 'all' || currentMarketCategory === 'forex') {
    const fxList = [
      { sym: 'USD/TRY', val: livePrices.usdtry, dec: 4, name: 'Amerikan Doları' },
      { sym: 'EUR/TRY', val: livePrices.eurtry, dec: 4, name: 'Euro' },
      { sym: 'GBP/TRY', val: livePrices.gbptry, dec: 4, name: 'İngiliz Sterlini' },
      { sym: 'CHF/TRY', val: livePrices.chftry, dec: 4, name: 'İsviçre Frangı' },
      { sym: 'JPY/TRY', val: livePrices.jpytry, dec: 4, name: 'Japon Yeni' },
      { sym: 'AUD/TRY', val: livePrices.audtry, dec: 4, name: 'Avustralya Doları' },
      { sym: 'CAD/TRY', val: livePrices.cadtry, dec: 4, name: 'Kanada Doları' },
      { sym: 'CNY/TRY', val: livePrices.cnytry, dec: 4, name: 'Çin Yuanı' },
      { sym: 'RUB/TRY', val: livePrices.rubtry, dec: 4, name: 'Rus Rublesi' },
      { sym: 'SAR/TRY', val: livePrices.sartry, dec: 4, name: 'Suudi Riyali' },
      { sym: 'AED/TRY', val: livePrices.aedtry, dec: 4, name: 'BAE Dirhemi' },
      { sym: 'KWD/TRY', val: livePrices.kwdtry, dec: 4, name: 'Kuveyt Dinarı' },
      { sym: 'SEK/TRY', val: livePrices.sektry, dec: 4, name: 'İsveç Kronu' },
      { sym: 'NOK/TRY', val: livePrices.noktry, dec: 4, name: 'Norveç Kronu' },
      { sym: 'DKK/TRY', val: livePrices.dkktry, dec: 4, name: 'Danimarka Kronu' },
      { sym: 'TRY/JPY', val: livePrices.tryjpy, dec: 3, name: 'Türk Lirası → JPY' }
    ];
    fxList.forEach(f => {
      if (!search || f.sym.includes(search) || f.name.toUpperCase().includes(search)) {
        items.push({
          icon: '',
          iconClass: 'forex',
          symbol: f.sym,
          name: f.name,
          price: f.val ? '₺' + f.val.toFixed(f.dec) : null,
          onClick: null
        });
      }
    });
  }

  // Crypto
  if (currentMarketCategory === 'all' || currentMarketCategory === 'crypto') {
    KriptoListesi.forEach(k => {
      if (!search || k.sembol.includes(search) || k.isim.toUpperCase().includes(search)) {
        const usdPrice = livePrices[k.id];
        const tryPrice = usdPrice && usd ? usdPrice * usd : null;
        items.push({
          icon: '',
          iconClass: 'crypto',
          symbol: k.sembol,
          name: k.isim,
          price: tryPrice ? '₺' + tryPrice.toLocaleString('tr-TR', { maximumFractionDigits: tryPrice > 100 ? 0 : 2 }) : null,
          onClick: `openInvestWithSymbol('Kripto','${k.sembol}')`
        });
      }
    });
  }

  // BIST
  if (currentMarketCategory === 'all' || currentMarketCategory === 'bist') {
    const symbols = search ? BIST100.filter(s => s.includes(search)) : PopulerBIST;
    const bistWorking = bistAvailable();
    symbols.slice(0, currentMarketCategory === 'bist' ? 100 : 25).forEach(s => {
      const price = bistPrices[s];
      items.push({
        icon: '',
        iconClass: 'bist',
        symbol: s,
        name: bistWorking ? 'BIST hissesi' : 'BIST hissesi',
        price: price ? '₺' + price.toFixed(2) : null,
        comingSoon: !bistWorking && !price,
        onClick: bistWorking ? `openInvestWithSymbol('Hisse','${s}')` : null
      });
    });
  }

  if (!items.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Sonuç bulunamadı</div>';
    return;
  }

  grid.innerHTML = items.map(it => {
    const onclick = it.onClick ? `onclick="${it.onClick}" style="cursor:pointer"` : 'style="cursor:default"';
    let priceHTML;
    if (it.comingSoon) {
      priceHTML = `<div class="market-card-soon">Çok Yakında</div>`;
    } else if (it.price) {
      priceHTML = `<div class="market-card-price">${it.price}</div>`;
    } else {
      priceHTML = `<div class="market-card-price empty">—</div>`;
    }
    return `<div class="market-card" ${onclick}>
      <div class="market-card-icon ${it.iconClass}">${it.icon}</div>
      <div class="market-card-body">
        <div class="market-card-symbol">${sanitize(it.symbol)}</div>
        <div class="market-card-name">${sanitize(it.name)}</div>
      </div>
      ${priceHTML}
    </div>`;
  }).join('');

  // Last update label
  const lastEl = document.getElementById('marketLastUpdate');
  if (lastEl && marketStatus.lastUpdate > 0) {
    const sec = Math.floor((Date.now() - marketStatus.lastUpdate) / 1000);
    if (sec < 60) lastEl.textContent = `${sec}s önce güncellendi`;
    else lastEl.textContent = `${Math.floor(sec / 60)}dk önce`;
  }
}

// Eski fonksiyonları yeniye yönlendir (geriye dönük uyumluluk)
function filterBistPage() { renderMarketPage(); }
function refreshMarketPagesIfNeeded() { renderMarketPage(); }

function switchMarket(m) {
  // Eski sağ panel için, artık kullanılmıyor ama null check ile zarar vermez
  currentMarketTab = m;
}

function openInvestWithSymbol(type, symbol) {
  showModal('modalInvest');
  setInvMode('live');
  setTimeout(() => {
    document.getElementById('invLiveType').value = type;
    populateInvSymbols();
    document.getElementById('invLiveSymbol').value = symbol;
    document.getElementById('invName').value = symbol + ' yatırımı';
    document.getElementById('invName').focus();
  }, 100);
}

function updateDashboardMarkets() {
  const container = document.getElementById('dashMiniMarkets');
  if (!container) return;
  const usd = livePrices.usdtry || 0;

  let cards;
  if (S && S.watchlist && S.watchlist.length > 0) {
    cards = S.watchlist.slice(0, 18).map(w => {
      let label = w.symbol, value = '—';
      if (w.type === 'forex') {
        const fxKey = w.symbol === 'USD' ? 'usdtry' : w.symbol === 'EUR' ? 'eurtry' : w.symbol === 'GBP' ? 'gbptry' : w.symbol === 'TRYJPY' ? 'tryjpy' : null;
        const v = fxKey ? livePrices[fxKey] : null;
        if (v) value = '₺' + v.toFixed(w.symbol === 'TRYJPY' ? 3 : 4);
        label = w.symbol === 'TRYJPY' ? 'TRY/JPY' : w.symbol + '/TRY';
      } else if (w.type === 'crypto') {
        const k = KriptoListesi.find(x => x.sembol === w.symbol);
        if (k && livePrices[k.id] && usd) {
          const tp = livePrices[k.id] * usd;
          value = '₺' + tp.toLocaleString('tr-TR', { maximumFractionDigits: tp > 100 ? 0 : 2 });
        }
      } else if (w.type === 'bist') {
        const v = bistPrices[w.symbol];
        if (v) value = '₺' + v.toFixed(2);
      }
      return { label, value };
    });
  } else {
    cards = [
      { label: 'USD/TRY', value: livePrices.usdtry ? '₺' + livePrices.usdtry.toFixed(2) : '—' },
      { label: 'EUR/TRY', value: livePrices.eurtry ? '₺' + livePrices.eurtry.toFixed(2) : '—' },
      { label: 'BTC',     value: livePrices.bitcoin && usd ? '₺' + (livePrices.bitcoin * usd).toLocaleString('tr-TR', { maximumFractionDigits: 0 }) : '—' },
      { label: 'THYAO',   value: bistPrices.THYAO ? '₺' + bistPrices.THYAO.toFixed(2) : '—' }
    ];
  }
  container.innerHTML = cards.map(c =>
    '<div class="mini-market-card"><div class="mini-market-label">' + sanitize(c.label) +
    '</div><div class="mini-market-value">' + c.value + '</div></div>'
  ).join('');
}

function clearMarketIntervals() {
  marketIntervals.forEach(i => clearInterval(i));
  marketIntervals = [];
  liveMarketsStarted = false;
}

async function startLiveMarkets() {
  if (liveMarketsStarted) return;
  liveMarketsStarted = true;

  const updateAll = async () => {
    await Promise.allSettled([fetchForex(), fetchCrypto(), fetchBIST()]);
    refreshMarketPagesIfNeeded();
    updateDashboardMarkets();
    renderMarketStatus();
    renderTicker();
    // Watchlist modal açıksa fiyatları yenile
    const wlModal = document.getElementById('modalWatchlist');
    if (wlModal && wlModal.classList.contains('show')) renderWatchlistCurrent();
    renderInvest(); // K/Z güncellemesi
  };

  await updateAll();

  // Status counter — her saniye "X saniye önce"
  marketIntervals.push(setInterval(renderMarketStatus, 1000));

  // Forex + crypto her 60 saniye
  marketIntervals.push(setInterval(async () => {
    await Promise.allSettled([fetchForex(), fetchCrypto()]);
    refreshMarketPagesIfNeeded();
    updateDashboardMarkets();
    renderTicker();
    const wlModal = document.getElementById('modalWatchlist');
    if (wlModal && wlModal.classList.contains('show')) renderWatchlistCurrent();
    renderInvest();
  }, 60000));

  // BIST her 90 saniye
  marketIntervals.push(setInterval(async () => {
    await fetchBIST();
    refreshMarketPagesIfNeeded();
    updateDashboardMarkets();
    renderTicker();
    const wlModal = document.getElementById('modalWatchlist');
    if (wlModal && wlModal.classList.contains('show')) renderWatchlistCurrent();
    renderInvest();
  }, 90000));
}


/* ═════════════════════════════════════════════════════════════════ */
