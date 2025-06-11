
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, ArrowRight, Github, Linkedin, Mail, Phone, Download, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800">
      {/* Navigation Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-black/20 backdrop-blur-md border-r border-white/10 z-10">
        <div className="p-6">
          <h2 className="text-white font-bold text-lg mb-8">Portfolio</h2>
          <nav className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          
          {/* Social Links */}
          <div className="mt-8 space-y-3">
            <h3 className="text-white/70 text-sm font-medium">Social Links</h3>
            <a href="https://linkedin.com/in/saranjthilak" className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a href="https://github.com/saranjthilak" className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
            <a href="tel:+4917446154592" className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Phone</span>
            </a>
            <a href="mailto:saranjthilak@gmail.com" className="flex items-center space-x-3 text-white/70 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              <span className="text-sm">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-teal-500/90 backdrop-blur-sm border-0 text-white">
              <CardContent className="p-12">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h1 className="text-5xl font-bold mb-4">Saran Jaya Thilak</h1>
                    <p className="text-xl mb-6 opacity-90">
                      Data Scientist | Business Intelligence Specialist | AWS Certified Solutions Architect
                    </p>
                    <p className="text-lg mb-8 opacity-80 max-w-2xl leading-relaxed">
                      Innovative Data Scientist with 5+ years of expertise in cloud infrastructure, 
                      data analytics, and CI/CD automation. Passionate about merging cutting-edge 
                      technology to solve complex problems and drive insights through data.
                    </p>
                    <div className="flex items-center space-x-4 mb-8">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Berlin, Germany</span>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <Button 
                        onClick={() => scrollToSection('projects')}
                        variant="outline" 
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                      >
                        Explore My Work
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                      >
                        <Download className="mr-2 w-4 h-4" />
                        Download Resume
                      </Button>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                      <img 
                        src="/lovable-uploads/5881e7e5-f088-4e07-a79c-59eacb55eeb0.png" 
                        alt="Saran Jaya Thilak" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Key Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">25% Deployment Cycle Improvement</h3>
                      <p className="text-white/70">Optimized CI/CD processes for faster delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">15% Inventory Cost Reduction</h3>
                      <p className="text-white/70">Data-driven optimization strategies</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">98% SLA Compliance</h3>
                      <p className="text-white/70">Led teams to exceptional service levels</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Education & Background</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 leading-relaxed">
                    With over 5 years of experience in data science and cloud infrastructure, 
                    I specialize in building scalable data solutions and leading technical teams. 
                    My expertise spans across machine learning, business intelligence, and DevOps practices.
                  </p>
                  <p className="text-white/80 leading-relaxed mt-4">
                    I'm passionate about Trustworthy AI and seek opportunities to drive innovation 
                    through data-driven insights while maintaining ethical AI practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Experience</h2>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl">
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{job.role}</h3>
                          <p className="text-teal-300 font-semibold">{job.company}</p>
                          <p className="text-white/70">{job.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-teal-500 text-teal-300">
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
        <section id="skills" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">My Skills</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(skills).map(([category, skillList]) => (
                <Card key={category} className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-center">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {skillList.map((skill) => (
                        <div
                          key={skill}
                          className="bg-slate-800/50 rounded-lg p-3 text-center border border-white/10 hover:border-teal-500/50 transition-colors"
                        >
                          <span className="text-white text-sm font-medium">{skill}</span>
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
        <section id="projects" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 mb-4">{project.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-teal-300 font-semibold">Impact:</span>
                      <span className="text-white/70">{project.impact}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Publications</h2>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{pub.title}</h3>
                        <p className="text-white/70 mb-2">{pub.description}</p>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline" className="border-teal-500 text-teal-300">
                            {pub.journal}
                          </Badge>
                          <span className="text-white/60">{pub.date}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-teal-300 hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Certifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center text-3xl">
                        {cert.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                        {cert.level && <p className="text-teal-300">{cert.level}</p>}
                        <p className="text-white/70">{cert.issuer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Let's Connect</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Get in Touch</CardTitle>
                  <CardDescription className="text-white/70">
                    Ready to collaborate or discuss opportunities? Reach out!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-teal-300" />
                    <span className="text-white">+49 174 461 4592</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-teal-300" />
                    <span className="text-white">saranjthilak@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-teal-300" />
                    <span className="text-white">Berlin, Germany</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Send a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name" 
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <textarea 
                      id="message" 
                      placeholder="Your message..." 
                      rows={4}
                      className="w-full rounded-md border border-white/30 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                    Send Message
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-8 border-t border-white/20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-white/60">
              © 2024 Saran Jaya Thilak. Built with passion for data and innovation.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
