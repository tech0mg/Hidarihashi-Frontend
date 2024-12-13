"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ShioriIcon from "./icon/icon_shiori";
import StarIcon from "./icon/icon_star";
import KirokuIcon from "./icon/icon_kiroku";

const FooterButton = () => {
const router = useRouter();

const buttonStyles = {
shiori: { default: "#98CBB0", hover: "#6FAE91" },
star: { default: "#E1DA0F", hover: "#B8B40C" },
kiroku: { default: "#C2AAC5", hover: "#A990A6" },
};

const IconButton = ({ onClick, children, fillDefault, fillHover }) => (
<button
    onClick={onClick}
    className="flex flex-col items-center justify-center"
    style={{ transition: "transform 0.2s ease" }}
    onMouseEnter={(e) => {
    const svgElement = e.currentTarget.querySelector("svg");
    if (svgElement) {
        svgElement.style.fill = fillHover;
    }
    e.currentTarget.style.transform = "scale(1.1)";
    }}
    onMouseLeave={(e) => {
    const svgElement = e.currentTarget.querySelector("svg");
    if (svgElement) {
        svgElement.style.fill = fillDefault;
    }
    e.currentTarget.style.transform = "scale(1)";
    }}
>
    {children}
</button>
);

return (
<footer className="bg-[#EDEAE7] shadow-inner p-6 flex justify-center items-center space-x-8">
    <IconButton
    onClick={() => router.push("/customers/shiori/page1")}
    fillDefault={buttonStyles.shiori.default}
    fillHover={buttonStyles.shiori.hover}
    >
    <ShioriIcon size={32} fill={buttonStyles.shiori.default} />
    <span className="text-sm p-3">しおりをつくる</span>
    </IconButton>

    <IconButton
    onClick={() => router.push("/customers/list")}
    fillDefault={buttonStyles.star.default}
    fillHover={buttonStyles.star.hover}
    >
    <StarIcon size={32} fill={buttonStyles.star.default} />
    <span className="text-sm p-3">リストをみる</span>
    </IconButton>

    <IconButton
    onClick={() => router.push("/customers/kiroku_list")}
    fillDefault={buttonStyles.kiroku.default}
    fillHover={buttonStyles.kiroku.hover}
    >
    <KirokuIcon size={32} fill={buttonStyles.kiroku.default} />
    <span className="text-sm p-3">きろくをみる</span>
    </IconButton>
</footer>
);
};

export default FooterButton;
