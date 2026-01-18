import React from "react";
import "./PenTool.css";

const PenTool = () => {
  return (
    <div className="pen-tool-container">
      {/* Background Grid for Design Feel */}
      <div className="design-grid"></div>

      <svg
        viewBox="0 0 400 400"
        className="pen-tool-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Construction Lines */}
        <line x1="50" y1="200" x2="350" y2="200" className="construction-line" />
        <line x1="200" y1="50" x2="200" y2="350" className="construction-line" />
        <circle cx="200" cy="200" r="100" className="construction-circle" />

        {/* Animated Drawing Path 1 - Primary Curve */}
        <path
          d="M 50 300 Q 150 50 250 300 T 350 150"
          className="drawing-path path-1"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
        />

        {/* Animated Drawing Path 2 - Secondary Accents */}
        <path
          d="M 100 350 Q 200 250 300 350"
          className="drawing-path path-2"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="5,5"
          opacity="0.6"
        />

        {/* Anchor Points */}
        <g className="anchors">
          <rect x="45" y="295" width="10" height="10" className="anchor-point square" />
          <rect x="245" y="295" width="10" height="10" className="anchor-point square" />
          <rect x="345" y="145" width="10" height="10" className="anchor-point square" />
        </g>

        {/* Handles */}
        <line x1="250" y1="300" x2="200" y2="150" className="handle-line" />
        <circle cx="200" cy="150" r="4" className="handle-point" />

        {/* The Pen Nib */}
        <g className="pen-nib">
          <path
            d="M 0 0 L -12 -35 L 0 -45 L 12 -35 Z"
            className="nib-body"
            fill="var(--text-primary)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <line x1="0" y1="0" x2="0" y2="-25" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="2" fill="var(--accent)" />
        </g>
      </svg>

      {/* Decorative Design Elements */}
      <div className="design-label top-left">Vector.ai</div>
      <div className="design-label bottom-right">100% Zoom</div>
    </div>
  );
};

export default PenTool;
