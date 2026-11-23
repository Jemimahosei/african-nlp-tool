/* African Languages Lab demo — interactive logic (redesign).
   All numbers come from PAPER_DATA (data.js), transcribed from
   Issaka et al. 2025, arXiv:2510.05644, Tables 2 and 3.
   Behaviours follow Jemimah's redesign mockups:
   - Home: "Dictation" — the paper's first sentence in the lab model's
     own output (Appendix B), switched by language tabs.
   - Dataset: search + sort (Most text / Most speech / A to Z), with a
     live count and an empty state.
   - Results: six score tabs with per-score explanations, an averages
     summary card, search + sort (Biggest improvement / A to Z), and a
     dumbbell view (grey dot = base, blue dot = fine tuned, gold tick =
     Google Translate) with red-pen ticks/crosses.
   - Try it: per-language score lookup with a red-pen remark and the
     Appendix B sample where the paper prints one; plus a translator
     that can only honestly show the paper's own sentence until the
     live model is connected.
   MODEL_API_URL: set this to the fine-tuned model's endpoint when it is
   ready (POST {MODEL_API_URL}/translate {text, target_lang} returning
   {translation}). While it is null, the translator stays in its honest
   "not switched on yet" state for any new sentence. */
const MODEL_API_URL = null;

const DATA = PAPER_DATA;
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

/* ---------------- Appendix B samples (real model output) ----------------
   The paper's Appendix B prints the abstract translated by the lab's
   fine-tuned models. These are the opening sentence, transcribed from
   the paper — the same samples the old site used. They power both the
   home-page Dictation tabs and the Try it translator. */
const APPENDIX_SAMPLES = [
  { lang: 'Swahili', code: 'sw', dir: 'ltr', text: 'Licha ya kuwakilisha karibu theluthi moja ya lugha za ulimwengu, lugha za Kiafrika zinabaki kutopewa kipaumbele na teknolojia za kisasa za NLP, na asilimia 88 iliyowekwa kama iliyowasilishwa sana au kupuuzwa kabisa katika lugha za hesabu.' },
  { lang: 'Hausa', code: 'ha', dir: 'ltr', text: 'Duk da wakiltar kusan kashi aya bisa uku na harsunan duniya, harsunan Afirka sun kasance masu mahimmanci ta hanyar fasahar NLP ta zamani, tare da kashi 88 cikin dari da aka rarraba a matsayin mai tsanani ko kuma ba a kula da su ba a cikin ilimin harshe.' },
  { lang: 'Igbo', code: 'ig', dir: 'ltr', text: 'N’agbanyeghị na ọ na-anọchite ihe fọṣ nke nta ka ọ bụrụ otu ụzọ n’ụzọ atọ nke asụsụ ụwa, asụsụ ndị Africa ka na-enweghị nkwado site na teknụlọjị NLP nke oge a, na 88 percent nkewa dị ka ndị na-anọchite anya ma ọ bụ na-eleghara anya kpamkpam na asụsụ kọmpụta.' },
  { lang: 'Somali', code: 'so', dir: 'ltr', text: 'In kasta oo ay matalayaan ku dhowaad saddex-meelood meel ka mid ah luqadaha adduunka, haddana luqadaha Afrika waxay weli yihiin kuwo aan si dhab ah loo adeegsan teknoolojiyadda casriga ah ee NLP, iyada oo 88 boqolkiiba lagu tilmaamay inay yihiin kuwo si aad ah loo matalo ama gebi ahaanba loo iska indho-tiray luqadaha xisaabta.' },
  { lang: 'Malagasy', code: 'mg', dir: 'ltr', text: 'Na dia manana ny ampahatelon’ny fiteny manerantany aza ny fiteny afrikanina, dia mbola tsy voatsinjara amin’ny teknolojia NLP maoderina izy ireo, izay 88 isan-jato no sokajiana ho tena tsy voatsinjara na tsy noraharahiana tanteraka tamin’ny fiteny kajy.' },
  { lang: 'Arabic', code: 'ar', dir: 'rtl', text: 'على الرغم من أن اللغات الأفريقية تمثل ما يقرب من ثلث لغات العالم، إلا أنها لا تزال تعاني من نقص كبير في الخدمات التي تقدمها تقنيات البرمجة اللغوية الحديثة، حيث يتم تصنيف 88٪ على أنها ممثلة تمثيلا ناقصا للغاية أو تم تجاهلها تماما في اللسانيات الحاسوبية.' },
];
const PAPER_SENTENCE = "Despite representing nearly one third of the world's languages, African languages remain critically underserved by modern NLP technologies, with 88% classified as severely underrepresented or completely ignored in computational linguistics.";

