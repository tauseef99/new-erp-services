// AboutJustERPs.jsx
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Replace these with your real images later
import heroImg from "../Assets/images/7.jpg";
import featureImg1 from "../Assets/images/13.jpg";
import featureImg2 from "../Assets/images/4.png";
import featureImg3 from "../Assets/images/11.jpg";
import galleryPlaceholder from "../Assets/images/8.jpg";

const values = [
  {
    title: "Global Expertise, Local Impact",
    text: "We connect you to a worldwide network of elite ERP professionals, ensuring you get the right expertise for your specific business context, no matter where you are.",
    icon: "🌍",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Maximum Value, Measured by Your ROI",
    text: "We are relentlessly focused on delivering the highest possible return on your ERP investment, optimizing systems for peak performance and cost-efficiency.",
    icon: "📈",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    title: "Powering Potential, from SMB to Enterprise",
    text: "We believe every company, from a growing startup to a global leader, deserves access to the tools and talent needed to harness the full power of their ERP systems.",
    icon: "⚡",
    gradient: "from-purple-500 to-pink-400",
  },
  {
    title: "One Community, Endless Solutions",
    text: "We are more than a platform; we are a collaborative ecosystem where businesses and consultants unite to solve challenges, innovate, and drive the future of operational excellence.",
    icon: "🤝",
    gradient: "from-orange-500 to-red-400",
  },
  {
    title: "Simplicity in a World of Complexity",
    text: "We cut through the clutter of enterprise technology, providing a streamlined, intuitive way to find expert help and achieve clarity in your operations.",
    icon: "🔍",
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    title: "Built for Tomorrow, Ready Today",
    text: "Our platform and our community are designed for adaptability, ensuring your business is equipped to evolve, scale, and embrace new opportunities with confidence.",
    icon: "🚀",
    gradient: "from-amber-500 to-yellow-400",
  },
];

const features = [
  {
    title: "Routine Upgrades & Optimization",
    desc: "Keep your ERP up-to-date with minimal downtime and expert-driven upgrade plans tailored to your business needs.",
    img: featureImg1,
   
  },
  {
    title: "Custom Dashboards & Reporting",
    desc: "Tailored dashboards, Crystal Report formats, and reporting for the KPIs that matter most to your business success.",
    img: featureImg2,
   
  },
  {
    title: "End-to-End Implementations",
    desc: "From discovery to rollout — experienced consultants to guide large-scale transformations and complex global rollouts.",
    img: featureImg3,
   
  },
];

const globalHubs = ["Vancouver", "New York", "London", "Frankfurt", "Stockholm", "Middle East"];

const JustERPs = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* ENHANCED HERO */}
       <section className="relative w-full overflow-hidden">
  <motion.div
    initial={{ scale: 1.05, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2 }}
    className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center"
  >
    <img
      src={heroImg}
      alt="JustERPs hero"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

    {/* Floating Elements */}
    <div className="absolute top-12 left-12 w-5 h-5 bg-[#FFA500] rounded-full opacity-80 animate-float-slow" />
    <div
      className="absolute top-32 right-20 w-7 h-7 bg-[#FFA500] rounded-full opacity-50 animate-float-slow"
      style={{ animationDelay: "0.5s" }}
    />
    <div className="absolute bottom-24 left-1/4 w-4 h-4 bg-white rounded-full opacity-60 animate-pulse" />
    <div
      className="absolute top-1/2 right-1/4 w-6 h-6 bg-[#708238] rounded-full opacity-90 animate-bounce"
      style={{ animationDelay: "0.5s" }}
    />

    <div className="relative z-10 text-center px-6 lg:px-24">
  {/* Optional top tag section (kept empty for spacing) */}
  <motion.div
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, delay: 0.2 }}
    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6"
  ></motion.div>

  {/* Main Heading */}
  <motion.h1
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, delay: 0.3 }}
    className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6"
  >
    <span className="bg-gradient-to-r from-white via-white to-amber-200 bg-clip-text text-transparent">
      JustERPs
    </span>
    <br />
    <span className="bg-gradient-to-r from-amber-400 to-[#708238] bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold">
      Your Global ERP Partner
    </span>
  </motion.h1>

  {/* Description Paragraph */}
  <motion.p
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.9, delay: 0.1 }}
    className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8 leading-relaxed"
  ></motion.p>

  {/* Divider line */}
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: "280px" }}
    transition={{ duration: 1.2, delay: 0.1 }}
    className="h-1.5 bg-gradient-to-r from-amber-400 via-[#708238] to-cyan-400 rounded-full mx-auto mb-8 shadow-lg"
  />
