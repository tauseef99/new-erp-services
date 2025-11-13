// src/pages/FAQ.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Placeholder images (replace later)
import imgHero from "../Assets/images/faq.png";
import img1 from "../Assets/images/man.jpg";

const AccordionItem = ({ id, title, children, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <h4 className="text-xl md:text-2xl font-bold text-[#708238]">{title}</h4>
        <span
          className={`inline-block transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{ overflow: "hidden" }}
      >
        <div className="p-6 pt-0 text-gray-700 leading-relaxed">{children}</div>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(0);
  const toggle = (id) => setOpenId((prev) => (prev === id ? 0 : id));

  return (
    <>
      <Navbar />

      {/* HERO */}
<header className="relative w-full h-[520px] flex flex-col items-center justify-center bg-[#708238] overflow-hidden">
  {/* Softer gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#708238]/30 pointer-events-none" />

  {/* Centered content with better vertical balance */}
  <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 space-y-6 translate-y-4">
    {/* FAQ Image */}
    <motion.img
      src={imgHero}
      alt="FAQ Hero"
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="max-h-[150px] w-auto object-contain"
    />

    {/* Heading */}
    <motion.h1
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg"
    >
      JustERPs FAQ
    </motion.h1>

    {/* Tagline (slightly lower for better look) */}
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="text-lg md:text-xl lg:text-2xl text-[#FFA500] font-semibold tracking-wide mt-2"
    >
      Your Questions Answered — Everything You Need To Know About JustERPs
    </motion.p>
  </div>
</header>





















      {/* INTRO */}
      <section className="bg-gradient-to-br from-green-50 to-white py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-[#708238]/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#708238] mb-4">
              Welcome to the Help Center
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Whether you're a business looking to implement an ERP system or a skilled professional
              offering your services, you'll find answers to the most frequently asked questions below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* IMAGE BANNER 1 */}
      <section className="my-12 container mx-auto px-6 lg:px-20">
        <motion.img
          src={img1}
          alt="FAQ Illustration 1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-[360px] object-cover rounded-3xl shadow-xl"
        />
      </section>

      {/* ACCORDIONS */}
      <main className="container mx-auto px-6 lg:px-20 pb-28 space-y-8">
        {/* 1. Buyers */}
        <AccordionItem
          id={1}
          title="1. For Buyers (The Clients)"
          isOpen={openId === 1}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p><strong>Q:</strong> What kind of ERP services can I find on JustERPs?</p>
            <p><strong>A:</strong> You can find a vast range of services for all major ERP systems such as SAP, Oracle NetSuite, Microsoft Dynamics, and Odoo. This includes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Consultation:</strong> ERP selection, business process review, and implementation strategy.</li>
              <li><strong>Implementation & Configuration:</strong> Full-scale system setup, module configuration, and customization.</li>
              <li><strong>Customization & Development:</strong> Custom reports, workflows, integrations, and plugin development.</li>
              <li><strong>Support & Maintenance:</strong> Ongoing technical support, troubleshooting, and system health checks.</li>
              <li><strong>Data Migration:</strong> Secure data transfer from your old system to the new ERP.</li>
              <li><strong>Training:</strong> User training sessions and creation of training materials.</li>
            </ul>

            <p><strong>Q:</strong> How do I choose the right freelancer for my project?</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Check their Profile:</strong> Review portfolio, ratings, and certifications.</li>
              <li><strong>Review Gig Packages:</strong> Compare different pricing and scope options.</li>
              <li><strong>Communicate Clearly:</strong> Discuss requirements and verify understanding before ordering.</li>
              <li><strong>Look for Specialization:</strong> Choose sellers experienced in your industry or ERP module.</li>
            </ul>

            <p><strong>Q:</strong> What is the typical process for ordering a service?</p>
            <ul className="list-decimal pl-6 space-y-1">
              <li>Browse & Select a consultant matching your ERP needs.</li>
              <li>Share your Scope of Work document.</li>
              <li>Place an Order based on a suitable package.</li>
              <li>Collaborate, share files, and track progress on the platform.</li>
              <li>Review & Approve once satisfied with delivery.</li>
            </ul>

            <p><strong>Q:</strong> What if I’m not happy with the delivered work?</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Request a Revision:</strong> Within the seller’s revision policy.</li>
              <li><strong>Use Resolution Center:</strong> For mediation if agreement can’t be reached.</li>
              <li><strong>Contact JustERPs Support:</strong> As a final step for resolution assistance.</li>
            </ul>
          </div>
        </AccordionItem>

        {/* 2. Sellers */}
        <AccordionItem
          id={2}
          title="2. For Sellers (The ERP Freelancers)"
          isOpen={openId === 2}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p><strong>Q:</strong> How do I start selling ERP services on JustERPs?</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Create a Seller Profile:</strong> Highlight expertise, experience, and certifications.</li>
              <li><strong>Create a Gig:</strong> Describe deliverables, industries, and roles clearly.</li>
              <li><strong>Get Verified:</strong> Submit ID and certifications to build buyer trust.</li>
              <li><strong>Start Promoting:</strong> Share your profile across social media and networks.</li>
            </ul>

            <p><strong>Q:</strong> How and when do I get paid?</p>
            <p><strong>A:</strong> Payments are released after successful completion and delivery. You can withdraw to your bank, PayPal, or available regional methods after a short clearance period. All fees are transparent and shown in Seller Terms.</p>

            <p><strong>Q:</strong> Can I take communication or payments outside JustERPs?</p>
            <p><strong>A:</strong> No. To ensure safety for both sides, all communication and payments must remain within the platform. Violating this may result in suspension.</p>

            <p><strong>Q:</strong> How can I win my first order?</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Offer competitive introductory pricing.</li>
              <li>Create a complete, professional profile.</li>
              <li>Respond quickly to inquiries.</li>
              <li>Leverage your personal and professional network.</li>
            </ul>
          </div>
        </AccordionItem>

        {/* 3. Payments */}
        <AccordionItem
          id={3}
          title="3. Payments & Pricing"
          isOpen={openId === 3}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p><strong>Q:</strong> How does JustERPs pricing work?</p>
            <p><strong>A:</strong> Sellers set their own prices. JustERPs charges a small transparent service fee visible before order placement. Buyer and seller fees vary slightly and are detailed in Terms of Service.</p>

            <p><strong>Q:</strong> What payment methods are accepted?</p>
            <p><strong>A:</strong> All major credit/debit cards (Visa, MasterCard, American Express), PayPal, and regional bank transfers are supported.</p>

            <p><strong>Q:</strong> What is JustERPs SafePay?</p>
            <p><strong>A:</strong> SafePay securely holds your funds until you approve the delivered work. Sellers get paid only after buyer confirmation, ensuring safety and trust for both sides.</p>
          </div>
        </AccordionItem>

        {/* 4. Platform & Security */}
        <AccordionItem
          id={4}
          title="4. Platform & Security"
          isOpen={openId === 4}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p>
              JustERPs uses industry-standard encryption and verification to ensure secure payments and protect user data.
              All transactions are encrypted, and interactions are monitored for safety.
            </p>
            <p>
              We never share your personal or financial information with third parties. Multi-layer authentication and KYC
              verification keep our platform safe for both buyers and sellers.
            </p>
          </div>
        </AccordionItem>

        {/* FINAL SECTION */}
        <section className="bg-gradient-to-r from-[#708238] to-[#FFA500] text-white rounded-3xl p-10 md:p-14 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h3>
          <p className="text-lg md:text-xl leading-relaxed">
            Our support team is here to help. Contact us anytime at{" "}
            <strong>support@JustERPs.com</strong>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;
