
export interface Achievement {
  id: string;
  metric: number;
  prefix?: string;
  suffix?: string;
  trend?: "up" | "down" | "neutral";
  metricLabel: string;
  title: string;
  organization: string;
  roleOrContext: string;
  category: "GenAI & LLMs" | "Data & MLOps" | "Cloud & SRE" | "Research";
  description: string;
  impactBadge: string;
  skills: string[];
  nodeId: string;
  accent: string;
}

export const achievements: Achievement[] = [
  {
    id: "01",
    metric: 25,
    prefix: "+",
    suffix: "%",
    trend: "up",
    metricLabel: "Efficiency Gain",
    title: "Grounded RAG Assistants with Hallucination Guardrails",
    organization: "Tesla",
    roleOrContext: "Data Engineer",
    category: "GenAI & LLMs",
    description: "Architected conversational RAG chatbots with dynamic citation grounding, token streaming, and cross-encoder validation, reducing support query turnaround by 25%.",
    impactBadge: "↑ 25% SPEEDUP",
    skills: ["LangChain", "Vector DB", "Guardrails", "Python"],
    nodeId: "ACH-0xTESLA1",
    accent: "hsl(var(--accent))",
  },
  {
    id: "02",
    metric: 99.9,
    suffix: "%",
    trend: "neutral",
    metricLabel: "Pipeline SLA",
    title: "Fault-Tolerant Apache Airflow Data Orchestration",
    organization: "Tesla",
    roleOrContext: "Data Engineer",
    category: "Data & MLOps",
    description: "Engineered resilient ETL/ELT pipelines with idempotency, automated failure retries, schema enforcement, and real-time observability alerts, maintaining 99.9% uptime SLA.",
    impactBadge: "🛡 99.9% SLA",
    skills: ["Apache Airflow", "dbt", "PostgreSQL", "Kafka"],
    nodeId: "ACH-0xTESLA2",
    accent: "#38bdf8",
  },
  {
    id: "03",
    metric: 20,
    prefix: "~",
    suffix: "%",
    trend: "down",
    metricLabel: "AWS Spend Reduction",
    title: "Terraform IaC Automation & FinOps Optimization",
    organization: "Huawei",
    roleOrContext: "Cloud Support Engineer",
    category: "Cloud & SRE",
    description: "Standardized multi-environment AWS deployments with modular Terraform IaC and continuous cost observability, shrinking recurring cloud infrastructure spend by ~20%.",
    impactBadge: "↓ 20% CLOUD SPEND",
    skills: ["Terraform", "AWS", "FinOps", "Lambda", "DynamoDB"],
    nodeId: "ACH-0xHW1",
    accent: "#f59e0b",
  },
  {
    id: "04",
    metric: 99.99,
    suffix: "%",
    trend: "neutral",
    metricLabel: "Network Availability",
    title: "Mission-Critical 24×7 Telecom Carrier Operations",
    organization: "Nokia & Huawei",
    roleOrContext: "Operations Engineer & Team Lead",
    category: "Cloud & SRE",
    description: "Managed statewide telecom core, transmission, and IP infrastructure under strict zero-tolerance downtime mandates, consistently sustaining 99.99% carrier service availability.",
    impactBadge: "⚡ FIVE 9s TIER",
    skills: ["IP Core", "RAN", "SRE", "Incident Response"],
    nodeId: "ACH-0xNOKIA",
    accent: "#38bdf8",
  },
  {
    id: "05",
    metric: 0.93,
    suffix: " R²",
    trend: "up",
    metricLabel: "Model Fit Score",
    title: "Solar Power Plant Performance Ratio ML Model",
    organization: "IEEE Publication",
    roleOrContext: "Lead Author",
    category: "Research",
    description: "Published peer-reviewed research in IEEE Xplore applying ensemble machine learning algorithms (RandomSearchCV, AdaBoost, Random Forest) achieving 0.93 R² prediction accuracy.",
    impactBadge: "★ 0.93 R² SCORE",
    skills: ["Machine Learning", "Random Forest", "AdaBoost", "IEEE"],
    nodeId: "ACH-0xIEEE1",
    accent: "#a78bfa",
  },
  {
    id: "06",
    metric: 30,
    prefix: "+",
    suffix: "%",
    trend: "up",
    metricLabel: "Accuracy Lift",
    title: "Quantized Multimodal Search with NVIDIA Triton",
    organization: "AI Product Matching",
    roleOrContext: "AI Engineering",
    category: "GenAI & LLMs",
    description: "Served quantized CLIP visual embeddings via NVIDIA Triton with FAISS ANN similarity search, achieving 30% higher match accuracy and cutting vector search latency to sub-50ms.",
    impactBadge: "⚡ SUB-50MS LATENCY",
    skills: ["NVIDIA Triton", "CLIP", "FAISS", "Docker"],
    nodeId: "ACH-0xTRITON",
    accent: "#00df8f",
  },
  {
    id: "07",
    metric: 30,
    prefix: "~",
    suffix: "%",
    trend: "down",
    metricLabel: "Escalation Reduction",
    title: "Incident Triaging & Runbook Engineering Leadership",
    organization: "Huawei",
    roleOrContext: "Operations Team Leader",
    category: "Cloud & SRE",
    description: "Standardized incident triage procedures, established blameless post-mortems, and mentored junior engineers, cutting tier-3 critical escalations by ~30%.",
    impactBadge: "↓ 30% ESCALATIONS",
    skills: ["Team Leadership", "Runbooks", "RCA", "SRE"],
    nodeId: "ACH-0xHW2",
    accent: "#f59e0b",
  },
  {
    id: "08",
    metric: 2,
    suffix: " Papers",
    trend: "up",
    metricLabel: "Peer-Reviewed",
    title: "Applied Machine Learning Predictive Research",
    organization: "IEEE",
    roleOrContext: "Published Researcher",
    category: "Research",
    description: "Authored and published 2 international IEEE papers on operational performance estimation and airline pricing dynamics using advanced machine learning models.",
    impactBadge: "📄 IEEE INDEXED",
    skills: ["IEEE Xplore", "Scikit-Learn", "Data Science"],
    nodeId: "ACH-0xIEEE2",
    accent: "#a78bfa",
  },
];

