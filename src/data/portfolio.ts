
export const experience = [
  {
    company: "Tesla",
    role: "Data Engineer",
    period: "2023–2025",
    description: "Designed RAG-based LLM chatbots improving customer interaction efficiency by 25%, added guardrails (hallucination detection, response validation), and architected Apache Airflow ETL pipelines with 99.9% reliability and real-time alerting.",
    logo: "🚗"
  },
  {
    company: "Huawei",
    role: "Cloud Support Engineer",
    period: "2019–2021",
    description: "Accelerated AWS cloud-native infrastructure with Terraform, implemented secure architectures (EC2, S3, Lambda, DynamoDB), and reduced AWS costs by ~20% through monitoring and optimization.",
    logo: "☁️"
  },
  {
    company: "Huawei",
    role: "Operations Team Leader",
    period: "2016–2019",
    description: "Executed 24×7 GOC operations supporting 99.9%+ availability across IP, transmission, mobile core, and RAN domains. Mentored junior engineers and reduced escalations by ~30%.",
    logo: "🔧"
  },
  {
    company: "Nokia",
    role: "Operations & Maintenance Engineer",
    period: "2014–2016",
    description: "Monitored statewide telecom infrastructure with 99.99% availability. Executed preventive and corrective maintenance on BTS, BSC, and transmission systems.",
    logo: "📡"
  }
];

export const projects = [
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
    description: "Built an end-to-end data pipeline on GCP using Terraform for infrastructure, Airflow for orchestration, and DBT for SQL transformations. Loaded data into BigQuery and visualized insights via Google Data Studio.",
    skills: ["GCP", "Terraform", "Airflow", "DBT", "BigQuery", "Data Studio"],
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
      { label: "Looker", icon: "chart" },
    ],
  },

  {
    title: "German Learning App",
    source: "TypeScript | AI Tutor | A1–C1",
    description: "AI-powered German learning platform with interactive lessons, vocabulary practice, pronunciation support, quizzes, and personalized learning from A1 to C1.",
    skills: ["TypeScript", "AI", "NLP", "React"],
    image: "/images/projects/project-german-app.webp",
    url: "https://github.com/saranjthilak/German-Learning-APP",
  },
  {
    title: "Vanilla Steel Assessment",
    source: "Full-stack | APIs | Docker",
    description: "A full-stack assessment project demonstrating modern software engineering practices, including backend development, APIs, testing, containerization, and deployment.",
    skills: ["Python", "FastAPI", "Docker", "Testing", "CI/CD"],
    image: "/images/projects/project-vanilla-steel.webp",
    url: "https://github.com/saranjthilak/vanilla-steel-assessment",
  },
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
