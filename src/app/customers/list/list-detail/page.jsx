"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FooterButton from "../../../components/FooterButton";
import Header from "../../../components/Header"; // ヘッダーコンポーネントをインポート

// コンテンツ部分のコンポーネント
const ListDetailContent = () => {
  const searchParams = useSearchParams();
  const image = searchParams.get("image"); // クエリから 'image' を取得

  // 親コンテナと画像の共通スタイル
  const containerStyle = {
    width: "100%",          // 幅を100%に設定
    aspectRatio: "16 / 9",  // アスペクト比固定（16:9）
    maxWidth: "500px",      // 最大幅を指定
    margin: "0 auto",       // 水平中央揃え
    borderRadius: "12px",   // 角を丸くする
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // 影を追加（オプション）
  };

  const imageStyle = {
    width: "100%",          // 幅を100%に設定
    height: "100%",         // 高さを親コンテナに合わせる
    objectFit: "contain",   // 画像を枠内に収める（切り取りなし）
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダー */}
      <Header />

      {/* 画像詳細表示 */}
      <div className="p-4 flex-1 bg-gradient-main">
        <h1 className="text-2xl font-bold mb-4 text-center">Image Detail</h1>
        {image ? (
          <div className="flex flex-col items-center">
            {/* 親コンテナ */}
            <div className="mb-4 w-full" style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div style={containerStyle}>
                <img
                  src={image} // 取得したimageを表示
                  alt="Selected Image"
                  style={imageStyle}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">画像が選択されていません。</p>
        )}
      </div>

      {/* フッターボタン */}
      <FooterButton />
    </div>
  );
};

// メインコンポーネント
export default function ListDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListDetailContent />
    </Suspense>
  );
}