export const fromMyWork = [
  {
    id: "01",
    text: "At Tesla: Airflow ETL pipelines with 99.9% reliability and real-time alerting.",
  },
  {
    id: "02",
    text: "At Tesla: RAG chatbots with hallucination guardrails, improving customer interaction efficiency by 25%.",
  },
  {
    id: "03",
    text: "In my AI Product Matching System: a quantized CLIP model served via NVIDIA Triton.",
  },
  {
    id: "04",
    text: "At Huawei: Terraform-based AWS infrastructure and monitoring that cut AWS costs by about 20%.",
  },
  {
    id: "05",
    text: "At Nokia and Huawei: 24×7 network operations at 99.9%+ availability.",
  },
  {
    id: "06",
    text: "In my German Learning App: an AI learning platform built with TypeScript and React.",
  },
];

export const experience = [
  {
    company: "Tesla",
    role: "Data Engineer",
    period: "2023–2025",
    description: "Designed RAG-based LLM chatbots improving customer interaction efficiency by 25%, added guardrails (hallucination detection, response validation), and architected Apache Airflow ETL pipelines with 99.9% reliability and real-time alerting.",
    logo: "🚗",
    metrics: [
      { label: "Efficiency Gain", value: "+25%" },
      { label: "Pipeline SLA", value: "99.9%" },
    ],
    achievements: [
      "Engineered RAG-based LLM chatbots with hallucination guardrails, cutting support query resolution time by 25%.",
      "Architected Apache Airflow ETL pipelines serving production analytics at 99.9% uptime SLA with real-time alerting.",
      "Implemented automated retry logic and schema enforcement across distributed data pipelines."
    ]
  },
  {
    company: "University of Europe for Applied Sciences",
    role: "M.Sc. Data Science",
    period: "2021–2023",
    description: "Completed a Master's in Data Science with a focus on machine learning, deep learning, and applied AI. Published two IEEE papers on ML-based prediction systems. Also completed the Le Wagon Data Science & AI bootcamp during this period, gaining intensive hands-on experience in production ML workflows.",
    logo: "🎓",
    type: "education" as const,
    metrics: [
      { label: "IEEE Papers", value: "2" },
      { label: "Model R²", value: "0.93" },
    ],
    achievements: [
      "Published 2 peer-reviewed IEEE papers on machine learning estimation models (0.93 R² accuracy).",
      "Graduated with M.Sc. in Data Science focusing on ML, deep learning, and applied AI systems.",
      "Completed Le Wagon Data Science & AI bootcamp, building production ML pipelines with Docker and FastAPI."
    ]
  },
  {
    company: "Huawei",
    role: "Cloud Support Engineer",
    period: "2019–2021",
    description: "Accelerated AWS cloud-native infrastructure with Terraform, implemented secure architectures (EC2, S3, Lambda, DynamoDB), and reduced AWS costs by ~20% through monitoring and optimization.",
    logo: "☁️",
    metrics: [
      { label: "AWS Cost", value: "-20%" },
      { label: "State", value: "IaC Sync" },
    ],
    achievements: [
      "Accelerated AWS cloud-native infrastructure with modular Terraform IaC across EC2, S3, Lambda, and DynamoDB.",
      "Reduced monthly AWS cloud expenditure by ~20% through rigorous resource rightsizing and FinOps monitoring.",
      "Designed automated backup, failover, and IAM security policies for cloud production workloads."
    ]
  },
  {
    company: "Huawei",
    role: "Operations Team Leader",
    period: "2016–2019",
    description: "Executed 24×7 GOC operations supporting 99.9%+ availability across IP, transmission, mobile core, and RAN domains. Mentored junior engineers and reduced escalations by ~30%.",
    logo: "🔧",
    metrics: [
      { label: "Availability", value: "99.9%+" },
      { label: "Escalations", value: "-30%" },
    ],
    achievements: [
      "Led 24×7 Global Operations Center (GOC) sustaining 99.9%+ network availability across IP, core, and RAN domains.",
      "Reduced tier-3 critical incident escalations by ~30% through automated runbooks and incident root cause analysis.",
      "Mentored junior engineers and conducted high-pressure failover simulation drills."
    ]
  },
  {
    company: "Nokia",
    role: "Operations & Maintenance Engineer",
    period: "2014–2016",
    description: "Monitored statewide telecom infrastructure with 99.99% availability. Executed preventive and corrective maintenance on BTS, BSC, and transmission systems.",
    logo: "📡",
    metrics: [
      { label: "Carrier Uptime", value: "99.99%" },
      { label: "Ops Mode", value: "24×7" },
    ],
    achievements: [
      "Monitored and maintained statewide telecom carrier infrastructure exceeding 99.99% uptime availability.",
      "Executed preventive and corrective maintenance on BTS, BSC, optical SDH, and microwave transmission systems.",
      "Coordinated with multi-vendor engineering teams during major network cutovers and outages."
    ]
  }
];

