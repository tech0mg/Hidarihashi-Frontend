import React from "react";
import MapComponent from "./MapComponent";

const RouteInfo = ({ isLoading, data, error }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-4 text-center text-gray-600">ちず・行き方</h2>
    <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
      {isLoading ? (
        <p className="text-sm text-gray-600">ちずと行き方をしらべています...</p>
      ) : error ? (
        <p className="text-sm text-red-500">エラーが発生しました: {error.message || "詳細不明なエラー"}</p>
      ) :  data && data.polyline ? (
        <MapComponent encodedPath={data.polyline} />
      ) : (
        <p className="text-sm text-gray-600">ちずと行き方をしらべられませんでした。</p>
      )}
    </div>
  </div>
);

export default RouteInfo;
