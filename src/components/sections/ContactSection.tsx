
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import HudFrame from "@/components/ui/hud-frame";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Let's Connect" tag="Channel Open" />
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <Reveal direction="right">
          <HudFrame scan>
          <Card className="bg-black/30 backdrop-blur-xl border border-cyan-400/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 hover:border-cyan-400/60">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl flex items-center space-x-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span>Get in Touch</span>
              </CardTitle>
              <CardDescription className="text-white/70 text-base sm:text-lg">
                Ready to collaborate or discuss opportunities? Reach out!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <a href="mailto:saranjthilak@gmail.com" className="flex items-center space-x-4 p-3 sm:p-4 bg-black/40 rounded-xl backdrop-blur-sm border border-fuchsia-400/20 hover:border-fuchsia-400/60 hover:bg-fuchsia-500/10 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.5)] group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-white text-base sm:text-lg tracking-wider break-all">saranjthilak@gmail.com</span>
              </a>
              <div className="flex items-center space-x-4 p-3 sm:p-4 bg-black/40 rounded-xl backdrop-blur-sm border border-indigo-400/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-white text-base sm:text-lg tracking-wider">Berlin, Germany</span>
              </div>
              <Separator className="bg-cyan-400/20" />
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white rounded-xl py-3 transition-all duration-300 hover:scale-105 flex items-center justify-center text-sm sm:text-base font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  LinkedIn
                </a>
                <a href="https://github.com/saranjthilak" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 text-white rounded-xl py-3 transition-all duration-300 hover:scale-105 flex items-center justify-center text-sm sm:text-base font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(217,70,239,0.4)]">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  GitHub
                </a>
              </div>
            </CardContent>
          </Card>
          </HudFrame>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
          <HudFrame scan variant="fuchsia">
            <ContactForm />
          </HudFrame>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