export const projects = [
  {
    title: "Multimodal RAG System",
    source: "Production RAG + Conversational AI",
    description: "A production-ready Multimodal Retrieval-Augmented Generation system that supports conversational querying over text and image data. Handles chunking, embedding, reranking, and grounded LLM responses with citation traces — designed for real deployment, not demos.",
    skills: ["RAG", "Multimodal", "LangChain", "Python", "LLMs", "Vector DB"],
    image: "/images/projects/project-multimodal-rag.webp",
    url: "https://github.com/saranjthilak/Multimodel_RAG",
    liveUrl: undefined as string | undefined, // set to a URL string when a hosted demo is available
    featured: true,
    problem: "LLMs hallucinate on private, mixed-media data. Needed a grounded, citation-backed system that works on both text and images without fine-tuning.",
    approach: "Full pipeline — chunking, multimodal embeddings, FAISS retrieval, cross-encoder reranking, and grounded LLM generation via LangChain, prioritising retrieval over fine-tuning for data efficiency.",
    result: "Production-ready system with citation traces; architecture mirrors the setup that drove a 25% improvement in customer query efficiency.",
    pipeline: [
      { label: "Docs", icon: "file" },
      { label: "Chunk", icon: "layers" },
      { label: "Embed", icon: "cpu" },
      { label: "Rerank", icon: "search" },
      { label: "LLM", icon: "bot" },
    ],
  },
  {
    title: "AI Product Matching System",
    source: "FAISS + Triton Inference + CLIP",
    description: "Developed an image-based product search engine using FAISS for vector similarity and a quantized CLIP model served via NVIDIA Triton Inference Server. Integrated MongoDB and Docker for fast, scalable product matching.",
    skills: ["FAISS", "CLIP", "Triton", "MongoDB", "Docker"],
    image: "/images/projects/project-product-matching.webp",
    url: "https://github.com/saranjthilak/ai_poduct_matching",
    liveUrl: undefined as string | undefined,
    featured: true,
    problem: "Text-based search fails for visual product catalogues. Needed sub-second image similarity search at scale without a heavyweight vector DB.",
    approach: "Quantized CLIP embeddings via NVIDIA Triton for low-latency inference; FAISS for ANN search to cut overhead vs. a full vector DB; MongoDB stores product metadata.",
    result: "25% vector DB efficiency boost and 30% match-accuracy gain over keyword search baselines.",
    pipeline: [
      { label: "Image", icon: "image" },
      { label: "CLIP", icon: "cpu" },
      { label: "FAISS", icon: "search" },
      { label: "Triton", icon: "server" },
      { label: "MongoDB", icon: "database" },
    ],
  },
  {
    title: "Car Manual RAG Assistant",
    source: "Closed-Domain PDF QA",
    description: "Domain-specific RAG over a single corpus of automotive PDFs. A focused proof-of-concept for constrained document QA — no multimodal retrieval, no general-purpose chat, just precise grounded answers from a closed source.",
    skills: ["RAG", "LangChain", "Embeddings", "LLMs", "Python"],
    image: "/images/projects/project-knowledge-assistant.webp",
    url: "https://github.com/saranjthilak/Car-Manual-RAG-Assistant",
    liveUrl: undefined as string | undefined,
    featured: true,
    problem: "Car manuals are dense PDFs users rarely consult. Needed a natural-language interface that surfaces the right section instantly without hallucinating.",
    approach: "RAG over chunked PDF content — LangChain orchestration, sentence-transformer embeddings, and vector DB retrieval — so answers stay grounded in the manual, not LLM priors.",
    result: "Accurate, context-aware Q&A on domain-constrained documents; proves RAG viability as a fine-tuning alternative for closed-domain assistants.",
    pipeline: [
      { label: "Manual PDF", icon: "file" },
      { label: "Chunk", icon: "layers" },
      { label: "Embed", icon: "cpu" },
      { label: "Vector DB", icon: "database" },
      { label: "LLM", icon: "bot" },
    ],
  },
  {
    title: "Divvy Bikes – End-to-End Data Pipeline",
    source: "GCP | Terraform | Airflow | DBT",
    description: "Built an end-to-end data pipeline on GCP using Terraform for infrastructure, Airflow for orchestration, and DBT for SQL transformations. Loaded data into BigQuery and visualized insights via Looker Studio.",
    skills: ["GCP", "Terraform", "Airflow", "DBT", "BigQuery", "Looker Studio"],
    image: "/images/projects/project-divvy-bikes.webp",
    url: "https://github.com/saranjthilak/Divvy-Bike-Data-End-to-End-Pipeline",
    liveUrl: undefined as string | undefined,
    featured: true,
    problem: "Raw bike-share trip data needed to move from cloud storage to a queryable, visualised layer reliably and repeatably — with no manual steps.",
    approach: "Infrastructure-as-code via Terraform on GCP; Airflow for scheduled orchestration; DBT for SQL transforms and testing; BigQuery as the warehouse; Looker Studio for dashboards.",
    result: "Fully automated end-to-end pipeline from raw GCS files to live dashboard; demonstrates production-grade data engineering discipline beyond just model code.",
    pipeline: [
      { label: "GCS", icon: "cloud" },
      { label: "Airflow", icon: "workflow" },
      { label: "DBT", icon: "layers" },
      { label: "BigQuery", icon: "database" },
      { label: "Looker Studio", icon: "chart" },
    ],
  },
  {
    title: "German Learning App",
    source: "TypeScript | AI Tutor | A1–C1",
    description: "AI-powered German learning platform with interactive lessons, vocabulary practice, pronunciation support, quizzes, and personalized learning from A1 to C1.",
    skills: ["TypeScript", "AI", "NLP", "React"],
    image: "/images/projects/project-german-app.webp",
    url: "https://github.com/saranjthilak/German-Learning-APP",
    featured: false,
  },
  {
    title: "Vanilla Steel Assessment",
    source: "Full-stack | APIs | Docker",
    description: "A full-stack assessment project demonstrating modern software engineering practices, including backend development, APIs, testing, containerization, and deployment.",
    skills: ["Python", "FastAPI", "Docker", "Testing", "CI/CD"],
    image: "/images/projects/project-vanilla-steel.webp",
    url: "https://github.com/saranjthilak/vanilla-steel-assessment",
    featured: false,
  }
];

