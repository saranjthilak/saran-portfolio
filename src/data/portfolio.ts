
export const experience = [
  {
    company: "Tesla",
    role: "Data Engineer (Contract)",
    period: "2023–2025",
    description: "Designed RAG-based LLM chatbots improving customer interaction efficiency by 25%, added guardrails (hallucination detection, response validation), and architected Apache Airflow ETL pipelines with 99.9% reliability and real-time alerting.",
    logo: "🚗"
  },
  {
    company: "Huawei",
    role: "Cloud Support Engineer (Contract)",
    period: "2019–2021",
    description: "Accelerated AWS cloud-native infrastructure with Terraform, implemented secure architectures (EC2, S3, Lambda, DynamoDB), and reduced AWS costs by ~20% through monitoring and optimization.",
    logo: "☁️"
  },
  {
    company: "Huawei",
    role: "Operations Team Leader (Contract)",
    period: "2016–2019",
    description: "Executed 24×7 GOC operations supporting 99.9%+ availability across IP, transmission, mobile core, and RAN domains. Mentored junior engineers and reduced escalations by ~30%.",
    logo: "🔧"
  },
  {
    company: "Nokia",
    role: "Operations & Maintenance Engineer (Contract)",
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
  },
  {
    title: "AI Knowledge Assistant",
    source: "Local RAG + LangChain",
    description: "Built an AI chat interface to interact with PDFs by integrating Google Drive, Notion, Google Sheets, and SQL databases. Used LangChain for retrieval-augmented generation (RAG) and orchestration of local LLMs.",
    skills: ["LangChain", "RAG", "LLMs", "Python"],
  },
  {
    title: "Divvy Bikes – End-to-End Data Pipeline",
    source: "GCP | Terraform | Airflow | DBT",
    description: "Built an end-to-end data pipeline on GCP using Terraform for infrastructure, Airflow for orchestration, and DBT for SQL transformations. Loaded data into BigQuery and visualized insights via Google Data Studio.",
    skills: ["GCP", "Terraform", "Airflow", "DBT", "BigQuery", "Data Studio"],
  }
];

export const skills = {
  "Generative AI & ML": [
    "LLMs",
    "RAG",
    "LangChain",
    "Vector DB",
    "Prompt Engineering",
    "PyTorch",
    "TensorFlow",
    "Keras",
    "Scikit-learn",
    "Deep Learning",
    "NLP",
    "Time Series",
    "MLflow",
    "MLOps"
  ],
  "Languages & Frameworks": [
    "Python",
    "SQL",
    "FastAPI",
    "Streamlit",
    "Pandas",
    "NumPy",
    "REST",
    "API Design",
    "Microservices",
    "Automated Testing"
  ],
  "Cloud, Data & DevOps": [
    "AWS",
    "GCP",
    "BigQuery",
    "DBT",
    "Airflow",
    "Docker",
    "Kubernetes",
    "Terraform",
    "IaC",
    "CI/CD",
    "GitHub",
    "IAM",
    "ETL",
    "Tableau"
  ]
};

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
    title: "SQL for Data Science",
    issuer: "UC Davis",
    logo: "🎓"
  },
  {
    title: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    logo: "🤖"
  },
  {
    title: "OCI 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    logo: "🧠"
  }
];

export const achievements = [
  {
    icon: "⚡",
    title: "40% Boost in RAG Processing",
    description: "Implemented advanced RAG techniques that increased LLM processing capabilities.",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: "🚀",
    title: "30% Embedding Pipeline Accuracy Gain",
    description: "Improved embedding pipelines for superior real-time LLM performance.",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    icon: "🎯",
    title: "25% Vector DB Efficiency Boost",
    description: "Optimized vector database retrieval speed for AI systems.",
    gradient: "from-purple-500 to-pink-600"
  },
  {
    icon: "🔬",
    title: "Two IEEE Machine Learning Publications",
    description: "Authored and published innovative research in applied machine learning.",
    gradient: "from-pink-600 to-yellow-400"
  }
];

export const navigation = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "about", label: "About", icon: "👤" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "projects", label: "Projects", icon: "🚀" },
  { id: "publications", label: "Publications", icon: "📚" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "certifications", label: "Certifications", icon: "🏆" },
  { id: "contact", label: "Contact", icon: "📧" }
];
