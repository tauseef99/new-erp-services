import React, { useState, useEffect } from 'react';
import { ArrowUp } from "lucide-react"; // lightweight icon
import ourstory from "../Assets/images/our_story1.jpg";
import ourstory2 from "../Assets/images/our_story2.png";
import Footer from './Footer';
import Navbar from './Navbar';

export const Ourstory = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block bg-[#708238] bg-opacity-10 px-4 py-2 rounded-full mb-6">
              <span className="text-[#708238] font-semibold uppercase tracking-wider text-sm">
                Our Journey
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Story
            </h1>
            <div className="w-24 h-1 bg-[#FFA500] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The journey of AMJ and the ERP marketplace revolution that's changing
              how businesses connect with specialized talent.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-16 rounded-lg overflow-hidden shadow-lg border-4 border-white">
            <img
              src={ourstory}
              alt="ERP Marketplace Revolution"
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 border border-gray-100">
            <h3 className="text-xl md:text-2xl font-bold text-[#708238] mb-8 text-center">
              The ERP Marketplace Revolution: AMJ's Journey to Bridge the Gap
            </h3>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                In December 2007, after two previous attempts, AMJ earned his first
                SAP ERP certification—a hard-won victory that launched a successful
                twenty-year career in ERP sales. Throughout his journey, meeting
                countless consultants, he observed a persistent and frustrating
                industry-wide problem.
              </p>
              <p>
                Companies were forced to bear the significant financial burden of
                hiring full-time employees for short-term, specialized projects. At
                the same time, he saw several brilliant, seasoned ERP experts unable
                to monetize their deep skills outside of traditional employment.
                Despite having available time and cross-industry expertise, these
                professionals had no dedicated platform to showcase their talents or
                find meaningful freelance work to support their goals and families.
                The only options were word-of-mouth and personal networks.
              </p>
              <p>
                A breakthrough conversation in a coffee shop with a fellow consultant
                drew attention to his words: &quot;I took this part-time job because I
                can’t pay my daughter’s college fee with just my expertise. I need a
                project, but I can’t find one, because no one can find me.&quot; His
                words described not only his own problem but also that of many
                consultants across the globe: “No one can find them, and they cannot
                find the projects.”
              </p>

              <div className="bg-[#FFA500] bg-opacity-5 p-6 rounded-lg border-l-4 border-[#FFA500]">
                <p className="italic text-gray-800">
                  Relying on full-time employees for short-term projects or expensive
                  consulting firms creates an unnecessary financial burden for
                  companies and leaves a large number of independent ERP talent
                  underutilized. Meanwhile, highly skilled consultants with decades of
                  experience struggle to find freelance opportunities.
                </p>
              </div>

              <p>
                The conclusion was clear: the industry desperately needed a dedicated
                global marketplace. AMJ envisioned a platform where companies could
                instantly find and hire vetted ERP talent within their budget and
                timeline, and where consultants, from anywhere in the world, could
                seamlessly connect with clients, share their expertise, and deliver
                projects with passion and commitment. That night, AMJ drafted the
                blueprint for JustERPs: an ERP-dedicated freelancing ecosystem where
                corporations can hire ERP consultants for projects on demand.
              </p>

              <p>
                This vision is now our mission. We are building that platform—a
                revolutionary ecosystem designed to efficiently connect the world's
                top SAP talent with the opportunities they deserve, empowering
                businesses and liberating professionals.
              </p>

              {/* Hero Image */}
              <div className="mb-16 rounded-lg overflow-hidden shadow-lg border-4 border-white flex justify-center">
                <img
                  src={ourstory2}
                  alt="ERP Marketplace Revolution"
                  className="max-w-full h-auto object-cover mx-auto"
                />
              </div>

            </div>
          </div>

          {/* Call to Action */}
          <div
            className="text-center mt-16"
            style={{ fontFamily: "Segoe UI, sans-serif" }}
          >
            <button className="bg-[#FFA500] hover:bg-[#e59400] text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
              Join Our Revolution
            </button>
            <p className="text-gray-500 text-sm mt-4">
              Be a part of the change in ERP consulting
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#FFA500] hover:bg-[#5a682c] text-white p-3 rounded-full shadow-lg transition duration-300"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <Footer />
    </>
  );
};
