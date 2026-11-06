// Data transcribed from Issaka et al. 2025, arXiv:2510.05644
// Table 2 (dataset composition, 40 languages) and Table 3 (translation results, 31 languages).
// "base" = base Llama-3.2-1B, "ours" = fine-tuned Llama-3.2-1B, "gt" = Google Translate (null = not available).
// The paper prints "Afrkaans" in Table 3; corrected to "Afrikaans" here. Tshiluba baseline BLEU is printed as 5.856.
const PAPER_DATA = {
  "dataset": [
    {
      "lang": "Amharic",
      "tokens_m": 2944.95,
      "hours": 238.0
    },
    {
      "lang": "Sesotho",
      "tokens_m": 274.61,
      "hours": 114.7
    },
    {
      "lang": "Tshiluba",
      "tokens_m": 54.93,
      "hours": null
    },
    {
      "lang": "Arabic",
      "tokens_m": 2400.0,
      "hours": 2721.52
    },
    {
      "lang": "Oromo",
      "tokens_m": 252.82,
      "hours": 145.0
    },
    {
      "lang": "Mossi",
      "tokens_m": 50.59,
      "hours": null
    },
    {
      "lang": "Yoruba",
      "tokens_m": 2362.7,
      "hours": 128.3
    },
    {
      "lang": "Chewa",
      "tokens_m": 230.63,
      "hours": 35.0
    },
    {
      "lang": "Kikongo",
      "tokens_m": 46.59,
      "hours": null
    },
    {
      "lang": "Afrikaans",
      "tokens_m": 2295.09,
      "hours": 138.0
    },
    {
      "lang": "Rundi",
      "tokens_m": 172.61,
      "hours": null
    },
    {
      "lang": "Ewe",
      "tokens_m": 31.74,
      "hours": 147.0
    },
    {
      "lang": "Hausa",
      "tokens_m": 1538.84,
      "hours": 239.0
    },
    {
      "lang": "Luganda",
      "tokens_m": 121.17,
      "hours": 1727.8
    },
    {
      "lang": "Berber",
      "tokens_m": 28.86,
      "hours": 19.33
    },
    {
      "lang": "Tigrinya",
      "tokens_m": 916.42,
      "hours": 1.0
    },
    {
      "lang": "Tswana",
      "tokens_m": 118.84,
      "hours": 111.7
    },
    {
      "lang": "Krio",
      "tokens_m": 22.76,
      "hours": 80.0
    },
    {
      "lang": "Malagasy",
      "tokens_m": 839.12,
      "hours": 325.14
    },
    {
      "lang": "Bambara",
      "tokens_m": 109.49,
      "hours": 30.6
    },
    {
      "lang": "Bemba",
      "tokens_m": 8.6,
      "hours": 230.3
    },
    {
      "lang": "Somali",
      "tokens_m": 751.13,
      "hours": 115.4
    },
    {
      "lang": "Lingala",
      "tokens_m": 102.19,
      "hours": 194.3
    },
    {
      "lang": "Kanuri",
      "tokens_m": 6.18,
      "hours": null
    },
    {
      "lang": "Swahili",
      "tokens_m": 700.39,
      "hours": 1115.0
    },
    {
      "lang": "Twi",
      "tokens_m": 86.49,
      "hours": 227.03
    },
    {
      "lang": "Umbundu",
      "tokens_m": 5.1,
      "hours": null
    },
    {
      "lang": "Xhosa",
      "tokens_m": 563.07,
      "hours": 123.7
    },
    {
      "lang": "Fon",
      "tokens_m": 77.27,
      "hours": 18.5
    },
    {
      "lang": "Kiluba",
      "tokens_m": 2.02,
      "hours": null
    },
    {
      "lang": "Zulu",
      "tokens_m": 553.67,
      "hours": 83.2
    },
    {
      "lang": "Fula",
      "tokens_m": 72.4,
      "hours": 124.0
    },
    {
      "lang": "Ngambay",
      "tokens_m": 1.03,
      "hours": null
    },
    {
      "lang": "Igbo",
      "tokens_m": 433.28,
      "hours": 25.0
    },
    {
      "lang": "Kikuyu",
      "tokens_m": 66.34,
      "hours": 44.0
    },
    {
      "lang": "Mandinka",
      "tokens_m": 0.41,
      "hours": null
    },
    {
      "lang": "Shona",
      "tokens_m": 428.25,
      "hours": 103.0
    },
    {
      "lang": "Wolof",
      "tokens_m": 57.46,
      "hours": 183.2
    },
    {
      "lang": "Fang",
      "tokens_m": 0.02,
      "hours": null
    },
    {
      "lang": "Kinyarwanda",
      "tokens_m": 283.4,
      "hours": 3839.0
    }
  ],
  "results": [
    {
      "lang": "Amharic",
      "chrf": {
        "base": 3.26,
        "ours": 28.69,
        "gt": 30.24
      },
      "comet": {
        "base": 0.38,
        "ours": 0.82,
        "gt": 0.88
      },
      "bleu": {
        "base": 3.83,
        "ours": 12.16,
        "gt": 16.11
      },
      "africomet": {
        "base": 0.14,
        "ours": 0.56,
        "gt": 0.72
      },
      "meteor": {
        "base": 0.01,
        "ours": 0.3,
        "gt": 0.4
      },
      "ter": {
        "base": 58.4,
        "ours": 64.24,
        "gt": 58.4
      }
    },
    {
      "lang": "Fula",
      "chrf": {
        "base": 2.97,
        "ours": 18.73,
        "gt": null
      },
      "comet": {
        "base": 0.32,
        "ours": 0.55,
        "gt": null
      },
      "bleu": {
        "base": 0.14,
        "ours": 5.73,
        "gt": null
      },
      "africomet": {
        "base": 0.03,
        "ours": 0.15,
        "gt": null
      },
      "meteor": {
        "base": 0.08,
        "ours": 0.06,
        "gt": null
      },
      "ter": {
        "base": 1151.08,
        "ours": 72.22,
        "gt": null
      }
    },
    {
      "lang": "Yoruba",
      "chrf": {
        "base": 3.77,
        "ours": 30.88,
        "gt": 21.05
      },
      "comet": {
        "base": 0.23,
        "ours": 0.67,
        "gt": 0.56
      },
      "bleu": {
        "base": 0.41,
        "ours": 32.33,
        "gt": 11.96
      },
      "africomet": {
        "base": 0.01,
        "ours": 0.6,
        "gt": 0.55
      },
      "meteor": {
        "base": 0.05,
        "ours": 0.27,
        "gt": 0.16
      },
      "ter": {
        "base": 525.95,
        "ours": 84.31,
        "gt": 76.28
      }
    },
    {
      "lang": "Igbo",
      "chrf": {
        "base": 5.3,
        "ours": 33.42,
        "gt": 45.92
      },
      "comet": {
        "base": 0.27,
        "ours": 0.71,
        "gt": 0.72
      },
      "bleu": {
        "base": 0.65,
        "ours": 14.1,
        "gt": 36.09
      },
      "africomet": {
        "base": -0.7,
        "ours": 0.52,
        "gt": 0.57
      },
      "meteor": {
        "base": 0.06,
        "ours": 0.41,
        "gt": 0.43
      },
      "ter": {
        "base": 523.93,
        "ours": 73.11,
        "gt": 52.8
      }
    },
    {
      "lang": "Oromo",
      "chrf": {
        "base": 11.3,
        "ours": 27.74,
        "gt": 54.93
      },
      "comet": {
        "base": 0.31,
        "ours": 0.7,
        "gt": 0.8
      },
      "bleu": {
        "base": 5.54,
        "ours": 5.72,
        "gt": 33.57
      },
      "africomet": {
        "base": 0.13,
        "ours": 0.29,
        "gt": 0.66
      },
      "meteor": {
        "base": 0.06,
        "ours": 0.12,
        "gt": 0.29
      },
      "ter": {
        "base": 77.62,
        "ours": 119.01,
        "gt": 56.92
      }
    },
    {
      "lang": "Swahili",
      "chrf": {
        "base": 9.0,
        "ours": 72.27,
        "gt": 75.81
      },
      "comet": {
        "base": 0.4,
        "ours": 0.78,
        "gt": 0.85
      },
      "bleu": {
        "base": 0.54,
        "ours": 56.23,
        "gt": 54.81
      },
      "africomet": {
        "base": -0.2,
        "ours": 0.62,
        "gt": 0.72
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.57,
        "gt": 0.65
      },
      "ter": {
        "base": 1021.93,
        "ours": 23.77,
        "gt": 23.77
      }
    },
    {
      "lang": "Hausa",
      "chrf": {
        "base": 7.75,
        "ours": 51.77,
        "gt": 54.6
      },
      "comet": {
        "base": 0.39,
        "ours": 0.7,
        "gt": 0.8
      },
      "bleu": {
        "base": 0.57,
        "ours": 22.38,
        "gt": 45.49
      },
      "africomet": {
        "base": 0.01,
        "ours": 0.47,
        "gt": 0.64
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.41,
        "gt": 0.53
      },
      "ter": {
        "base": 993.66,
        "ours": 52.3,
        "gt": 64.37
      }
    },
    {
      "lang": "Twi(Asante)",
      "chrf": {
        "base": 4.0,
        "ours": 46.8,
        "gt": 31.48
      },
      "comet": {
        "base": 0.26,
        "ours": 0.71,
        "gt": 0.71
      },
      "bleu": {
        "base": 0.29,
        "ours": 27.36,
        "gt": 17.81
      },
      "africomet": {
        "base": -0.06,
        "ours": 0.3,
        "gt": 0.36
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.29,
        "gt": 0.33
      },
      "ter": {
        "base": 656.31,
        "ours": 49.12,
        "gt": 64.24
      }
    },
    {
      "lang": "Shona",
      "chrf": {
        "base": 7.52,
        "ours": 36.55,
        "gt": 51.93
      },
      "comet": {
        "base": 0.27,
        "ours": 0.6,
        "gt": 0.63
      },
      "bleu": {
        "base": 0.25,
        "ours": 12.06,
        "gt": 18.05
      },
      "africomet": {
        "base": 0.01,
        "ours": 0.47,
        "gt": 0.59
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.28,
        "gt": 0.34
      },
      "ter": {
        "base": 1318.15,
        "ours": 99.15,
        "gt": 64.16
      }
    },
    {
      "lang": "Kinyarwanda",
      "chrf": {
        "base": 5.62,
        "ours": 24.65,
        "gt": 70.27
      },
      "comet": {
        "base": 0.28,
        "ours": 0.56,
        "gt": 0.67
      },
      "bleu": {
        "base": 0.37,
        "ours": 17.25,
        "gt": 49.6
      },
      "africomet": {
        "base": -0.18,
        "ours": 0.4,
        "gt": 0.66
      },
      "meteor": {
        "base": 0.04,
        "ours": 0.23,
        "gt": 0.48
      },
      "ter": {
        "base": 428.45,
        "ours": 65.53,
        "gt": 30.24
      }
    },
    {
      "lang": "Ewe",
      "chrf": {
        "base": 3.05,
        "ours": 33.48,
        "gt": 47.86
      },
      "comet": {
        "base": 0.22,
        "ours": 0.26,
        "gt": 0.37
      },
      "bleu": {
        "base": 0.27,
        "ours": 31.55,
        "gt": 25.79
      },
      "africomet": {
        "base": 0.06,
        "ours": 0.24,
        "gt": 0.33
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.26,
        "gt": 0.37
      },
      "ter": {
        "base": 689.73,
        "ours": 93.32,
        "gt": 48.69
      }
    },
    {
      "lang": "Bambara",
      "chrf": {
        "base": 4.06,
        "ours": 15.6,
        "gt": 27.02
      },
      "comet": {
        "base": 0.25,
        "ours": 0.65,
        "gt": 0.72
      },
      "bleu": {
        "base": 0.18,
        "ours": 22.5,
        "gt": 13.6
      },
      "africomet": {
        "base": 0.08,
        "ours": 0.22,
        "gt": 0.39
      },
      "meteor": {
        "base": 0.08,
        "ours": 0.2,
        "gt": 0.29
      },
      "ter": {
        "base": 766.87,
        "ours": 49.33,
        "gt": 112.12
      }
    },
    {
      "lang": "Wolof",
      "chrf": {
        "base": 2.0,
        "ours": 12.01,
        "gt": null
      },
      "comet": {
        "base": 0.3,
        "ours": 0.61,
        "gt": null
      },
      "bleu": {
        "base": 0.16,
        "ours": 2.68,
        "gt": null
      },
      "africomet": {
        "base": 0.07,
        "ours": 0.25,
        "gt": null
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.28,
        "gt": null
      },
      "ter": {
        "base": 1030.14,
        "ours": 84.83,
        "gt": null
      }
    },
    {
      "lang": "Luganda",
      "chrf": {
        "base": 7.08,
        "ours": 24.91,
        "gt": 23.55
      },
      "comet": {
        "base": 0.28,
        "ours": 0.64,
        "gt": 0.63
      },
      "bleu": {
        "base": 0.41,
        "ours": 3.84,
        "gt": 3.96
      },
      "africomet": {
        "base": -0.05,
        "ours": 0.55,
        "gt": 0.57
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.31,
        "gt": 0.33
      },
      "ter": {
        "base": 980.96,
        "ours": 74.57,
        "gt": 63.1
      }
    },
    {
      "lang": "Arabic",
      "chrf": {
        "base": 8.67,
        "ours": 31.52,
        "gt": 28.46
      },
      "comet": {
        "base": 0.52,
        "ours": 0.85,
        "gt": 0.89
      },
      "bleu": {
        "base": 0.3,
        "ours": 23.36,
        "gt": 21.41
      },
      "africomet": {
        "base": 0.21,
        "ours": 0.7,
        "gt": 0.77
      },
      "meteor": {
        "base": 0.08,
        "ours": 0.52,
        "gt": 0.55
      },
      "ter": {
        "base": 1164.7,
        "ours": 67.0,
        "gt": 67.0
      }
    },
    {
      "lang": "Somali",
      "chrf": {
        "base": 7.11,
        "ours": 35.64,
        "gt": 47.32
      },
      "comet": {
        "base": 0.37,
        "ours": 0.76,
        "gt": 0.8
      },
      "bleu": {
        "base": 0.41,
        "ours": 8.99,
        "gt": 12.9
      },
      "africomet": {
        "base": 0.03,
        "ours": 0.51,
        "gt": 0.62
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.32,
        "gt": 0.37
      },
      "ter": {
        "base": 442.6,
        "ours": 65.09,
        "gt": 60.75
      }
    },
    {
      "lang": "Afrikaans",
      "chrf": {
        "base": 44.76,
        "ours": 48.07,
        "gt": 52.1
      },
      "comet": {
        "base": 0.68,
        "ours": 0.86,
        "gt": 0.85
      },
      "bleu": {
        "base": 32.98,
        "ours": 18.0,
        "gt": 27.25
      },
      "africomet": {
        "base": 0.37,
        "ours": 0.74,
        "gt": 0.73
      },
      "meteor": {
        "base": 0.35,
        "ours": 0.66,
        "gt": 0.65
      },
      "ter": {
        "base": 52.61,
        "ours": 48.23,
        "gt": 39.46
      }
    },
    {
      "lang": "Tigrinya",
      "chrf": {
        "base": 5.43,
        "ours": 24.12,
        "gt": 23.75
      },
      "comet": {
        "base": 0.27,
        "ours": 0.76,
        "gt": 0.83
      },
      "bleu": {
        "base": 2.77,
        "ours": 13.65,
        "gt": 13.0
      },
      "africomet": {
        "base": 0.04,
        "ours": 0.43,
        "gt": 0.7
      },
      "meteor": {
        "base": 0.01,
        "ours": 0.16,
        "gt": 0.23
      },
      "ter": {
        "base": 78.33,
        "ours": 36.55,
        "gt": 78.33
      }
    },
    {
      "lang": "Malagasy",
      "chrf": {
        "base": 9.39,
        "ours": 26.29,
        "gt": 43.06
      },
      "comet": {
        "base": 0.42,
        "ours": 0.8,
        "gt": 0.76
      },
      "bleu": {
        "base": 0.32,
        "ours": 22.49,
        "gt": 9.1
      },
      "africomet": {
        "base": 0.13,
        "ours": 0.61,
        "gt": 0.45
      },
      "meteor": {
        "base": 0.06,
        "ours": 0.39,
        "gt": 0.36
      },
      "ter": {
        "base": 856.18,
        "ours": 57.08,
        "gt": 57.08
      }
    },
    {
      "lang": "Xhosa",
      "chrf": {
        "base": 6.58,
        "ours": 46.17,
        "gt": 47.88
      },
      "comet": {
        "base": 0.35,
        "ours": 0.75,
        "gt": 0.7
      },
      "bleu": {
        "base": 0.63,
        "ours": 12.87,
        "gt": 14.95
      },
      "africomet": {
        "base": 0.21,
        "ours": 0.55,
        "gt": 0.41
      },
      "meteor": {
        "base": 0.09,
        "ours": 0.33,
        "gt": 0.31
      },
      "ter": {
        "base": 561.279,
        "ours": 71.79,
        "gt": 58.74
      }
    },
    {
      "lang": "Zulu",
      "chrf": {
        "base": 7.58,
        "ours": 38.06,
        "gt": 64.45
      },
      "comet": {
        "base": 0.32,
        "ours": 0.76,
        "gt": 0.73
      },
      "bleu": {
        "base": 0.37,
        "ours": 5.9,
        "gt": 34.57
      },
      "africomet": {
        "base": 0.09,
        "ours": 0.62,
        "gt": 0.54
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.41,
        "gt": 0.35
      },
      "ter": {
        "base": 728.98,
        "ours": 89.52,
        "gt": 51.16
      }
    },
    {
      "lang": "Sesotho",
      "chrf": {
        "base": 7.09,
        "ours": 61.79,
        "gt": 57.01
      },
      "comet": {
        "base": 0.28,
        "ours": 0.61,
        "gt": 0.66
      },
      "bleu": {
        "base": 0.14,
        "ours": 51.16,
        "gt": 33.25
      },
      "africomet": {
        "base": 0.14,
        "ours": 0.59,
        "gt": 0.65
      },
      "meteor": {
        "base": 0.08,
        "ours": 0.31,
        "gt": 0.44
      },
      "ter": {
        "base": 1475.22,
        "ours": 63.22,
        "gt": 45.66
      }
    },
    {
      "lang": "Chewa",
      "chrf": {
        "base": 4.76,
        "ours": 28.57,
        "gt": 34.29
      },
      "comet": {
        "base": 0.28,
        "ours": 0.62,
        "gt": 0.61
      },
      "bleu": {
        "base": 0.0,
        "ours": 13.0,
        "gt": 12.67
      },
      "africomet": {
        "base": -0.02,
        "ours": 0.56,
        "gt": 0.44
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.35,
        "gt": 0.31
      },
      "ter": {
        "base": 876.28,
        "ours": 72.16,
        "gt": 67.01
      }
    },
    {
      "lang": "Lingala",
      "chrf": {
        "base": 5.91,
        "ours": 33.32,
        "gt": 38.14
      },
      "comet": {
        "base": 0.3,
        "ours": 0.58,
        "gt": 0.65
      },
      "bleu": {
        "base": 0.23,
        "ours": 18.21,
        "gt": 16.82
      },
      "africomet": {
        "base": 0.0,
        "ours": 0.12,
        "gt": 0.4
      },
      "meteor": {
        "base": 0.08,
        "ours": 0.23,
        "gt": 0.45
      },
      "ter": {
        "base": 955.39,
        "ours": 80.32,
        "gt": 54.96
      }
    },
    {
      "lang": "Tswana",
      "chrf": {
        "base": 8.59,
        "ours": 26.37,
        "gt": null
      },
      "comet": {
        "base": 0.28,
        "ours": 0.63,
        "gt": null
      },
      "bleu": {
        "base": 0.69,
        "ours": 16.98,
        "gt": null
      },
      "africomet": {
        "base": 0.11,
        "ours": 0.38,
        "gt": null
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.27,
        "gt": null
      },
      "ter": {
        "base": 413.87,
        "ours": 65.69,
        "gt": null
      }
    },
    {
      "lang": "Fon",
      "chrf": {
        "base": 10.57,
        "ours": 9.47,
        "gt": null
      },
      "comet": {
        "base": 0.16,
        "ours": 0.6,
        "gt": null
      },
      "bleu": {
        "base": 5.14,
        "ours": 6.5,
        "gt": null
      },
      "africomet": {
        "base": 0.14,
        "ours": 0.04,
        "gt": null
      },
      "meteor": {
        "base": 0.06,
        "ours": 0.06,
        "gt": null
      },
      "ter": {
        "base": 56.15,
        "ours": 29.73,
        "gt": null
      }
    },
    {
      "lang": "Kikuyu",
      "chrf": {
        "base": 9.77,
        "ours": 25.8,
        "gt": null
      },
      "comet": {
        "base": 0.27,
        "ours": 0.55,
        "gt": null
      },
      "bleu": {
        "base": 0.28,
        "ours": 17.92,
        "gt": null
      },
      "africomet": {
        "base": 0.03,
        "ours": 0.03,
        "gt": null
      },
      "meteor": {
        "base": 0.07,
        "ours": 0.09,
        "gt": null
      },
      "ter": {
        "base": 943.7,
        "ours": 59.38,
        "gt": null
      }
    },
    {
      "lang": "Tshiluba",
      "chrf": {
        "base": 15.68,
        "ours": 22.1,
        "gt": null
      },
      "comet": {
        "base": 0.31,
        "ours": 0.55,
        "gt": null
      },
      "bleu": {
        "base": 5.856,
        "ours": 7.44,
        "gt": null
      },
      "africomet": {
        "base": 0.2,
        "ours": 0.12,
        "gt": null
      },
      "meteor": {
        "base": 0.11,
        "ours": 0.11,
        "gt": null
      },
      "ter": {
        "base": 61.49,
        "ours": 52.71,
        "gt": null
      }
    },
    {
      "lang": "Mossi",
      "chrf": {
        "base": 12.82,
        "ours": 23.99,
        "gt": null
      },
      "comet": {
        "base": 0.28,
        "ours": 0.51,
        "gt": null
      },
      "bleu": {
        "base": 5.86,
        "ours": 9.62,
        "gt": null
      },
      "africomet": {
        "base": 0.18,
        "ours": -0.03,
        "gt": null
      },
      "meteor": {
        "base": 0.08,
        "ours": 0.09,
        "gt": null
      },
      "ter": {
        "base": 57.02,
        "ours": 81.46,
        "gt": null
      }
    },
    {
      "lang": "Kikongo",
      "chrf": {
        "base": 6.18,
        "ours": 20.84,
        "gt": null
      },
      "comet": {
        "base": 0.31,
        "ours": 0.55,
        "gt": null
      },
      "bleu": {
        "base": 0.38,
        "ours": 6.15,
        "gt": null
      },
      "africomet": {
        "base": -0.05,
        "ours": 0.07,
        "gt": null
      },
      "meteor": {
        "base": 0.05,
        "ours": 0.16,
        "gt": null
      },
      "ter": {
        "base": 318.97,
        "ours": 44.51,
        "gt": null
      }
    },
    {
      "lang": "Bemba",
      "chrf": {
        "base": 3.59,
        "ours": 25.79,
        "gt": null
      },
      "comet": {
        "base": 0.31,
        "ours": 0.46,
        "gt": null
      },
      "bleu": {
        "base": 0.25,
        "ours": 27.69,
        "gt": null
      },
      "africomet": {
        "base": 0.09,
        "ours": 0.07,
        "gt": null
      },
      "meteor": {
        "base": 0.1,
        "ours": 0.1,
        "gt": null
      },
      "ter": {
        "base": 755.92,
        "ours": 48.63,
        "gt": null
      }
    }
  ],
  "averages": {
    "chrf": {
      "base": 8.1,
      "ours": 31.79,
      "gt": 44.14
    },
    "comet": {
      "base": 0.32,
      "ours": 0.65,
      "gt": 0.72
    },
    "bleu": {
      "base": 2.27,
      "ours": 17.61,
      "gt": 23.76
    },
    "africomet": {
      "base": 0.04,
      "ours": 0.38,
      "gt": 0.57
    },
    "meteor": {
      "base": 0.08,
      "ours": 0.28,
      "gt": 0.39
    },
    "ter": {
      "base": 645.87,
      "ours": 65.74,
      "gt": 58.87
    }
  }
};
