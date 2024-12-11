"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StarIcon from "../../components/icon/icon_star";
import FooterButton from "../../components/FooterButton";

const App = () => {
  const [images, setImages] = useState([]); // 画像データの状態管理
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 環境変数からAPIのURLを取得
  const sasToken = process.env.NEXT_PUBLIC_SAS_TOKEN || ""; // SASトークンの環境変数

  const buttonStyles = {
    shiori: { default: "#98CBB0", hover: "#6FAE91" },
    star: { default: "#E1DA0F", hover: "#B8B40C" },
    kiroku: { default: "#C2AAC5", hover: "#A990A6" },
  };

  useEffect(() => {
    // APIエンドポイントから画像データとイベント名を取得
    fetch(`${apiUrl}/api/images`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data from API:", data); // デバッグ: APIレスポンスの確認

        // 画像URLにSASトークンを付与して保存
        const updatedImages = data.images.map((item) => ({
          ...item,
          image_url: sasToken ? `${item.image_url}?${sasToken}` : item.image_url,
        }));

        console.log("Updated images with SAS token:", updatedImages); // デバッグ: 更新後の画像データ確認
        setImages(updatedImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const goToToBTop = () => {
    router.push("/customers/toB_top"); // toB_topページへの遷移
  };

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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
        <button
          className="px-4 py-2 bg-[#9A877A] text-white rounded-md hover:bg-[#7E6C63] transition-colors duration-200"
          onClick={goToToBTop}
        >
          企業登録ページリンク
        </button>

      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow p-4 bg-gradient-main">
        {/* デスクトップ表示 */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center">
          {images.map((image, index) => (
            <div key={index} className="w-1/4 p-2">
              <img
                src={image.image_url} // 画像URL
                alt={image.event_name} // イベント名をaltに設定
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <p className="text-center mt-2">{image.event_name}</p> {/* イベント名 */}
            </div>
          ))}
        </div>

        {/* モバイル表示 */}
        <div className="block md:hidden">
          {images.map((image, index) => (
            <div key={index} className="mb-4">
              <img
                src={image.image_url}
                alt={`Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
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
      <FooterButton />
    </div>
  );
};

export default App;
