"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PaintIcon from "../../../components/icon/icon_paint";
import CrownIcon from "../../../components/icon/icon_crown";
import SaveIcon from "../../../components/icon/icon_save";
import CloseIcon from "../../../components/icon/icon_close";
import StarIcon from "../../../components/icon/icon_star";
import KirokuIcon from "../../../components/icon/icon_kiroku";
import ColorModal from "../components/ColorModal";
import IllustrationSelector from "./IllustrationSelector";

const ShioriFooterButtons = ({
  handleNavigation,
  toggleColorModal,
  onIllustrationChange,
}) => {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // モーダルの切り替え
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // ページ遷移の関数
  const handleSaveClick = () => {
    router.push("/customers/shiori_check");
  };

  const handleKirokuClick = () => {
    router.push("/customers/kiroku_list");
  };

  // ボタンのスタイル
  const buttonStyles = {
    paint: { default: "#98CBB0", hover: "#6FAE91" },
    crown: { default: "#DDBD98", hover: "#C8A479" },
    save: { default: "#DA7997", hover: "#C06384" },
    close: { default: "#999999", hover: "#7A7A7A" },
    star: { default: "#E1DA0F", hover: "#B8B40C" },
    kiroku: { default: "#C2AAC5", hover: "#A990A6" },
  };

  // 汎用アイコンボタンコンポーネント
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
    <>
      {/* フッター */}
      <div className="bg-[#EDEAE7] shadow-inner p-4 sm:p-6 flex justify-center items-center">
        <div
          className="grid grid-cols-3 grid-rows-2 gap-4 sm:gap-6"
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* 色を選ぶボタン */}
          <IconButton
            onClick={toggleColorModal}
            fillDefault={buttonStyles.paint.default}
            fillHover={buttonStyles.paint.hover}
          >
            <PaintIcon size={24} fill={buttonStyles.paint.default} />
            <span className="text-xs sm:text-sm mt-2">色をえらぶ</span>
          </IconButton>

          {/* イラストを選ぶボタン */}
          <IconButton
            onClick={toggleModal}
            fillDefault={buttonStyles.crown.default}
            fillHover={buttonStyles.crown.hover}
          >
            <CrownIcon size={24} fill={buttonStyles.crown.default} />
            <span className="text-xs sm:text-sm mt-2">イラストをえらぶ</span>
          </IconButton>

          {/* 保存するボタン */}
          <IconButton
            onClick={handleSaveClick}
            fillDefault={buttonStyles.save.default}
            fillHover={buttonStyles.save.hover}
          >
            <SaveIcon size={24} fill={buttonStyles.save.default} />
            <span className="text-xs sm:text-sm mt-2">ほぞんする</span>
          </IconButton>

          {/* やめるボタン */}
          <IconButton
            onClick={() => handleNavigation("list-detail")}
            fillDefault={buttonStyles.close.default}
            fillHover={buttonStyles.close.hover}
          >
            <CloseIcon size={24} fill={buttonStyles.close.default} />
            <span className="text-xs sm:text-sm mt-2">やめる</span>
          </IconButton>

          {/* リストにもどるボタン */}
          <IconButton
            onClick={() => handleNavigation("list")}
            fillDefault={buttonStyles.star.default}
            fillHover={buttonStyles.star.hover}
          >
            <StarIcon size={24} fill={buttonStyles.star.default} />
            <span className="text-xs sm:text-sm mt-2">リストにもどる</span>
          </IconButton>

          {/* 記録を見るボタン */}
          <IconButton
            onClick={handleKirokuClick}
            fillDefault={buttonStyles.kiroku.default}
            fillHover={buttonStyles.kiroku.hover}
          >
            <KirokuIcon size={24} fill={buttonStyles.kiroku.default} />
            <span className="text-xs sm:text-sm mt-2">きろくをみる</span>
          </IconButton>
        </div>
      </div>

      {/* 色選択モーダル */}
      {isColorModalOpen && <ColorModal onClose={toggleColorModal} />}

      {/* イラストモーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">イラストをえらぶ</h2>
            <IllustrationSelector onIllustrationChange={onIllustrationChange} />
            <button
              className="mt-4 p-2 bg-gray-400 text-white rounded-md"
              onClick={toggleModal}
            >
              えらぶ
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShioriFooterButtons;
