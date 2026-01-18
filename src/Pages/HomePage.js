import React, { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa6";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import PenTool from "../components/PenTool";
import "../styles/HomePage.css";
import Skills from "../components/Skills";
import Roadmap from "../components/Roadmap";
import Contact from "../components/Contact";
import Certificates from "../components/Certificates";

// Utility function to split a name string by spaces
const splitName = (name) => {
  if (!name || typeof name !== "string") return [];
  return name.trim().split(/\s+/);
};

const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== "string") return "";
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
};

const HomePage = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === null ? true : savedTheme === "dark";
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Add scroll effect for nav
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector("nav");
      if (window.scrollY > 20) {
        nav?.classList.add("scrolled");
      } else {
        nav?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close nav on route change or link click
  useEffect(() => {
    const closeNav = () => setNavOpen(false);
    window.addEventListener("resize", closeNav);
    return () => window.removeEventListener("resize", closeNav);
  }, []);

  // Keyboard accessibility for hamburger
  const handleHamburgerKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      setNavOpen((prev) => !prev);
    }
  };

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://portfolio-jv2f.onrender.com/api/data/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "Jo'rabek Suyunboyev" }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.profile_data) {
          throw new Error("Invalid data format received from server");
        }

        // Force graphic design title to match theme
        if (data.profile_data.title && (data.profile_data.title.toLowerCase().includes("developer") || data.profile_data.title.toLowerCase().includes("software"))) {
          data.profile_data.title = "Senior Graphic Designer";
        } else if (!data.profile_data.title) {
          data.profile_data.title = "Graphic Designer";
        }

        // Set design-themed bio if empty or generic
        const defaultBio = "Passionate graphic designer dedicated to creating impactful visual experiences. Specializing in branding, digital design, and illustration, I bring ideas to life through creative thinking and meticulous attention to detail.";
        if (!data.profile_data.bio || data.profile_data.bio === "Lorem impus") {
          data.profile_data.bio = defaultBio;
        }

        // Add default data if API returns empty or needs enhancement for design theme
        if (!data.skills_data || data.skills_data.length === 0) {
          data.skills_data = [
            { id: 1, name: "Adobe Photoshop", level: "Expert" },
            { id: 2, name: "Adobe Illustrator", level: "Expert" },
            { id: 3, name: "Figma", level: "Advanced" },
            { id: 4, name: "Brand Identity", level: "Expert" },
            { id: 5, name: "Typography", level: "Advanced" },
            { id: 6, name: "UI/UX Design", level: "Intermediate" }
          ];
        }
        if (!data.language_data || data.language_data.length === 0) {
          data.language_data = [
            { id: 1, name: "Visual Design", progress: 95, color: "#00ffa3" },
            { id: 2, name: "Branding", progress: 90, color: "#2563eb" },
            { id: 3, name: "Illustration", progress: 85, color: "#7c3aed" }
          ];
        }
        if (!data.projects_data || data.projects_data.length === 0) {
          data.projects_data = [
            {
              id: 1,
              title: "EcoStore Branding",
              description: "Full brand identity for a sustainable products store, including logo design, color palette, and packaging.",
              technologies: "Illustrator, Photoshop",
              image: ""
            },
            {
              id: 2,
              title: "FitLife App Design",
              description: "Mobile application UI/UX design focused on fitness tracking and community engagement.",
              technologies: "Figma, Adobe XD",
              image: ""
            }
          ];
        }
        if (!data.experience_data || data.experience_data.length === 0) {
          data.experience_data = [
            {
              id: 1,
              company_name: "Creative Studio",
              position: "Lead Designer",
              start_date: "2021-01-01",
              end_date: null
            },
            {
              id: 2,
              company_name: "Design Agency",
              position: "Graphic Designer",
              start_date: "2019-06-01",
              end_date: "2020-12-31"
            }
          ];
        }
        if (!data.education_data || data.education_data.length === 0) {
          data.education_data = [
            {
              id: 1,
              institution: "Design University",
              degree: "Bachelor",
              field_of_study: "Graphic Design",
              start_year: "2015",
              end_year: "2019"
            }
          ];
        }

        setProfileData(data);
        setLoading(false);
      } catch (error) {
        console.error("Detailed fetch error:", error);
        setLoading(false);
        setProfileData(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!profileData || !isVisible) return;

    const bio = profileData.profile_data.bio;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= bio.length) {
        setTypedText(bio.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 15);

    return () => clearInterval(typingInterval);
  }, [isVisible, profileData]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Always show About section
  useEffect(() => {
    setIsAboutVisible(true);
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);


  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (!profileData) {
    return (
      <div
        className="error"
        style={{
          padding: "20px",
          textAlign: "center",
          marginTop: "50px",
          color: "var(--text-color)",
        }}
      >
        <h2>Unable to load profile data</h2>
        <p>
          Please check your internet connection and try refreshing the page.
        </p>
        <p>
          If the problem persists, the server might be temporarily unavailable.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            cursor: "pointer",
            background: "var(--accent-color)",
            border: "none",
            borderRadius: "5px",
            color: "white",
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }

  // Move name splitting logic here, after profileData is loaded
  const fullNameList = splitName(profileData.profile_data.name);
  const firstName = fullNameList[0];

  const openProjectModal = (project) => setSelectedProject(project);
  const closeProjectModal = () => setSelectedProject(null);

  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = "hidden";
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = "";
  };
  return (
    <div className={`HomePage ${isVisible ? "visible" : ""}`}>
      <div className="design-blob blob-1"></div>
      <div className="design-blob blob-2"></div>
      <div className="content-wrapper">
        <nav className={navOpen ? "scrolled" : ""}>
          <div className="nav-container">
            <div className="logo">
              <span>{profileData.profile_data.name}</span>
            </div>
            <div className="nav-right">
              {/* Hamburger icon for mobile */}
              <button
                className={`hamburger${navOpen ? " open" : ""}`}
                aria-label={
                  navOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={navOpen}
                aria-controls="main-nav-links"
                tabIndex={0}
                onClick={() => setNavOpen((prev) => !prev)}
                onKeyDown={handleHamburgerKey}
              >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </button>
              <div
                id="main-nav-links"
                className={`nav-links${navOpen ? " open" : ""}`}
                role="navigation"
              >
                <a href="#home" onClick={() => setNavOpen(false)}>
                  Home
                </a>
                <a href="#about" onClick={() => setNavOpen(false)}>
                  About
                </a>
                <a href="#skills" onClick={() => setNavOpen(false)}>
                  Skills
                </a>
                <a href="#roadmap" onClick={() => setNavOpen(false)}>
                  Roadmap
                </a>
                <a href="#certificates" onClick={() => setNavOpen(false)}>
                  Certificates
                </a>
                <a href="#contact" onClick={() => setNavOpen(false)}>
                  Contact
                </a>
                {/* iOS-style toggle for theme switcher in mobile nav */}
                <button
                  className={`theme-toggle nav-theme-toggle${
                    isDark ? " dark" : ""
                  }`}
                  onClick={() => setIsDark(!isDark)}
                  aria-label="Toggle theme"
                  style={{
                    marginTop: 24,
                    marginLeft: 0,
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                    padding: 0,
                  }}
                >
                  <span className="toggle-bg"></span>
                  <span className="toggle-slider">
                    {isDark ? (
                      <span className="toggle-icon moon">&#9789;</span>
                    ) : (
                      <span className="toggle-icon sun">&#9728;</span>
                    )}
                  </span>
                </button>
              </div>
              {/* Theme toggle for desktop only */}
              <button
                className="theme-toggle desktop-theme-toggle"
                onClick={() => setIsDark(!isDark)}
                aria-label="Toggle theme"
                style={{ marginLeft: 12 }}
              >
                {isDark ? (
                  <SunIcon className="theme-icon" />
                ) : (
                  <MoonIcon className="theme-icon" />
                )}
              </button>
            </div>
          </div>
        </nav>
        <div id="home" className="main-content">
          <div className="hero-content">
            <div className="hello">Hello</div>
            <h1 className="name">
              I'm <span className="accent">{firstName}</span>
            </h1>
            <div className="role">
              I'm a <span className="accent">{profileData.profile_data.title}</span>
            </div>
            <p className="description">
              <span className="typing-text">{typedText}</span>
              <span className="cursor"></span>
            </p>

            <div className="social-links">
              <a
                href={profileData.profile_data.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
              <a
                href={profileData.profile_data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href={`https://t.me/${profileData.profile_data.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram />
              </a>
            </div>

            <div className="buttons">
              <a href="#contact" className="btn btn-primary">
                Contact
              </a>
              <a
                href={`https://res.cloudinary.com/bnf404/${profileData.profile_data.resume}`}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="visual-section">
            <PenTool />
          </div>
        </div>{" "}
        <div
          className={`about-section${isAboutVisible ? " visible" : ""}`}
          id="about"
          data-visible={isAboutVisible}
        >
          <h2 className="section-title">
            About
          </h2>
          <div className="about-card">
            <div className="about-image-card">
              <div className="image-container">
                <img
                  src={`https://res.cloudinary.com/bnf404/${profileData.profile_data.profile_image}`}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
            </div>
            <div className="about-content">
              <p className="about-text">
                {profileData.profile_data && profileData.profile_data.bio
                  ? profileData.profile_data.bio
                  : "No about text available."}
              </p>
              <div className="skills-categories">
                {profileData.skills_data &&
                profileData.skills_data.length > 0 ? (
                  profileData.skills_data.map((skill, idx) => (
                    <span key={skill.id} className="skill-item">
                      {skill.name}
                      {skill.level ? ` (${skill.level})` : ""}
                    </span>
                  ))
                ) : (
                  <span className="skill-item">No skills listed</span>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Skills Section - tech-grid dynamic from API */}
        {profileData.skills_data && profileData.skills_data.length > 0 && (
          <Skills
            techSkills={profileData.skills_data}
            language_data={profileData.language_data}
          />
        )}
        {/* Projects Section */}
        <div className="projects-section" id="projects">
          <h2 className="section-title">
            Projects
          </h2>
          <div className="projects-container">
            {profileData.projects_data.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => openProjectModal(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openProjectModal(project);
                }}
                role="button"
                tabIndex={0}
              >
                <div className="project-image">
                  <img
                    src={`https://res.cloudinary.com/bnf404/${project.image}`}
                    alt={project.title}
                  />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="project-description">
                    {truncateText(project.description, 100)}
                  </p>
                  <div className="project-tools">{project.technologies.replace(/[{}]/g, "")}</div>
                  <div className="project-links">
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Education Section */}
        <div className="education-section" id="education">
          <h2 className="section-title">
            Education
          </h2>
          <div className="education-container">
            {profileData.education_data.map((edu, index) => (
              <div
                key={edu.id}
                className="education-card"
                style={{ "--delay": index + 1 }}
              >
                <div className="education-content">
                  <span className="education-year">
                    {edu.start_year} - {edu.end_year || "Present"}
                  </span>
                  <h3>{edu.institution}</h3>
                  <p className="degree">
                    {edu.degree} in {edu.field_of_study}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Certificates Section */}
        {profileData.certificates_data &&
          profileData.certificates_data.length > 0 && (
            <Certificates
              certificatesData={profileData.certificates_data}
              openCertificateModal={openCertificateModal}
            />
          )}
        <Roadmap
          experienceData={profileData.experience_data}
          projectsData={profileData.projects_data}
        />
        <Contact profileData={profileData.profile_data} />
        {selectedProject && (
          <div className="modal-overlay" onClick={closeProjectModal}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Project details for ${selectedProject.title}`}
            >
              <button className="modal-close" onClick={closeProjectModal} aria-label="Close">
                ×
              </button>
              <div className="modal-image">
                <img
                  src={`https://res.cloudinary.com/bnf404/${selectedProject.image}`}
                  alt={selectedProject.title}
                />
              </div>
              <div className="modal-body">
                <h3>{selectedProject.title}</h3>
                <p className="modal-description">{selectedProject.description}</p>
                <div className="modal-tools">{selectedProject.technologies.replace(/[{}]/g, "")}</div>
                <div className="modal-links">
                  {selectedProject.project_url && (
                    <a
                      href={selectedProject.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Live Demo
                    </a>
                  )}
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedCertificate && (
          <div className="modal-overlay" onClick={closeCertificateModal}>
            <div
              className="certificate-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={closeCertificateModal}
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={`https://res.cloudinary.com/bnf404/${selectedCertificate.image}`}
                alt={selectedCertificate.name}
                className="certificate-modal-image"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
