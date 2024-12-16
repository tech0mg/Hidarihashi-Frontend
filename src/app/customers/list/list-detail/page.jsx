"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FooterButton from "../../../components/FooterButton";
import Header from "../../../components/Header"; // ヘッダーコンポーネントをインポート

const ListDetailContent = () => {
  const searchParams = useSearchParams();
  const image = searchParams.get("image"); // クエリから 'image' を取得
  const eventId = searchParams.get("id"); // クエリから 'id' を取得
  const [eventDetails, setEventDetails] = useState(null); // イベント詳細情報

  // 親コンテナと画像の共通スタイル
  const containerStyle = {
    width: "100%",
    aspectRatio: "16 / 9",
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  // イベント詳細をAPIから取得
  useEffect(() => {
    if (!eventId) {
      console.error("Error: eventId が取得できません。URLクエリパラメータを確認してください。");
      return;
    }
  
    console.log("Fetching event details with ID:", eventId); // デバッグ用
    fetch(`http://127.0.0.1:5000/api/event-detail?id=${eventId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("API Response:", data); // レスポンスデータを確認
        if (data && data.event) {
          setEventDetails({
            ...data.event,
            event_name: decodeURIComponent(data.event.event_name || ""),
            event_place: decodeURIComponent(data.event.event_place || ""),
            event_detail: decodeURIComponent(data.event.event_detail || ""),
          });
        } else {
          console.error("Error: 詳細が取得できませんでした");
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [eventId]);
  

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダー */}
      <Header />

      {/* 画像詳細表示 */}
      <div className="p-4 flex-1 bg-gradient-main">
        <h1 className="text-2xl font-bold mb-4 text-center">Image Detail</h1>
        {image ? (
          <div className="flex flex-col items-center">
            {/* 画像表示 */}
            <div className="mb-4 w-full" style={{ maxWidth: "700px", margin: "0 auto" }}>
              <div style={containerStyle}>
                <img
                  src={decodeURIComponent(image)}
                  alt="Selected Image"
                  style={imageStyle}
                />
              </div>
            </div>

            {/* イベント詳細情報 */}
            {eventDetails ? (
  <div className="mt-4 text-gray-700 text-center">
    <p><strong>イベント名：</strong>{eventDetails.event_name || "不明"}</p>
    <p><strong>ばしょ：</strong>{eventDetails.event_place || "不明"}</p>
    <p><strong>日時：</strong>{eventDetails.event_date || "不明"}</p>
    <p><strong>ひよう：</strong>{eventDetails.event_cost || "不明"}</p>
    <p><strong>どんなイベント？：</strong>{eventDetails.event_detail || "不明"}</p>
  </div>
  ) : (
  <p className="text-center text-gray-500">しょうさいしゅとく中・・・</p>
  )}

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

export default ListDetailContent;
