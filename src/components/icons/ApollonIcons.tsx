import React from "react";

type ApollonIconProps = {
  className?: string;
};

export const ApollonIcon = ({ className }: ApollonIconProps) => {
  return (
    <svg
      width="97"
      height="84"
      viewBox="0 0 97 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="2"
        y="-2"
        width="92.4444"
        height="80"
        rx="15"
        transform="matrix(1 0 0 -1 0 80)"
        stroke="#ECF3F0"
        strokeWidth="4"
      />
      <path
        d="M30.5805 71.9998H31.9928L32.4652 70.6689L37.4521 56.621H56.5877L61.5745 70.6689L62.047 71.9998H63.4593H70.3532H73.2181L72.2306 69.3104L52.2912 15.0074L51.81 13.6968H50.4138H43.6259H42.2297L41.7485 15.0074L21.8091 69.3104L20.8216 71.9998H23.6865H30.5805ZM47.0199 29.6686L53.0969 46.7877H40.9428L47.0199 29.6686Z"
        stroke="#ECF3F0"
        strokeWidth="4"
      />
    </svg>
  );
};
