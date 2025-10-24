import React from "react";

export const NewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(0,80) scale(0.1,-0.1)" fill="currentColor">
        <path d="M306 664 c-70 -22 -149 -103 -170 -174 -9 -30 -16 -70 -16 -90 0 -150 130 -280 280 -280 150 0 280 130 280 280 0 152 -132 282 -284 279 -23 0 -63 -7 -90 -15z m209 -32 c47 -24 95 -73 121 -122 26 -49 26 -171 0 -220 -26 -49 -74 -98 -121 -123 -31 -17 -58 -22 -115 -22 -85 0 -133 20 -186 77 -54 57 -69 95 -69 178 0 83 15 121 69 178 31 34 70 58 116 73 41 14 142 3 185 -19z"/>
      </g>
    </svg>
  );
};

export default NewIcon;