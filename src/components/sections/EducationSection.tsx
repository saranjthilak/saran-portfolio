
const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">Education</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="text-white/80 mt-4 text-xl max-w-2xl mx-auto">
            Dedicated to continuous learning—my academic journey spans engineering, data science, and specialized bootcamps across top universities and institutes.
          </p>
        </div>
        <div className="space-y-8">
          {/* Le Wagon Boot Camp */}
          <div className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg mr-0 md:mr-8 mb-6 md:mb-0">
              🧑‍💻
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">Le Wagon</h3>
              <div className="text-blue-300 text-lg mb-2">Boot Camp, Data science and AI</div>
              <div className="text-white/70 text-lg">04/2025 – 06/2025</div>
            </div>
          </div>
          {/* Master's - University of Europe for Applied Sciences */}
          <div className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-blue-400 to-green-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg mr-0 md:mr-8 mb-6 md:mb-0">
              📓
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">University of Europe for Applied Sciences</h3>
              <div className="text-blue-300 text-lg mb-2">Master's degree, Data Science</div>
              <div className="text-white/70 text-lg">04/2022 – 03/2023</div>
            </div>
          </div>
          {/* PG Diploma - Delhi University */}
          <div className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg mr-0 md:mr-8 mb-6 md:mb-0">
              📜
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">Delhi University</h3>
              <div className="text-blue-300 text-lg mb-2">PG DIPLOMA; NIELIT, VLSI AND EMBEDDED SYSTEMS HW DESIGNING</div>
              <div className="text-white/70 text-lg">01/2013 – 12/2014</div>
            </div>
          </div>
          {/* Bachelor - Cochin University of Science and Technology */}
          <div className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg mr-0 md:mr-8 mb-6 md:mb-0">
              🏫
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">Cochin University of Science and Technology</h3>
              <div className="text-blue-300 text-lg mb-2">Bachelor of Technology (BTech), Electrical, Electronics and Communications Engineering</div>
              <div className="text-white/70 text-lg">01/2009 – 12/2013</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
