import React, { useEffect, useRef, useMemo } from "react";
import "../styles/Roadmap.css";

const Roadmap = ({
  experienceData = [],
  educationData = [],
  projectsData = [],
}) => {
  const sectionRef = useRef(null);

  // Calculate dynamic stats
  const stats = useMemo(() => {
    // Projects Development
    const projectsCount = projectsData.length;

    // Years of Experience
    let minStart = null;
    let maxEnd = null;
    experienceData.forEach((exp) => {
      const startStr = exp.start_date || exp.startDate || exp.start_year;
      const endStr = exp.end_date || exp.endDate || exp.end_year;
      const start = startStr ? new Date(startStr) : null;
      const end = endStr ? new Date(endStr) : new Date();

      if (!start || isNaN(start.getTime())) return;

      if (!minStart || start < minStart) minStart = start;
      if (!maxEnd || end > maxEnd) maxEnd = end;
    });
    let years = 0;
    if (minStart && maxEnd) {
      years = maxEnd.getFullYear() - minStart.getFullYear();
      // If not a full year, add 1 if months/days overlap
      if (
        maxEnd.getMonth() > minStart.getMonth() ||
        (maxEnd.getMonth() === minStart.getMonth() &&
          maxEnd.getDate() >= minStart.getDate())
      ) {
        years += 1;
      }
    }

    // Worked Companies
    const companies = new Set(experienceData.map((exp) => exp.company_name || exp.company || exp.institution).filter(Boolean));
    const companiesCount = companies.size;

    return [
      {
        value: `${projectsCount}`,
        label: "Creative Projects",
        sublabel: "from concept",
      },
      {
        value: years > 0 ? `${years}+` : "1+",
        label: "Years of",
        sublabel: "Experience",
      },
      {
        value: "95%",
        label: "Positive Feedback",
        sublabel: "from clients",
      },
      {
        value: `${companiesCount}`,
        label: "Collaborations",
        sublabel: "with brands",
      },
    ];
  }, [experienceData, projectsData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            const stats = entry.target.querySelectorAll(".stat-item");
            stats.forEach((stat, index) => {
              setTimeout(() => {
                stat.classList.add("animate-in");
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="roadmap-section" id="roadmap" ref={sectionRef}>
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <span className="stat-value">{stat.value}</span>
            <div className="stat-label">
              {stat.label}
              <span className="stat-sublabel">{stat.sublabel}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;
