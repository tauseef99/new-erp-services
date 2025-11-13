import React, { useEffect, useState } from "react";
import videoBg from '../Assets/videos/JustERP.mp4'
import Navbar from "./Navbar";
import Footer from "./Footer";
import SignIn from "./SignIn";

const ErpConsultant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <Navbar/>
    
    <div className="font-sans text-gray-800 overflow-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden py-32">
        {/* Video Background */}
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1605902711622-cfb43c44367f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          >
            <source src={videoBg} type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className={`relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-4`}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Fun. Family.
          Freelancing</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Showcase your specialized ERP skills and connect with businesses worldwide
          </p>
          
          {/* ERP Specialist Types */}
          {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['Technical', 'Functional', 'Techno-Functional', 'Implementation', 'Support', 'Training'].map((type, index) => (
              <div 
                key={index}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 transition-all duration-300 hover:bg-white/30 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-medium">{type} ERP Specialist</span>
              </div>
            ))}
          </div> */}
          
          {/* Enhanced Button */}
          
          <button
              onClick={() => setIsModalOpen(true)}
              className="relative bg-gradient-to-r from-[#FFA500] to-[#ff8c00] hover:from-[#708238] hover:to-[#5a6a2c] 
              px-12 py-5 my-10 rounded-xl font-bold shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg group overflow-hidden"
            >
              <span className="relative z-10">Your Path to ERP Consulting</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#708238] to-[#5a6a2c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path> */}
                </svg>
              </div>
            </button>
          
        </div>

        {/* Statistics Section */}
        <div className="relative z-10 mt-20 flex flex-wrap justify-center gap-8 animate-on-scroll">
          {[
            { value: "50 sec", label: "New Project Every", },
            { value: "100M+", label: "Platform Transactions", },
            { value: "$100 - $30K", label: "Project Value Range", }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white/20 backdrop-blur-lg p-6 rounded-2xl border border-white/30 transition-all duration-500 hover:bg-white/30 hover:scale-110 flex flex-col items-center"
              style={{ transitionDelay: `${index * 150}ms`, minWidth: "180px" }}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm mt-2 opacity-90 text-center leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#708238] animate-on-scroll">
        Join our Global ERP Consulting Community
        </h2>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto animate-on-scroll">
          Connect with businesses seeking your specialized ERP skills and experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-on-scroll">
          {[
            { 
              name: "Technical ERP Specialist", 
              icon: "⚙️", 
              description: "Develop and customize ERP systems with technical expertise",
              skills: ["API Integration", "Database Management", "System Customization"]
            },
            { 
              name: "Functional ERP Specialist", 
              icon: "📊", 
              description: "Optimize business processes through ERP functionality",
              skills: ["Process Analysis", "Requirements Gathering", "Solution Design"]
            },
            { 
              name: "Techno-Functional ERP Specialist", 
              icon: "🔧", 
              description: "Bridge the gap between technical and functional requirements",
              skills: ["System Configuration", "Customization", "Business Process Optimization"]
            }
          ].map((role, index) => (
            <div
              key={index}
              className="p-10 border rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white group"
            >
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {role.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-[#708238] transition-colors duration-300">{role.name}</h3>
              <p className="text-gray-600 mb-6">{role.description}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {role.skills.map((skill, i) => (
                  <span key={i} className="bg-[#708238]/10 text-[#708238] px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-32 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-[#FFA500] animate-on-scroll">How it Works</h2>
        <p className="text-xl text-gray-600 mb-20 text-center max-w-3xl mx-auto animate-on-scroll">
          A simple process to start offering your ERP expertise to clients worldwide
        </p>
        
        <div className="grid md:grid-cols-3 gap-14 max-w-6xl mx-auto animate-on-scroll">
          {[
            { step: "1", title: "Create Your Specialist Profile", description: "Showcase your ERP expertise, certifications, and experience to attract the right clients.", color: "bg-[#708238]" },
            { step: "2", title: "Connect with Clients", description: "Get matched with businesses needing your specific ERP skills and deliver solutions.", color: "bg-[#FFA500]" },
            { step: "3", title: "Grow Your Practice", description: "Build your reputation, receive reviews, and expand your ERP consulting business.", color: "bg-[#708238]" }
          ].map((item, index) => (
            <div 
              key={index} 
              className="text-center p-10 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative group"
            >
              <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-8 group-hover:scale-110 transition-transform duration-300`}>
                {item.step}
              </div>
              <h3 className="text-2xl font-semibold mb-5 group-hover:text-[#708238] transition-colors duration-300">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center text-[#708238] animate-on-scroll">ERP Specialist Success Stories</h2>
        <p className="text-xl text-gray-600 mb-20 text-center max-w-3xl mx-auto animate-on-scroll">
          Hear from ERP specialists who have transformed their careers using our platform
        </p>
        
        <div className="grid md:grid-cols-3 gap-10 animate-on-scroll">
          {[
            { name: "Sarah", role: "Technical SAP Specialist", text: "Doubled my client base within 3 months by showcasing my technical SAP skills.", delay: 0 },
            { name: "Michael", role: "Functional Oracle Specialist", text: "Found niche clients who specifically needed my functional expertise in supply chain modules.", delay: 200 },
            { name: "Tauseef", role: "Techno-Functional ERP Consultant", text: "The perfect platform to highlight my dual expertise in both technical and functional areas.", delay: 400 }
          ].map((story, index) => (
            <div 
              key={index} 
              className="p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group"
              style={{ animationDelay: `${story.delay}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#708238] to-[#FFA500] rounded-full flex items-center justify-center text-white font-bold text-2xl group-hover:scale-110 transition-transform duration-300">
                  {story.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-lg">{story.name}</p>
                  <p className="text-gray-500 text-sm">{story.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic text-lg">"{story.text}"</p>
              <div className="flex mt-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-[#FFA500]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#708238] to-[#8fa752] py-32 text-center text-white">
        <div className="max-w-4xl mx-auto px-6 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Showcase Your ERP Expertise?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Join thousands of ERP specialists already growing their consulting practice on our platform
          </p>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#FFA500] hover:bg-white hover:text-[#708238] px-12 py-5 rounded-xl font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg">
            Get Started Today
          </button>
        </div>
      </section>
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="max-w-6xl w-full mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden h-screen relative">
      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl font-bold z-50"
      >
        ✕
      </button>

      {/* Rendering SignIn Component */}
      <SignIn />
    </div>
  </div>
)}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
      `}</style>
    </div>
    <Footer/>
    </>
  );
};

export default ErpConsultant;
