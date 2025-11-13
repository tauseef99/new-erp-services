import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Replace with your actual images
import img1 from "../Assets/images/333.jpg";
import img2 from "../Assets/images/DataProtections.png";

const PersonalDataProtection = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-white to-[#f0f4f8]">
        
        {/* ENHANCED HERO SECTION */}
        <section className="relative w-full overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-[85vh] min-h-[700px] flex items-center justify-center"
          >
            <img
              src={img1}
              alt="Personal Data Protection"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-4 h-4 bg-[#FFA500] rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-40 right-20 w-6 h-6 bg-[#708238] rounded-full opacity-40 animate-bounce"></div>
              <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-white rounded-full opacity-50 animate-ping"></div>
            </div>

            {/* Centered Content with Enhanced Design */}
            <div className="relative z-10 text-center px-8 lg:px-24 flex flex-col items-center justify-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                
              </motion.div>

              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl"
              >
                Personal <span className="text-[#FFA500] bg-gradient-to-r from-[#FFA500] to-[#ffcc00] bg-clip-text text-transparent">Data Protection</span>
              </motion.h1>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8 opacity-95 max-w-4xl"
              >
                JustERPs Data Protection Policy — Last Updated: <span className="text-[#FFA500] font-semibold">6-October-2025</span>
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "200px" }}
                transition={{ duration: 1.2, delay: 0.7 }}
                className="h-1.5 bg-gradient-to-r from-[#FFA500] via-[#708238] to-[#FFA500] rounded-full mb-8 shadow-lg"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >

              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ENHANCED INTRODUCTION */}
        <section className="relative py-28 bg-white">
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center max-w-5xl mx-auto"
            >
              
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 leading-tight">
                Protecting Your <span className="text-[#708238]">Digital Privacy</span>
              </h2>
              <div className="bg-gradient-to-r from-[#f8f9fa] to-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to JustERPs. We are committed to protecting the privacy and security of your personal data. 
                  This Data Protection Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our marketplace platform, which connects ERP Consultants ("Freelancers") with Clients. 
                  By registering an account or using JustERPs.com, you consent to the practices described in this policy.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ENHANCED DATA WE COLLECT SECTION */}
        <section className="relative py-24 bg-gradient-to-br from-[#ffffff] to-[#f8fafc] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23708238%22%20fill-opacity%3D%220.4%22%20fill-rule%3D%22evenodd%22%3E%3Ccircle%20cx%3D%223%22%20cy%3D%223%22%20r%3D%223%22/%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%2213%22%20r%3D%223%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
          </div>

          <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-[#708238]/10 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#708238] to-[#5f7030] rounded-2xl flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-black text-gray-800">
                    Data We Collect
                  </h2>
                </div>
                
                <p className="text-lg text-gray-700 mb-8 leading-relaxed border-l-4 border-[#708238] pl-4">
                  We collect information that you provide directly to us, as well as data automatically collected from your use of our services.
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-[#708238] mb-4 flex items-center">
                      <span className="w-3 h-3 bg-[#FFA500] rounded-full mr-3"></span>
                      Information You Provide:
                    </h3>
                    <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
                      {providedData.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start"
                        >
                          <span className="w-2 h-2 bg-[#708238] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>{item.title}:</strong> {item.description}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#708238] mb-4 flex items-center">
                      <span className="w-3 h-3 bg-[#FFA500] rounded-full mr-3"></span>
                      Information Collected Automatically:
                    </h3>
                    <ul className="space-y-3 text-gray-700 text-base leading-relaxed">
                      {autoData.map((item, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start"
                        >
                          <span className="w-2 h-2 bg-[#708238] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span><strong>{item.title}:</strong> {item.description}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#708238]/20 to-[#FFA500]/10 z-10"></div>
                <img
                  src={img2}
                  alt="Data Security Illustration"
                  className="w-full h-[600px] lg:h-[700px] object-cover transform group-hover:scale-105 transition duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 z-20">
                  <h3 className="text-2xl font-bold text-white mb-2">Enterprise-Grade Security</h3>
                  <p className="text-white/80">Advanced encryption and compliance measures</p>
                </div>
                
                {/* Floating Security Badges */}
                <div className="absolute top-6 right-6 z-20">
                  
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ENHANCED HOW WE USE DATA */}
        <section className="py-28 bg-gradient-to-br from-[#f8fafc] to-white">
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-16">
                
                <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                  How We Use Your Data
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Transparent and responsible data handling for your peace of mind
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dataUsage.map((usage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#708238]/20 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-[#708238] to-[#5f7030] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-2xl font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#708238] transition-colors duration-300">
                      {usage.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {usage.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ENHANCED DATA SHARING SECTION */}
        <section className="py-24 bg-gradient-to-br from-[#708238]/5 to-[#FFA500]/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFA500] to-[#708238]"></div>
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-5xl mx-auto text-center"
            >
              
              <h2 className="text-4xl font-black text-gray-800 mb-8">
                How We Share Your Data
              </h2>
              <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-3xl mx-auto">
                We do not sell your personal data. We may share your information in the following limited circumstances:
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                {dataSharing.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FFA500] to-[#e59400] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-14">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ENHANCED ADDITIONAL SECTIONS GRID */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {additionalSections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#708238] to-[#5f7030] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 mb-4 group-hover:text-[#708238] transition-colors duration-300">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                  {section.note && (
                    <p className="text-sm text-gray-500 mt-4 italic">
                      {section.note}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ENHANCED CONTACT SECTION */}
      <section className="container mx-auto px-6 lg:px-20 pb-28">
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="relative bg-gradient-to-br from-[#708238] via-[#5f7030] to-[#4a5727] text-white rounded-4xl shadow-2xl p-16 text-center overflow-hidden"
  >
    {/* Animated Background Elements */}
    {/* 🟠 Top-right circle now also moves */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFA500] rounded-full -translate-y-32 translate-x-32 opacity-20 animate-float-slow"></div>

    {/* 🟠 Bottom-left circle (already moving) */}
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFA500] rounded-full translate-y-24 -translate-x-24 opacity-20 animate-bounce"></div>

    <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>

    <div className="relative z-10">
      <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
        <svg
          className="w-5 h-5 text-white mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm font-semibold">Get In Touch</span>
      </div>

      <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-[#FFA500] to-[#ffcc00] bg-clip-text text-transparent">
        Contact Our Data Protection Team
      </h2>

      <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
        If you have any questions about this Data Protection Policy or our data
        practices, please contact our Data Protection Officer.
      </p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center bg-white text-[#708238] font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 mb-8"
      >
        <svg
          className="w-5 h-5 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        privacy@justerps.com
      </motion.div>

      <p className="text-sm opacity-70">Typically responds within 24 hours</p>
    </div>
  </motion.div>

  {/* Custom Animation Styles */}
  <style>
    {`
      @keyframes float-slow {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        50% {
          transform: translateY(-20px) translateX(-10px);
        }
      }
      .animate-float-slow {
        animation: float-slow 6s ease-in-out infinite;
      }
    `}
  </style>
</section>


      </div>

      <Footer />
    </>
  );
};

// Data arrays for cleaner code
const providedData = [
  { title: "Account Information", description: "Name, email, password, phone, profile picture, address, and professional bio" },
  { title: "Identity Verification", description: "Government-issued ID, tax details, and other verification information" },
  { title: "Professional Profile", description: "Work history, skills, certifications, portfolio, ERP specializations, and client reviews" },
  { title: "Financial Information", description: "Bank or payment account details (safely handled via PCI-compliant third-party processors)" },
  { title: "Communications", description: "Messages, files, and shared content through the platform" },
  { title: "Project Listings & Proposals", description: "Information you provide when posting or bidding on projects" }
];

const autoData = [
  { title: "Usage Data", description: "Pages visited, features used, time spent, and search queries" },
  { title: "Log Data", description: "IP address, browser type, device info, and access times" },
  { title: "Cookies & Tracking", description: "Cookies and similar technologies for tracking and personalization" }
];

const dataUsage = [
  { title: "Provide & Maintain Services", description: "Manage accounts, connect Freelancers with Clients, and enable collaboration" },
  { title: "Process Transactions", description: "Payments, compliance with financial regulations" },
  { title: "Communicate", description: "Service updates, announcements, and support" },
  { title: "Improve Platform", description: "Analyze usage trends, develop features, personalize experience" },
  { title: "Security", description: "Identity verification, fraud prevention, enforcement of Terms of Service" },
  { title: "Marketing", description: "Send promotional updates with consent, opt-out anytime" }
];

const dataSharing = [
  { title: "With Other Users", description: "To facilitate projects (e.g., Clients see Freelancer profiles and proposals)" },
  { title: "With Trusted Third-Party Providers", description: "Payment, hosting, analytics, support — bound by strict contracts" },
  { title: "For Business Transfers", description: "In case of merger, sale, or acquisition" },
  { title: "For Legal Reasons", description: "Compliance with legal obligations or valid requests" },
  { title: "With Consent", description: "Any other purpose explicitly agreed to" }
];

const additionalSections = [
  {
    title: "Data Retention",
    icon: "📊",
    content: "We retain personal data only as long as necessary to fulfill the purposes outlined in this policy and comply with legal obligations, resolve disputes, and enforce agreements.",
    note: "If you close your account, certain information may still be retained in depersonalized or aggregated form."
  },
  {
    title: "Your Data Rights & Choices",
    icon: "🔒",
    content: "Access & Portability, Correction, Deletion, Objection & Restriction, Withdraw Consent. To exercise these rights, contact our Data Protection Officer."
  },
  {
    title: "International Data Transfers",
    icon: "🌍",
    content: "JustERPs operates globally. Your data may be transferred and processed outside your country. We use approved mechanisms such as Standard Contractual Clauses to ensure compliance and protection."
  },
  {
    title: "Data Security",
    icon: "🛡️",
    content: "We implement robust administrative, technical, and physical safeguards — including encryption, access controls, and secure servers — to protect data."
  },
  {
    title: "Changes to This Policy",
    icon: "🔄",
    content: "We may update this Data Protection Policy from time to time. Changes will be posted on this page with the updated 'Last Updated' date."
  }
];

export default PersonalDataProtection;