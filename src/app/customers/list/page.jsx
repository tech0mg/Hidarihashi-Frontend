"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ImageGrid = () => {
  const [images, setImages] = useState([]); // 画像データのステート
  const [likedImages, setLikedImages] = useState([]); // ハートが押された画像を記録
  const router = useRouter();

  // Azure Blob Storage用のSASトークンとAPI URLを取得
  const sasToken = process.env.NEXT_PUBLIC_SAS_TOKEN || ""; // SASトークン（空文字列の場合も考慮）
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://tech0-gen-8-step3-app-py-2.azurewebsites.net/";

  useEffect(() => {
    // DBから画像データを取得
    fetch(`${apiUrl}/api/images`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // 画像データにSASトークンを付与してステートに保存
        const updatedImages = data.images.map((item) => ({
          ...item,
          image_url: `${item.image_url}?${sasToken}`,
        }));
        setImages(updatedImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const handleClick = (image) => {
    // 画像クリックで詳細ページに遷移
    router.push(`/customers/list/list-detail?image=${encodeURIComponent(image.image_url)}`);
  };

  const toggleLike = (e, image) => {
    // ハートの状態をトグル
    e.stopPropagation(); // 画像クリックイベントを防止
    if (likedImages.includes(image)) {
      setLikedImages(likedImages.filter((item) => item !== image));
    } else {
      setLikedImages([...likedImages, image]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">いきたいリスト</h1>
      <div className="image-grid grid grid-cols-3 gap-4">
        {images.map((item, index) => (
          <div 
            key={index} 
            className="image-card relative group overflow-hidden rounded-lg shadow-lg"
            onClick={() => handleClick(item)} // 画面遷移を実行
          >
            <img
              src={item.image_url} // SASトークン付きURL
              alt={item.event_name} // イベント名をalt属性に設定
              className="w-full h-full object-cover transition-transform transform hover:scale-105"
            />
            <div className="like-button absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
              <button
                onClick={(e) => toggleLike(e, item)}
                style={{
                  fontFamily: "Arial, sans-serif",
                  color: likedImages.includes(item) ? "red" : "gray",
                  fontSize: "1.5rem", // 必要に応じてサイズを調整
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                ♥
              </button>
            </div>
            <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-75 rounded-md p-1">
              <p className="text-center text-sm text-[#9A877A] font-medium">{item.event_name}</p> {/* イベント名 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
