"use client";
import React, { useEffect, useState } from "react";
import ShioriCard from "../../components/ShioriCard";


const ShioriCheck = () => {
    const [page1, setPage1] = useState({});
    const [page2, setPage2] = useState({});
    const [page3, setPage3] = useState({});
    const [page4, setPage4] = useState({});

  useEffect(() => {
    // ローカルストレージから page1～page4 のデータを取得
    setPage1(JSON.parse(localStorage.getItem("page1")) || {});
    setPage2(JSON.parse(localStorage.getItem("page2")) || {});
    setPage3(JSON.parse(localStorage.getItem("page3")) || {});
    setPage4(JSON.parse(localStorage.getItem("page4")) || {});
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#FFF8E1] min-h-screen py-4">
      <h1 className="text-2xl font-bold text-[#9A877A] mb-4">しおりチェック</h1>
      
      <div className="space-y-8">
        {/* Page1 */}
        <ShioriCard>
          <h1 className="text-3xl font-bold text-center">{page1.title || "しおりタイトル"}</h1>
          <p className="text-xl text-center">Produced by {page1.producer || "未設定"}</p>
        </ShioriCard>
        {/* Page2 */}
        <ShioriCard>
          <h2 className="text-2xl font-bold mb-2">スケジュール</h2>
          <p>{page2.schedule || "スケジュール未設定"}</p>
        </ShioriCard>
        {/* Page3 */}
        <ShioriCard>
          <h2 className="text-2xl font-bold mb-2">天気と経路情報</h2>
          <p>{page3.weather || "天気未設定"}</p>
          {page3.mapUrl && <img src={page3.mapUrl} alt="Map" className="w-full h-48 object-cover" />}
        </ShioriCard>
        {/* Page4 */}
        <ShioriCard>
          <h2 className="text-2xl font-bold mb-2">メモ</h2>
          <p>{page4.memo || "メモ未設定"}</p>
        </ShioriCard>
      </div>
      {/* 戻るボタン */}
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => window.history.back()}
      >
        戻る
      </button>
    </div>
  );
};

export default ShioriCheck;

