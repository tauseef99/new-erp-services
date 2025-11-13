// src/pages/TermsOfService.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

// Replace these with your actual image assets
import imgHero from "../Assets/images/Terms2.png";
// import imgA from "../Assets/images/Cookies.jpeg";
// import imgB from "../Assets/images/Terms.png";
import imgC from "../Assets/images/Policy.jpg";

/**
 * Full Terms of Service page (accordion layout).
 * Content sourced from the uploaded Change Request document.
 * Color theme: green (#708238) and orange (#FFA500)
 */

const AccordionItem = ({ id, title, children, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-[#708238]">{title}</h4>
        </div>
        <div className="ml-4">
          <span
            className={`inline-block transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden
          >
            ▼
          </span>
        </div>
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

const TermsOfService = () => {
  // track open accordion (single open at a time)
  const [openId, setOpenId] = useState(0);

  const toggle = (id) => setOpenId((prev) => (prev === id ? 0 : id));

  return (
    <>
      <Navbar />

      {/* HERO */}
      <header className="relative w-full h-[620px] overflow-hidden">
        <motion.img
          src={imgHero}
          alt="Terms hero"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#708238]/25 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          >
            Terms of Service
          </motion.h1>
         

          <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-100 leading-relaxed mb-8 opacity-95 max-w-4xl"
              >
                Please read carefully before using the site.— Last Updated: <span className="text-[#FFA500] font-semibold">6-October-2025</span>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#708238] mb-4">Overview</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of the JustERPs website and
              associated services — a marketplace connecting buyers of ERP consulting services ("Clients")
              with freelance ERP consultants ("Consultants"). By using the Site or creating an account you
              agree to be bound by these Terms and related policies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* IMAGE BANNER */}
      <section className="my-12 container mx-auto px-6 lg:px-20">
        {/* <motion.img
          src={imgA}
          alt="Support channels"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full h-[380px] object-cover rounded-3xl shadow-xl"
        /> */}
      </section>

      {/* ACCORDION SECTIONS */}
      <main className="container mx-auto px-6 lg:px-20 pb-28 space-y-8">
        {/* 1. Key Definitions */}
        <AccordionItem
          id={1}
          title="1. Key Definitions"
          isOpen={openId === 1}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p>
              <strong>Client:</strong> Individuals or entities purchasing ERP services on the site.
            </p>
            <p>
              <strong>Consultants / Freelancers:</strong> Individuals or entities offering ERP services on the site.
            </p>
            <p>
              <strong>Project:</strong> A service offering on JustERPs, such as an ERP implementation,
              upgrade, support package, or module-specific consultation.
            </p>
            <p>
              <strong>Project Page:</strong> Where the Consultant describes their Project and its terms,
              and the Client can purchase the service and create an Order.
            </p>
            <p>
              <strong>Custom Offer:</strong> An exclusive proposal created by a consultant in response
              to a Client's specific requirements.
            </p>
            <p>
              <strong>Order:</strong> The formal agreement between a Client and a Consultant for a service.
            </p>
            <p>
              <strong>Order Page:</strong> The dedicated area on the Site where Clients and Consultants
              communicate and manage an active Order.
            </p>
            <p>
              <strong>Project Extras:</strong> Additional services offered on top of the base Project for
              an additional price.
            </p>
            <p>
              <strong>Project Milestones:</strong> A method of breaking down a large Project into smaller,
              paid, and deliverable phases.
            </p>
          </div>
        </AccordionItem>

        {/* 2. User Eligibility */}
        <AccordionItem
          id={2}
          title="2. User Eligibility"
          isOpen={openId === 2}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p>
              This Site is offered and available to users who are at least 18 years of age and of legal age
              to form a binding contract. The Site is not available to users who are subject to economic
              sanctions or trade restrictions imposed by the United States, European Union, or any other
              applicable jurisdiction.
            </p>
            <p>
              By using the Site, you represent and warrant that you meet all eligibility requirements. If
              you do not, you must not access or use the Site.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to use JustERPs.</li>
              <li>You must provide accurate, current, and complete information during registration.</li>
              <li>JustERPs reserves the right to suspend or terminate accounts that provide false information or violate these Terms.</li>
              <li>The Site is not available to users who are subject to economic sanctions or trade restrictions imposed by the United States, European Union, or any other applicable jurisdiction.</li>
            </ul>
          </div>
        </AccordionItem>

        {/* 3. Overview (Main Terms) */}
        <AccordionItem
          id={3}
          title="3. Overview (Main Terms)"
          isOpen={openId === 3}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p><strong>Registration:</strong> You must register for an account to use our marketplace. You are solely responsible for any activity on your account and for maintaining the confidentiality and security of your password.</p>

            <p><strong>Pricing:</strong> Consultants determine their pricing, including base Project rates and hourly rates, at their sole discretion.</p>

            <p><strong>Payment:</strong> Clients pay JustERPs in advance to create an Order. For more details, please read our Payment Terms.</p>

            <p><strong>Project Fulfillment:</strong> Consultants must fulfill their Orders and may not cancel them on a regular basis or without cause.</p>

            <p><strong>Off-Platform Payments:</strong> Users may not offer or accept payments using any method other than placing an Order through the JustERPs Site.</p>

            <p><strong>Intellectual Property:</strong> Upon delivery and full payment, Clients are typically granted all intellectual property rights to the delivered work, unless otherwise specified by the Consultant. Some Projects may charge additional payments for a Commercial Use License.</p>

            <p><strong>Independent Contractors:</strong> JustERPs is a marketplace. Clients engage Consultants as independent contractors and do not exercise control over how they perform their work.</p>

            <p><strong>License to JustERPs:</strong> JustERPs retains the right to use delivered work that a Client agrees to publish for marketing, promotion, and site operation purposes.</p>
          </div>
        </AccordionItem>

        {/* 4. Using the Marketplace */}
        <AccordionItem
          id={4}
          title="4. Using the Marketplace (Buyers & Sellers)"
          isOpen={openId === 4}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <h5 className="font-semibold">4.1 For Buyers (Individuals / Entities)</h5>
            <ul className="list-disc pl-6 space-y-2">
              <li>Buyers may post ERP project requirements, browse consultant profiles, or invite teams.</li>
              <li>Buyers agree to provide clear and accurate project information including timeline, scope of work, and budget.</li>
              <li>Buyers must pay project fees through JustERPs secure payment system. All payments must be processed through the Site. Report any requests for off-platform payments to Customer Support immediately.</li>
              <li>Buyers must not solicit or complete ERP work outside the JustERPs platform once introduced.</li>
              <li>You may not pay Consultants directly using methods outside the JustERPs platform.</li>
              <li>You are solely responsible for reviewing delivered work to ensure it meets your needs and complies with your brief.</li>
              <li>You grant JustERPs a license to use work you agree to make public for our marketing and promotional purposes.</li>
            </ul>

            <h5 className="font-semibold mt-4">4.2 For Sellers (ERP Consultant / Freelancer)</h5>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consultants create Projects to allow Clients to purchase their services.</li>
              <li>Projects must be accurate and must not violate our Terms. We may remove Projects for, including but not limited to: illegal or fraudulent services, intellectual property infringement, spam, deceptive practices, or offering to complete academic work on a Client's behalf.</li>
              <li>Projects are required to have an appropriate image and description related to the service offered.</li>
              <li>Large Projects can be broken into Milestones. Each Milestone is paid for and delivered separately. The Project will not proceed to the next Milestone until the previous one is accepted and paid for.</li>
              <li>Consultants can send Custom Offers to address a Client's specific requirements.</li>
              <li>Eligible Consultants may offer Hourly Contracts, which require accurate weekly time reporting and are subject to specific terms outlined in our Payment Terms.</li>
              <li>A Consultant's rating is calculated based on Client reviews. High ratings allow access to advanced account levels.</li>
              <li>Sellers may offer services, join teams, or respond to Buyer projects. Sellers must honestly represent their skills, rates, and availability.</li>
              <li>Sellers must complete accepted work on time and as agreed. Sellers must not bypass JustERPs payments or contact Buyers outside the platform for the same projects.</li>
            </ul>
          </div>
        </AccordionItem>

        {/* IMAGE BANNER 2 */}
        <div className="my-8">
          {/* <motion.img
            src={imgB}
            alt="Guidelines"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[360px] object-cover rounded-3xl shadow-xl"
          /> */}
        </div>

        {/* 5. Orders */}
        <AccordionItem
          id={5}
          title="6. Orders"
          isOpen={openId === 5}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <h5 className="font-semibold">6.1 Basics</h5>
            <p>An Order is created once payment is confirmed. An Order is marked as Complete after the Consultant marks it as “Delivered” and the Client accepts it. The system may auto-complete an Order after a set period if the Client does not respond.</p>

            <h5 className="font-semibold mt-3">6.2 Handling Orders</h5>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consultants must deliver work by the agreed-upon deadline.</li>
              <li>Clients should use the "Request Revisions" feature if the delivered work does not match the Project requirements or the initial agreement.</li>
              <li>Both parties are responsible for scanning all transferred files for viruses and malware.</li>
            </ul>
          </div>
        </AccordionItem>

        {/* 6. User Conduct and Protection */}
        <AccordionItem
          id={6}
          title="7. User Conduct and Protection"
          isOpen={openId === 6}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p>JustERPs maintain a professional environment. Users must adhere to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All communication and file exchanges must be performed exclusively on the Site.</li>
              <li>Rude, abusive, discriminatory, or unprofessional language is not tolerated.</li>
              <li>Users may not create false identities or misrepresent their qualifications.</li>
              <li>Users are limited to one active account to prevent fraud and abuse.</li>
            </ul>
          </div>
        </AccordionItem>

        {/* 7. Ownership and Intellectual Property */}
        <AccordionItem
          id={7}
          title="8. Ownership and Intellectual Property"
          isOpen={openId === 7}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p>
              Unless otherwise stated, upon delivery and full payment, the Consultant assigns all intellectual property rights to the delivered work to the Client, and waives any moral rights to the extent permitted by law.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>If a Project includes a "Commercial Use License" as an extra, the Client gains broader rights to use the work for business purposes.</li>
              <li>Consultants retain the right to display delivered work in their portfolio unless the Client opts out.</li>
            </ul>
          </div>
        </AccordionItem>

        {/* 8. Disclaimer and Liability */}
        <AccordionItem
          id={8}
          title="9. Disclaimer of Warranties & Limitation of Liability"
          isOpen={openId === 8}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <p>
              The Site and its services are provided "as is" and "as available." We make no warranties, express or implied, regarding the Site's completeness, reliability, or quality.
            </p>
            <p>
              To the fullest extent permitted by law, JustERPs shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site or any services obtained through it.
            </p>
          </div>
        </AccordionItem>

        {/* 9. General Provisions */}
        <AccordionItem
          id={9}
          title="10. General Provisions"
          isOpen={openId === 9}
          onToggle={toggle}
        >
          <div className="space-y-4">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Changes to Terms:</strong> We may update these Terms. Your continued use of the Site after changes constitutes acceptance of the new Terms.</li>
              <li><strong>Indemnification:</strong> You agree to indemnify JustERPs against any claims arising from your violation of these Terms.</li>
              <li><strong>Governing Law:</strong> These Terms shall be governed by the laws of [Your Jurisdiction, e.g., the State of Delaware].</li>
              <li><strong>Contact:</strong> For any questions regarding these Terms, please contact us at <strong>legal@JustERPs.com</strong>.</li>
            </ul>
          </div>
        </AccordionItem>

        {/* IMAGE BANNER 3 */}
        <div className="my-8">
          <motion.img
            src={imgC}
            alt="Data protection"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[360px] object-cover rounded-3xl shadow-xl"
          />
        </div>

        {/* FINAL ACKNOWLEDGEMENT (non-collapsible) */}
        <section className="bg-gradient-to-r from-[#708238] to-[#FFA500] text-white rounded-3xl p-10 md:p-14 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Acknowledgement</h3>
          <p className="text-lg md:text-xl leading-relaxed">
            By continuing to use JustERPs, you acknowledge that you have read, understood, and agreed to abide by these Terms of Service. For further clarification, contact us at <strong>legal@JustERPs.com</strong>
          </p>
        </section>

        {/* IMAGE BANNER 4 */}
        <div className="my-8">
          {/* <motion.img
            src={imgA}
            alt="Support channels"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-[360px] object-cover rounded-3xl shadow-xl"
          /> */}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsOfService;
