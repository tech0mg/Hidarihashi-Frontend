"use client";
import React, { useEffect, useState, useRef } from "react";
import ShioriCard from "../../components/ShioriCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ShioriCheck = () => {
    const [page1, setPage1] = useState({});
    const [page2, setPage2] = useState({});
    const [page3, setPage3] = useState({});
    const [page4, setPage4] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date()); // 予定日管理
    const shioriRef = useRef(); // PDF生成用の参照
    const [html2pdf, setHtml2pdf] = useState(null);

  useEffect(() => {
    // ローカルストレージから page1～page4 のデータを取得
    setPage1(JSON.parse(localStorage.getItem("page1")) || {});
    setPage2(JSON.parse(localStorage.getItem("page2")) || {});
    setPage3(JSON.parse(localStorage.getItem("page3")) || {});
    setPage4(JSON.parse(localStorage.getItem("page4")) || {});

    // html2pdf.js をクライアントサイドでのみ動的にインポート
    import("html2pdf.js")
      .then((module) => {
        setHtml2pdf(() => module.default);
      })
      .catch((error) => console.error("Failed to load html2pdf.js:", error));
  }, []);

  // html2pdf.jsを使ってPDFを保存する
  const handleSavePDF = () => {
    if (!html2pdf) return;

    const element = shioriRef.current;
    const options = {
      margin: 1,
      filename: "Shiori.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="flex flex-col items-center bg-[#FFF8E1] min-h-screen py-4">
      <h1 className="text-2xl font-bold text-[#9A877A] mb-4">しおりチェック</h1>
      
      <div className="space-y-8">
        {/* Page1 */}
        <ShioriCard>
          <h1 className="text-3xl font-bold text-center">{page1.title || "しおりタイトル"}</h1>
          <p className="text-xl text-center">Produced by {page1.producer || "未設定"}</p>
        </ShioriCard>
        {/* Page2 */}
        <ShioriCard>
          <h2 className="text-2xl font-bold mb-2">スケジュール</h2>
          <p>{page2.schedule || "スケジュール未設定"}</p>
        </ShioriCard>
        {/* Page3 */}
        <ShioriCard>
          <h2 className="text-2xl font-bold mb-2">天気と経路情報</h2>
          <p>{page3.weather || "天気未設定"}</p>
          {page3.mapUrl && <img src={page3.mapUrl} alt="Map" className="w-full h-48 object-cover" />}
        </ShioriCard>
        {/* Page4 */}
        <ShioriCard>
          <h2 className="text-2xl font-bold mb-2">メモ</h2>
          <p>{page4.memo || "メモ未設定"}</p>
        </ShioriCard>
      </div>

      {/* 予定日入力 */}
      <div className="my-6 text-center">
        <h2 className="text-lg font-bold mb-2">予定日時を入力する</h2>
        <div className="flex items-center justify-center space-x-4">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            className="border p-2 rounded"
          />
          <input
            type="text"
            value={selectedDate.getHours()}
            className="border p-2 w-12 text-center rounded"
            readOnly
          />
          <span>時</span>
          <input
            type="text"
            value={selectedDate.getMinutes()}
            className="border p-2 w-12 text-center rounded"
            readOnly
          />
          <span>分</span>
        </div>
      </div>

      {/* PDF保存ボタン */}
      <button
        onClick={handleSavePDF}
        className="px-6 py-2 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600"
      >
        PDFに保存する
      </button>
      
      {/* 戻るボタン */}
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => window.history.back()}
      >
        戻る
      </button>
    </div>
  );
};

export default ShioriCheck;

