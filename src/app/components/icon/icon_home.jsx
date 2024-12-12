import React from "react";

const HomeIcon = ({ size = 24, fill = "currentColor", className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={size}
    height={size}
    style={{ fill }} // インラインスタイルで対応
    className={className} // クラス名指定
  >
    <g>
      {/* 屋根部分 */}
      <polygon
        points="256,28.3 308.9,81.3 363.9,136.3 433.2,205.5 433.2,86.7 474.1,322.1 256,104.1 37.9,322.1 0,284.2 256,28.3"
      />
      {/* 本体部分 */}
      <polygon
        points="78.8,312.1 78.8,483.7 213.9,483.7 213.9,368.2 298,368.2 298,483.7 433.2,483.7 433.2,312.1 256,134.9"
      />
    </g>
  </svg>
);

export default HomeIcon;
