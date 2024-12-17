"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FooterButton from "../../components/FooterButton";
import IconHeart from "../../components/icon/icon_heart2"; // ハートアイコンをインポート
import Header from "../../components/Header"; // ヘッダーコンポーネントをインポート

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]); // ハートが押された画像を記録
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const sasToken = process.env.NEXT_PUBLIC_SAS_TOKEN || "";
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
        const updatedImages = data.images.map((item) => ({
          ...item,
          image_url: sasToken ? `${item.image_url}?${sasToken}` : item.image_url,
        }));
        setImages(updatedImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [apiUrl, sasToken]);

  const handleClick = (image) => {
    router.push(`/customers/list/list-detail?image=${encodeURIComponent(image.image_url)}`);  // オブジェクト全体からimage.image_urlを渡すように修正
  };

  const toggleLike = (e, image) => {
    e.stopPropagation();
    if (likedImages.includes(image)) {
      setLikedImages(likedImages.filter((item) => item !== image));
    } else {
      setLikedImages([...likedImages, image]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダーを追加 */}
      <Header />
      <div className="p-4 flex-1 bg-gradient-main">
        <h1 className="text-2xl font-bold mb-4 text-center">いきたいリスト</h1>
        <div className="image-grid grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="image-card relative group overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleClick(src)}
            >
              <img
                src={src.image_url}
                alt={src.event_name}
                className="w-full object-cover aspect-[3/4] sm:aspect-[4/3] transition-transform transform hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={(e) => toggleLike(e, src)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-110 transition-transform"
                  aria-label="Like"
                >
                  {/* 状態に応じて色を変更 */}
                  <IconHeart
                    size={24}
                    fill={likedImages.includes(src) ? "red" : "gray"}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterButton onListClick={() => router.push("/customers/list")} />
    </div>
  );
};

export default ImageGrid;
