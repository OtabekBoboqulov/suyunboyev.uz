import React from "react";
import "./PenTool.css";

const PenTool = () => {
  return (
    <div className="pen-tool-container">
      <svg
        viewBox="0 0 400 400"
        className="pen-tool-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated Drawing Path */}
        <path
          d="M 50 300 Q 150 100 250 300 T 350 100"
          className="drawing-path"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Anchor Points */}
        <circle cx="50" cy="300" r="5" className="anchor-point" />
        <circle cx="250" cy="300" r="5" className="anchor-point" />

        {/* Animated Handle Lines */}
        <line x1="50" y1="300" x2="100" y2="200" className="handle-line" />
        <circle cx="100" cy="200" r="3" className="handle-point" />

        {/* The Pen Nib */}
        <g className="pen-nib">
          <path
            d="M 0 0 L -10 -30 L 0 -40 L 10 -30 Z"
            fill="var(--text-primary)"
            stroke="var(--accent)"
            strokeWidth="1"
          />
          <line x1="0" y1="0" x2="0" y2="-20" stroke="var(--accent)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

export default PenTool;