/* ---------------- Home: Dictation tabs ---------------- */
let dictationIndex = 0;

function renderDictation() {
  const s = APPENDIX_SAMPLES[dictationIndex];
  $$('#dictation-tabs button').forEach((b, j) => b.setAttribute('aria-pressed', String(j === dictationIndex)));
  const out = $('#dictation-text');
  out.setAttribute('lang', s.code);
  out.setAttribute('dir', s.dir);
  out.textContent = s.text;
}
$('#dictation-tabs').innerHTML = APPENDIX_SAMPLES.map((s, i) => `<button type="button" class="tab" data-i="${i}" aria-pressed="${i === 0}">${s.lang}</button>`).join('');
$$('#dictation-tabs button').forEach((btn) => {
  btn.addEventListener('click', () => { dictationIndex = Number(btn.dataset.i); renderDictation(); });
});

/* ---------------- Dataset explorer (Table 2) ---------------- */
let datasetSort = 'tokens';
let datasetQuery = '';

function renderDataset() {
  const wrap = $('#dataset-rows');
  let rows = DATA.dataset.filter((d) => d.lang.toLowerCase().includes(datasetQuery));
  const maxTokens = Math.max(...DATA.dataset.map((d) => d.tokens_m));
  const maxHours = Math.max(...DATA.dataset.map((d) => d.hours || 0));
  if (datasetSort === 'tokens') rows.sort((a, b) => b.tokens_m - a.tokens_m);
  if (datasetSort === 'hours') rows.sort((a, b) => (b.hours || 0) - (a.hours || 0));
  if (datasetSort === 'name') rows.sort((a, b) => a.lang.localeCompare(b.lang));
  $('#dataset-count').textContent = `Showing ${rows.length} of ${DATA.dataset.length} languages`;
  $('#dataset-empty').hidden = rows.length !== 0;
  wrap.innerHTML = rows.map((d) => {
    const tw = Math.max(0.6, (d.tokens_m / maxTokens) * 100).toFixed(2);
    const hw = d.hours == null ? '0' : Math.max(0.6, (d.hours / maxHours) * 100).toFixed(2);
    const hrs = d.hours == null
      ? '<span class="no-speech">No speech</span>'
      : d.hours.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return `<div class="ds-row"><strong>${d.lang}</strong><span class="num rnum">${d.tokens_m.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><span class="bar-track"><span class="bar-fill" style="width:${tw}%"></span></span><span class="num rnum">${hrs}</span><span class="bar-track"><span class="bar-fill audio" style="width:${hw}%"></span></span></div>`;
  }).join('');
}

$$('#dataset .pick-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('#dataset .pick-btn').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    datasetSort = btn.dataset.sort;
    renderDataset();
  });
});
$('#dataset-search').addEventListener('input', (e) => {
  datasetQuery = e.target.value.trim().toLowerCase();
  renderDataset();
});
$('#dataset-clear').addEventListener('click', () => {
  $('#dataset-search').value = '';
  datasetQuery = '';
  renderDataset();
});

/* ---------------- Results (Table 3) ---------------- */
const METRICS = {
  chrf:      { name: 'ChrF++',    min: 0,    max: 80,  low: false, text: 'ChrF++ compares characters and short word pieces with a reference translation. Higher is better.' },
  comet:     { name: 'COMET',     min: 0,    max: 1,   low: false, text: 'COMET judges meaning with a neural model, on a scale from 0 to 1. Higher is better.' },
  bleu:      { name: 'BLEU',      min: 0,    max: 60,  low: false, text: 'BLEU counts matching word sequences. Higher is better.' },
  africomet: { name: 'AfriCOMET', min: -0.8, max: 0.8, low: false, text: 'AfriCOMET is a meaning score tuned for African languages. Higher is better.' },
  meteor:    { name: 'METEOR',    min: 0,    max: 0.7, low: false, text: 'METEOR matches words and their variants. Higher is better.' },
  ter:       { name: 'TER',       min: 0,    max: 150, low: true,  text: 'TER counts the edits needed to match a reference translation. Lower is better, so a drop in the Change column is an improvement.' },
};
let currentMetric = 'chrf';
let resultsSort = 'gain';
let resultsQuery = '';

