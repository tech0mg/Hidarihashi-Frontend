"use client";
import React from "react";
import { useColor } from "../../../context/ColorContext";

const ColorModal = ({ onClose }) => {
  const { changeColor } = useColor();
  const colors = [
    { color: "#E37E88", label: "赤" },
    { color: "#DA7997", label: "ピンク" },
    { color: "#C2AAC5", label: "紫" },
    { color: "#5F72D1", label: "青" },
    { color: "#389D63", label: "緑" },
    { color: "#63C0C3", label: "シアン" },
    { color: "#EFB97B", label: "オレンジ" },
    { color: "#E4E872", label: "黄色" },
    { color: "#9A877A", label: "ブラウン" },
  ];

  const handleColorChange = (color) => {
    changeColor(color); // 枠線の色を変更
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-6 text-center">色をえらぶ</h2>
        <div className="grid grid-cols-3 gap-4">
          {colors.map((colorOption, index) => (
            <button
              key={index}
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: colorOption.color }}
              onClick={() => handleColorChange(colorOption.color)}
            ></button>
          ))}
        </div>
        <button
          className="mt-6 p-2 bg-gray-400 text-white rounded-md"
          onClick={onClose}
        >
          とじる
        </button>
      </div>
    </div>
  );
};

export default ColorModal;
