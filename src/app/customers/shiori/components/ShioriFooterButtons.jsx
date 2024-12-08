"use client";
import React from "react";
import PaintIcon from "../../../components/icon/icon_paint";
import CrownIcon from "../../../components/icon/icon_crown";
import SaveIcon from "../../../components/icon/icon_save";
import CloseIcon from "../../../components/icon/icon_close";
import StarIcon from "../../../components/icon/icon_star";
import KirokuIcon from "../../../components/icon/icon_kiroku";
import SaveToPDF from "../components/SaveToPDF"; // 正しい相対パス

const ShioriFooterButtons = ({ handleNavigation, toggleColorModal }) => {
  const pagesToSave = ["page1", "page2", "page3", "page4", "page5"]; // 保存対象のページID

  // 各ボタンのスタイルを定義
  const buttonStyles = {
    paint: { default: "#98CBB0", hover: "#6FAE91" },
    crown: { default: "#DDBD98", hover: "#C8A479" },
    save: { default: "#DA7997", hover: "#C06384" },
    close: { default: "#999999", hover: "#7A7A7A" },
    star: { default: "#E1DA0F", hover: "#B8B40C" },
    kiroku: { default: "#C2AAC5", hover: "#A990A6" },
  };

  // ボタンコンポーネントの共通設定
  const IconButton = ({ onClick, children, fillDefault, fillHover }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center"
      style={{ transition: "transform 0.2s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector("svg").style.fill = fillHover;
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.querySelector("svg").style.fill = fillDefault;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-[#EDEAE7] shadow-inner p-6 flex justify-center items-center space-x-8">
      <div
        className="grid grid-cols-3 gap-12"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3列に分割
          justifyContent: "center", // 水平中央寄せ
          alignItems: "center", // 垂直中央寄せ
        }}
      >
        {/* 色を選ぶボタン */}
        <IconButton
          onClick={toggleColorModal}
          fillDefault={buttonStyles.paint.default}
          fillHover={buttonStyles.paint.hover}
        >
          <PaintIcon size={32} fill={buttonStyles.paint.default} />
          <span className="text-sm mt-3">いろをえらぶ</span>
        </IconButton>

        {/* イラストを選ぶボタン */}
        <IconButton
          onClick={() => alert("イラストをえらぶボタンが押されました")}
          fillDefault={buttonStyles.crown.default}
          fillHover={buttonStyles.crown.hover}
        >
          <CrownIcon size={32} fill={buttonStyles.crown.default} />
          <span className="text-sm mt-3">イラストをえらぶ</span>
        </IconButton>

        {/* 保存するボタン */}
        <SaveToPDF
          pages={pagesToSave}
          fileName="ShioriContent.pdf"
          customButton={(
            <IconButton
              fillDefault={buttonStyles.save.default}
              fillHover={buttonStyles.save.hover}
            >
              <SaveIcon size={32} fill={buttonStyles.save.default} />
              <span className="text-sm mt-3">ほぞんする</span>
            </IconButton>
          )}
        />

        {/* やめるボタン */}
        <IconButton
          onClick={() => handleNavigation("list-detail")}
          fillDefault={buttonStyles.close.default}
          fillHover={buttonStyles.close.hover}
        >
          <CloseIcon size={32} fill={buttonStyles.close.default} />
          <span className="text-sm mt-3">やめる</span>
        </IconButton>

        {/* リストにもどるボタン */}
        <IconButton
          onClick={() => handleNavigation("list")}
          fillDefault={buttonStyles.star.default}
          fillHover={buttonStyles.star.hover}
        >
          <StarIcon size={32} fill={buttonStyles.star.default} />
          <span className="text-sm mt-3">リストにもどる</span>
        </IconButton>

        {/* 記録を見るボタン */}
        <IconButton
          onClick={() => alert("きろくをみるボタンが押されました")}
          fillDefault={buttonStyles.kiroku.default}
          fillHover={buttonStyles.kiroku.hover}
        >
          <KirokuIcon size={32} fill={buttonStyles.kiroku.default} />
          <span className="text-sm mt-3">きろくをみる</span>
        </IconButton>
      </div>
    </div>
  );
};

export default ShioriFooterButtons;
