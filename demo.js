/* African Languages Lab demo — interactive logic.
   All numbers come from PAPER_DATA (data.js), transcribed from
   Issaka et al. 2025, arXiv:2510.05644, Tables 2 and 3.
   MODEL_API_URL: set this to the fine-tuned model's endpoint when it is
   ready (POST {MODEL_API_URL}/translate {text, target_lang}).
   While it is null, the model panel stays in its honest "not yet" state. */
const MODEL_API_URL = null;

const DATA = PAPER_DATA;
const $ = (sel) => document.querySelector(sel);

/* ---------------- Dataset explorer (Table 2) ---------------- */
let datasetSort = 'tokens';
let datasetQuery = '';

function tierFor(tokensM) {
  if (tokensM >= 2000) return 'Primary resource (>2B tokens)';
  if (tokensM >= 900) return 'Established (~1–2B tokens)';
  if (tokensM >= 250) return 'Emerging (250M–1B tokens)';
  return 'Resource-constrained (<250M)';
}

function renderDataset() {
  const tbody = document.querySelector('#dataset-table tbody');
  let rows = DATA.dataset.filter((d) => d.lang.toLowerCase().includes(datasetQuery));
  const maxTokens = Math.max(...DATA.dataset.map((d) => d.tokens_m));
  const maxHours = Math.max(...DATA.dataset.map((d) => d.hours || 0));
  if (datasetSort === 'tokens') rows.sort((a, b) => b.tokens_m - a.tokens_m);
  if (datasetSort === 'hours') rows.sort((a, b) => (b.hours || 0) - (a.hours || 0));
  if (datasetSort === 'name') rows.sort((a, b) => a.lang.localeCompare(b.lang));
  tbody.innerHTML = rows.map((d) => {
    const tokBar = `<span class="bar" style="width:${Math.max(2, (d.tokens_m / maxTokens) * 90)}px"></span>`;
    const hrs = d.hours == null
      ? '<span class="missing">&mdash;</span>'
      : `${d.hours.toLocaleString('en-US', { maximumFractionDigits: 2 })}<span class="bar audio" style="width:${Math.max(2, (d.hours / maxHours) * 90)}px"></span>`;
    return `<tr><td><strong>${d.lang}</strong></td><td class="num">${d.tokens_m.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td>${tokBar}</td><td class="num">${hrs}</td><td class="tier">${tierFor(d.tokens_m)}</td></tr>`;
  }).join('') || '<tr><td colspan="5">No languages match that filter.</td></tr>';
}

document.querySelectorAll('#dataset .sort-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#dataset .sort-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    datasetSort = btn.dataset.sort;
    renderDataset();
  });
});
$('#dataset-search').addEventListener('input', (e) => {
  datasetQuery = e.target.value.trim().toLowerCase();
  renderDataset();
});

/* ---------------- Average chart ---------------- */
function renderAvgChart() {
  const defs = [
    { key: 'chrf', name: 'ChrF++', note: 'character-level match — higher is better', max: 50 },
    { key: 'comet', name: 'COMET', note: 'neural meaning score, 0–1 — higher is better', max: 1 },
    { key: 'bleu', name: 'BLEU', note: 'word-sequence overlap — higher is better', max: 30 },
  ];
  const avg = DATA.averages;
  $('#avg-chart').innerHTML = defs.map((d) => {
    const row = (label, val, cls) => `
      <div class="avg-bar-row"><span>${label}</span>
        <div class="avg-track"><div class="avg-fill ${cls}" style="width:${Math.min(100, (val / d.max) * 100)}%"></div></div>
        <span class="avg-val">${val}</span>
      </div>`;
    return `<div class="avg-metric"><div class="avg-name">${d.name} <span>${d.note}</span></div><div class="avg-bars">
      ${row('Baseline', avg[d.key].base, 'base')}
      ${row('Fine-tuned', avg[d.key].ours, 'ours')}
      ${row('Google Translate', avg[d.key].gt, 'gt')}
    </div></div>`;
  }).join('');
}

