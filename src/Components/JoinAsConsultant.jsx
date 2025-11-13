import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


import img1 from "../Assets/images/ERP-Consultant.jpeg";
import img2 from "../Assets/images/handsome-man-by-car.jpg";
import img3 from "../Assets/images/business-man-by-car-talking-phone.jpg";

const JoinAsConsultant = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#f0f4e8]">
        {/* Hero Section */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-[70vh] min-h-[600px] max-h-[800px]"
          >
            <img
              src={img1}
              alt="ERP Consultant"
              className="w-full h-full object-cover rounded-b-4xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center justify-start">
              <div className="text-left px-8 lg:px-20 max-w-2xl">
              <motion.h1
  initial={{ y: -50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1, delay: 0.3 }}
  className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight whitespace-nowrap"
>
  Join as <span className="text-[#FFA500]"><br/>ERP Freelancer</span>
</motion.h1>

<motion.p
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1, delay: 0.6 }}
  className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8 whitespace-nowrap"
>
  You've Earned Your Expertise. Now, It's Time to Leverage It.
</motion.p>


                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ duration: 1, delay: 0.9 }}
                  className="h-2 bg-gradient-to-r from-[#FFA500] to-[#e59400] rounded-full mb-8"
                />
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: "#e59400",
                    boxShadow: "0 20px 40px rgba(255, 165, 0, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#FFA500] to-[#e59400] text-white font-bold py-4 px-12 rounded-2xl shadow-2xl text-lg transition-all duration-300"
                >
                  Start Your Journey
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-20 py-28">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-6"
            >
             
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 leading-tight">
              Stop Working for an Employer. <span className="text-[#708238]">Start Building Your Legacy.</span>
            </h2>
            
            <div className="text-left space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                For years, you've dedicated yourself to the complex world of ERP. 
                You've invested thousands of hours, working days and nights across 
                different projects, clients, and industries to deliver exceptional 
                results. That relentless commitment has forged you into a true 
                professional—a consultant who doesn't just implement, but who solves 
                critical business challenges.
              </p>
              
              <p>
                The expertise you've built is a unique and valuable asset. The 
                problems you've already solved are the very ones that businesses 
                across the globe are struggling with today.
              </p>
              
              <p>
                Before, you applied your skills to build someone else's vision. 
                Now, it's your time. JustERPs empowers you to step into a thriving 
                independent career where you work for yourself, directly converting 
                your hard-earned expertise into the recognition and income you truly deserve.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gradient-to-br from-[#f8f9fa] to-[#f0f4e8] py-28">
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-black text-gray-800 mb-6">
                When you join our elite network, you will:
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                  }}
                  className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFA500] to-[#708238]"></div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#708238] to-[#5f7030] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#708238] transition duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#708238]/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition duration-500"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
  <section className="container mx-auto px-6 lg:px-20 py-28">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="grid lg:grid-cols-2 gap-16 items-center"
  >
    {/* Left Side - Image */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={img2}
          alt="ERP Consultant Journey"
          className="w-full h-[500px] object-cover transform hover:scale-105 transition duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#FFA500] rounded-2xl transform -rotate-12 z-10"></div>
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#708238] rounded-2xl transform rotate-12 z-10"></div>
    </motion.div>

    {/* Right Side - Text */}
    <div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-8 leading-tight text-center lg:text-left">
        Your Journey Has Prepared You For This Moment
      </h2>

      <div className="space-y-6 text-base md:text-lg text-gray-700 leading-relaxed text-center lg:text-left">
        <p>
          You have the experience. You have the solutions. We provide the 
          platform, the projects, and the support.
        </p>
      </div>
    </div>
  </motion.div>

  {/* Tagline BELOW Section */}
  <div className="mt-16">
    <p
  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-center italic whitespace-nowrap"
>
  Stop earning what you're given.{" "}
  <span className="text-orange-500">
    Start earning what you deserve.
  </span>
</p>

  </div>
</section>





        {/* Final CTA */}
        <section className="container mx-auto px-6 lg:px-20 pb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#708238] via-[#5f7030] to-[#4a5727] text-white rounded-4xl shadow-2xl p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFA500] rounded-full -translate-y-32 translate-x-32 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFA500] rounded-full translate-y-24 -translate-x-24 opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-[#FFA500] to-[#ffcc00] bg-clip-text text-transparent">
                Join the JustERPs Elite Consultant Network Today
              </h2>
              <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
                Your expertise is your greatest asset. It's time to put it to work for you.
              </p>
             <div className="w-full flex justify-center">
  <div className="flex justify-center">
  <motion.button
    whileHover={{ 
      scale: 1.05, 
      backgroundColor: "#e59400",
      boxShadow: "0 20px 40px rgba(255, 165, 0, 0.4)"
    }}
    whileTap={{ scale: 0.95 }}
    className="bg-gradient-to-r from-[#FFA500] to-[#e59400] text-white font-bold py-5 px-12 rounded-2xl shadow-2xl transition-all duration-300 text-lg"
  >
    Join Now - It's Free
  </motion.button>
</div>

</div>

              <p className="text-sm mt-8 opacity-70">
                No upfront costs • Flexible commitment • Global opportunities
              </p>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

const benefits = [
  {
    title: "Unlock Your Earning Potential",
    description: "Command rates that truly reflect the value you bring. This is your opportunity to significantly increase your earnings, providing a better life for your family and elevating your standard of living.",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
  },
  {
    title: "Gain Global Recognition as a Problem Solver",
    description: "We connect you with a worldwide portfolio of exciting projects. Move beyond local limits and deliver your success to a global audience, building your reputation as a premier consultant.",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
  },
  {
    title: "Seize a Window of Opportunity",
    description: "Access a diverse and continuous stream of projects that match your specific skills. Find the challenges that inspire you and build a career on your own terms.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
];

export default JoinAsConsultant;