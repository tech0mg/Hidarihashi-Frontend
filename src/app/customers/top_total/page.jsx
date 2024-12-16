"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

const TopTotal = () => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const navigateToKids = () => {
    router.push("/customers/login"); // 子供向け入口
  };

  const navigateToCompany = () => {
    router.push("/customers/toB_top"); // 企業向け入口
  };

  const handleOpenPDF = () => {
    const pdfUrl = `${apiUrl}/pdf/slide`;
    window.open(pdfUrl, "_blank");
};

 

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#F9F7F5]">
      {/* ヘッダー */}
      <div className="w-full">
          <Header />
      </div>
      
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F7F5]">
            {/* 画像 */}
            <div className="w-full max-w-md">
                <img
                src={`${apiUrl}/static/top_total_img/top_total.png`}
                alt="トップ画像"
                className="w-full h-auto object-cover rounded shadow-md"
                />
            </div>

            {/* ボタン */}
            <div className="flex flex-col items-center mt-8 space-y-4">
                <button
                  onClick={navigateToKids}
                  className="text-white rounded-md shadow-md px-6 py-3 animate-rainbow"
                >
                子供向け入口
                </button>
                <button
                  onClick={navigateToCompany}
                  className="text-white rounded-md shadow-md px-6 py-3 animate-blink"
                >
                企業向け入口
                </button>
                <button 
                  onClick={handleOpenPDF}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600"
                >
                  プレゼンスライド
                </button>
            </div>
        </div>
    </div>
  );
};

export default TopTotal;
