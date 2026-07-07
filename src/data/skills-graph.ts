import { skills } from "./portfolio";

export const skillLevels: Record<string, number> = {
  LLMs: 95, RAG: 95, LangChain: 92, "Vector DB": 88, "Prompt Engineering": 94,
  PyTorch: 85, TensorFlow: 82, Keras: 80, "Scikit-learn": 90, "Deep Learning": 88,
  NLP: 90, "Time Series": 78, MLflow: 80, MLOps: 82,
  Python: 95, SQL: 92, FastAPI: 88, Streamlit: 85, Pandas: 94, NumPy: 92,
  REST: 90, "API Design": 88, Microservices: 82, "Automated Testing": 80,
  AWS: 92, GCP: 88, BigQuery: 90, DBT: 85, Airflow: 92, Docker: 90,
  Kubernetes: 80, Terraform: 88, IaC: 86, "CI/CD": 88, GitHub: 95,
  IAM: 82, ETL: 92, Tableau: 78,
};

export interface HubDef {
  key: string;
  label: string;
  short: string;
  color: string;
  colorSoft: string;
  x: number;
  y: number;
}

export const VIEW_W = 1200;
export const VIEW_H = 680;

export const HUBS: HubDef[] = [
  { key: "Generative AI & ML",     label: "Generative AI & ML",     short: "AI / ML",        color: "#22d3ee", colorSoft: "rgba(34,211,238,0.55)",  x: 260, y: 340 },
  { key: "Languages & Frameworks", label: "Languages & Frameworks", short: "Backend",        color: "#818cf8", colorSoft: "rgba(129,140,248,0.55)", x: 600, y: 340 },
  { key: "Cloud, Data & DevOps",   label: "Cloud, Data & DevOps",   short: "Cloud / DevOps", color: "#e879f9", colorSoft: "rgba(232,121,249,0.55)", x: 940, y: 340 },
];

export interface NodeDef {
  id: string;
  name: string;
  level: number;
  hubIndex: number;
  x: number;
  y: number;
  r: number;
  driftDur: number;
  driftDelay: number;
  driftAmp: number;
}

const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

/** Deterministic satellite placement on two concentric rings via the golden angle. */
export function buildGraph(): { hubs: HubDef[]; nodes: NodeDef[] } {
  const nodes: NodeDef[] = [];
  const GOLDEN = Math.PI * (3 - Math.sqrt(5));

  HUBS.forEach((hub, hi) => {
    const list = (skills as Record<string, string[]>)[hub.key] ?? [];
    const angleOffset = hi * 0.7;

    list.forEach((name, i) => {
      const level = skillLevels[name] ?? 80;
      const ring = i % 2;
      const radius = 118 + ring * 58 + Math.floor(i / 2) * 3.5;
      const angle = angleOffset + i * GOLDEN;
      const x = hub.x + Math.cos(angle) * radius;
      const y = hub.y + Math.sin(angle) * radius * 0.92;

      const seed = hi * 100 + i + 1;
      nodes.push({
        id: `${hi}-${i}-${name}`,
        name,
        level,
        hubIndex: hi,
        x, y,
        r: 3.5 + (level / 100) * 5.5,
        driftDur: 5 + rand(seed) * 4,
        driftDelay: rand(seed + 7) * 3,
        driftAmp: 2 + rand(seed + 13) * 3,
      });
    });
  });

  return { hubs: HUBS, nodes };
}