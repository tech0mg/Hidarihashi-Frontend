"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import LeftArrowIcon from "../../components/icon/icon_arrow_left"; // 左矢印アイコン
import RightArrowIcon from "../../components/icon/icon_arrow_right"; // 右矢印アイコン
import HeartIcon from "../../components/icon/icon_heart2"; // Likeアイコン
import NoIcon from "../../components/icon/icon_no"; // Dislikeアイコン
import FooterButton from "../../components/FooterButton";
import CompassIcon from "../../components/icon/icon_compass"; // CompassIconをインポート

const App = () => {
  const [images, setImages] = useState([]); // 画像データの状態管理
  const [currentIndex, setCurrentIndex] = useState(0); // 現在の画像インデックス
  const [popupMessage, setPopupMessage] = useState(""); // ポップアップメッセージ
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 環境変数からAPIのURLを取得
  const sasToken = process.env.NEXT_PUBLIC_SAS_TOKEN || ""; // SASトークンの環境変数
  const router = useRouter();

  const buttonStyles = {
    shiori: { default: "#98CBB0", hover: "#6FAE91" },
    star: { default: "#E1DA0F", hover: "#B8B40C" },
    kiroku: { default: "#C2AAC5", hover: "#A990A6" },
  };

  useEffect(() => {
    // APIエンドポイントから画像データとイベント名を取得
    console.log("API URL:", apiUrl);
    console.log("API URL:", sasToken);
    fetch(`${apiUrl}/api/images`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // 画像URLにSASトークンを付与して保存
        const updatedImages = data.images.map((item) => ({
          ...item,
          image_url: sasToken ? `${item.image_url}?${sasToken}` : item.image_url,
        }));
        setImages(updatedImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [apiUrl, sasToken]);

  // スワイプ処理
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipe = (direction) => {
    if (direction === "left") {
      // 次の画像に移動
      setCurrentIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    } else if (direction === "right") {
      // 前の画像に移動
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : images.length - 1
      );
    }
  };

  // ボタン操作用関数
  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 2000); // 2秒後に非表示
  };

  const IconButton = ({ onClick, children, fillDefault, fillHover }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center"
      style={{ transition: "transform 0.2s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.querySelector("svg").style.fill = fillHover;
        e.currentTarget.style.transform = "scale(1.1)";
      } }
      onMouseLeave={(e) => {
        e.currentTarget.querySelector("svg").style.fill = fillDefault;
        e.currentTarget.style.transform = "scale(1)";
      } }
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex items-center gap-2">
        {/* Compass Icon を追加 */}
        <CompassIcon
          size={32}
          fill="#9A877A"
          className="hover:fill-[#6F6F6F] transition-colors"
          alt="Compass Icon" />
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>

      {/* メインコンテンツ */}
      <main
        className="flex-grow flex flex-col justify-center items-center bg-gradient-main"
        {...handlers} // スワイプ可能エリアを設定
      >
        {images.length > 0 ? (
          <div className="w-full max-w-md flex flex-col items-center">
            {/* カード */}
            <div className="relative w-full h-96 flex items-center">
              <button
                onClick={() => handleSwipe("right")}
                className="p-2 bg-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-400 absolute left-0 ml-4 z-10"
              >
                <LeftArrowIcon />
              </button>
              <div className="relative w-full h-full bg-white rounded-lg shadow-md overflow-hidden flex-shrink-0">
                <img
                  src={images[currentIndex].image_url}
                  alt={images[currentIndex].event_name}
                  className="w-full h-full object-cover"
                />
                <p className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
                  {images[currentIndex].event_name}
                </p>
              </div>
              <button
                onClick={() => handleSwipe("left")}
                className="p-2 bg-gray-300 text-gray-700 rounded-full shadow-md hover:bg-gray-400 absolute right-0 mr-4 z-10"
              >
                <RightArrowIcon />
              </button>
            </div>

            {/* 操作ボタン */}
            <div className="mt-4 flex justify-around w-full">
              <button
                onClick={() => showPopup("Dislike")}
                className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
              >
                <NoIcon size={24} />
              </button>
              <button
                onClick={() => showPopup("Like")}
                className="p-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600"
              >
                <HeartIcon size={24} />
              </button>
            </div>
          </div>
        ) : (
          <p>Loading images...</p>
        )}
      </main>

      {/* ポップアップ */}
      {popupMessage && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-lg shadow-lg">
          {popupMessage}
        </div>
      )}

      {/* フッター */}
      <FooterButton />
    </div>
  );
}

export default App;
