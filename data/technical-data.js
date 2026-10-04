window.TECHNICAL_DATA = {
  "version": "1.2",
  "sources": {
    "westtools": {
      "role": "Diâmetro de broca para pré-furo e fórmulas do material original"
    },
    "threadlib": {
      "repository": "https://github.com/adrianschlatter/threadlib",
      "file": "THREAD_TABLE.scad",
      "role": "Validação de família, designação, passo e geometria de rosca",
      "limitations": "Não usar como fonte de broca de pré-furo. O repositório suporta métricas, Unified e BSP paralela; não declara BSW ou NPT na lista de famílias suportadas."
    }
  },
  "threads": [
    {
      "id": "metric-3-0_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M3x0.50",
      "diametroNominalMm": 3.0,
      "passoMm": 0.5,
      "brocaMm": 2.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-3_5-0_60",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M3.5x0.60",
      "diametroNominalMm": 3.5,
      "passoMm": 0.6,
      "brocaMm": 2.9,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-4-0_70",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M4x0.70",
      "diametroNominalMm": 4.0,
      "passoMm": 0.7,
      "brocaMm": 3.3,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-4_5-0_75",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M4.5x0.75",
      "diametroNominalMm": 4.5,
      "passoMm": 0.75,
      "brocaMm": 3.75,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-5-0_80",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M5x0.80",
      "diametroNominalMm": 5.0,
      "passoMm": 0.8,
      "brocaMm": 4.2,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-6-1_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M6x1.00",
      "diametroNominalMm": 6.0,
      "passoMm": 1.0,
      "brocaMm": 5.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-7-1_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M7x1.00",
      "diametroNominalMm": 7.0,
      "passoMm": 1.0,
      "brocaMm": 6.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-8-1_25",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M8x1.25",
      "diametroNominalMm": 8.0,
      "passoMm": 1.25,
      "brocaMm": 6.75,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-9-1_25",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M9x1.25",
      "diametroNominalMm": 9.0,
      "passoMm": 1.25,
      "brocaMm": 7.75,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-10-1_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M10x1.50",
      "diametroNominalMm": 10.0,
      "passoMm": 1.5,
      "brocaMm": 8.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-11-1_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M11x1.50",
      "diametroNominalMm": 11.0,
      "passoMm": 1.5,
      "brocaMm": 9.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-12-1_75",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M12x1.75",
      "diametroNominalMm": 12.0,
      "passoMm": 1.75,
      "brocaMm": 10.25,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-14-2_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M14x2.00",
      "diametroNominalMm": 14.0,
      "passoMm": 2.0,
      "brocaMm": 12.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-16-2_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M16x2.00",
      "diametroNominalMm": 16.0,
      "passoMm": 2.0,
      "brocaMm": 14.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-18-2_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M18x2.50",
      "diametroNominalMm": 18.0,
      "passoMm": 2.5,
      "brocaMm": 15.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-20-2_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M20x2.50",
      "diametroNominalMm": 20.0,
      "passoMm": 2.5,
      "brocaMm": 17.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-22-2_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M22x2.50",
      "diametroNominalMm": 22.0,
      "passoMm": 2.5,
      "brocaMm": 19.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-24-3_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M24x3.00",
      "diametroNominalMm": 24.0,
      "passoMm": 3.0,
      "brocaMm": 21.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-27-3_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M27x3.00",
      "diametroNominalMm": 27.0,
      "passoMm": 3.0,
      "brocaMm": 24.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-30-3_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M30x3.50",
      "diametroNominalMm": 30.0,
      "passoMm": 3.5,
      "brocaMm": 26.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-33-3_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M33x3.50",
      "diametroNominalMm": 33.0,
      "passoMm": 3.5,
      "brocaMm": 29.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-36-4_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M36x4.00",
      "diametroNominalMm": 36.0,
      "passoMm": 4.0,
      "brocaMm": 32.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-39-4_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M39x4.00",
      "diametroNominalMm": 39.0,
      "passoMm": 4.0,
      "brocaMm": 35.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-42-4_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M42x4.50",
      "diametroNominalMm": 42.0,
      "passoMm": 4.5,
      "brocaMm": 37.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-45-4_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M45x4.50",
      "diametroNominalMm": 45.0,
      "passoMm": 4.5,
      "brocaMm": 40.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-48-5_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M48x5.00",
      "diametroNominalMm": 48.0,
      "passoMm": 5.0,
      "brocaMm": 43.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-52-5_00",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M52x5.00",
      "diametroNominalMm": 52.0,
      "passoMm": 5.0,
      "brocaMm": 47.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-56-5_50",
      "familia": "metric-coarse",
      "tipo": "M Rosca ISO Métrica Grossa 60°",
      "designacao": "M56x5.50",
      "diametroNominalMm": 56.0,
      "passoMm": 5.5,
      "brocaMm": 50.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-3-0_35",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M3x0.35",
      "diametroNominalMm": 3.0,
      "passoMm": 0.35,
      "brocaMm": 2.65,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-3_5-0_35",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M3.5x0.35",
      "diametroNominalMm": 3.5,
      "passoMm": 0.35,
      "brocaMm": 3.15,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-4-0_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M4x0.50",
      "diametroNominalMm": 4.0,
      "passoMm": 0.5,
      "brocaMm": 3.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-4_5-0_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M4.5x0.50",
      "diametroNominalMm": 4.5,
      "passoMm": 0.5,
      "brocaMm": 4.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-5-0_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M5x0.50",
      "diametroNominalMm": 5.0,
      "passoMm": 0.5,
      "brocaMm": 4.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-6-0_75",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M6x0.75",
      "diametroNominalMm": 6.0,
      "passoMm": 0.75,
      "brocaMm": 5.25,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-7-0_75",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M7x0.75",
      "diametroNominalMm": 7.0,
      "passoMm": 0.75,
      "brocaMm": 6.25,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-8-0_75",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M8x0.75",
      "diametroNominalMm": 8.0,
      "passoMm": 0.75,
      "brocaMm": 7.25,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-8-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M8x1.00",
      "diametroNominalMm": 8.0,
      "passoMm": 1.0,
      "brocaMm": 7.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-9-0_75",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M9x0.75",
      "diametroNominalMm": 9.0,
      "passoMm": 0.75,
      "brocaMm": 8.25,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-10-0_75",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M10x0.75",
      "diametroNominalMm": 10.0,
      "passoMm": 0.75,
      "brocaMm": 9.25,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-10-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M10x1.00",
      "diametroNominalMm": 10.0,
      "passoMm": 1.0,
      "brocaMm": 9.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-10-1_25",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M10x1.25",
      "diametroNominalMm": 10.0,
      "passoMm": 1.25,
      "brocaMm": 8.75,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "designacao-conferida",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-12-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M12x1.00",
      "diametroNominalMm": 12.0,
      "passoMm": 1.0,
      "brocaMm": 11.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-12-1_25",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M12x1.25",
      "diametroNominalMm": 12.0,
      "passoMm": 1.25,
      "brocaMm": 10.75,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-12-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M12x1.50",
      "diametroNominalMm": 12.0,
      "passoMm": 1.5,
      "brocaMm": 10.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-14-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M14x1.00",
      "diametroNominalMm": 14.0,
      "passoMm": 1.0,
      "brocaMm": 13.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-14-1_25",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M14x1.25",
      "diametroNominalMm": 14.0,
      "passoMm": 1.25,
      "brocaMm": 12.75,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-15-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M15x1.00",
      "diametroNominalMm": 15.0,
      "passoMm": 1.0,
      "brocaMm": 14.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-16-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M16x1.00",
      "diametroNominalMm": 16.0,
      "passoMm": 1.0,
      "brocaMm": 15.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-16-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M16x1.50",
      "diametroNominalMm": 16.0,
      "passoMm": 1.5,
      "brocaMm": 14.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-18-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M18x1.00",
      "diametroNominalMm": 18.0,
      "passoMm": 1.0,
      "brocaMm": 17.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-18-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M18x1.50",
      "diametroNominalMm": 18.0,
      "passoMm": 1.5,
      "brocaMm": 16.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-18-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M18x2.00",
      "diametroNominalMm": 18.0,
      "passoMm": 2.0,
      "brocaMm": 16.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-20-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M20x1.00",
      "diametroNominalMm": 20.0,
      "passoMm": 1.0,
      "brocaMm": 19.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-20-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M20x1.50",
      "diametroNominalMm": 20.0,
      "passoMm": 1.5,
      "brocaMm": 18.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-20-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M20x2.00",
      "diametroNominalMm": 20.0,
      "passoMm": 2.0,
      "brocaMm": 18.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-22-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M22x1.00",
      "diametroNominalMm": 22.0,
      "passoMm": 1.0,
      "brocaMm": 21.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-22-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M22x1.50",
      "diametroNominalMm": 22.0,
      "passoMm": 1.5,
      "brocaMm": 20.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-22-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M22x2.00",
      "diametroNominalMm": 22.0,
      "passoMm": 2.0,
      "brocaMm": 20.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-24-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M24x1.00",
      "diametroNominalMm": 24.0,
      "passoMm": 1.0,
      "brocaMm": 23.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-24-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M24x1.50",
      "diametroNominalMm": 24.0,
      "passoMm": 1.5,
      "brocaMm": 22.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-24-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M24x2.00",
      "diametroNominalMm": 24.0,
      "passoMm": 2.0,
      "brocaMm": 22.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-25-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M25x1.00",
      "diametroNominalMm": 25.0,
      "passoMm": 1.0,
      "brocaMm": 24.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-25-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M25x1.50",
      "diametroNominalMm": 25.0,
      "passoMm": 1.5,
      "brocaMm": 23.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-25-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M25x2.00",
      "diametroNominalMm": 25.0,
      "passoMm": 2.0,
      "brocaMm": 23.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-26-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M26x1.50",
      "diametroNominalMm": 26.0,
      "passoMm": 1.5,
      "brocaMm": 24.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-27-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M27x1.00",
      "diametroNominalMm": 27.0,
      "passoMm": 1.0,
      "brocaMm": 26.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-27-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M27x1.50",
      "diametroNominalMm": 27.0,
      "passoMm": 1.5,
      "brocaMm": 25.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-27-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M27x2.00",
      "diametroNominalMm": 27.0,
      "passoMm": 2.0,
      "brocaMm": 25.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-28-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M28x1.00",
      "diametroNominalMm": 28.0,
      "passoMm": 1.0,
      "brocaMm": 27.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-28-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M28x2.00",
      "diametroNominalMm": 28.0,
      "passoMm": 2.0,
      "brocaMm": 26.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-30-1_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M30x1.00",
      "diametroNominalMm": 30.0,
      "passoMm": 1.0,
      "brocaMm": 29.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-30-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M30x1.50",
      "diametroNominalMm": 30.0,
      "passoMm": 1.5,
      "brocaMm": 28.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-30-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M30x2.00",
      "diametroNominalMm": 30.0,
      "passoMm": 2.0,
      "brocaMm": 28.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-30-3_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M30x3.00",
      "diametroNominalMm": 30.0,
      "passoMm": 3.0,
      "brocaMm": 27.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-32-1_50",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M32x1.50",
      "diametroNominalMm": 32.0,
      "passoMm": 1.5,
      "brocaMm": 30.5,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    },
    {
      "id": "metric-32-2_00",
      "familia": "metric-fine",
      "tipo": "M Rosca ISO Métrica Fina",
      "designacao": "M32x2.00",
      "diametroNominalMm": 32.0,
      "passoMm": 2.0,
      "brocaMm": 30.0,
      "fontes": {
        "broca": "Tabela WestTools 2024 (PDF fornecido)",
        "geometria": "threadlib / THREAD_TABLE.scad"
      },
      "validacao": {
        "threadlib": "familia-suportada",
        "broca": "westtools",
        "observacao": "threadlib valida a família/designação e geometria; não é usado como fonte do diâmetro de broca."
      }
    }
  ]
};


