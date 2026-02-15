import React from "react";

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    focusable={false}
    {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export { ChevronRightIcon };
