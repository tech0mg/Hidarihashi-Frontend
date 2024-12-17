"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CompassIcon from "../../components/icon/icon_compass"; 

const TopTotal = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const navigateToKids = () => {
    router.push("/customers/login");
  };

  const images = {
    topTotal1: "/top_total_img/top_total1.jpg",
    topTotal2: "/top_total_img/top_total2.jpg",
    topTotal3: "/top_total_img/top_total3.jpg",
    topTotal4: "/top_total_img/top_total4.jpg",
  };
  
  const imageArray = Object.values(images); // オブジェクトを配列に変換
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 6000); // 6秒ごとに切り替え

    return () => clearInterval(interval); // コンポーネントのアンマウント時にクリーンアップ
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-main overflow-hidden scroll-smooth">
      {/* 背景のふわふわオブジェクト */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 bg-gradient-to-r from-[#63c0c3] to-[#d1eeef] rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animation: `floatUp ${20 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* ヘッダー */}
      <header className="relative z-20 w-full bg-[#ECE9E6] p-6 pr-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CompassIcon size={32} fill="#9A877A" alt="Compass Icon" />
          <h1 className="text-lg sm:text-xl font-bold text-[#9A877A]">
            Kid's Compass
          </h1>
        </div>

        {/* デスクトップナビ */}
        <nav className="hidden sm:flex gap-4 text-[#9A877A] font-semibold text-base">
          <a href="#about" className="hover:text-[#6F6F6F]">About</a>
          <a href="#request" className="hover:text-[#6F6F6F]">資料請求</a>
          <a href="/customers/toB_top" className="hover:text-[#6F6F6F]">企業向けログイン</a>
        </nav>

        {/* ハンバーガーメニュー */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#9A877A] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ハンバーガーメニューの展開部分 */}
      {menuOpen && (
        <nav className="absolute top-20 left-0 right-0 bg-white shadow-md rounded-lg z-30 sm:hidden">
          <ul className="flex flex-col items-center gap-4 p-6 text-[#9A877A] font-semibold text-lg">
            <li>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#request" onClick={() => setMenuOpen(false)}>
                資料請求
              </a>
            </li>
            <li>
              <a href="/customers/toB_top" onClick={() => setMenuOpen(false)}>
                企業向けログイン
              </a>
            </li>
          </ul>
        </nav>
      )}

      {/* メインコンテンツ */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center pt-8">
        {/* スライドショー */}
          <section className="relative w-full max-w-[95%] h-[400px] sm:h-[600px] rounded-lg shadow-lg">
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              {Object.values(images).map((src, index) => (
                <img
                  key={index}
                  src={src} // 修正済みのパス
                  alt={`スライド ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] ease-in-out ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>


          {/* 丸いボタン */}
          <button
            onClick={navigateToKids}
            className="absolute bottom-[-20px] right-[-20px] z-30 text-white bg-gradient-to-br from-[#63c0c3] to-[#d1eeef] rounded-full shadow-lg w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-sm sm:text-base drop-shadow-lg"
          >
            アプリ<br />ログイン
          </button>
        </section>

        {/* 空白部分 */}
        <div className="mt-32"></div>

        {/* アプリ紹介セクション */}
        <section 
          id="about"
          className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 sm:px-8 py-8 rounded-lg"
        >
          {/* 左: テキスト */}
          <div className="flex flex-col justify-center">
            <h1 className="text-6xl sm:text-7xl font-extrabold text-[#63C0C3] mb-6 tracking-wider opacity-20">
              ABOUT
            </h1>
            <p className="text-[#89CFD2] text-sm sm:text-base leading-relaxed mb-4">
              行きたい！を自分で選んで提案する
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#6F6F6F]  mb-4">
              子どもが決める休日計画アプリ
            </h3>
            <p className="text-[#6F6F6F] leading-relaxed">
              「休日は親が計画するもの」を変えたい。<br />
              「Kid's Compass」は、子どもが行きたい場所や体験を計画し、<br />
              家族と楽しむ新しい休日を提案します。計画する楽しさと達成感を<br />
              通じて、子どもの主体性を育み、家族みんなの思い出を彩ります。
            </p>
          </div>

          {/* 右: 画像またはiframe */}
          <div className="iframe-container flex items-center justify-center">
            <iframe
              className="responsive-iframe"
              src="https://embed.figma.com/proto/AG7Agjugx2zEVW2ylbxa19/Tech0_Hidari-Hashi-App-Design?page-id=0%3A1&node-id=476-652&node-type=canvas&viewport=6756%2C-2680%2C0.93&scaling=scale-down&content-scaling=fixed&starting-point-node-id=476%3A652&show-proto-sidebar=1&embed-host=share"
              allowFullScreen
              title="Figma Embed"
            ></iframe>
          </div>
        </section>
      </main>
      {/* フッター */}
      <footer className="relative z-10 w-full bg-[#ECE9E6] p-6 text-center">
        <p className="text-[#6F6F6F] text-sm sm:text-base mb-2">
          発表用PDFはこちらからダウンロードできます。
        </p>
        <a
          href={(`${apiUrl}/pdf/slide`)} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#63c0c3] font-semibold hover:underline"
        >
          PDFを開く
        </a>
      </footer>
    </div>
  );
};

export default TopTotal;
