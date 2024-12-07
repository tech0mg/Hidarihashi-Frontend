"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SaveToPDF from "./SaveToPDF";
import PaintIcon from "../../../components/icon/icon_paint"; 
import CrownIcon from "../../../components/icon/icon_crown"; 
import SaveIcon from "../../../components/icon/icon_save"; 
import CloseIcon from "../../../components/icon/icon_close"; 
import StarIcon from "../../../components/icon/icon_star"; 
import KirokuIcon from "../../../components/icon/icon_kiroku"; 

const ShioriFooterButtons = ({ handleNavigation }) => {
  const pagesToSave = ["page1", "page2", "page3", "page4", "page5"]; // PDF出力対象のページID
  
  return (
    <div className="bg-[#EDEAE7]  w-full shadow-lg p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <button
          onClick={() => alert("いろをえらぶボタンが押されました")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <PaintIcon size={24} />
          </div>
          <span className="text-sm mt-2">いろをえらぶ</span>
        </button>

        <button
          onClick={() => alert("イラストをえらぶボタンが押されました")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12  rounded-full flex items-center justify-center">
            <CrownIcon size={24} />
          </div>
          <span className="text-sm mt-2">イラストをえらぶ</span>
        </button>
        
        <SaveToPDF
          pages={pagesToSave} // PDF出力対象のページを指定
          fileName="ShioriContent.pdf" // 保存するPDFの名前
        />
        
        <button
          onClick={() => alert("ほぞんするボタンが押されました")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <SaveIcon size={24}/>
          </div>
          <span className="text-sm mt-2">ほぞんする</span>
        </button>

        <button
          onClick={() => handleNavigation("list-detail")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <CloseIcon size={24} />
          </div>
          <span className="text-sm mt-2">やめる</span>
        </button>

        <button
          onClick={() => handleNavigation("list")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <StarIcon size={24} />
          </div>
          <span className="text-sm mt-2">リストにもどる</span>
        </button>

        <button
          onClick={() => alert("きろくをみるボタンが押されました")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <KirokuIcon size={24} />
          </div>
          <span className="text-sm mt-2">きろくをみる</span>
        </button>
      </div>
    </div>
  );
};

export default ShioriFooterButtons;
