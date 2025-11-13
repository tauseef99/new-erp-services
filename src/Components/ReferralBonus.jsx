import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Replace these with your actual images
import img1 from "../Assets/images/Bonus.jpg";
import img2 from "../Assets/images/Referral-Bonus-Program.jpg";   

const ReferralBonus = () => {
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
              alt="Referral Bonus Program"
              className="w-full h-full object-cover rounded-b-4xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center justify-start">
              <div className="text-left px-8 lg:px-20 max-w-2xl">
<motion.h1 
  initial={{ y: -50, opacity: 0 }} 
  animate={{ y: 0, opacity: 1 }} 
  transition={{ duration: 1, delay: 0.3 }} 
  className="whitespace-nowrap text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
>
  Grow Together, <span className="text-[#FFA500]">Earn Together!</span>
</motion.h1>

               <motion.p 
  initial={{ y: 50, opacity: 0 }} 
  animate={{ y: 0, opacity: 1 }} 
  transition={{ duration: 1, delay: 0.6 }} 
  className="whitespace-nowrap text-xl md:text-2xl text-gray-100 leading-relaxed mb-8"
>
  Join the JustERPs Referral Bonus Program - Earn $100 for Every Successful Referral!
</motion.p>

              </div>
            </div>
          </motion.div>
        </div>

        {/* Intro Section */}
        <section className="container mx-auto px-6 lg:px-20 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 leading-tight">
              Introducing the <span className="text-[#708238]">JustERPs Referral Bonus Program</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At JustERPs, we believe in rewarding collaboration. For every consultant you refer who joins our platform, 
              <strong> both you and your referral will earn $100 in JustERPs credits!</strong>  
              Use these credits to offset payments for our services and continue building your professional success together.
            </p>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gradient-to-br from-[#f8f9fa] to-[#f0f4e8] py-28">
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl font-black text-gray-800 mb-6">
                How It Works
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 relative group"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFA500] to-[#708238]"></div>
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#708238] to-[#5f7030] rounded-2xl mb-6 text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-[#708238] transition duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Rules & Image Section */}
      <section className="container mx-auto px-6 lg:px-20 py-28">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="text-center"
  >
    {/* Title */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-10">
      Program Rules & Guidelines
    </h2>

    {/* Rules List */}
    <ul className="space-y-4 text-lg text-gray-700 leading-relaxed  list-inside max-w-3xl mx-auto text-left mb-12">
      <li>
        Referrals must be <strong>new, verified consultants</strong> (no duplicate accounts).
      </li>
      <li>
        Credits are <strong>non-transferable</strong> and expire after 12 months.
      </li>
      <li>
        Fraudulent referrals (fake or self-referrals) will result in forfeiture.
      </li>
      <li>
        JustERPs reserves the right to modify or terminate the program with prior notice.
      </li>
    </ul>

    {/* Image Section */}
    <div
      className="mx-auto rounded-3xl overflow-hidden bg-white shadow-lg p-4 lg:p-8 max-w-5xl"
      style={{ boxShadow: "0 0 40px 10px rgba(255, 165, 0, 0.5)" }}
    >
      <img
        src={img2}
        alt="Referral Program Diagram"
        className="w-full h-auto object-contain transform hover:scale-105 transition duration-700"
      />
    </div>
  </motion.div>
</section>



        {/* Additional Diagram Explanation Section */}
        <section className="container mx-auto px-6 lg:px-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <h3 className="text-3xl font-black text-gray-800 mb-6 text-center">
              Understanding the Referral Process
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-[#708238] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                  1
                </div>
                <p className="text-gray-700">Share your unique referral link with colleagues</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-[#708238] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                  2
                </div>
                <p className="text-gray-700">They sign up and complete verification</p>
              </div>
              <div className="p-4">
                <div className="w-12 h-12 bg-[#708238] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4">
                  3
                </div>
                <p className="text-gray-700">Both receive $100 credits upon success</p>
              </div>
            </div>
          </motion.div>
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
                Start Sharing Today, Success is Better When Shared
              </h2>
              <p className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-90">
                Invite your peers to join the JustERPs network and earn rewards for growing our consultant community together.
              </p>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#e59400",
                  boxShadow: "0 20px 40px rgba(255, 165, 0, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#FFA500] to-[#e59400] text-white font-bold py-5 px-12 rounded-2xl shadow-2xl transition-all duration-300 text-lg"
              >
                Start Sharing Now
              </motion.button>
              <p className="text-sm mt-8 opacity-70">
                Questions? Contact us at <span className="underline">support@justerps.com</span>
              </p>
            </div>
          </motion.div>
        </section>
      </div>
      <Footer />
    </>
  );
};

const steps = [
  {
    title: "Share Your Referral Link",
    description:
      "Log in to your JustERPs account, go to the Referral Program section, and share your unique referral link with your network.",
  },
  {
    title: "Your Referral Joins JustERPs",
    description:
      "When your referred consultant signs up using your link and completes profile verification, the connection is established.",
  },
  {
    title: "Credits Are Added to Both Accounts",
    description:
      "Within 7 business days of verification, $100 in credits will be added to both your and your referral's accounts.",
  },
  {
    title: "Use Your Credits",
    description:
      "Apply your credits toward any JustERPs service or subscription and enjoy the benefits together.",
  },
];

export default ReferralBonus;