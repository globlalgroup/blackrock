import React from "react";

export const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        <path d="M219 449c-15-6-32-22-38-37-15-36-9-118 12-166 29-66 24-80-37-109-48-23-86-58-86-79 0-5 86-8 190-8 105 0 190 4 190 9 0 19-37 53-85 79-58 32-65 51-37 113 13 29 19 64 18 103-1 50-5 61-26 77-33 24-69 30-101 18z" />
      </g>
    </svg>
  );
};

export default UserIcon;