export const publications = [
  {
    title: "Performance Ratio Estimation of Solar Power Plants Using Machine Learning Algorithms",
    journal: "IEEE",
    date: "Sep 2023",
    link: "https://ieeexplore.ieee.org/document/10317646",
    description: "Applied advanced machine learning models to estimate the performance ratio of solar PV plants using operational and environmental data. Among tested algorithms, Random Search CV Regression achieved the highest accuracy with an R² of 0.93 and minimal error. Results highlight the effectiveness of models like Random Search CV, AdaBoost, and Random Forest in optimizing solar plant performance and advancing efficient renewable energy solutions."
  },
  {
    title: "A Comparison Between Machine Learning Models for Air ticket Price Prediction",
    journal: "IEEE",
    date: "Nov 2022",
    link: "https://ieeexplore.ieee.org/document/9998230",
    description: "Explored machine learning techniques to predict airline ticket prices using two Kaggle datasets, addressing challenges from dynamic pricing fluctuations. Evaluated models including Random Forest and Randomized Search CV, with the proposed model providing accurate fare predictions. This solution supports travelers in making informed decisions by forecasting price trends from historical data."
  }
];

export const certifications = [
  {
    title: "AWS Certified Solutions Architect",
    level: "Associate",
    issuer: "Amazon Web Services",
    logo: "☁️"
  },
  {
    title: "OCI 2025 Certified Generative AI Professional",
    level: "Professional",
    issuer: "Oracle",
    logo: "🤖"
  },
  {
    title: "OCI 2025 Certified AI Foundations Associate",
    level: "Associate",
    issuer: "Oracle",
    logo: "🧠"
  },
  {
    title: "LangChain Application Development",
    level: "Certificate",
    issuer: "DeepLearning.AI / LangChain",
    logo: "🔗"
  },
  {
    title: "Terraform Basics",
    level: "Certificate",
    issuer: "HashiCorp",
    logo: "🏗️"
  },
  {
    title: "SQL for Data Science",
    issuer: "UC Davis",
    logo: "🎓"
  }
];