// v1.3 — estrutura completa de famílias e homologação manual WestTools.
// Registros sem brocaMm já possuem estrutura/nomenclatura de desenvolvimento,
// mas NÃO devem ser considerados homologados para pré-furo até conferência manual.
window.TECHNICAL_DATA.version = "1.3";
window.TECHNICAL_DATA.families = {
  "metric-coarse": {nome:"Métrica grossa", sigla:"M", anguloGraus:60, unidade:"mm", referenciaEstrutural:"threadlib", statusEstrutura:"pronta", validacaoWestTools:"pendente"},
  "metric-fine": {nome:"Métrica fina", sigla:"M", anguloGraus:60, unidade:"mm", referenciaEstrutural:"threadlib", statusEstrutura:"pronta", validacaoWestTools:"pendente"},
  "unc": {nome:"UNC — Unificada grossa", sigla:"UNC", anguloGraus:60, unidade:"pol", referenciaEstrutural:"threadlib", statusEstrutura:"pronta", validacaoWestTools:"pendente"},
  "unf": {nome:"UNF — Unificada fina", sigla:"UNF", anguloGraus:60, unidade:"pol", referenciaEstrutural:"threadlib", statusEstrutura:"pronta", validacaoWestTools:"pendente"},
  "bsw": {nome:"BSW — Whitworth", sigla:"BSW", anguloGraus:55, unidade:"pol", referenciaEstrutural:"a validar manualmente", statusEstrutura:"pronta", validacaoWestTools:"pendente"},
  "bsp": {nome:"BSP paralela", sigla:"BSP/G", anguloGraus:55, unidade:"pol", referenciaEstrutural:"threadlib (G/BSPP)", statusEstrutura:"pronta", validacaoWestTools:"pendente"},
  "npt": {nome:"NPT — Tubo cônica", sigla:"NPT", anguloGraus:60, unidade:"pol", referenciaEstrutural:"a validar manualmente", statusEstrutura:"pronta", validacaoWestTools:"pendente"}
};
const _pending = (familia,tipo,designacao,passoMm,nominalPol=null) => ({
 id:`${familia}-${designacao.replace(/[^a-z0-9]+/gi,'_')}`.toLowerCase(), familia,tipo,designacao,
 diametroNominalMm:null, nominalPol, passoMm, brocaMm:null,
 fontes:{broca:"PENDENTE — validação manual WestTools", geometria:["unc","unf","bsp"].includes(familia)?"threadlib / THREAD_TABLE.scad":"PENDENTE — validação manual"},
 validacao:{threadlib:["unc","unf","bsp"].includes(familia)?"estrutura-suportada":"nao-coberto",broca:"pendente-westtools",homologado:false,observacao:"Estrutura disponível para desenvolvimento. Broca de pré-furo será preenchida/homologada na conferência manual final com a tabela WestTools."}
});
[
 ["unc","Rosca UNC / Grossa 60°","UNC #4-40",0.635],["unc","Rosca UNC / Grossa 60°","UNC #6-32",0.79375],["unc","Rosca UNC / Grossa 60°","UNC #8-32",0.79375],["unc","Rosca UNC / Grossa 60°","UNC #10-24",1.05833],["unc","Rosca UNC / Grossa 60°","UNC 1/4-20",1.27,"1/4"],["unc","Rosca UNC / Grossa 60°","UNC 5/16-18",1.41111,"5/16"],["unc","Rosca UNC / Grossa 60°","UNC 3/8-16",1.5875,"3/8"],["unc","Rosca UNC / Grossa 60°","UNC 7/16-14",1.81429,"7/16"],["unc","Rosca UNC / Grossa 60°","UNC 1/2-13",1.95385,"1/2"],["unc","Rosca UNC / Grossa 60°","UNC 9/16-12",2.11667,"9/16"],["unc","Rosca UNC / Grossa 60°","UNC 5/8-11",2.30909,"5/8"],["unc","Rosca UNC / Grossa 60°","UNC 3/4-10",2.54,"3/4"],["unc","Rosca UNC / Grossa 60°","UNC 7/8-9",2.82222,"7/8"],["unc","Rosca UNC / Grossa 60°","UNC 1-8",3.175,"1"],
 ["unf","Rosca UNF / Fina 60°","UNF #4-48",0.529167],["unf","Rosca UNF / Fina 60°","UNF #6-40",0.635],["unf","Rosca UNF / Fina 60°","UNF #8-36",0.705556],["unf","Rosca UNF / Fina 60°","UNF #10-32",0.79375],["unf","Rosca UNF / Fina 60°","UNF 1/4-28",0.907143,"1/4"],["unf","Rosca UNF / Fina 60°","UNF 5/16-24",1.05833,"5/16"],["unf","Rosca UNF / Fina 60°","UNF 3/8-24",1.05833,"3/8"],["unf","Rosca UNF / Fina 60°","UNF 7/16-20",1.27,"7/16"],["unf","Rosca UNF / Fina 60°","UNF 1/2-20",1.27,"1/2"],["unf","Rosca UNF / Fina 60°","UNF 5/8-18",1.41111,"5/8"],["unf","Rosca UNF / Fina 60°","UNF 3/4-16",1.5875,"3/4"],["unf","Rosca UNF / Fina 60°","UNF 7/8-14",1.81429,"7/8"],["unf","Rosca UNF / Fina 60°","UNF 1-12",2.11667,"1"],
 ["bsp","Rosca BSP Paralela / G 55°","G 1/16",0.907,"1/16"],["bsp","Rosca BSP Paralela / G 55°","G 1/8",0.907,"1/8"],["bsp","Rosca BSP Paralela / G 55°","G 1/4",1.337,"1/4"],["bsp","Rosca BSP Paralela / G 55°","G 3/8",1.337,"3/8"],["bsp","Rosca BSP Paralela / G 55°","G 1/2",1.814,"1/2"],["bsp","Rosca BSP Paralela / G 55°","G 3/4",1.814,"3/4"],["bsp","Rosca BSP Paralela / G 55°","G 1",2.309,"1"],["bsp","Rosca BSP Paralela / G 55°","G 1 1/4",2.309,"1 1/4"],["bsp","Rosca BSP Paralela / G 55°","G 1 1/2",2.309,"1 1/2"],["bsp","Rosca BSP Paralela / G 55°","G 2",2.309,"2"]
].forEach(x=>window.TECHNICAL_DATA.threads.push(_pending(...x)));
window.TECHNICAL_DATA.manualValidationTemplates = {
 bsw:{familia:"bsw",campos:["designacao","tpi","passoMm","brocaMm"],status:"aguardando transcrição/conferência WestTools"},
 npt:{familia:"npt",campos:["designacao","tpi","passoMm","brocaMm"],status:"aguardando transcrição/conferência WestTools"}
};
