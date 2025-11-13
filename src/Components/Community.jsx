import React, { useEffect, useRef, useState } from "react";
import { MdApps } from "react-icons/md";
import { FaProjectDiagram, FaLanguage, FaGlobeAmericas } from "react-icons/fa";
import CountUp from "react-countup";

const statsData = [
  {
    icon: <MdApps size={40} className="mx-auto text-[#C44251]" />,
    number: 47,
    suffix: "+",
    description: "More than 200 + ERPS",
  },
  {
    icon: <FaProjectDiagram size={40} className="mx-auto text-[#C44251]" />,
    number: 1200,
    suffix: "+",
    description: "Consulting Categories",
  },
  {
    icon: <FaLanguage size={40} className="mx-auto text-[#C44251]" />,
    number: 49,
    suffix: "",
    description: "Languages known by consultants",
  },
  {
    icon: <FaGlobeAmericas size={40} className="mx-auto text-[#C44251]" />,
    number: 450,
    suffix: "+",
    description: "Worldwide consultants",
  },
];

function Community() {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // stop observing once triggered
        }
      },
      { threshold: 0.3 } // 30% of section visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto my-20 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-between">
        {statsData.map((item, index) => (
          <div
            key={index}
            className="py-12 px-4 demand-services rounded-2xl text-center shadow-md cursor-pointer 
                       transition-colors duration-300 hover:bg-[#FFA500] hover:text-white"
          >
            <p>{item.icon}</p>
            <h6 className="py-6 text-[#315F6F] text-5xl font-bold">
              {startCount ? (
                <CountUp
                  start={0}
                  end={item.number}
                  duration={2}
                  separator=","
                  suffix={item.suffix}
                />
              ) : (
                "0" + item.suffix
              )}
            </h6>
            <p className="font-semibold text-lg italic">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
