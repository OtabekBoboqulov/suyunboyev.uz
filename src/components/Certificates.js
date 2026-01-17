import React from "react";

const Certificates = ({ certificatesData, openCertificateModal }) => {
  if (!certificatesData || certificatesData.length === 0) {
    return null;
  }

  return (
    <div className="certificates-section" id="certificates">
      <h2 className="section-title">
        <span className="angle-bracket">&lt;</span>
        Certificates
        <span className="angle-bracket">&gt;</span>
      </h2>
      <div className="certificates-container">
        {certificatesData.map((certificate, index) => (
          <div
            key={index}
            className="certificate-card"
            style={{ "--delay": index + 1 }}
            onClick={() => openCertificateModal(certificate)}
          >
            <div className="certificate-image">
              <img
                src={`https://res.cloudinary.com/bnf404/${certificate.image}`}
                alt={certificate.name}
              />
            </div>
            <div className="certificate-content">
              <h3>{certificate.name}</h3>
              <p className="certificate-organization">
                {certificate.organization} - {certificate.year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