/* ---------------- Results table (Table 3) ---------------- */
let currentMetric = 'chrf';
let resultsQuery = '';
const METRIC_NAMES = { chrf: 'ChrF++', comet: 'COMET', bleu: 'BLEU', africomet: 'AfriCOMET', meteor: 'METEOR', ter: 'TER' };
const LOWER_BETTER = new Set(['ter']);

function fmt(v) {
  if (v == null) return '&mdash;';
  return Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100);
}

function renderResults() {
  const tbody = document.querySelector('#results-table tbody');
  const tfoot = document.querySelector('#results-table tfoot');
  const lowerBetter = LOWER_BETTER.has(currentMetric);
  let rows = DATA.results.filter((r) => r.lang.toLowerCase().includes(resultsQuery));
  rows = rows.slice().sort((a, b) => {
    const ga = a[currentMetric].ours - a[currentMetric].base;
    const gb = b[currentMetric].ours - b[currentMetric].base;
    return lowerBetter ? ga - gb : gb - ga; // biggest improvement first
  });
  tbody.innerHTML = rows.map((r) => {
    const m = r[currentMetric];
    const gain = m.ours - m.base;
    const gainCls = gain > 0 ? 'pos' : gain < 0 ? 'neg' : '';
    const gainTxt = (gain > 0 ? '+' : '') + (Math.round(gain * 100) / 100);
    let note = '';
    if (m.gt != null) {
      const beats = lowerBetter ? m.ours < m.gt : m.ours > m.gt;
      if (beats) note = '<span class="beats">Beats Google Translate</span>';
    }
    if (r.lang === 'Fon' && currentMetric === 'chrf') note += ' <span class="tier">fell slightly</span>';
    return `<tr><td><strong>${r.lang}</strong></td><td class="num">${fmt(m.base)}</td><td class="num"><strong>${fmt(m.ours)}</strong></td><td class="num ${gainCls}">${gainTxt}</td><td class="num">${fmt(m.gt)}</td><td>${note}</td></tr>`;
  }).join('') || '<tr><td colspan="6">No languages match that filter.</td></tr>';
  const a = DATA.averages[currentMetric];
  const aGain = a.ours - a.base;
  tfoot.innerHTML = `<tr><td>Average (31 languages)</td><td class="num">${fmt(a.base)}</td><td class="num">${fmt(a.ours)}</td><td class="num pos">${(aGain > 0 ? '+' : '') + (Math.round(aGain * 100) / 100)}</td><td class="num">${fmt(a.gt)}</td><td></td></tr>`;
}

document.querySelectorAll('.metric-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.metric-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentMetric = btn.dataset.metric;
    renderResults();
  });
});
$('#results-search').addEventListener('input', (e) => {
  resultsQuery = e.target.value.trim().toLowerCase();
  renderResults();
});

/* ---------------- Toy baseline translator ---------------- */
/* A tiny English->Swahili word list. This is a teaching toy: it looks words
   up one by one with no grammar, no word order and no morphology. It is
   NOT the paper's model and must never be presented as one. */
const TOY_DICT = {
  hello: 'hujambo', thank: 'asante', you: 'wewe', child: 'mtoto', reads: 'soma',
  read: 'soma', book: 'kitabu', school: 'shule', water: 'maji', life: 'maisha',
  good: 'nzuri', food: 'chakula', brings: 'leta', bring: 'leta', peace: 'amani',
  language: 'lugha', house: 'nyumba', people: 'watu', teacher: 'mwalimu',
  student: 'mwanafunzi', learn: 'jifunza', learns: 'jifunza', together: 'pamoja',
  and: 'na', is: 'ni', mother: 'mama', father: 'baba', friend: 'rafiki',
  love: 'upendo', world: 'dunia', africa: 'afrika', day: 'siku', night: 'usiku',
  sun: 'jua', moon: 'mwezi', tree: 'mti', dog: 'mbwa', cat: 'paka', eat: 'kula',
  eats: 'kula', drink: 'kunywa', drinks: 'kunywa', go: 'enda', come: 'kuja',
  speak: 'sema', write: 'andika', big: 'kubwa', small: 'ndogo', happy: 'furaha',
  welcome: 'karibu', yes: 'ndiyo', no: 'hapana', one: 'moja', two: 'mbili',
  three: 'tatu', health: 'afya', time: 'wakati', money: 'pesa', market: 'soko',
  road: 'barabara', village: 'kijiji', city: 'jiji', river: 'mto', sea: 'bahari',
  rain: 'mvua', fire: 'moto', earth: 'ardhi', sky: 'mbingu', bird: 'ndege',
  fish: 'samaki', milk: 'maziwa', bread: 'mkate', rice: 'wali', tea: 'chai',
  coffee: 'kahawa', music: 'muziki', work: 'kazi', research: 'utafiti',
  data: 'data', computer: 'kompyuta', phone: 'simu', of: 'ya',
};
const SKIP = new Set(['a', 'an', 'the']);
const SAMPLES = [
  'Hello, thank you. The child reads a book at school.',
  'Water is life. Good food brings peace.',
  'Language is the house of the people.',
  'The teacher and the student learn together.',
];

