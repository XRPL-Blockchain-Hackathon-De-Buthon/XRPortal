import React from "react";

const MoreIcon = ({ color, width = 32, height = 32 }) => {
  return (
    <svg
      width={width}
      height={height}
      enableBackground="new 0 0 32 32"
      id="Glyph"
      version="1.1"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13,16c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,14.346,13,16z"
        id="XMLID_294_"
        fill={color}
      />
      <path
        d="M13,26c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,24.346,13,26z"
        id="XMLID_295_"
        fill={color}
      />
      <path
        d="M13,6c0,1.654,1.346,3,3,3s3-1.346,3-3s-1.346-3-3-3S13,4.346,13,6z"
        id="XMLID_297_"
        fill={color}
      />
    </svg>
  );
};

export default MoreIcon;
