import React from "react";
import { useRouter } from "next/navigation";
import ShioriIcon from "./icon/icon_shiori";
import StarIcon from "./icon/icon_star";
import KirokuIcon from "./icon/icon_kiroku";

const FooterButton = () => {
    const router = useRouter();
    
    const handleShioriClick = () => {
        router.push("/customers/shiori/page1"); // shiori/page1 への遷移
    };

    const handleListClick = () => {
        router.push("/customers/list"); // customers/list への遷移
      };

    const handleKirokuClick = () => {
        alert("きろくをみるボタンが押されました！"); // 押したことが分かるアクション
    };
    return (
        <footer className="bg-[#EDEAE7] shadow-inner p-4 flex justify-center items-center space-x-8">
        <button 
            className="flex flex-col items-center justify-center"
            onClick={handleShioriClick}
        >
            <ShioriIcon size={24} className="mx-2" />
            <span className="text-sm">しおりをつくる</span>
        </button>

        <button
            className="flex flex-col items-center justify-center hover:bg-[#ADEAE8]"
            onClick={handleListClick}
        >
            <StarIcon size={24} className="mx-2" />
            <span className="text-sm">リストをみる</span>
        </button>

        <button 
            className="flex flex-col items-center justify-center"
            onClick={handleKirokuClick}
        >
            <KirokuIcon size={24} className="mx-2" />
            <span className="text-sm">きろくをみる</span>
        </button>
        </footer>
    );
};

export default FooterButton;