</div>
  </motion.div>
</section>


        {/* ENHANCED JOURNEY SECTION */}
        <section id="our-journey" className="py-28 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_#f8fafc_25%,_transparent_25%),_linear-gradient(-45deg,_#f8fafc_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_#f8fafc_75%),_linear-gradient(-45deg,_transparent_75%,_#f8fafc_75%)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,_black_40%,_transparent_100%)] opacity-30"></div>
          
          <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-[#708238]/10 rounded-full -translate-y-16 translate-x-16"></div>
                
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 leading-tight">
                  Creating Unified ERP Solutions for{" "}
                  <span className="bg-gradient-to-r from-amber-600 to-[#708238] bg-clip-text text-transparent">
                    Global Businesses
                  </span>
                </h2>
                
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                   Founded in <strong> 2025,</strong> JustERPs was built on a bold vision: to create the universal
platform where businesses and ERP talent unite to shape the future of enterprise. We are more than a

marketplace for projects; we are a dynamic learning ecosystem. Here, experts collaborate as a unified team
to deliver optimal outcomes and drive success for businesses worldwide.
                  </p>

                  <p className="text-lg">
                   From our headquarters in <strong>Vancouver, BC,</strong> we are building our global footprint with planned
expansions into key international hubs, including New York, London, Frankfurt, Stockholm, and the
Middle East.
                  </p>

                  
                </div>

              
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-[#708238]/10 to-cyan-400/10 z-10" />
                <img
                  src={galleryPlaceholder}
                  alt="JustERPs global journey"
                  className="w-full h-[520px] object-cover transform group-hover:scale-110 transition duration-1000"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 z-20">
                  <h3 className="text-xl font-bold text-white mb-2">Building Global Footprint</h3>
                  <p className="text-white/80">Connecting businesses with elite ERP talent worldwide</p>
                </div>
              </div>
              
              {/* Floating stats */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100"
              >
                <div className="text-2xl font-black text-gray-800">2,000+</div>
                <div className="text-sm text-gray-600">Specialized Categories</div>
              </motion.div> */}
            </motion.div>
          </div>
        </section>

        {/* ENHANCED FEATURES SECTION */}
        <section className="py-24 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#708238]/10 rounded-full -translate-x-40 translate-y-40"></div>
          
          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 text-center leading-tight">
  Curated Marketplace for{" "}
  <span className="bg-gradient-to-r from-amber-600 to-[#708238] bg-clip-text text-transparent block">
    United ERP Solutions
  </span>
</h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                Spanning the entire ERP spectrum with over 2,000 specialized categories. 
                From routine upgrades to complete architectural advancements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-[#708238] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                    <div className="w-full h-48 mb-6 rounded-xl overflow-hidden relative">
                      <img 
                        src={f.img} 
                        alt={f.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{f.title}</h3>
                      <p className="text-gray-600 mb-6 flex-1">{f.desc}</p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                          {f.stats}
                        </span>
                        
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ENHANCED VISION & MISSION */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white to-[#708238]/10"></div>
          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6">
                  Vision. <span className="text-amber-600">Mission.</span> Values.
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-[#708238] rounded-full mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Vision Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl shadow-lg border border-blue-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center text-2xl text-white mb-6">
                      👁️
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To be the universal platform where businesses and ERP talent unite to shape the future of enterprise.
                    </p>
                  </div>
                </motion.div>

                {/* Mission Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl shadow-lg border border-amber-100 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-400 rounded-2xl flex items-center justify-center text-2xl text-white mb-6">
                      🎯
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To ensure every business maximizes its ERP investment by connecting them with a global pool of expert consultants—delivering superior outcomes and exceptional value.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ENHANCED VALUES SECTION */}
        <section id="values" className="py-28 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(#708238_1px,transparent_1px)] [background-size:32px_32px]"></div>
          </div>
          
          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                  Our <span className="bg-gradient-to-r from-amber-600 to-[#708238] bg-clip-text text-transparent">Core Values</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  The principles that guide our global community and drive exceptional outcomes for businesses worldwide.
                </p>
              </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
  {values.map((v, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-500 h-full relative overflow-hidden">
        {/* Softer gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${v.gradient} opacity-0 group-hover:opacity-[0.04] transition duration-500`}
        ></div>

        <div className="relative z-10">
          {/* Soft icon background */}
          <div
            className={`w-14 h-14 bg-gradient-to-br ${v.gradient} rounded-2xl flex items-center justify-center text-2xl text-white/90 mb-6 group-hover:scale-105 transition duration-300 shadow-sm`}
            style={{
              filter: "saturate(45%) brightness(0.9) blur(0.2px)",
            }}
          >
            {v.icon}
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition duration-300">
            {v.title}
          </h3>
          <p className="text-gray-600 leading-relaxed tracking-wide">
            {v.text}
          </p>
        </div>
      </div>
    </motion.div>
  ))}
</div>




              {/* Enhanced image gallery */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                    className="group relative rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transition duration-500"
                  >
                    <img 
                      src={galleryPlaceholder} 
                      alt={`JustERPs global community ${item}`} 
                      className="w-full h-40 object-cover transform group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-4">
                      <span className="text-white text-sm font-medium">Global Community</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div> */}
            </motion.div>
          </div>
        </section>

        {/* ENHANCED CTA SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#708238]/10 via-amber-400/10 to-cyan-400/10"></div>
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-300/20 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#708238]/20 rounded-full animate-float-slow" style={{animationDelay: '2s'}}></div>
          
          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-gray-100 text-center relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400 to-[#708238] rounded-full -translate-y-16 translate-x-16 opacity-10"></div>
                
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 text-center leading-tight">
  Ready to Accelerate Your
  <br />
  <span className="bg-gradient-to-r from-amber-600 to-[#708238] bg-clip-text text-transparent">
    ERP Outcomes?
  </span>
</h2>

                
                <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Connect with certified ERP consultants, request a customized proposal, 
                  or explore specialized talent for your next project—from discrete tasks 
                  to comprehensive implementations.
                </p>

          <div className="flex items-center justify-center gap-6 flex-wrap">
  {/* Green Button */}
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-r from-[#708238] to-[#5a6a2d] text-white font-semibold text-lg py-4 px-10 rounded-2xl shadow-lg hover:shadow-2xl hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 min-w-[280px]"
  >
    <span>Find Expert Consultants</span>
    <span className="text-xl leading-none">→</span>
  </motion.a>

  {/* Orange Button */}
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg py-4 px-10 rounded-2xl shadow-lg hover:shadow-2xl hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 min-w-[280px]"
  >
    <span>Request Custom Proposal</span>
    <span className="text-xl leading-none">→</span>
  </motion.a>
</div>



                <div className="mt-8 text-sm text-gray-500">
                  Trusted by businesses worldwide • From SMB to Fortune 500 • 2,000+ Specialized Categories
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Enhanced animations */}
      <style>
        {`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        .animate-float-slow { 
          animation: float-slow 8s ease-in-out infinite; 
        }

        @keyframes subtle-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-subtle-glow { 
          animation: subtle-glow 3s ease-in-out infinite; 
        }
        `}
      </style>
    </>
  );
};

export default JustERPs;