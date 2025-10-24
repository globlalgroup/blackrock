import React from "react";

export const MemIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(0,50) scale(0.1,-0.1)" fill="currentColor">
        <path d="M157 473 c-4 -3 -7 -19 -7 -35 0 -22 -11 -40 -44 -69 -89 -81 -110 -202 -51 -291 35 -53 82 -72 158 -64 108 11 197 68 237 151 19 39 21 54 15 127 -7 82 -31 158 -55 173 -7 4 -25 -5 -43 -22 -29 -26 -37 -29 -78 -23 -29 3 -58 16 -78 33 -34 28 -43 32 -54 20z m43 -44 c0 -5 -7 -9 -15 -9 -9 0 -15 9 -15 21 0 18 2 19 15 9 8 -7 15 -16 15 -21z"/>
        <path d="M103 294 c-3 -8 -1 -20 6 -27 14 -14 47 15 37 32 -10 16 -36 13 -43 -5z"/>
        <path d="M225 290 c-8 -13 13 -40 30 -40 21 0 36 25 23 38 -15 15 -45 16 -53 2z"/>
      </g>
    </svg>
  );
};

export default MemIcon;