function fmt(v) { return v == null ? 'None' : v.toFixed(2); }
function signed(x) {
  const a = Math.abs(x).toFixed(2);
  return x > 0 ? '+' + a : x < 0 ? '−' + a : a;
}
const TICK = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13l6 6L21 5" fill="none" stroke="#c8231c" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
const CROSS = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" fill="none" stroke="#c8231c" stroke-width="3" stroke-linecap="round"></path></svg>';

function renderResults() {
  const m = METRICS[currentMetric];
  const lowerBetter = m.low;
  const pos = (v) => ((Math.min(m.max, Math.max(m.min, v)) - m.min) / (m.max - m.min)) * 100;
  const all = DATA.results.map((r) => {
    const t = r[currentMetric];
    const gain = t.ours - t.base;
    const good = lowerBetter ? -gain : gain;
    const beats = t.gt != null && (lowerBetter ? t.ours < t.gt : t.ours > t.gt);
    return { name: r.lang, t, gain, good, beats };
  });
  /* summary card (always over all 31 languages, as in the mockup) */
  const a = DATA.averages[currentMetric];
  const withG = all.filter((r) => r.t.gt != null);
  const beatN = withG.filter((r) => r.beats).length;
  const worseN = all.filter((r) => r.good < 0).length;
  $('#metric-explain').textContent = m.text;
  $('#results-summary').textContent = `Average ${m.name}: base model ${a.base.toFixed(2)}, fine tuned ${a.ours.toFixed(2)}, Google Translate ${a.gt.toFixed(2)}.`;
  $('#results-summary-note').textContent = `Fine tuned beats Google Translate in ${beatN} of the ${withG.length} languages Google scores. It did worse than the base model in ${worseN} of 31.`;

  let rows = all.filter((r) => r.name.toLowerCase().includes(resultsQuery));
  if (resultsSort === 'gain') rows.sort((a2, b2) => b2.good - a2.good);
  if (resultsSort === 'name') rows.sort((a2, b2) => a2.name.localeCompare(b2.name));
  $('#results-empty').hidden = rows.length !== 0;
  $('#results-rows').innerHTML = rows.map((r) => {
    const b = pos(r.t.base), o = pos(r.t.ours), g = r.t.gt == null ? 0 : pos(r.t.gt);
    const worse = r.good < 0;
    const changeCls = worse ? 'change-worse' : r.good === 0 ? 'change-same' : 'change-better';
    const note = worse ? 'Worse than the base model' : r.beats ? 'Beats Google Translate' : r.good > 0 ? 'Better than the base model' : 'No change';
    const noteCls = worse ? 'note-worse' : r.beats ? 'note-beats' : 'note-plain';
    const marks = worse ? CROSS : r.good > 0 ? TICK + (r.beats ? TICK : '') : '';
    const dumbbell = `<span class="dumbbell" aria-hidden="true"><span class="axis"></span><span class="span" style="left:${Math.min(b, o).toFixed(2)}%;width:${Math.abs(o - b).toFixed(2)}%"></span>${r.t.gt == null ? '' : `<span class="gt-mark" style="left:${g.toFixed(2)}%"></span>`}<span class="base-dot" style="left:${b.toFixed(2)}%"></span><span class="ours-dot" style="left:${o.toFixed(2)}%"></span></span>`;
    return `<div class="rs-row"><strong>${r.name}</strong>${dumbbell}<span class="num rnum muted">${fmt(r.t.base)}</span><strong class="num rnum">${fmt(r.t.ours)}</strong><span class="num rnum muted">${fmt(r.t.gt)}</span><span class="num rnum ${changeCls}" style="font-weight:600">${signed(r.gain)}</span><span class="note-cell ${noteCls}">${marks}<span>${note}</span></span></div>`;
  }).join('');
}

$$('#results [data-metric]').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('#results [data-metric]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    currentMetric = btn.dataset.metric;
    renderResults();
  });
});
$$('#results [data-rsort]').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('#results [data-rsort]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    resultsSort = btn.dataset.rsort;
    renderResults();
  });
});
$('#results-search').addEventListener('input', (e) => {
  resultsQuery = e.target.value.trim().toLowerCase();
  renderResults();
});
$('#results-clear').addEventListener('click', () => {
  $('#results-search').value = '';
  resultsQuery = '';
  renderResults();
});

/* ---------------- Try it: look up a language ---------------- */
const LOOKUP_LANGS = DATA.results.slice().sort((a, b) => a.lang.localeCompare(b.lang));

