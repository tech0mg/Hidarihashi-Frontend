"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]); // ハートが押された画像を記録
  const router = useRouter();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/images`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setImages(data.images))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">いきたいリスト</h1>
      <div className="image-grid grid grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="image-card relative group overflow-hidden rounded-lg shadow-lg"
            onClick={() => handleClick(src)} // 画面遷移を実行
          >
            <img
              src={`${apiUrl}${src}`}
              alt={`Image ${index + 1}`}
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
  );
};

export default ImageGrid;