import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, Phone, Download, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  // Form handling for contact form
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = async (data: any) => {
    try {
      // Simulate sending message (you can integrate with email service later)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Message sent successfully! I'll get back to you soon.", {
        description: "Thank you for reaching out.",
      });
      
      reset(); // Clear form after successful submission
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        description: "There was an error sending your message.",
      });
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  const handleDownloadResume = () => {
    const resumeUrl = "https://github.com/saranjthilak/saran-portfolio/raw/main/SaranJayaThilakResume%20(29).pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'SaranJayaThilak_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const experience = [
    {
      company: "Tesla",
      role: "Production Associate",
      period: "2023–2025",
      description: "Optimized production processes and implemented data-driven solutions for manufacturing efficiency.",
      logo: "🚗"
    },
    {
      company: "Huawei",
      role: "Cloud Support Engineer",
      period: "2019–2022",
      description: "Managed cloud infrastructure and provided technical support for enterprise clients.",
      logo: "☁️"
    },
    {
      company: "Huawei",
      role: "O&M Engineer",
      period: "2016–2019",
      description: "Operations and maintenance engineering for telecommunications infrastructure.",
      logo: "🔧"
    },
    {
      company: "Nokia",
      role: "O&M Engineer",
      period: "2014–2016",
      description: "Network operations and maintenance for telecommunications systems.",
      logo: "📡"
    }
  ];

  const projects = [
    {
      title: "Divvy Bikes End-to-End Data Pipeline",
      tools: ["GCP", "DBT", "Airflow", "BigQuery"],
      description: "Built a comprehensive data pipeline for bike-sharing analytics with automated ETL processes.",
      impact: "Improved data processing efficiency by 40%"
    },
    {
      title: "Data Visualizations for Netflix, Airbnb, Unicorn Companies",
      tools: ["Python", "Tableau", "Power BI", "Pandas"],
      description: "Created interactive dashboards and visualizations for business intelligence.",
      impact: "Enhanced decision-making with real-time insights"
    },
    {
      title: "Terraform EC2 Setup",
      tools: ["Terraform", "AWS", "Docker", "CI/CD"],
      description: "Automated cloud infrastructure deployment and management.",
      impact: "25% reduction in deployment cycle times"
    },
    {
      title: "Streamlit Sales Forecast Tool",
      tools: ["Python", "Streamlit", "TensorFlow", "ML"],
      description: "Machine learning application for sales forecasting with interactive interface.",
      impact: "Improved forecast accuracy by 30%"
    }
  ];

  const skills = {
    "Languages & ML": ["Python", "SQL", "NLP", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
    "Cloud & DevOps": ["AWS", "GCP", "Docker", "Terraform", "Kubernetes", "Jenkins", "Git", "CI/CD"],
    "BI & Analytics": ["Tableau", "Power BI", "DBT", "BigQuery", "Airflow", "Apache Spark", "Snowflake"]
  };

  const publications = [
    {
      title: "Solar PV ML Estimation",
      journal: "IEEE",
      date: "Sep 2023",
      description: "Machine learning approach for solar photovoltaic energy estimation and optimization."
    },
    {
      title: "Airfare Prediction",
      journal: "IEEE",
      date: "Nov 2022",
      description: "Predictive modeling for airline ticket pricing using advanced ML algorithms."
    }
  ];

  const certifications = [
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

  const navigation = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "skills", label: "Skills", icon: "⚡" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "publications", label: "Publications", icon: "📚" },
    { id: "certifications", label: "Certifications", icon: "🏆" },
    { id: "contact", label: "Contact", icon: "📧" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-white/10 backdrop-blur-xl border-r border-white/20 z-10">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-12">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white font-bold text-xl">Portfolio</h2>
          </div>
          
          <nav className="space-y-3">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/25"
                    : "text-white/70 hover:bg-white/10 hover:text-white hover:transform hover:translate-x-1"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>
          
          {/* Social Links */}
          <div className="mt-12 space-y-4">
            <h3 className="text-white/70 text-sm font-medium uppercase tracking-wider">Connect</h3>
            <div className="grid grid-cols-2 gap-3">
              <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-blue-500/20 rounded-xl transition-all duration-300 group">
                <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://github.com/saranjthilak" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-gray-500/20 rounded-xl transition-all duration-300 group">
                <Github className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
              </a>
              <a href="tel:+491744614592" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-green-500/20 rounded-xl transition-all duration-300 group">
                <Phone className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:saranjthilak@gmail.com" className="flex items-center justify-center space-x-2 p-3 bg-white/10 hover:bg-red-500/20 rounded-xl transition-all duration-300 group">
                <Mail className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 min-h-screen relative z-0">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-2xl border-white/20 shadow-2xl shadow-black/20">
              <CardContent className="p-16">
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-8">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 px-6 py-2 rounded-full border border-blue-500/30 mb-8">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-300 text-sm font-medium">Available for new opportunities</span>
                    </div>
                    
                    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Saran Jaya Thilak
                    </h1>
                    <p className="text-2xl mb-8 text-blue-200 font-light">
                      Data Scientist | Machine Learning | Cloud Infrastructure | CI/CD Automation Specialist
                    </p>
                    <p className="text-lg mb-10 text-white/80 max-w-3xl leading-relaxed">
                      A data science professional with over 3 years of experience in machine learning and cloud infrastructure. 
                      Key achievements include a 25% improvement in deployment cycles through CI/CD automation pipelines and a 15% 
                      reduction in inventory costs via efficient management strategies. Experienced in designing scalable, cloud-native 
                      infrastructures on AWS and building CI/CD pipelines to enhance deployment cycles.
                    </p>
                    <div className="flex items-center space-x-3 mb-10">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span className="text-white/80 text-lg">Berlin, Germany</span>
                    </div>
                    <div className="flex space-x-6">
                      <Button 
                        onClick={() => scrollToSection('projects')}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                      >
                        Explore My Work
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                      <Button 
                        onClick={handleDownloadResume}
                        variant="outline" 
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                      >
                        <Download className="mr-2 w-5 h-5" />
                        Download Resume
                      </Button>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="relative">
                      <div className="w-80 h-80 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl shadow-black/40 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm">
                        <img 
                          src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                          alt="Saran Jaya Thilak" 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
                    <span>Key Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-xl">25% Deployment Cycle Improvement</h3>
                      <p className="text-white/70">CI/CD automation pipelines optimization</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl">💰</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-xl">15% Inventory Cost Reduction</h3>
                      <p className="text-white/70">Efficient management strategies implementation</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-xl">98% SLA Compliance</h3>
                      <p className="text-white/70">Team leadership in global network operations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg"></div>
                    <span>Professional Background</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-white/80 leading-relaxed text-lg">
                    With over 3 years of experience in machine learning and cloud infrastructure, 
                    I specialize in building scalable data solutions and CI/CD automation. 
                    My expertise spans Python, SQL, and cloud technologies including AWS.
                  </p>
                  <p className="text-white/80 leading-relaxed text-lg">
                    I have demonstrated success in designing and deploying scalable, cloud-native 
                    infrastructures, building efficient CI/CD pipelines, and improving system 
                    reliability and cost efficiency through proactive monitoring.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Experience</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2">{job.role}</h3>
                          <p className="text-blue-300 font-semibold text-xl mb-3">{job.company}</p>
                          <p className="text-white/70 text-lg leading-relaxed max-w-2xl">{job.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/30 text-blue-300 px-4 py-2 text-sm">
                        {job.period}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">My Skills</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {Object.entries(skills).map(([category, skillList], index) => (
                <Card key={category} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl text-center flex items-center justify-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${
                        index === 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        index === 1 ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
                        'bg-gradient-to-r from-purple-500 to-pink-600'
                      }`}></div>
                      <span>{category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {skillList.map((skill) => (
                        <div
                          key={skill}
                          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10 hover:border-blue-500/50 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                        >
                          <span className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Featured Projects</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {projects.map((project, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                  <CardHeader>
                    <CardTitle className="text-white text-xl group-hover:text-blue-200 transition-colors">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-3">
                      {project.tools.map((tool) => (
                        <Badge key={tool} className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 border-blue-500/30 hover:scale-110 transition-transform duration-200">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 mb-6 text-lg leading-relaxed">{project.description}</p>
                    <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 font-semibold">Impact:</span>
                      <span className="text-white/70">{project.impact}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Publications</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-8">
              {publications.map((pub, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors">{pub.title}</h3>
                        <p className="text-white/70 mb-6 text-lg leading-relaxed">{pub.description}</p>
                        <div className="flex items-center space-x-6">
                          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-blue-500/30 text-blue-300 px-4 py-2">
                            {pub.journal}
                          </Badge>
                          <span className="text-white/60 text-lg">{pub.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-300 hover:text-white hover:bg-blue-500/20 rounded-2xl group-hover:scale-110 transition-all duration-300">
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Certifications</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {cert.logo}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{cert.title}</h3>
                        {cert.level && <p className="text-blue-300 text-lg mb-2">{cert.level}</p>}
                        <p className="text-white/70 text-lg">{cert.issuer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Let's Connect</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Get in Touch</CardTitle>
                  <CardDescription className="text-white/70 text-lg">
                    Ready to collaborate or discuss opportunities? Reach out!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <a href="tel:+491744614592" className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-lg">+49 174 461 4592</span>
                  </a>
                  <a href="mailto:saranjthilak@gmail.com" className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-lg">saranjthilak@gmail.com</span>
                  </a>
                  <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-lg">Berlin, Germany</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex space-x-4">
                    <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl py-3 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </a>
                    <a href="https://github.com/saranjthilak" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-2xl py-3 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-white text-lg mb-2 block">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your name" 
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-2xl py-3 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                        {...register("name", { required: "Name is required" })}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white text-lg mb-2 block">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your.email@example.com" 
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-2xl py-3 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-white text-lg mb-2 block">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Your message..." 
                        rows={4}
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/50 rounded-2xl py-3 backdrop-blur-sm focus:bg-white/20 transition-all duration-300"
                        {...register("message", { required: "Message is required" })}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl py-4 text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-8 border-t border-white/20 bg-white/5 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-white/60 text-lg">
              © 2024 Saran Jaya Thilak. Built with passion for data and innovation.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
