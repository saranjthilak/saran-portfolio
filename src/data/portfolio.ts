
export const experience = [
  {
    company: "Tesla",
    role: "Production Associate",
    period: "2023–2025",
    description: "Improved 24/7 production efficiency by optimizing inventory and streamlining workflows with cross-functional teams.",
    logo: "🚗"
  },
  {
    company: "Huawei",
    role: "Cloud Support Engineer",
    period: "2019–2022",
    description: "Built scalable AWS infrastructure and CI/CD pipelines to automate deployments and enhance system reliability.",
    logo: "☁️"
  },
  {
    company: "Huawei",
    role: "O&M Engineer",
    period: "2016–2019",
    description: "Led 24/7 telecom network operations and ensured SLA compliance across multiple network domains.",
    logo: "🔧"
  },
  {
    company: "Nokia",
    role: "O&M Engineer",
    period: "2014–2016",
    description: "Maintained telecom infrastructure with 99.99% uptime through proactive monitoring and fault resolution.",
    logo: "📡"
  }
];

export const projects = [
  {
    title: "IRIS – AI App to Chat with Your Data",
    source: "Le Wagon | May 2025 – Jun 2025",
    description: "Built a RAG-powered AI assistant using LangChain, LLaMA, DeepSeek, and ChatGPT to query and summarize documents from Google Drive, Notion, Sheets, and databases.",
    skills: ["RAG", "LLMs", "LangChain", "LLaMA", "DeepSeek", "ChatGPT"],
  },
  {
    title: "Divvy Bikes – End-to-End Data Pipeline",
    source: "University of Europe for Applied Sciences",
    description: "Designed a full data pipeline on GCP using Terraform, Airflow, DBT, and BigQuery for data ingestion, transformation, and dashboarding in Google Data Studio.",
    skills: ["GCP", "Terraform", "Airflow", "DBT", "BigQuery", "Data Studio", "Docker"],
  },
  {
    title: "Data Visualization Projects",
    source: "University of Europe for Applied Sciences",
    description: "Created interactive dashboards for Netflix, Airbnb Berlin, and Unicorn companies to deliver business insights using Power BI and Tableau.",
    skills: ["Power BI", "Tableau", "Data Visualization", "Analytical Thinking"],
  },
  {
    title: "Customer Segmentation – K-Means Clustering",
    source: "University of Europe for Applied Sciences",
    description: "Implemented K-means clustering in Python to segment customers based on behavior and demographics for targeted marketing strategies.",
    skills: ["Python", "K-Means", "Customer Segmentation", "Analytics"],
  }
];

export const skills = {
  "Languages & ML": ["Python", "SQL", "NLP", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
  "Cloud & DevOps": ["AWS", "GCP", "Docker", "Terraform", "Kubernetes", "Jenkins", "Git", "CI/CD"],
  "BI & Analytics": ["Tableau", "Power BI", "DBT", "BigQuery", "Airflow", "Apache Spark", "Snowflake"]
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
  }
];

export const achievements = [
  {
    icon: "⚡",
    title: "25% Deployment Cycle Improvement",
    description: "CI/CD automation pipelines optimization",
    gradient: "from-green-500 to-emerald-600"
  },
  {
    icon: "💰",
    title: "15% Inventory Cost Reduction",
    description: "Efficient management strategies implementation",
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    icon: "🎯",
    title: "98% SLA Compliance",
    description: "Team leadership in global network operations",
    gradient: "from-purple-500 to-pink-600"
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
