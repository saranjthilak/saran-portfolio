
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  return (
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

          <ContactForm />

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
