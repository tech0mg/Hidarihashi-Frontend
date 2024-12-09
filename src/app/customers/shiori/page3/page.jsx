"use client";
import React, { useState } from "react";
import { useNavigation } from "../components/useNavigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン
import RightArrowIcon from "../../../components/icon/icon_arrow_right"; // 右矢印アイコン
import WeatherInfo from "../components/WeatherInfo";
import RouteInfo from "../components/RouteInfo";

const ShioriPage3 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [startAddress, setStartAddress] = useState(""); // 出発地
  const [destinationAddress, setDestinationAddress] = useState(""); // 目的地
  const [weatherData, setWeatherData] = useState(null); // 天気データの状態管理
  const [routeData, setRouteData] = useState(null); // 経路データの状態管理
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);// ローディング状態
  const [isLoadingRoute, setIsLoadingRoute] = useState(false); // ローディング状態
  const [routeError, setRouteError] = useState(null);// エラー状態の管理

  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // APIのベースURL

  const fetchWeather = async (address) => {
    setIsLoadingWeather(true);
    try {
      const response = await fetch(`${apiUrl}/api/postal-code?address=${encodeURIComponent(address)}`);
      if (!response.ok) 
        throw new Error(`Failed to fetch postal code: ${response.statusText}`);
      const { postalCode } = await response.json();

      const weatherResponse = await fetch(
        `${apiUrl}/api/weather?postalCode=${postalCode}&countryCode=JP`
      );
      if (!weatherResponse.ok) throw new Error(`Failed to fetch weather: ${weatherResponse.statusText}`);
      const weather = await weatherResponse.json();
      setWeatherData(weather);
    } catch (error) {
      console.error("Error fetching weather:", error.message);
      alert(`天気データの取得に失敗しました: ${error.message}`);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const transformPath = (snapToRoadsData) => {
    return snapToRoadsData.snappedPoints.map((point) => ({
      lat: point.location.latitude,
      lng: point.location.longitude,
    }));
  };

  const fetchRoute = async (start, destination) => {
    setIsLoadingRoute(true);
    setRouteError(null); // エラー状態をリセット

    try {
      const encodedStart = encodeURIComponent(start.trim());
      const encodedDestination = encodeURIComponent(destination.trim());
      const requestUrl = `${apiUrl}/api/route?start=${encodedStart}&destination=${encodedDestination}`;
      
      console.log("Fetching route with URL:", requestUrl); // デバッグ用ログ

      const response = await fetch(requestUrl);
      if (!response.ok) throw new Error(`Failed to fetch route: ${response.status}`);
      const route = await response.json();

      // Google Mapsのリンク
      if (route.snapToRoads) {
      const path = transformPath(route.snapToRoads);
      setRouteData(path);
    } else {
      setRouteError(new Error("Route data not found in response"));
    }
  } catch (error) {
    console.error("Error fetching route:", error);
    setRouteError(error);
  } finally {
    setIsLoadingRoute(false);
  }
};


  return (
    <div id="page3" className={`flex flex-col items-center justify-between min-h-screen ${shioriColor}`}>
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>      
      {/* 上部コンテンツ（ラッパー + 矢印アイコンの配置） */}
      <div className="relative flex justify-center items-center w-full h-[calc(100vh-100px)]">
        {/* コンテンツ全体のラッパー */}
        <div
          className="relative bg-white shadow-lg border-8 border-[#da7997] rounded-md"
          style={{
            aspectRatio: "210 / 297", // A4の比率
            height: "70%", // 高さを親要素に合わせる
            maxWidth: "calc(100vh * 210 / 297)", // 幅を高さに合わせてA4比率を維持
          }}
        >
          <div className="p-6 w-full h-full flex flex-col justify-between">
            {/* 出発地入力 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">出発地を入力</h2>
            <input
              type="text"
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
              placeholder="例: 東京都台東区秋葉原"
              className="border-2 border-gray-300 p-2 w-full rounded-md mb-4"
            />
          </div>

          {/* 目的地入力 */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4 text-center">目的地を入力</h2>
            <input
              type="text"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
              placeholder="例: 福岡県福岡市博多区中州"
              className="border-2 border-gray-300 p-2 w-full rounded-md mb-4"
            />
            <button
              onClick={() => {
                fetchWeather(destinationAddress);
                fetchRoute(startAddress, destinationAddress);
              }}
              className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              disabled={isLoadingWeather || isLoadingRoute}
            >
              {isLoadingWeather || isLoadingRoute ? "取得中..." : "天気と経路を取得"}
            </button>
          </div>

          {/* 天気情報表示 */}
          <WeatherInfo isLoading={isLoadingWeather} data={weatherData} />

          {/* 経路情報表示 */}
          <RouteInfo isLoading={isLoadingRoute} data={routeData} />

          {/* エラーメッセージの表示 */}
          {routeError && (
            <p className="text-sm text-red-500 mt-4">エラーが発生しました: {routeError.message || "詳細不明なエラー"}</p>
          )}
        </div>
      </div>


          {/* 戻るボタン（左矢印） */}
          <div className="absolute top-1/2 -left-10 transform -translate-y-1/2">
            <button onClick={() => navigateTo("prev")}>
              <LeftArrowIcon size={24} />
            </button>
          </div>

          {/* 次へボタン（右矢印） */}
          <div className="absolute top-1/2 -right-10 transform -translate-y-1/2">
            <button onClick={() => navigateTo("next")}>
              <RightArrowIcon size={24} />
            </button>
          </div>
        </div>

        {/* 下部ボタンセクション */}
        <div>
          <ShioriFooterButtons handleNavigation={navigateTo} />
      </div>
    </div>
  );
};

export default ShioriPage3;