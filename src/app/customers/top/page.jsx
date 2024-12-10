"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StarIcon from "../../components/icon/icon_star"; // StarIconをインポート
import ShioriIcon from "../../components/icon/icon_shiori"; // ShioriIconをインポート
import KirokuIcon from "../../components/icon/icon_kiroku"; // KirokuIconをインポート

const App = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);

  // 修正箇所 1: Azure Blob Storage用のSASトークンをenvの環境変数から取得
  const sasToken = process.env.NEXT_PUBLIC_SAS_TOKEN || ""; // 環境変数が未設定の場合は空文字列を使用
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://tech0-gen-8-step3-app-py-2.azurewebsites.net/";

  useEffect(() => {
    // 修正箇所 2: APIエンドポイントから画像データとイベント名を取得
    fetch(`${apiUrl}/api/images`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // 画像URLにSASトークンを追加してステートに保存
        const updatedImages = data.images.map((item) => ({
          ...item,
          image_url: `${item.image_url}?${sasToken}` // SASトークンを付与
        }));
        setImages(updatedImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const handleClick = (image) => {
    // 画像クリックで詳細ページに遷移
    router.push(`/customers/list/list-detail?image=${encodeURIComponent(image.image_url)}`);
  };

  const handleFooterClick = (destination) => {
    // フッターのリンクを処理
    router.push(destination);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
        {/* 元のリスト遷移ボタンはコメントアウト */}
        {/* <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={goToList}
        >
          Go to List
        </button> */}
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow p-4 bg-gradient-main">
        {/* 修正箇所 4: デスクトップ表示用の画像とイベント名 */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center">
          {images.map((item, index) => (
            <div key={index} className="w-1/4 p-2">
              <img
                src={item.image_url} // 画像URLにSASトークン付き
                alt={item.event_name} // イベント名をaltに設定
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <p className="text-center mt-2 text-[#9A877A] font-medium">{item.event_name}</p> {/* イベント名を表示 */}
            </div>
          ))}
        </div>

        {/* 修正箇所 5: スマートフォン表示用 */}
        <div className="block md:hidden">
          {images.map((item, index) => (
            <div key={index} className="mb-4">
              <img
                src={item.image_url} // 画像URLにSASトークン付き
                alt={item.event_name} // イベント名をaltに設定
                className="w-full h-40 object-cover rounded-md" // 画像URLにSASトークン付き
              />
              <p className="text-center mt-2 text-[#9A877A] font-medium">{item.event_name}</p> {/* イベント名を表示 */}
              <div className="flex justify-around mt-2">
                <button className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600">
                  Dislike
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600">
                  Like
                </button>
                <StarIcon size={30} fill="gold" className="mx-2" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-[#EDEAE7] shadow-inner p-4 flex justify-center items-center space-x-8">
  <button
    className="flex flex-col items-center justify-center"
    onClick={() => handleFooterClick("/customers/shiori/page1")} // しおりをつくる -> /customers/shiori/page1 に遷移
  >
    <ShioriIcon size={24} className="mx-2" />
    <span className="text-sm">しおりをつくる</span>
  </button>

  <button
    className="flex flex-col items-center justify-center"
    onClick={() => handleFooterClick("/customers/list")} // リストをみる -> /customers/list に遷移
  >
    <StarIcon size={24} className="mx-2" />
    <span className="text-sm">リストをみる</span>
  </button>

  <button className="flex flex-col items-center justify-center">
    <KirokuIcon size={24} className="mx-2" />
    <span className="text-sm">きろくをみる</span>
    </button>
  </footer>
    </div>
  );
};

export default App;
