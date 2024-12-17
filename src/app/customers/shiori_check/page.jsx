"use client";

import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header"; // ヘッダーをインポート
import ShioriCard from "../../components/ShioriCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ShioriCheck = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // 予定日管理
    const shioriRef = useRef(); // PDF生成用の参照
    const [html2pdf, setHtml2pdf] = useState(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  // html2pdf.js のインポート
  useEffect(() => {
    if (typeof window !== "undefined") { // クライアントサイドチェック
        import("html2pdf.js")
            .then((module) => {
                setHtml2pdf(() => module.default);
            })
            .catch((error) => console.error("Failed to load html2pdf.js:", error));
        }
    }, []);

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
        <div className="flex flex-col items-center justify-center bg-gradient-main min-h-screen">
            {/* ヘッダー */}
            <div className="w-full">
                <Header />
            </div>

            <h1 className="text-2xl font-bold text-[#9A877A] mb-4 text-center">きろくしたしおり</h1>

            <div className="space-y-8 w-full max-w-screen-md px-4" ref={shioriRef}>
                {/* Page1: タイトル */}
                <ShioriCard>
                    <h1 className="text-3xl font-bold text-center mb-4">ガエターノのおやこピッツァきょうしつ</h1>
                    <img 
                        src="/shiori_check_img/いちご.png"
                        alt="いちご" 
                        className="w-100 h-80 mx-auto object-contain rounded-md"
                    />
                    <p className="text-xl text-center mt-4">Produced by りな</p>
                </ShioriCard>
                {/* Page2: スケジュール */}
                <ShioriCard>
                    <h2 className="text-2xl font-bold mb-4">スケジュール</h2>
                    <p className="mb-2">2024年12月24日 9:00 - 14:00</p>
                    <p>9:00 家をしゅっぱつ</p>
                    <p>9:45 さいぶガスショールームヒナタふくおか 到着</p>
                    <p>10:00 ピッツァきょうしつ</p>
                    <p>12:00 さいぶガスショールームヒナタふくおか 出発</p>
                    <p>12:10 おひるごはん</p>
                    <p>13:40 家にとうちゃく</p>
                    <img 
                        src="/shiori_check_img/pizza.jpg"
                        alt="pizza" 
                        className="w-full h-60 mx-auto object-cover rounded-md mt-4"
                    />
                </ShioriCard>
                {/* Page3: 天気と経路情報 */}
                <ShioriCard>
                    <h2 className="text-2xl font-bold mb-4 text-center">天気と経路情報</h2>
                    <p>天気: 晴れ時々曇り</p>
                    <img 
                        src="/shiori_check_img/map_img.png"
                        alt="map_img" 
                        className="w-full h-60 mx-auto object-cover rounded-md mt-4"
                    />
                </ShioriCard>
                {/* Page4: メモ */}
                <ShioriCard>
                    <h2 className="text-2xl font-bold mb-4 text-center">持ち物リスト</h2>
                    <p className="mb-2">にんきピザや「ガエターノ」さんにおそわるピッツァきょうしつ。すきなぐざいをのせておいしいピザをやきましょう！</p>
                    <p>持ち物</p>
                    <p>・エプロン</p>
                    <p>・タオル</p>
                    <p>・ピザにのせたい食べもの</p>
                    <p>・ピザ窯のように熱い心</p>
                    <h2 className="text-2xl font-bold mb-4 text-center">メモ書き</h2>
                    <p>ピザは、おいしくできるかな</p>
                    <p>おいしくできたら、あつあつモチモチピザをお腹いっぱい食べたいな</p>
                </ShioriCard>
            </div>

            {/* 予定日入力 */}
            <div className="my-6 text-center">
                <h2 className="text-lg font-bold mb-2">予定日時を入力する</h2>
                <div className="flex items-center justify-center space-x-4 rounded-md">
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
            <div className="my-6 text-center">
                <button
                    onClick={handleSavePDF}
                    className="px-6 py-2 bg-[#DA7997] text-white rounded-full shadow-lg hover:bg-pink-600"
                >
                    PDFに保存する
                </button>
                
                {/* 戻るボタン */}
                <button
                    className="mt-4 px-6 py-2 bg-[#9A877A] text-white rounded-md"
                    onClick={() => window.history.back()}
                >
                    戻る
                </button>
            </div>
        </div>
    );
};

export default ShioriCheck;
