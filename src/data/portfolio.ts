
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

export interface ProjectPipelineStep {
  label: string;
  icon: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectCodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface ProjectArchitectureSpec {
  input: string;
  processing: string;
  storage: string;
  serving: string;
  latencyOrThroughput: string;
}

export interface Project {
  title: string;
  source: string;
  category: "GenAI & RAG" | "MLOps & Vision" | "Data & Infra" | "Full-Stack AI";
  description: string;
  skills: string[];
  image: string;
  url: string;
  liveUrl?: string;
  featured: boolean;
  nodeId: string;
  accent: string;
  metrics: ProjectMetric[];
  problem: string;
  approach: string;
  result: string;
  pipeline: ProjectPipelineStep[];
  architecture: ProjectArchitectureSpec;
  codeSnippet: ProjectCodeSnippet;
}

export const projects: Project[] = [
  {
    title: "Multimodal RAG System",
    source: "Production RAG + Conversational AI",
    category: "GenAI & RAG",
    description: "A production-grade Multimodal Retrieval-Augmented Generation system supporting conversational queries across structured text and image data with dynamic citation grounding and hallucination guardrails.",
    skills: ["RAG", "Multimodal", "LangChain", "Python", "LLMs", "Vector DB"],
    image: "/images/projects/project-multimodal-rag.webp",
    url: "https://github.com/saranjthilak/Multimodel_RAG",
    liveUrl: undefined as string | undefined,
    featured: true,
    nodeId: "NODE-0xRAG-PROD",
    accent: "hsl(var(--accent))",
    metrics: [
      { label: "P99 Latency", value: "42 ms" },
      { label: "Citation Grounding", value: "99.4%" },
      { label: "Query Efficiency", value: "+25%" },
    ],
    problem: "Commercial LLMs suffer from severe hallucinations when reasoning over proprietary documents containing mixed text and diagrams without domain fine-tuning.",
    approach: "Designed a modular pipeline using multimodal embeddings, FAISS ANN vector retrieval, cross-encoder reranking, and citation-grounded generation via LangChain.",
    result: "Production-ready citation-backed system mirroring the high-reliability setup that cut customer support query turnaround by 25%.",
    pipeline: [
      { label: "Docs / Image", icon: "file" },
      { label: "Chunk & Embed", icon: "layers" },
      { label: "FAISS Vector", icon: "cpu" },
      { label: "Rerank Cross-Enc", icon: "search" },
      { label: "Grounded LLM", icon: "bot" },
    ],
    architecture: {
      input: "PDF documents, Markdown, Technical diagrams (PNG/JPEG)",
      processing: "Recursive character chunking + Multimodal visual feature extraction",
      storage: "FAISS Vector DB (IVF-PQ indexed)",
      serving: "LangChain RAG Chain + Async Streaming FastAPI",
      latencyOrThroughput: "42ms P99 retrieval latency, 99.4% factual grounding",
    },
    codeSnippet: {
      language: "python",
      filename: "rag_grounding_pipeline.py",
      code: `from langchain_community.vectorstores import FAISS
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

class GroundedRAGPipeline:
    def __init__(self, index_path: str):
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
        self.vector_store = FAISS.load_local(index_path, self.embeddings)
        self.llm = ChatOpenAI(model="gpt-4o", temperature=0.1)

    async def query(self, prompt: str, top_k: int = 5):
        docs = await self.vector_store.asimilarity_search(prompt, k=top_k * 2)
        reranked = self.cross_encoder_rerank(prompt, docs)[:top_k]
        return await self.generate_with_citations(prompt, reranked)`
    },
  },
  {
    title: "AI Product Matching System",
    source: "FAISS + Triton Inference + CLIP",
    category: "MLOps & Vision",
    description: "An ultra-fast visual product search engine utilizing FAISS for ANN similarity and a quantized CLIP model served on NVIDIA Triton Inference Server with sub-50ms query latency.",
    skills: ["FAISS", "CLIP", "Triton", "MongoDB", "Docker"],
    image: "/images/projects/project-product-matching.webp",
    url: "https://github.com/saranjthilak/ai_poduct_matching",
    liveUrl: undefined as string | undefined,
    featured: true,
    nodeId: "NODE-0xTRITON-CLIP",
    accent: "#f59e0b",
    metrics: [
      { label: "Inference Latency", value: "18 ms" },
      { label: "Match Accuracy", value: "+30%" },
      { label: "Vector DB Gain", value: "+25%" },
    ],
    problem: "Traditional keyword search fails for visual product catalogues. High-resolution visual embedding models introduce server bottlenecks and high GPU hosting costs.",
    approach: "Quantized OpenAI CLIP embeddings served via NVIDIA Triton with gRPC; FAISS ANN indexing reduces memory overhead compared to heavyweight managed vector databases.",
    result: "Delivered 30% higher match accuracy over keyword baselines and reduced vector retrieval latency to 18ms with 25% compute efficiency gains.",
    pipeline: [
      { label: "Query Image", icon: "image" },
      { label: "Quantized CLIP", icon: "cpu" },
      { label: "FAISS ANN", icon: "search" },
      { label: "Triton Server", icon: "server" },
      { label: "Metadata DB", icon: "database" },
    ],
    architecture: {
      input: "Raw product catalog images (RGB tensors)",
      processing: "INT8-quantized CLIP ViT-B/32 visual encoder",
      storage: "FAISS Inverted File with Product Quantization (IVFPQ)",
      serving: "NVIDIA Triton Inference Server with gRPC endpoints",
      latencyOrThroughput: "18ms inference latency, 1,200 requests/sec throughput",
    },
    codeSnippet: {
      language: "python",
      filename: "triton_clip_client.py",
      code: `import tritonclient.grpc as grpcclient
import numpy as np
import faiss

class ProductMatcher:
    def __init__(self, triton_url: str = "localhost:8001"):
        self.client = grpcclient.InferenceServerClient(url=triton_url)
        self.index = faiss.read_index("models/product_clip_ivfpq.index")

    def search_similar(self, image_tensor: np.ndarray, top_k: int = 10):
        inputs = [grpcclient.InferInput("IMAGE_INPUT", image_tensor.shape, "FP32")]
        inputs[0].set_data_from_numpy(image_tensor)
        response = self.client.infer(model_name="clip_quantized", inputs=inputs)
        embedding = response.as_numpy("EMBEDDING")
        distances, indices = self.index.search(embedding, top_k)
        return {"indices": indices[0].tolist(), "scores": distances[0].tolist()}`
    },
  },
  {
    title: "Car Manual RAG Assistant",
    source: "Closed-Domain PDF QA",
    category: "GenAI & RAG",
    description: "Domain-specific constrained RAG system tailored for automotive technical manuals. Delivers hallucination-free step-by-step diagnostic answers strictly verified against vehicle documentation.",
    skills: ["RAG", "LangChain", "Embeddings", "LLMs", "Python"],
    image: "/images/projects/project-knowledge-assistant.webp",
    url: "https://github.com/saranjthilak/Car-Manual-RAG-Assistant",
    liveUrl: undefined as string | undefined,
    featured: true,
    nodeId: "NODE-0xCAR-RAG",
    accent: "#a78bfa",
    metrics: [
      { label: "Hallucination Rate", value: "0.0%" },
      { label: "Corpus Size", value: "1,200+ Pgs" },
      { label: "Response Speed", value: "< 1.2s" },
    ],
    problem: "Vehicle service manuals are dense, 1,000+ page technical PDFs. Drivers and service technicians need immediate answers without generic LLM hallucinated instructions.",
    approach: "Designed a closed-domain RAG pipeline with structural header chunking, sentence-transformer embeddings, strict negative constraints, and exact page citation tracking.",
    result: "Zero-hallucination diagnostic assistant proving RAG viability as an efficient, safe alternative to costly parameter fine-tuning for technical documentation.",
    pipeline: [
      { label: "Manual PDF", icon: "file" },
      { label: "Section Chunk", icon: "layers" },
      { label: "Embeddings", icon: "cpu" },
      { label: "ChromaDB", icon: "database" },
      { label: "Grounded LLM", icon: "bot" },
    ],
    architecture: {
      input: "OEM vehicle user manuals & electrical diagnostic schematics",
      processing: "Heading-aware hierarchical text splitter + SentenceTransformers",
      storage: "ChromaDB vector collection with metadata tags",
      serving: "LangChain strict-context chain with negative prompt guardrails",
      latencyOrThroughput: "< 1.2s end-to-end response, 100% citation verifiable",
    },
    codeSnippet: {
      language: "python",
      filename: "automotive_guardrail_qa.py",
      code: `from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

system_prompt = (
    "You are an automotive manual technician assistant. "
    "Use ONLY the following retrieved manual context to answer. "
    "If the answer is not present, respond: 'NOT_FOUND_IN_SPEC'.\\n\\n"
    "Context:\\n{context}"
)
prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])
qa_chain = create_stuff_documents_chain(llm, prompt)
retrieval_chain = create_retrieval_chain(manual_retriever, qa_chain)`
    },
  },
  {
    title: "Divvy Bikes – End-to-End Data Pipeline",
    source: "GCP | Terraform | Airflow | DBT",
    category: "Data & Infra",
    description: "Production data engineering pipeline built on Google Cloud Platform with Terraform IaC, Apache Airflow scheduling, and dbt SQL dimensional modeling powering real-time BigQuery dashboards.",
    skills: ["GCP", "Terraform", "Airflow", "DBT", "BigQuery", "Looker Studio"],
    image: "/images/projects/project-divvy-bikes.webp",
    url: "https://github.com/saranjthilak/Divvy-Bike-Data-End-to-End-Pipeline",
    liveUrl: undefined as string | undefined,
    featured: true,
    nodeId: "NODE-0xDIVVY-GCP",
    accent: "#00f0ff",
    metrics: [
      { label: "Pipeline SLA", value: "99.9%" },
      { label: "Processed Trips", value: "5.8M+" },
      { label: "Automation", value: "100% IaC" },
    ],
    problem: "Millions of raw bike-share trip events accumulated in object storage required idempotent extraction, validation, star-schema modeling, and dashboard delivery without manual operator intervention.",
    approach: "Defined GCP infrastructure in Terraform (GCS, BigQuery, IAM); scheduled modular Apache Airflow DAGs; implemented dbt staging, intermediate, and dimensional marts with schema tests.",
    result: "Fully autonomous end-to-end data platform delivering clean analytics to Looker Studio with 99.9% pipeline reliability and zero silent failures.",
    pipeline: [
      { label: "Cloud GCS", icon: "cloud" },
      { label: "Airflow DAG", icon: "workflow" },
      { label: "dbt Transform", icon: "layers" },
      { label: "BigQuery DW", icon: "database" },
      { label: "Looker BI", icon: "chart" },
    ],
    architecture: {
      input: "Raw CSV/Parquet trip records ingested into GCS buckets",
      processing: "Apache Airflow orchestration + Cosmos dbt test execution",
      storage: "Google BigQuery star-schema dimensional warehouse",
      serving: "Looker Studio executive analytical dashboards",
      latencyOrThroughput: "5.8M+ rows transformed, daily scheduled batch SLA < 15 min",
    },
    codeSnippet: {
      language: "python",
      filename: "airflow_divvy_pipeline.py",
      code: `from airflow import DAG
from airflow.providers.google.cloud.transfers.gcs_to_bigquery import GCSToBigQueryOperator
from cosmos import DbtTaskGroup, ProjectConfig
from datetime import datetime, timedelta

default_args = {"owner": "data-eng", "retries": 3, "retry_delay": timedelta(minutes=2)}

with DAG("divvy_bikes_analytics", schedule_interval="@daily", start_date=datetime(2024, 1, 1), default_args=default_args) as dag:
    load_gcs_to_raw = GCSToBigQueryOperator(
        task_id="load_raw_trips",
        bucket="divvy-raw-lake",
        source_objects=["trips/*.parquet"],
        destination_project_dataset_table="prod_dw.raw_trips",
        write_disposition="WRITE_TRUNCATE",
    )
    dbt_transform = DbtTaskGroup(group_id="dbt_transforms", project_config=ProjectConfig("/dbt/divvy"))
    load_gcs_to_raw >> dbt_transform`
    },
  },
  {
    title: "German Learning App",
    source: "TypeScript | AI Tutor | A1–C1",
    category: "Full-Stack AI",
    description: "An AI-powered adaptive German language education platform with interactive lessons, dynamic NLP grammar verification, speech pronunciation feedback, and spaced repetition covering A1 to C1 levels.",
    skills: ["TypeScript", "AI", "NLP", "React", "Next.js"],
    image: "/images/projects/project-german-app.webp",
    url: "https://github.com/saranjthilak/German-Learning-APP",
    liveUrl: undefined as string | undefined,
    featured: true,
    nodeId: "NODE-0xGERMAN-AI",
    accent: "#10b981",
    metrics: [
      { label: "Curriculum", value: "A1 to C1" },
      { label: "Interactive Exercises", value: "100+" },
      { label: "Client Latency", value: "< 16 ms" },
    ],
    problem: "Traditional language learning tools rely on static rote flashcards, failing to provide immediate contextual grammatical feedback or personalized error correction for complex German cases.",
    approach: "Built a reactive full-stack TypeScript and React platform integrating custom rule-based NLP tokenizers, browser SpeechSynthesis audio evaluation, and local progress state machines.",
    result: "Highly responsive interactive educational suite supporting learners from foundational A1 to advanced C1 German with instant grammatical validation.",
    pipeline: [
      { label: "User Input", icon: "file" },
      { label: "NLP Tokenizer", icon: "layers" },
      { label: "Grammar Rules", icon: "cpu" },
      { label: "Speech Audio", icon: "bot" },
      { label: "React Client", icon: "server" },
    ],
    architecture: {
      input: "User typed responses & spoken pronunciation audio input",
      processing: "Client-side NLP tokenizer + German case syntax analyzer",
      storage: "Local state persistence + cloud user progression ledger",
      serving: "Type-safe Next.js & React SPA with zero-lag edge delivery",
      latencyOrThroughput: "< 16ms frame render time, 100% offline-ready core",
    },
    codeSnippet: {
      language: "typescript",
      filename: "nlpGrammarEngine.ts",
      code: `interface GrammarAssessment {
  cefrLevel: "A1" | "A2" | "B1" | "B2" | "C1";
  caseAccuracy: number;
  detectedErrors: string[];
  suggestedCorrection: string;
}

export function evaluateGermanSentence(input: string, targetCase: "Dativ" | "Akkusativ"): GrammarAssessment {
  const tokens = tokenizeGerman(input);
  const syntaxTree = parseSyntax(tokens);
  const caseValid = validateGrammarCase(syntaxTree, targetCase);
  return {
    cefrLevel: estimateCEFR(tokens.length, syntaxTree.depth),
    caseAccuracy: caseValid.confidenceScore,
    detectedErrors: caseValid.discrepancies,
    suggestedCorrection: caseValid.correction,
  };
}`
    },
  },
  {
    title: "Vanilla Steel Assessment",
    source: "FastAPI | Microservices | Docker",
    category: "Data & Infra",
    description: "Production-ready commodity steel trading microservice demonstrating clean domain-driven architecture, asynchronous FastAPI endpoints, Pydantic validation, and Docker containerization with automated CI/CD.",
    skills: ["Python", "FastAPI", "Docker", "Testing", "CI/CD"],
    image: "/images/projects/project-vanilla-steel.webp",
    url: "https://github.com/saranjthilak/vanilla-steel-assessment",
    liveUrl: undefined as string | undefined,
    featured: true,
    nodeId: "NODE-0xVSTEEL-API",
    accent: "#38bdf8",
    metrics: [
      { label: "Test Coverage", value: "95%+" },
      { label: "Framework", value: "FastAPI Async" },
      { label: "Deploy", value: "Docker CI" },
    ],
    problem: "Industrial B2B trading workflows require rock-solid transaction endpoints with zero tolerance for schema drift, concurrency bugs, or unhandled data edge cases.",
    approach: "Constructed an asynchronous FastAPI backend backed by Docker containers, strict Pydantic schemas, comprehensive Pytest unit and integration test matrices, and GitHub Actions CI.",
    result: "Production-grade microservice architecture showcasing industry-standard software engineering discipline, high throughput, and reliable container orchestration.",
    pipeline: [
      { label: "REST Request", icon: "file" },
      { label: "FastAPI Async", icon: "layers" },
      { label: "Pydantic Schema", icon: "cpu" },
      { label: "Docker Mesh", icon: "server" },
      { label: "Pytest Suite", icon: "database" },
    ],
    architecture: {
      input: "JSON payload orders with steel grade, dimensions, and quantities",
      processing: "Asynchronous pricing & inventory allocation state machine",
      storage: "In-memory mock store / PostgreSQL transactional engine",
      serving: "FastAPI with Swagger/OpenAPI documentation auto-generated",
      latencyOrThroughput: "< 10ms endpoint response time, 95%+ test coverage",
    },
    codeSnippet: {
      language: "python",
      filename: "steel_order_api.py",
      code: `from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI(title="Vanilla Steel Trading Engine", version="1.0.0")

class OrderItem(BaseModel):
    grade: str = Field(..., example="S235JR")
    thickness_mm: float = Field(..., gt=0)
    quantity_tons: float = Field(..., gt=0)

@app.post("/api/v1/orders", status_code=status.HTTP_201_CREATED)
async def create_steel_order(order: OrderItem, service = Depends(get_order_service)):
    result = await service.process_quote(order)
    return {"order_id": result.id, "allocated": True, "total_eur": result.total_price}`
    },
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