function runToy() {
  const input = $('#toy-input').value;
  const out = $('#toy-output');
  const tokens = input.split(/(\s+|[.,!?;:])/).filter((t) => t.length > 0);
  let known = 0, unknown = 0, skipped = 0;
  const html = tokens.map((tok) => {
    if (/^\s+$/.test(tok) || /^[.,!?;:]$/.test(tok)) return tok;
    const w = tok.toLowerCase();
    if (SKIP.has(w)) { skipped++; return ''; }
    if (TOY_DICT[w]) { known++; return `<span class="known">${TOY_DICT[w]}</span>`; }
    unknown++;
    return `<span class="unknown">[${tok}?]</span>`;
  }).join('').replace(/\s+/g, ' ').trim();
  const total = known + unknown;
  const verdict = total === 0
    ? 'Nothing to translate — try one of the sample sentences.'
    : unknown === 0
      ? `All ${known} words were in the toy dictionary — but the word order and grammar are still English, not Swahili. A dictionary cannot translate; a model has to learn the language.`
      : `The toy knew ${known} of ${total} words and failed on ${unknown}. Every [?] is a word a real speaker would need — and in a low-resource language, most words are [?]. That is the gap the lab's dataset and fine-tuning close.`;
  out.innerHTML = `${html || '<em>(empty)</em>'}<span class="verdict">${verdict}</span>`;
}
$('#toy-run').addEventListener('click', runToy);
$('#toy-clear').addEventListener('click', () => { $('#toy-input').value = ''; $('#toy-output').innerHTML = ''; });
$('#sample-chips').innerHTML = SAMPLES.map((s, i) => `<button type="button" data-i="${i}">${s}</button>`).join('');
document.querySelectorAll('#sample-chips button').forEach((btn) => {
  btn.addEventListener('click', () => {
    $('#toy-input').value = SAMPLES[Number(btn.dataset.i)];
    runToy();
  });
});

