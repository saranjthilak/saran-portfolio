
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6">Let's Connect</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="text-white text-xl sm:text-2xl">Get in Touch</CardTitle>
              <CardDescription className="text-white/70 text-base sm:text-lg">
                Ready to collaborate or discuss opportunities? Reach out!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <a href="tel:+491744614592" className="flex items-center space-x-4 p-3 sm:p-4 bg-black/20 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-white text-base sm:text-lg tracking-wider">+49 174 461 4592</span>
              </a>
              <a href="mailto:saranjthilak@gmail.com" className="flex items-center space-x-4 p-3 sm:p-4 bg-black/20 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-white text-base sm:text-lg tracking-wider break-all">saranjthilak@gmail.com</span>
              </a>
              <div className="flex items-center space-x-4 p-3 sm:p-4 bg-black/20 rounded-xl backdrop-blur-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-white text-base sm:text-lg tracking-wider">Berlin, Germany</span>
              </div>
              <Separator className="bg-white/20" />
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="https://www.linkedin.com/in/saranjayathilak" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl py-3 transition-all duration-300 hover:scale-105 flex items-center justify-center text-sm sm:text-base font-semibold">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  LinkedIn
                </a>
                <a href="https://github.com/saranjthilak" target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-xl py-3 transition-all duration-300 hover:scale-105 flex items-center justify-center text-sm sm:text-base font-semibold">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
