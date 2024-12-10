"use client";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
    </div>
  );
};

export default ShioriCheck;
<<<<<<< HEAD
=======

>>>>>>> origin/main
