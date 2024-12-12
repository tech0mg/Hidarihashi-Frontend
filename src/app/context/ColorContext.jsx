"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [shioriColor, setShioriColor] = useState("#da7997"); // 初期値はPINK

  // ローカルストレージから色を復元
  useEffect(() => {
    const storedColor = localStorage.getItem("shioriColor");
    if (storedColor) {
      setShioriColor(storedColor); // ローカルストレージから取得した色を設定
    }
  }, []);

  // 色を変更し、ローカルストレージにも保存
  const changeColor = (color) => {
    setShioriColor(color);
    localStorage.setItem("shioriColor", color); // ローカルストレージに保存
  };

  return (
    <ColorContext.Provider value={{ shioriColor, changeColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);