"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FooterButton from "../../components/FooterButton";
import Header from "../../components/Header"; // ヘッダーコンポーネントをインポート

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]); // ハートが押された画像を記録
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // 環境変数からAPIのURLを取得
  const sasToken = process.env.NEXT_PUBLIC_SAS_TOKEN || ""; // SASトークンの環境変数
  const [currentIndex, setCurrentIndex] = useState(0); // 現在の画像インデックス
  const router = useRouter();

  useEffect(() => {
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

  const handleClick = (image) => {
    // 画像クリックで遷移
    router.push(`/customers/list/list-detail?image=${encodeURIComponent(image)}`);
  };

  const toggleLike = (e, image) => {
    // ハートの状態をトグル
    e.stopPropagation(); // 画像のクリックイベントを防止
    if (likedImages.includes(image)) {
      setLikedImages(likedImages.filter((item) => item !== image));
    } else {
      setLikedImages([...likedImages, image]);
    }
  };

  const goToList = () => {
    router.push("/customers/list");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダーを追加 */}
      <Header />

      {/* メインコンテンツ */}
      <div className="p-4 flex-1 bg-gradient-main">
        <h1 className="text-2xl font-bold mb-4 text-center">いきたいリスト</h1>
        <div className="image-grid grid grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="image-card relative group overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleClick(src)} // 画面遷移を実行
            >
              <img
                src={src.image_url} // 各画像の URL を使用
                alt={src.event_name} // 各画像のイベント名
                className="w-full h-full object-cover transition-transform transform hover:scale-105"
              />
              <div className="like-button absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                <button
                  onClick={(e) => toggleLike(e, src)}
                  style={{
                    fontFamily: "Arial, sans-serif",
                    color: likedImages.includes(src) ? "red" : "gray",
                    fontSize: "1.5rem", // 必要に応じてサイズを調整
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* フッター */}
      <FooterButton onListClick={goToList} />
    </div>
  );
};

export default ImageGrid;
