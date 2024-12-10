import React from "react";

const ShioriCard = ({ children, style }) => {
  return (
    <div
      className="relative bg-white shadow-lg border-8 border-[#da7997] rounded-md"
      style={{
        aspectRatio: "210 / 297",
        height: "70%",
        maxWidth: "calc(100vh * 210 / 297)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default ShioriCard;