/* ---------------- Appendix B samples (real model output) ---------------- */
const APPENDIX_SAMPLES = [
  { lang: 'Swahili', dir: 'ltr', text: 'Licha ya kuwakilisha karibu theluthi moja ya lugha za ulimwengu, lugha za Kiafrika zinabaki kutopewa kipaumbele na teknolojia za kisasa za NLP, na asilimia 88 iliyowekwa kama iliyowasilishwa sana au kupuuzwa kabisa katika lugha za hesabu.' },
  { lang: 'Hausa', dir: 'ltr', text: 'Duk da wakiltar kusan kashi aya bisa uku na harsunan duniya, harsunan Afirka sun kasance masu mahimmanci ta hanyar fasahar NLP ta zamani, tare da kashi 88 cikin dari da aka rarraba a matsayin mai tsanani ko kuma ba a kula da su ba a cikin ilimin harshe.' },
  { lang: 'Igbo', dir: 'ltr', text: 'N\u2019agbanyegh\u1ecb na \u1ecd na-an\u1ecdchite ihe f\u1ecd\u1e63 nke nta ka \u1ecd b\u1ee5r\u1ee5 otu \u1ee5z\u1ecd n\u2019\u1ee5z\u1ecd at\u1ecd nke as\u1ee5s\u1ee5 \u1ee5wa, as\u1ee5s\u1ee5 nd\u1ecb Africa ka na-enwegh\u1ecb nkwado site na tekn\u1ee5l\u1ecdj\u1ecb NLP nke oge a, na 88 percent nkewa d\u1ecb ka nd\u1ecb na-an\u1ecdchite anya ma \u1ecd b\u1ee5 na-eleghara anya kpamkpam na as\u1ee5s\u1ee5 k\u1ecdmp\u1ee5ta.' },
  { lang: 'Somali', dir: 'ltr', text: 'In kasta oo ay matalayaan ku dhowaad saddex-meelood meel ka mid ah luqadaha adduunka, haddana luqadaha Afrika waxay weli yihiin kuwo aan si dhab ah loo adeegsan teknoolojiyadda casriga ah ee NLP, iyada oo 88 boqolkiiba lagu tilmaamay inay yihiin kuwo si aad ah loo matalo ama gebi ahaanba loo iska indho-tiray luqadaha xisaabta.' },
  { lang: 'Malagasy', dir: 'ltr', text: 'Na dia manana ny ampahatelon\u2019ny fiteny manerantany aza ny fiteny afrikanina, dia mbola tsy voatsinjara amin\u2019ny teknolojia NLP maoderina izy ireo, izay 88 isan-jato no sokajiana ho tena tsy voatsinjara na tsy noraharahiana tanteraka tamin\u2019ny fiteny kajy.' },
  { lang: 'Arabic', dir: 'rtl', text: '\u0639\u0644\u0649 \u0627\u0644\u0631\u063a\u0645 \u0645\u0646 \u0623\u0646 \u0627\u0644\u0644\u063a\u0627\u062a \u0627\u0644\u0623\u0641\u0631\u064a\u0642\u064a\u0629 \u062a\u0645\u062b\u0644 \u0645\u0627 \u064a\u0642\u0631\u0628 \u0645\u0646 \u062b\u0644\u062b \u0644\u063a\u0627\u062a \u0627\u0644\u0639\u0627\u0644\u0645\u060c \u0625\u0644\u0627 \u0623\u0646\u0647\u0627 \u0644\u0627 \u062a\u0632\u0627\u0644 \u062a\u0639\u0627\u0646\u064a \u0645\u0646 \u0646\u0642\u0635 \u0643\u0628\u064a\u0631 \u0641\u064a \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u0642\u062f\u0645\u0647\u0627 \u062a\u0642\u0646\u064a\u0627\u062a \u0627\u0644\u0628\u0631\u0645\u062c\u0629 \u0627\u0644\u0644\u063a\u0648\u064a\u0629 \u0627\u0644\u062d\u062f\u064a\u062b\u0629\u060c \u062d\u064a\u062b \u064a\u062a\u0645 \u062a\u0635\u0646\u064a\u0641 88\u066a \u0639\u0644\u0649 \u0623\u0646\u0647\u0627 \u0645\u0645\u062b\u0644\u0629 \u062a\u0645\u062b\u064a\u0644\u0627 \u0646\u0627\u0642\u0635\u0627 \u0644\u0644\u063a\u0627\u064a\u0629 \u0623\u0648 \u062a\u0645 \u062a\u062c\u0627\u0647\u0644\u0647\u0627 \u062a\u0645\u0627\u0645\u0627 \u0641\u064a \u0627\u0644\u0644\u0633\u0627\u0646\u064a\u0627\u062a \u0627\u0644\u062d\u0627\u0633\u0648\u0628\u064a\u0629.' },
];

function renderAppendix(i) {
  const s = APPENDIX_SAMPLES[i];
  document.querySelectorAll('#appendix-tabs button').forEach((b, j) => b.classList.toggle('active', j === i));
  const out = $('#appendix-output');
  out.setAttribute('dir', s.dir);
  out.textContent = s.text;
}
$('#appendix-tabs').innerHTML = APPENDIX_SAMPLES.map((s, i) => `<button type="button" role="tab" data-i="${i}">${s.lang}</button>`).join('');
document.querySelectorAll('#appendix-tabs button').forEach((btn) => {
  btn.addEventListener('click', () => renderAppendix(Number(btn.dataset.i)));
});

/* ---------------- init ---------------- */
renderDataset();
renderAvgChart();
renderResults();
renderAppendix(0);
runToy();