function renderLookup() {
  const name = $('#lookup-lang').value;
  const r = LOOKUP_LANGS.find((x) => x.lang === name) || LOOKUP_LANGS[0];
  const rows = [
    { label: 'Base model', key: 'base', ours: false },
    { label: 'Fine tuned by the lab', key: 'ours', ours: true },
    { label: 'Google Translate', key: 'gt', ours: false },
  ];
  $('#lookup-rows').innerHTML = rows.map((row) => `<div class="score-row${row.ours ? ' ours-row' : ''}"><span class="row-label">${row.label}</span><span class="num rnum" style="font-weight:${row.ours ? '700' : '400'}">${fmt(r.chrf[row.key])}</span><span class="num rnum" style="font-weight:${row.ours ? '700' : '400'}">${fmt(r.comet[row.key])}</span><span class="num rnum" style="font-weight:${row.ours ? '700' : '400'}">${fmt(r.bleu[row.key])}</span></div>`).join('');

  const c = r.chrf;
  const up = c.ours - c.base;
  $('#lookup-remark').textContent = `${r.lang}: ChrF++ went from ${c.base.toFixed(2)} to ${c.ours.toFixed(2)}` + (
    up < 0 ? ', which is worse than the base model.'
      : c.gt == null ? '. Google Translate has no score here.'
        : c.ours > c.gt ? `, beating Google Translate at ${c.gt.toFixed(2)}.`
          : `. Google Translate scored ${c.gt.toFixed(2)}.`
  );

  const sample = APPENDIX_SAMPLES.find((s) => s.lang === r.lang);
  $('#lookup-sample').hidden = !sample;
  $('#lookup-nosample').hidden = !!sample;
  if (sample) {
    const out = $('#lookup-sample-text');
    out.setAttribute('lang', sample.code);
    out.setAttribute('dir', sample.dir);
    out.textContent = sample.text;
  }
}
$('#lookup-lang').innerHTML = LOOKUP_LANGS.map((r) => `<option value="${r.lang}"${r.lang === 'Swahili' ? ' selected' : ''}>${r.lang}</option>`).join('');
$('#lookup-lang').addEventListener('change', renderLookup);

/* ---------------- Try it: translate a sentence ---------------- */
let translateState = 'idle'; // idle | result | offline
const TRANSLATE_LANGS = APPENDIX_SAMPLES.slice().sort((a, b) => a.lang.localeCompare(b.lang));

function showTranslateState() {
  $('#translate-idle').hidden = translateState !== 'idle';
  $('#translate-result').hidden = translateState !== 'result';
  $('#translate-offline').hidden = translateState !== 'offline';
}
function renderTranslateResult(sample) {
  $('#translate-out-lang').textContent = sample.lang;
  const out = $('#translate-out-text');
  out.setAttribute('lang', sample.code);
  out.setAttribute('dir', sample.dir);
  out.textContent = sample.text;
}
$('#translate-lang').innerHTML = TRANSLATE_LANGS.map((s) => `<option value="${s.lang}"${s.lang === 'Swahili' ? ' selected' : ''}>${s.lang}</option>`).join('');
$('#translate-input').addEventListener('input', () => { translateState = 'idle'; showTranslateState(); });
$('#translate-lang').addEventListener('change', () => { translateState = 'idle'; showTranslateState(); });
$('#translate-usepaper').addEventListener('click', () => {
  $('#translate-input').value = PAPER_SENTENCE;
  translateState = 'idle';
  showTranslateState();
});
$('#translate-run').addEventListener('click', async () => {
  const text = $('#translate-input').value;
  const target = TRANSLATE_LANGS.find((s) => s.lang === $('#translate-lang').value);
  if (MODEL_API_URL) {
    try {
      const res = await fetch(`${MODEL_API_URL}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, target_lang: target.code }),
      });
      if (!res.ok) throw new Error('model endpoint error');
      const data = await res.json();
      renderTranslateResult({ ...target, text: data.translation });
      translateState = 'result';
    } catch (err) {
      translateState = 'offline';
    }
    showTranslateState();
    return;
  }
  if (text.trim() === PAPER_SENTENCE) {
    renderTranslateResult(target);
    translateState = 'result';
  } else {
    translateState = 'offline';
  }
  showTranslateState();
});

/* ---------------- init ---------------- */
renderDictation();
renderDataset();
renderResults();
renderLookup();
showTranslateState();
