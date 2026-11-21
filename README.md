# The African Languages Lab

## 🔗 Live site: https://african-nlp-tool.onrender.com

An interactive demo website for **“The African Languages Lab: A Collaborative Approach to Advancing Low-Resource African NLP”** (Issaka et al., 2025, [arXiv:2510.05644](https://arxiv.org/abs/2510.05644)). Jemimah Osei is the 16th of 20 authors (Cornell University). The site presents the paper interactively: the problem (88% of African languages severely underrepresented), a dataset explorer covering all 40 languages, and the full model-vs-baseline results across 31 evaluated languages (ChrF++, COMET, BLEU, AfriCOMET, METEOR, TER), plus a try-it demo.

## Architecture

```
Browser ──▶ index.html + styles.css
              │
              ▼
           data.js (paper Tables 2–3) + demo.js (vanilla JS)
```

No backend, no database, no build step. The site is fully static: `data.js` holds the paper's tables (parsed from the arXiv HTML version, so the values match Tables 2 and 3 exactly) and `demo.js` renders the explorers and the try-it demo in the browser. The try-it panel includes a toy English→Swahili baseline that runs in the browser, real fine-tuned-model output transcribed from the paper's Appendix B, and a clearly marked slot where a live model plugs in later (`MODEL_API_URL` in `demo.js`, currently `null`).

## Stack

HTML · CSS · vanilla JavaScript · Render (static site)

## Run it locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

No dependencies, no build step.

## Notes

- Every number on the site comes from the paper itself (abstract, Tables 1–3, §6.2, Appendix B). Nothing is invented. The paper's headline figures are 19 billion tokens / 12,628 hours of audio.
- The live site is on Render's free tier, so the first load can take about a minute while it wakes up.
