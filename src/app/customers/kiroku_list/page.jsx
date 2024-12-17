"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header"; // ヘッダーコンポーネント

const KirokuList = () => {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // APIからデータを取得（仮のAPIエンドポイント）
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/kiroku-data`);
        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F7F5]">
      {/* ヘッダー */}
      <header className="w-full bg-[#EDEAE7] shadow-md">
        <Header onHomeClick={() => router.push("/customers/top")} />
      </header>
      <h1 className="text-2xl font-bold text-center text-[#8B7A6B] mb-6 mt-10">
        おとずれたイベントリスト
      </h1>
        <div className="space-y-6">
          {records.map((record, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-[#D7CEC5]"
            >
              <div className="flex space-x-4">
                {record.images && record.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={`${apiUrl}${image}`}
                    alt={`記録画像 ${imgIndex + 1}`}
                    className="w-1/3 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
              <h2 className="text-lg font-bold text-[#8B7A6B] mt-4">{record.title}</h2>
              <p className="text-sm text-gray-600">いつ: {record.date}</p>
              <p className="text-sm text-gray-600">楽しさ: {"★".repeat(record.rating)}</p>
              <p className="text-sm text-gray-600">また行きたい: {"★".repeat(record.revisit)}</p>
              <p className="text-sm mt-2 text-gray-700">感想・レビュー: {record.review}</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  className="px-4 py-2 bg-[#C2AAC5] text-white rounded-full shadow hover:bg-[#A990A6]"
                  onClick={() => router.push(`/customers/kiroku_list/detail/${record.id}`)}
                >
                  編集する
                </button>
                <button
                  className="px-4 py-2 bg-[#DA7997] text-white rounded-full shadow hover:bg-[#C06384]"
                  onClick={() => router.push("/customers/shiori_check")}
                >
                  しおりを見る
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="fixed bottom-4 right-4 px-6 py-2 bg-[#8B7A6B] text-white rounded-full shadow-lg hover:bg-[#6F5F54]"
          onClick={() => router.push("/customers/top")}
        >
          ホームにもどる
        </button>
    </div>
  );
};

export default KirokuList;
