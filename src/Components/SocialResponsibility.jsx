import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img from "../Assets/images/social-responsibilty.jpg";
import Navbar from '../Components/Navbar';
import Footer from "./Footer";
import { Book, GraduationCap, Globe2, Apple } from "lucide-react";

const SocialResponsibility = () => {
  const [impactCounters, setImpactCounters] = useState({
    projects: 0,
    children: 0,
    communities: 0,
  });

  useEffect(() => {
    // Animate counters
    const animateCounters = () => {
      const targets = { projects: 1250, children: 500, communities: 75 };
      const duration = 2000;
      const steps = 60;
      const stepValues = {};

      Object.keys(targets).forEach((key) => {
        stepValues[key] = targets[key] / steps;
      });

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        setImpactCounters((prev) => ({
          projects: Math.min(
            Math.floor(prev.projects + stepValues.projects),
            targets.projects
          ),
          children: Math.min(
            Math.floor(prev.children + stepValues.children),
            targets.children
          ),
          communities: Math.min(
            Math.floor(prev.communities + stepValues.communities),
            targets.communities
          ),
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    };

    setTimeout(animateCounters, 500);
  }, []);

  return (
    <>
    <Navbar/>
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Hero Section */}
      <div className="relative w-full">
        <motion.img
          src={img}
          alt="Social Responsibility"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-[650px] object-cover rounded-b-3xl shadow-2xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg"
          >
            Social Responsibility
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            Work With Purpose. Hire With Heart.
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "7rem" }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-6 h-1 bg-[#FFA500] rounded-full"
          />
        </div>
      </div>

      {/* Intro Section */}
     <div className="container mx-auto px-6 lg:px-20 py-24">
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="bg-white rounded-3xl shadow-2xl p-10 lg:p-16 text-center 
               transition-colors duration-500 hover:bg-[#708238] group"
  >
    <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6 group-hover:text-white">
      More Than Just a Marketplace
    </h2>
    <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto group-hover:text-white">
      JustERPs is more than a platform connecting businesses with top-tier
      ERP consultants it's a catalyst for change. While our consultants
      deliver exceptional project-based results across SAP, NetSuite,
      Oracle, and beyond, our mission reaches further: to harness digital
      transformation as a force for social good.
    </p>
  </motion.div>
</div>



      {/* Impact Model Section */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-[#708238] mb-4">
            The JustERPs Impact Model
          </h2>
          <div className="w-32 h-1 bg-[#FFA500] mx-auto mb-6"></div>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            We will reinvest a portion of every transaction into high-impact, community-driven initiatives
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
  {impactInitiatives.map((initiative, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg p-10 hover:scale-105 hover:shadow-2xl group transition"
    >
      {/* Green filled box with orange icon */}
      <div className="w-16 h-16 bg-[#708238] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
        <span className="text-2xl text-orange-500">{initiative.icon}</span>
      </div>

      {/* Title with hover color change */}
      <h3 className="text-xl font-bold text-[#708238] text-center mb-4 group-hover:text-orange-500 transition-colors duration-300">
        {initiative.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-center leading-relaxed">
        {initiative.description}
      </p>
    </motion.div>
  ))}
</div>

      </div>

      {/* Real World Impact Section */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-12 lg:p-16 mb-12"
        >
       <div className="bg-white border-4 border-[#708238] rounded-lg shadow-lg p-10 max-w-4xl mx-auto my-12">
  <h4 className="text-2xl font-bold text-black text-center mb-6 leading-snug whitespace-nowrap">
    How Your Consulting Work Creates Real-World Impact
  </h4>
  <p className="text-xl text-black text-center opacity-90 leading-relaxed">
    Every hour worked on JustERPs creates tangible social outcomes. See the impact below
  </p>
</div>






          <div className="grid md:grid-cols-3 gap-8">
            {impactExamples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 hover:scale-105 border border-green-500 transition shadow-lg"
              >
                <div className="text-4xl mb-4 text-center">{example.icon}</div>
                <h3 className="text-xl font-semibold text-black text-center mb-4">
                  {example.scenario}
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  {example.impact}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Dashboard Section */}
      {/* <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#708238] mb-4">
            Transparent, Trackable Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our real-time impact dashboard gives every member full visibility
            into the difference they're making
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {dashboardFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition group hover:bg-gradient-to-r hover:from-green-50 hover:to-orange-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FFA500] to-orange-400 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-green-500 group-hover:to-green-600 transition-colors">
                    <span className="text-white text-lg">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl shadow-2xl p-8 border border-green-300"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-2">
                Live Impact Tracker
              </h3>
              <p className="text-gray-600">
                Real-time contributions making a difference
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  label: "Projects Completed",
                  value: impactCounters.projects,
                  suffix: "+",
                },
                {
                  label: "Children Supported",
                  value: impactCounters.children,
                  suffix: "+",
                },
                {
                  label: "Communities Impacted",
                  value: impactCounters.communities,
                  suffix: "+",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 text-center border border-green-500 shadow-md hover:shadow-lg transition"
                >
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-gray-600 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div> */}

      {/* Founder Quote */}
     <div className="container mx-auto px-6 lg:px-20 py-24">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="bg-white rounded-3xl p-12 lg:p-16"
    style={{ boxShadow: "0 10px 30px rgba(255,165,0,0.5)" }} // 🔥 orange shadow
  >
    <div className="text-center max-w-4xl mx-auto group">
      <div className="text-6xl mb-4">💬</div>
      <blockquote className="text-2xl italic text-gray-700 mb-6 leading-relaxed">
        "Unlike traditional freelancing platforms that take commissions,
        we turn them into life-changing opportunities. We don't just
        optimize business systems—we optimize human potential."
      </blockquote>

      {/* underline effect */}
      <div className="w-24 h-1 bg-gray-300 mx-auto mb-4 transition-colors duration-300 group-hover:bg-[#FFA500]"></div>

      <p className="text-xl font-semibold text-[#708238]">
        JustERPs Founder
      </p>
    </div>
  </motion.div>
</div>


      {/* Dual Impact Section */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-[#708238] text-center mb-12"
        >
          Dual Impact. Shared Purpose.
        </motion.h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-10 hover:scale-105 transition border-l-8 border-green-500"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-green-600">👨‍💻</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                For Consultants
              </h3>
            </div>
            <p className="text-xl text-gray-700 text-center leading-relaxed">
              Your expertise does more than solve complex ERP challenges—it
              changes lives. Every project you complete creates ripple effects
              of positive change in communities worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-10 hover:scale-105 transition border-l-8 border-orange-500"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-orange-600">👨‍💼</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                For Clients
              </h3>
            </div>
            <p className="text-xl text-gray-700 text-center leading-relaxed">
              Every project improvement now powers human development on a global
              scale. Your business growth directly contributes to meaningful
              social transformation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-100 to-green-200 text-gray-800 rounded-3xl shadow-2xl p-16 border border-green-300"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Be part of a community that believes in using technology to create
              a better world. Your skills and projects can drive real change.
            </p>
           <div className="flex flex-col lg:flex-row justify-center gap-6">
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: "#FFA500" }}
    className="w-72 bg-gradient-to-r from-[#FFA500] to-orange-500 text-white font-bold py-5 rounded-full shadow-xl transition hover:shadow-2xl text-center"
  >
    Register as ERP Consultant
  </motion.button>

  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: "#708238" }}
    className="w-72 bg-gradient-to-r from-[#708238] to-[#5a6a2d] text-white font-bold py-5 rounded-full shadow-xl transition hover:shadow-2xl text-center"
  >
    Hire ERP Consultant
  </motion.button>
</div>

          </div>
        </motion.div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

const impactInitiatives = [
  {
    icon: <Apple className="w-6 h-6 text-orange-500" />,
    title: "Child Nutrition",
    description:
      "Delivering daily meals to malnourished children in underserved communities worldwide.",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-orange-500" />,
    title: "Vocational Training",
    description:
      "Equipping unemployed parents with in-demand skills for sustainable employment.",
  },
  {
    icon: <Book className="w-6 h-6 text-orange-500" />,
    title: "Education Initiatives",
    description:
      "Providing books, uniforms, and digital access to underserved students.",
  },
  {
    icon: <Globe2 className="w-6 h-6 text-orange-500" />,
    title: "Community Development",
    description:
      "Improving infrastructure and facilities in marginalized areas globally.",
  },
];

// Data for impact examples
const impactExamples = [
  {
    icon: "📊",
    scenario: "40 Hours of SAP Consulting",
    impact: "Funds a child's school meals for an entire month",
  },
  {
    icon: "💼",
    scenario: "NetSuite Implementation",
    impact: "Supports a women's entrepreneurship workshop",
  },
  {
    icon: "🏗️",
    scenario: "Long-term Engagements",
    impact: "Finances entire classroom renovations in needy communities",
  },
];

// Data for dashboard features
const dashboardFeatures = [
  {
    icon: "📊",
    title: "Track Contributions",
    description: "Monitor your impact by project, consultant, or timeframe",
  },
  {
    icon: "🗺️",
    title: "Regional Impact",
    description: "View aid distribution and results across different regions",
  },
  {
    icon: "📖",
    title: "Personal Stories",
    description: "Read inspiring stories from the lives you've helped transform",
  },
  {
    icon: "📈",
    title: "Impact Analytics",
    description: "Detailed reports on the social return of your investments",
  },
];

export default SocialResponsibility;