"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ShioriCheck = () => {
  const router = useRouter();
  const [shioriData, setShioriData] = useState({});

  useEffect(() => {
    // ローカルストレージから page1～page4 のデータを取得
    const page1 = JSON.parse(localStorage.getItem("page1")) || {};
    const page2 = JSON.parse(localStorage.getItem("page2")) || {};
    const page3 = JSON.parse(localStorage.getItem("page3")) || {};
    const page4 = JSON.parse(localStorage.getItem("page4")) || {};

    setShioriData({ page1, page2, page3, page4 });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">しおりチェック</h1>
      
      <div className="space-y-6">
        {/* Page1 Content */}
        {shioriData.page1 && (
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">しおりのタイトル</h2>
            <p>{shioriData.page1.title || "タイトル未設定"}</p>
          </div>
        )}

        {/* Page2 Content */}
        {shioriData.page2 && (
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">スケジュール</h2>
            <p>{shioriData.page2.schedule || "スケジュール未設定"}</p>
          </div>
        )}

        {/* Page3 Content */}
        {shioriData.page3 && (
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">天気と経路情報</h2>
            <p>{shioriData.page3.weather || "天気情報未設定"}</p>
            <img src={shioriData.page3.mapUrl || ""} alt="Map" className="rounded-lg" />
          </div>
        )}

        {/* Page4 Content */}
        {shioriData.page4 && (
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">メモ</h2>
            <p>{shioriData.page4.memo || "メモ未設定"}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => router.push("/customers/shiori/page1")}
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default ShioriCheck;
