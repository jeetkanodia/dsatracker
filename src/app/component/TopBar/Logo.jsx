import * as React from "react";

function Logo(props) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth={0}
      viewBox="0 0 16 16"
      height="1.25em"
      width="1.25em"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M5 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 015 8zm0-2.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0 5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z"
        clipRule="evenodd"
      />
      <circle cx={3.5} cy={5.5} r={0.5} />
      <circle cx={3.5} cy={8} r={0.5} />
      <circle cx={3.5} cy={10.5} r={0.5} />
    </svg>
  );
}

export default Logo;
