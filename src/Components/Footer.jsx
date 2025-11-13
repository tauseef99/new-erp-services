import React from "react";
import logo from "../Assets/images/logo-2.jpeg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";

const footerData = [
  {
    heading: "For Business Users",
    links: [
       { name: "How to hire ERP Consultant", href: "/how_to_hire_erp_consultant" },
      // { name: "How to hire ERP Consultant", href: "/docs/How_to_hire_ERP_Consultant.pdf" },

      { name: "How JustERPs work?", href: "/how/erp/works" },
      { name: "FAQ’s", href: "/faq" },
    ],
  },
  {
    heading: "For ERP Freelancers",
    links: [
      { name: "Join as Freelancer ERP Consultant", href: "/join/as/consultant" },
      { name: "JustERPs ProjectTeams", href: "/erp/team" },
    ],
  },
  {
    heading: "Categories",
    links: [
      { name: "ERP Consultant", href: "/join" },
      { name: "Data Migration", href: "/join" },
      { name: "Business Intelligence (BI)", href: "/join" },
      { name: "Change Management", href: "/join" },
      { name: "End-User Trainers", href: "/join" },
      { name: "Reporting", href: "/join" },
      { name: "GRC", href: "/join" },
      { name: "BA (Business Analyst)", href: "/join" },
      { name: "Data Entry", href: "/join" },
      { name: "Data Migration", href: "/join" },
        { name: "Technical Consultant", href: "/join" },
          { name: "Functional Consultant", href: "/join" },
            { name: "Techno-Functional Consultant", href: "/join" },
        { name: "Project Manager", href: "/join" },
          { name: "Team Lead", href: "/join" },
          { name: "View full list of all categories", href: "/join" },

    ],
  },
 
  {
    heading: "About JustERPs",
    links: [
      { name: "JustERPs", href: "/justerps" },
      { name: "Customer Support", href: "/customer/services" },
      { name: "Privacy Policy & Term of Services", href: "/terms/services" },
      { name: "Social Responsibility", href: "/social/responsibility" },
      { name: "Refer to a Consultant Bonus", href: "/referral/bonus" },
      { name: "Personal Data Protection", href: "/personal/data/protection" },

    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-10 md:pt-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerData.map((section, index) => (
            <div key={index}>
              <h4 className="text-gray-800 font-semibold mb-4">
                {section.heading}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} className="hover:underline">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-3 items-center">
                    <img src={logo} className="w-48 rounded-lg"/>
            <p className="text-black text-sm">
              © {new Date().getFullYear()} justERPs International Ltd.
            </p>
          </div>

          <div className="flex space-x-6 text-md text-[#FFA500] items-center">
  <a
    href="https://facebook.com/justerps"
    className="transition-colors duration-300"
  >
    <FaFacebookF />
  </a>
  <a
    href="https://twitter.com/justerps"
    className="transition-colors duration-300"
  >
    <FaTwitter />
  </a>
  <a
    href="https://instagram.com/justerps"
    className="transition-colors duration-300"
  >
    <FaInstagram />
  </a>
  <a
    href="https://linkedin.com/company/justerps"
    className="transition-colors duration-300"
  >
    <FaLinkedinIn />
  </a>

  <div className="flex items-center cursor-pointer gap-2 text-[#FFA500] font-semibold transition-colors duration-300">
    <TfiWorld className="text-md" />
    <p>English</p>
  </div>
</div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
