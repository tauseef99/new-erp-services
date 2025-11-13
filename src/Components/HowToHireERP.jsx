import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import img1 from '../Assets/images/Objectives.jpg'
import img2 from '../Assets/images/technicle-landscape.jpeg'
import img3 from '../Assets/images/Project-Timeline.png'
import img4 from '../Assets/images/CS_Feedback.png'
import img5 from '../Assets/images/video-calls.jpg'
import Navbar from "./Navbar";
import Footer from "./Footer";

// Animation wrapper component
const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform ${
        inView 
          ? "translate-y-0 opacity-100" 
          : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Animated card component
const AnimatedCard = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-600 transform ${
        inView 
          ? "translate-y-0 opacity-100 scale-100" 
          : "translate-y-8 opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const HowToHireERP = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-[#FFA500] to-[#708238] text-white py-24 px-4 overflow-hidden">
  <div className="absolute inset-0 bg-black opacity-10"></div>
  <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500]/20 to-[#708238]/20"></div>

  {/* Flexbox wrapper to center vertically */}
  <div className="relative max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
    <AnimatedSection delay={400}>
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        How to Hire an ERP Consultant
      </h1>
    </AnimatedSection>

    <AnimatedSection delay={600}>
      <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed whitespace-nowrap">
  Select the Best ERP Consultant for Your Business with Our Proven Framework
</p>

    </AnimatedSection>

    <AnimatedSection delay={800}>
      <div className="bg-[#FFA500]  backdrop-blur-sm rounded-xl p-8 inline-block max-w-2xl border border-white/30">
        <p className="text-lg font-medium">
          Follow our structured 3-step process to find the perfect ERP expert
        </p>
      </div>
    </AnimatedSection>
  </div>
</section>



        {/* Process Overview */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                {/* <span className="inline-block px-4 py-2 bg-[#708238] text-white rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
                  Visual Guide
                </span> */}
                <h2 className="text-4xl font-bold text-gray-800 mb-4">ERP Consultant Hiring Process</h2>
                
              </div>
            </AnimatedSection>
            
            <AnimatedCard delay={200}>
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
  <div className="flex justify-center mb-8">
    <img
      src={img5}
      alt="ERP Hiring Process"
      className="rounded-xl shadow-md w-full max-w-4xl h-auto object-contain transition-transform duration-500 hover:scale-105"
    />
  </div>
  <div className="text-center">
    <p className="text-gray-600 text-lg">
      Streamlined process from preparation to successful engagement
    </p>
  </div>
</div>

            </AnimatedCard>
          </div>
        </section>

        {/* Phase 1: Preparation */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
  <div className="inline-flex items-center justify-center w-32 h-32 bg-[#FFA500] text-white rounded-full text-2xl tracking-wide font-extrabold mb-6 shadow-xl">
  STEP&nbsp;1
</div>


  <h2 className="text-4xl font-bold text-gray-800 mb-4">
    Preparation Work Before Hiring
  </h2>

  <p className="text-xl text-gray-600 max-w-3xl mx-auto whitespace-nowrap">
  The foundation of a successful ERP consultant engagement starts with thorough preparation
</p>

</div>


            </AnimatedSection>
            
            {/* Golden Rule Card */}
            <AnimatedCard delay={200}>
              <div className="bg-gradient-to-r from-[#708238] to-[#8DA349] text-white p-8 rounded-2xl shadow-lg mb-12 transform hover:shadow-xl transition-all duration-300">
                <div className="flex items-start">
                  <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4 shadow-inner">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">The Golden Rule: Define Your Scope of Work (SOW)</h3>
                    <p className="text-white text-opacity-90 mb-4 text-lg leading-relaxed">
                      Hiring an ERP consultant is a significant decision. The most critical step is defining a detailed Scope of Work (SOW). 
                      This aligns your expectations with deliverables and ensures transparency throughout the engagement.
                    </p>
                    <p className="text-white text-opacity-90 text-lg leading-relaxed">
                      When you contact a consultant, their first question will likely be, "Do you have a Scope of Work document you can share?" 
                      Being prepared with this answer will significantly speed up the hiring process and attract serious, high-quality experts.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
            
            {/* Define Project Scope */}
            <AnimatedSection delay={300}>
              <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
                <div>
                  <h3 className="text-3xl font-semibold text-[#FFA500] mb-6">Define Your Project Scope with Crystal Clarity</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-3 flex items-center">
                        <span className="w-3 h-3 bg-[#708238] rounded-full mr-3"></span>
                        Core Problem Identification
                      </h4>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        {["Migration from legacy systems", "New ERP setup and configuration", "Module-specific fixes and optimization", "Integration with existing systems"].map((item, index) => (
                          <li key={index} className="flex items-center transition-transform duration-200 hover:translate-x-1">
                            <span className="w-2 h-2 bg-[#708238] rounded-full mr-3"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-3 flex items-center">
                        <span className="w-3 h-3 bg-[#708238] rounded-full mr-3"></span>
                        Specific Goals Definition
                      </h4>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        {["Process automation targets", "Cost reduction objectives", "Efficiency improvement metrics", "Integration requirements"].map((item, index) => (
                          <li key={index} className="flex items-center transition-transform duration-200 hover:translate-x-1">
                            <span className="w-2 h-2 bg-[#708238] rounded-full mr-3"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
             <div className="flex items-center justify-center">
  <img
    src={img1}
    alt="Define Your Project Scope"
    className="rounded-xl shadow-lg max-w-full h-auto object-contain transition-transform duration-500 hover:scale-105"
  />
</div>


              </div>
            </AnimatedSection>
            
            {/* Technical Landscape */}
            <AnimatedSection delay={400}>
              <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
                <div className="flex items-center justify-center order-2 lg:order-1">
                  <img
                    src={img2}
                    alt="Technical Landscape"
                    className="rounded-xl shadow-lg w-full h-80 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-3xl font-semibold text-[#FFA500] mb-6">Define Your Technical Landscape</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-3 flex items-center">
                        <span className="w-3 h-3 bg-[#708238] rounded-full mr-3"></span>
                        System Specifications
                      </h4>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        {["ERP System & Version", "Modules Involved", "Current Patch/Service Pack Level", "Third-Party Software & Integrations"].map((item, index) => (
                          <li key={index} className="flex items-center transition-transform duration-200 hover:translate-x-1">
                            <span className="w-2 h-2 bg-[#708238] rounded-full mr-3"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-3 flex items-center">
                        <span className="w-3 h-3 bg-[#708238] rounded-full mr-3"></span>
                        Project Logistics
                      </h4>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        {["Desired Timeline with milestones", "Budget Range ($25-$200+/hour)", "Access Requirements confirmation", "Supporting Documentation"].map((item, index) => (
                          <li key={index} className="flex items-center transition-transform duration-200 hover:translate-x-1">
                            <span className="w-2 h-2 bg-[#708238] rounded-full mr-3"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Benefits Card */}
            <AnimatedCard delay={500}>
              <div className="border-2 border-[#FFA500] p-8 rounded-2xl shadow-lg transform hover:shadow-xl transition-all duration-300">
  <h3 className="text-2xl font-semibold mb-8 text-center text-black">
    Why This Process Works for You
  </h3>
 <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
    {
      icon: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
      title: "Clarity",
      desc: "Eliminates ambiguity and prevents scope creep",
    },
    {
      icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
      title: "Accuracy",
      desc: "Consultants provide precise proposals and timelines",
    },
    {
      icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5l5-5-1.5-1.5L9 10.586 7.5 9.086 6 10.5l3 3z",
      title: "Quality Proposals",
      desc: "Receive serious, well-defined bids from consultants",
    },
    {
      icon: "M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h2V5zm2 4h-2v2h2V9z",
      title: "Transparency",
      desc: "SOW acts as a foundational agreement",
    },
  ].map((item, index) => (
    <div
      key={index}
      className="text-center transform hover:scale-105 transition-transform duration-300"
    >
      <div className="border-2 border-[#FFA500] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-inner text-[#FFA500] bg-white">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d={item.icon} clipRule="evenodd" />
        </svg>
      </div>
      <h4 className="font-semibold text-lg mb-2 text-black">
        {item.title}
      </h4>
      <p className="text-gray-700 text-sm">{item.desc}</p>
    </div>
  ))}
</div>

</div>

            </AnimatedCard>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4 bg-white bg-opacity-10">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                {/* <span className="inline-block px-4 py-2 bg-[#708238] text-white rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
                  Project Planning
                </span> */}
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Migration Project Timeline Examples</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Project timelines vary based on complexity - from rapid implementations to comprehensive enterprise deployments
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedCard delay={200}>
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transform hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-8">
                  <img
                    src={img3}
                    alt="Migration Project Timeline"
                    className="rounded-xl shadow-md w-full max-w-4xl h-64 object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-lg">
                   Project Timelines
                  </p>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </section>

        {/* Phase 2: Selection Process */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
  {/* Step label */}
   <div className="inline-flex items-center justify-center w-32 h-32 bg-[#FFA500] text-white rounded-full text-2xl tracking-wide font-extrabold mb-6 shadow-xl">
  STEP&nbsp;2
</div>

  {/* Step heading */}
  <h2 className="text-4xl font-bold text-gray-800 mb-4">
    The Selection Process
  </h2>

  {/* Step description */}
  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
    Finding the right ERP consultant requires a systematic and thorough approach
  </p>
</div>

            </AnimatedSection>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  
                  title: "Search and Shortlist Proactively",
                  items: [
                    "Use platform filters (ERP system, success rate, reviews)",
                    "Analyze profiles meticulously",
                    "Create a shortlist of 3-5 consultants"
                  ]
                },
                {
                  
                  title: "Initiate Contact and Interview",
                  items: [
                    "Use 'Invite to Job' feature",
                    "Conduct brief interviews",
                    "Ask about experience and approach",
                    "Discuss communication and availability"
                  ]
                },
                {
                  
                  title: "Evaluate Proposals and Choose",
                  items: [
                    "Look beyond price",
                    "Assess clarity of proposal",
                    "Check for insightful questions",
                    "Value expertise over cost"
                  ]
                }
              ].map((step, index) => (
                <AnimatedCard key={index} delay={200 + (index * 100)}>
                  <div className="bg-gray-50 rounded-2xl p-8 border-l-4 border-[#708238] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
                    <div className="text-3xl font-bold text-[#708238] mb-4">{step.number}</div>
                    <h3 className="text-xl font-semibold text-[#708238] mb-4">{step.title}</h3>
                    <ul className="text-gray-700 space-y-3">
                      {step.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start transition-transform duration-200 hover:translate-x-1">
                          <span className="text-[#708238] font-bold mr-2 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Phase 3: Engagement & Management */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-[#FFA500] bg-opacity-10">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
               <div className="inline-flex items-center justify-center w-32 h-32 bg-[#FFA500] text-white rounded-full text-2xl tracking-wide font-extrabold mb-6 shadow-xl">
  STEP&nbsp;3
</div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Engagement & Management</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto whitespace-nowrap">
  Effective management ensures project success and maximizes your return on investment
</p>

              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Start with a Paid Pilot", desc: "Never release the full project budget upfront. Use milestone payments and start with a smaller, paid discovery phase." },
                { title: "Communication Protocols", desc: "Decide on communication channels, schedule regular check-ins, and designate a single point of contact." },
                { title: "Collaborate & Provide Feedback", desc: "Provide needed access and information promptly. Give constructive feedback at each milestone." },
                { title: "Review, Approve, and Pay", desc: "Thoroughly test and review each milestone delivery before releasing payment." },
                { title: "Close Project & Leave Review", desc: "Formally close the contract and leave a detailed, honest review to help other businesses." }
              ].map((step, index) => (
                <AnimatedCard key={index} delay={200 + (index * 100)}>
                  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-t border-gray-100 h-full">
                    <div className="text-2xl font-bold text-[#FFA500] mb-2">{step.number}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                {/* <span className="inline-block px-4 py-2 bg-[#708238] text-white rounded-full text-sm font-semibold mb-4 uppercase tracking-wide">
                  Success Stories
                </span> */}
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Client Feedback & Success Stories</h2>
             
              </div>
            </AnimatedSection>
            
            <AnimatedCard delay={200}>
              <div className="bg-gray-50 rounded-2xl shadow-lg p-8 border border-gray-200 transform hover:shadow-xl transition-all duration-300">
  <div className="flex justify-center mb-8">
    <img
      src={img4}
      alt="Client Feedback & Success Stories"
      className="rounded-xl shadow-md w-full max-w-[500px] h-auto object-contain transition-transform duration-500 hover:scale-105"
    />
  </div>

  <div className="text-center">
    <p className="text-gray-600 text-lg">
      
      A real feedback or rating can help others to select a right ERP Consultant for their project!
    </p>
  </div>
</div>

            </AnimatedCard>
          </div>
        </section>

        {/* Key Considerations */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Considerations & Red Flags</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Important factors to consider for a successful ERP consultant engagement
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <AnimatedCard delay={200}>
                <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <div className="bg-red-100 rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-red-600">Red Flags to Avoid</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      { title: "Beware of 'Yes' Men", desc: "Good consultants highlight risks, not just agree with everything" },
                      { title: "Data Security", desc: "Never move transactions offline; use platform protections" },
                      { title: "Unrealistic Expectations", desc: "Large implementations may require dedicated firms" }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start transition-transform duration-200 hover:translate-x-1">
                        <span className="text-red-500 font-bold mr-3 mt-1">•</span>
                        <div>
                          <span className="font-semibold text-gray-800">{item.title}</span>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
              
              <AnimatedCard delay={300}>
                <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-[#708238] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-6">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-[#708238]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-[#708238]">Best Practices</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      { title: "Define Clear Scope of Work", desc: "Detailed SOW before starting ensures alignment" },
                      { title: "Milestone-Based Payments", desc: "Use structured payments for better control" },
                      { title: "Platform Communication", desc: "Maintain all communication on the platform for security" }
                    ].map((item, index) => (
                      <li key={index} className="flex items-start transition-transform duration-200 hover:translate-x-1">
                        <span className="text-[#708238] font-bold mr-3 mt-1">•</span>
                        <div>
                          <span className="font-semibold text-gray-800">{item.title}</span>
                          <p className="text-gray-600">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 bg-gradient-to-r from-[#FFA500] to-[#708238] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500]/20 to-[#708238]/20"></div>
          <div className="relative max-w-4xl mx-auto text-center">
            <AnimatedSection delay={200}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Hire Your ERP Consultant?</h2>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
                Follow this structured guide to ensure a successful engagement and get the best value for your investment.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <a
                href="#hire"
                className="inline-block bg-white text-[#708238] px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-100 transition-all transform hover:-translate-y-1 hover:shadow-2xl duration-300"
              >
                Hire an ERP Consultant Now
              </a>
            </AnimatedSection>
            
            <AnimatedSection delay={800}>
              <p className="mt-8 text-white text-opacity-90 text-lg">JustERPs - Connecting businesses with top ERP talent since 2025</p>
            </AnimatedSection>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

export default HowToHireERP;