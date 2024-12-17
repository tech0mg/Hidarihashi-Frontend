"use client";

import React, { useEffect, useState } from "react";
import Header from "../../../components/Header"; // ヘッダーコンポーネント
import { useNavigation } from "../components/useNavigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン
import RightArrowIcon from "../../../components/icon/icon_arrow_right"; // 右矢印アイコン
import WeatherInfo from "../components/WeatherInfo";
import ColorModal from "../components/ColorModal";
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const ShioriPage3 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [startAddress, setStartAddress] = useState(""); // 出発地
  const [destinationAddress, setDestinationAddress] = useState(""); // 目的地
  const [weatherData, setWeatherData] = useState(null); // 天気データの状態管理
  const [directions, setDirections] = useState(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false); // ローディング状態
  const [isLoadingRoute, setIsLoadingRoute] = useState(false); // ローディング状態
  const [routeError, setRouteError] = useState(null); // エラー状態の管理
  const [drivingDuration, setDrivingDuration] = useState(null);// 車での所要時間
  const [walkingDuration, setWalkingDuration] = useState(null);// 徒歩での所要時間

  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // APIのベースURL
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  // 動的にメインコンテンツの高さを計算
  useEffect(() => {
    const updateContentHeight = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;
      const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
      const availableHeight = window.innerHeight - headerHeight - footerHeight;

      const mapMinHeight = 300; // 地図部分の最低高さを追記
      const timeSectionMinHeight = 100; // 所要時間表示の最低高さ
      const verticalPadding = 40; // 上下余白を設定
      setContentHeight(availableHeight - verticalPadding * 2+ timeSectionMinHeight+ mapMinHeight);// 地図の最低限の高さを追加
    };

    updateContentHeight();
    window.addEventListener("resize", updateContentHeight);
    return () => {
      window.removeEventListener("resize", updateContentHeight);
    };
  }, []);

  // 天気データの取得
  const fetchWeather = async (address) => {
    setIsLoadingWeather(true);
    try {
      const response = await fetch(`${apiUrl}/api/postal-code?address=${encodeURIComponent(address)}`);
      if (!response.ok) throw new Error(`Failed to fetch postal code: ${response.statusText}`);
      const { postalCode } = await response.json();

      const weatherResponse = await fetch(`${apiUrl}/api/weather?postalCode=${postalCode}&countryCode=JP`);
      if (!weatherResponse.ok) throw new Error(`Failed to fetch weather: ${weatherResponse.statusText}`);
      const weather = await weatherResponse.json();
      setWeatherData(weather);
    } catch (error) {
      console.error("Error fetching weather:", error.message);
      setWeatherData(null); // エラー時にデータをリセット
      alert(`天気データの取得に失敗しました: ${error.message}`);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // 経路データの取得
  const fetchRoute = () => {
    if (!window.google) {
      console.error("Google Maps API is not loaded."); 
      alert("Google Maps APIが読み込まれていません。再読み込みしてください。");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    setIsLoadingRoute(true);
    setRouteError(null);

    directionsService.route(
      {
        origin: startAddress,
        destination: destinationAddress,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result); // 経路を設定
          setDrivingDuration(result.routes[0].legs[0].duration.text);
        } else {
          setRouteError(new Error("経路の取得に失敗しました"));
        }
        setIsLoadingRoute(false);
      }
    );
  
    // 徒歩の時間も取得
    directionsService.route(
      {
        origin: startAddress,
        destination: destinationAddress,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setWalkingDuration(result.routes[0].legs[0].duration.text);
        }
      }
    );
  };


  const toggleColorModal = () => {
    setIsColorModalOpen(!isColorModalOpen);
  };

  return (
    <div id="page3" className="flex flex-col min-h-screen bg-gray-100">
      <Header onHomeClick={() => navigateTo("top")} />

      <main
        className="flex-grow bg-gradient-main flex justify-center items-center"
        style={{
          height: `${contentHeight}px`,
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <div
          className="relative bg-white shadow-lg border-8 rounded-md"
          style={{
            borderColor: shioriColor,
            aspectRatio: "210 / 297",
            height: "100%",
            maxWidth: "calc(90%)",
            maxHeight: "95%",
          }}
        >
          <div className="p-6 w-full h-full flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-600">出発地を入力</h2>
              <input
                type="text"
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                placeholder="例: 東京都台東区秋葉原"
                className="border-2 border-gray-300 p-2 w-full rounded-md mb-4"
              />
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-600">目的地を入力</h2>
              <input
                type="text"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder="例: 福岡県福岡市博多区中洲"
                className="border-2 border-gray-300 p-2 w-full rounded-md mb-4"
              />
              <button
                onClick={() => {
                  fetchWeather(destinationAddress);
                  fetchRoute();
                }}
                className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                disabled={isLoadingWeather || isLoadingRoute}
              >
                {isLoadingWeather || isLoadingRoute ? "取得中..." : "天気と経路を取得"}
              </button>
            </div>

            <WeatherInfo isLoading={isLoadingWeather} data={weatherData} />
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={directions ? undefined : { lat: 35.6895, lng: 139.6917 }} // directionsがない場合は初期位置を指定
                zoom={directions ? 12 : 7} // directionsがない場合のズームレベルを指定
              >
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </LoadScript>

            {routeError && (
              <p className="text-sm text-red-500 mt-4">
                エラーが発生しました: {routeError.message || "詳細不明なエラー"}
              </p>
            )}

            {/* 所要時間の表示 */}
            <div className="mt-4 text-center">
              {isLoadingRoute ? (
                <p>所要時間を計算中...</p>
              ) : (
                <>
                  {drivingDuration && (
                    <p className="text-sm text-gray-600">
                      🚗 車でかかる時間: <strong>{drivingDuration}</strong>
                    </p>
                  )}
                  {walkingDuration && (
                    <p className="text-sm text-gray-600">
                      🚶 歩いてかかる時間: <strong>{walkingDuration}</strong>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* 戻るボタン */}
          <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
            <button
              onClick={() => navigateTo("prev")}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <LeftArrowIcon size={24} />
            </button>
          </div>

          {/* 次へボタン */}
          <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
            <button
              onClick={() => navigateTo("next")}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <RightArrowIcon size={24} />
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-[#EDEAE7] shadow-inner">
        <ShioriFooterButtons
          handleNavigation={navigateTo}
          toggleColorModal={toggleColorModal}
        />
      </footer>

      {isColorModalOpen && <ColorModal onClose={toggleColorModal} />}
    </div>
  );
};

export default ShioriPage3;