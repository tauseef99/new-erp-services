// src/pages/CustomerService.jsx
import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Temporary images (to be replaced later)
import img1 from "../Assets/images/CS1.jpg";
import img2 from "../Assets/images/CustomerService.png";
// import img3 from "../Assets/images/CS2.jpg";

const CustomerService = () => {
  return (
    <>
      <Navbar />

      {/* ========================== */}
      {/* Hero Section (Under Work) */}
      {/* ========================== */}
      <div className="relative w-full bg-gradient-to-br from-gray-50 to-green-50">
        <motion.img
          src={img1}
          alt="Customer Service"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-[600px] object-cover rounded-b-3xl shadow-2xl"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-lg"
          >
            Customer Service
          </motion.h1>
          <motion.p
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1, delay: 0.3 }}
  className="text-2xl md:text-3xl font-semibold text-[#FFA500] max-w-3xl mx-auto leading-relaxed"
>
  Our Commitment To Service Excellence
</motion.p>

        </div>
      </div>

      {/* ========================== */}
      {/* Intro Section (Under Review) */}
      {/* ========================== */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center hover:bg-[#708238]/90 transition-colors duration-500 group"
        >
          <h2 className="text-4xl font-bold text-gray-700 mb-6 group-hover:text-white">
            Our Service Standards
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed group-hover:text-white max-w-4xl mx-auto">
            At JustERPs, we’re dedicated to providing world-class support for all our users — ensuring seamless experiences for both Clients and Consultants through transparent communication, prompt responses, and professional excellence.
          </p>
        </motion.div>
      </div>

      {/* Divider Image - To Adjust Later */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="my-12"
      >
        <img
          src={img2}
          alt="Support Channels"
          className="w-full h-[400px] object-cover shadow-2xl rounded-3xl"
        />
      </motion.div>

      {/* ========================== */}
      {/* Policy Section (Layout in Progress) */}
      {/* ========================== */}
      <div className="container mx-auto px-6 lg:px-20 py-24 space-y-20">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-10 border-l-8 border-[#708238] hover:border-[#FFA500] transition-all"
          >
            <h3 className="text-3xl font-bold text-[#708238] mb-4">
              {section.title}
            </h3>
            <ul className="list-disc text-gray-700 pl-6 space-y-2 text-lg leading-relaxed">
              {section.points.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Divider Image 2 - Placeholder */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="my-12"
      >
        {/* <img
          src={img3}
          alt="Customer Support"
          className="w-full h-[400px] object-cover shadow-2xl rounded-3xl"
        /> */}
      </motion.div>

      {/* ========================== */}
      {/* Final Commitment Section (Styling Under Review) */}
      {/* ========================== */}
      <div className="container mx-auto px-6 lg:px-20 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-100 to-green-200 text-gray-800 rounded-3xl shadow-2xl p-16 border border-green-300 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Our Service Promise</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            JustERPs is committed to delivering exceptional customer service that meets the highest professional standards. We continually refine our policies through user feedback and performance reviews to ensure service excellence.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-[#FFA500] to-orange-500 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

// --------------------------
// Placeholder Policy Sections
// --------------------------
const sections = [
  {
    title: "Support Channels & Availability",
    points: [
      "Help Center: 24/7 access to knowledge base and FAQs.",
      "Email Support: support@justerps.com.",
      "Standard Support: Monday–Friday, 9:00 AM – 6:00 PM (EST).",
      "Priority Support: 24/7 for critical platform issues.",
      "Emergency Support: For payment and security issues (Mon–Fri, 9:00 AM – 6:00 PM).",
    ],
  },
  {
    title: "Response Time Commitments",
    points: [
      "General inquiries responded to within 4 business hours, resolved within 48 hours.",
      "Urgent issues like payment disputes or platform errors escalated immediately.",
      "Status updates every 8 business hours for ongoing issues.",
    ],
  },
  {
    title: "Service Standards & Quality Assurance",
    points: [
      "Professional, courteous, and transparent communication.",
      "Technical support for platform functionality, payment systems, and account recovery.",
      "Regular satisfaction surveys and continuous training for support teams.",
    ],
  },
  {
    title: "Dispute Resolution Process",
    points: [
      "Neutral mediation and fair assessment of deliverables.",
      "Initial mediation within 24 hours; final resolution within 5 business days.",
      "Escalation levels: Support Rep → Senior Specialist → Team Lead → Trust & Safety Committee.",
    ],
  },
  {
    title: "Confidentiality & Data Protection",
    points: [
      "Secure handling of all user data and documents.",
      "Compliance with data protection and privacy regulations.",
      "Strict confidentiality of all customer interactions.",
    ],
  },
  {
    title: "Continuous Improvement & Feedback",
    points: [
      "Quarterly policy reviews and transparent communication of updates.",
      "Post-resolution satisfaction surveys to monitor support performance.",
      "Feedback-driven enhancements to ensure user satisfaction.",
    ],
  },
];

export default CustomerService;
