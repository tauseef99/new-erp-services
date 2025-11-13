import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from "../Assets/images/Buyer_Side.png";
import img2 from "../Assets/images/Seller_Side.png";
import handshake from "../Assets/images/Happy Buyer-Supplier.jpg"; 
import Navbar from "./Navbar";
import Footer from "./Footer";

const HowJustERPsWorks = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[600px] max-h-[800px] overflow-hidden pt-[100px]">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={handshake}
            alt="How JustERPs Works"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
       <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
  <motion.h2
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-6 drop-shadow-2xl leading-snug max-w-3xl"
  >
    Connecting Global Customers <br /> to Global ERP Consultants
  </motion.h2>
</div>


        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Intro Green Box */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white border-4 border-[#708238] rounded-3xl shadow-2xl p-8 lg:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#708238] mb-6 leading-tight">
          
            How JustERPs Works
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
           Need to upgrade, customize, or optimize your ERP system? JustERPs directly connects you with
skilled freelance ERP consultants for projects of any size from generating reports and designing
dashboards to comprehensive training and system integration.
Explore how it works, whether you&#39;re a Freelancer or a Buyer.
          </p>
        </motion.div>
      </div>

      {/* Buyer Steps */}
     <div className="container mx-auto px-6 lg:px-20 py-24 text-center">
  <h2 className="text-4xl md:text-5xl font-bold text-[#708238] mb-6 flex items-center justify-center gap-4">
    <span className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-[#708238] bg-white">
      <span className="w-4 h-4 bg-orange-500 rotate-45"></span>
    </span>
    For Buyers (The Client)
  </h2>

  {/* Buyer Workflow Full Image */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="w-full max-w-4xl mx-auto"
  >
    <img
      src={img1}
      alt="Buyer Workflow"
      className="w-full h-auto object-contain rounded-2xl shadow-2xl mx-auto"
    />
  </motion.div>
</div>


      {/* Freelancer Steps */}
     <div className="container mx-auto px-6 lg:px-20 py-24 text-center">
  <h2 className="text-4xl md:text-5xl font-bold text-[#708238] mb-6 flex items-center justify-center gap-4">
    <span className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-[#708238] bg-white">
      <span className="w-4 h-4 bg-orange-500 rotate-45"></span>
    </span>
    For Freelancers (The ERP Consultant)
  </h2>

  {/* Freelancer Workflow Full Image */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="w-full max-w-4xl mx-auto"
  >
    <img
      src={img2}
      alt="Freelancer Workflow"
      className="w-full h-auto object-contain rounded-2xl shadow-2xl mx-auto"
    />
  </motion.div>
</div>


      {/* Unique Features Section */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#708238] to-[#8a9c4a] rounded-3xl shadow-2xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
             
              JustERP's Unique Features Keep Buyers & Sellers Happy
            </h2>
            <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
              Designed to create a seamless and secure experience for both parties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {uniqueFeatures.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white bg-opacity-95 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
    >
      {/* Icon Wrapper with Orange Border */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-6 mx-auto rounded-full border-4 border-orange-500 bg-white shadow-md">
        <div className="text-4xl text-[#708238]">{feature.icon}</div>
        {/* Glow effect ring */}
        <span className="absolute inset-0 rounded-full border-4 border-orange-300 animate-pulse opacity-50"></span>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-center">
        {feature.description}
      </p>
    </motion.div>
  ))}
</div>

        </motion.div>
      </div>

      {/* Tips for Success Section */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#708238] mb-4 flex items-center justify-center gap-4">
            
            Tips for Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practical advice to help both buyers and freelancers get the most out of JustERPs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* For Buyers */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border-2 border-[#FFA500] p-8 lg:p-10"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-[#FFA500] mb-4 flex items-center justify-center gap-3">
                <span className="text-4xl">👤</span>
                For Buyers
              </h3>
            </div>
            <ul className="space-y-4">
              {buyerTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#FFA500] rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                    ✓
                  </span>
                  <span className="text-gray-700 text-lg leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Freelancers */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl border-2 border-[#708238] p-8 lg:p-10"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-[#708238] mb-4 flex items-center justify-center gap-3">
                <span className="text-4xl">💼</span>
                For Freelancers
              </h3>
            </div>
            <ul className="space-y-4">
              {freelancerTips.map((tip, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#708238] rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                    ✓
                  </span>
                  <span className="text-gray-700 text-lg leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Help Section */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className=" rounded-3xl shadow-2xl p-8 lg:p-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-700">
              Need Help?
            </h3>
          </div>
          <p className="text-xl lg:text-2xl text-gray-700 opacity-95 mb-8 max-w-2xl mx-auto leading-relaxed">
            Our support team is here to assist both freelancers and buyers. 
            Visit our Contact Us page anytime for personalized assistance.
          </p>
          <button className="bg-white text-[#FFA500] px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-bold text-lg lg:text-xl 
  hover:bg-[#708238] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
  Contact Support Team
</button>

        </motion.div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  className="bg-white rounded-3xl p-8 lg:p-12 text-center"
  style={{ boxShadow: "0 10px 30px rgba(255, 165, 0, 0.6)" }} // orange shadow
>
          <div className="flex items-center justify-center gap-4 mb-6">
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-700">
              Join Now
            </h3>
          </div>
          <p className="text-lg lg:text-xl text-gray-700 opacity-90 mb-8 mx-auto whitespace-nowrap">
  Start your journey with JustERPs today and experience the future of ERP consulting
</p>

         <div className="flex flex-col sm:flex-row gap-6 justify-center">
  <button className="w-64 bg-[#708238] text-white py-4 lg:py-5 rounded-2xl font-bold text-lg lg:text-xl hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
    Sign Up as Buyer
  </button>
  <button className="w-64 bg-[#FFA500] text-white py-4 lg:py-5 rounded-2xl font-bold text-lg lg:text-xl hover:bg-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
    Join as ERP Consultant
  </button>
</div>

        </motion.div>
      </div>

      <Footer />
    </>
  );
};

// Data
const buyerSteps = [
  { title: "Sign Up & Create Your Profile", content: "Register with your business email and set up a comprehensive business profile detailing your ERP needs." },
  { title: "Browse or Post a Project", content: "Browse freelance ERP consultants or post your project requirements to attract the right talent." },
  { title: "Evaluate & Hire", content: "Review profiles, portfolios, and ratings. Communicate securely and hire the best consultant." },
  { title: "Work in Progress", content: "Monitor progress, receive updates, and provide feedback throughout the project." },
  { title: "Approve & Pay", content: "Release payments through secure escrow only after you're satisfied with the work." },
];

const freelancerSteps = [
  { title: "Sign Up & Create a Profile", content: "Register and build a comprehensive profile showcasing ERP skills, portfolio, and certifications." },
  { title: "List Services or Browse Projects", content: "Create service packages or browse ERP projects posted by businesses worldwide." },
  { title: "Communicate & Get Hired", content: "Discuss project scope with clients and secure jobs through proposals." },
  { title: "Deliver Work", content: "Provide high-quality deliverables with clear communication and updates." },
  { title: "Get Paid", content: "Receive secure payments and build reputation with client reviews." },
];

const uniqueFeatures = [
  { 
    icon: "🔒", 
    title: "Secure Escrow Payments", 
    description: "Protection for both freelancers and buyers with funds held securely until project completion." 
  },
  { 
    icon: "⚖️", 
    title: "Dispute Resolution", 
    description: "Fair mediation in case of disagreements to ensure both parties are treated fairly." 
  },
  { 
    icon: "✅", 
    title: "Verified Profiles & Reviews", 
    description: "Build trust with transparent feedback and verified professional profiles." 
  },
  { 
    icon: "💬", 
    title: "Real-Time Chat & Notifications", 
    description: "Stay connected throughout the project with instant messaging and updates." 
  },
  { 
    icon: "🎯", 
    title: "Custom Offers", 
    description: "Allow freelancers to tailor proposals to specific client needs and budgets." 
  },
  { 
    icon: "🌐", 
    title: "Global Reach", 
    description: "Connect with ERP consultants and clients from around the world seamlessly." 
  }
];

const buyerTips = [
  "Be clear and detailed in your project descriptions",
  "Set realistic deadlines and budgets",
  "Communicate frequently with your freelancer",
  "Provide timely feedback and approvals",
  "Use the escrow system for payment security"
];

const freelancerTips = [
  "Keep your profile updated and professional",
  "Be prompt and polite in communications",
  "Meet deadlines and go the extra mile for good reviews",
  "Showcase your portfolio with real case studies",
  "Continuously update your ERP skills and certifications"
];

export default HowJustERPsWorks;