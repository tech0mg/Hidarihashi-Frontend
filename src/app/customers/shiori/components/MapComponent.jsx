import React from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

const MapComponent = ({ path }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  // 経路の最初の地点を地図の中心に設定
  const center = path.length > 0 ? path[0] : { lat: 35.6895, lng: 139.6917 }; // デフォルトは東京

  // デバッグ用のログ
  console.log("Map center:", center);
  console.log("Path data:", path);

  return (
    <LoadScript 
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      onLoad={() => console.log("Google Maps API loaded successfully.")}
      onError={(e) => console.error("Google Maps API failed to load:", e)}
    >
      <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        center={center} 
        zoom={10}
        onLoad={(map) => console.log("Map loaded:", map)}
        onError={(e) => console.error("Error in GoogleMap component:", e)}
      >
        <Polyline
          path={path}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }}
          onLoad={(polyline) => console.log("Polyline loaded:", polyline)}
          onError={(e) => console.error("Error in Polyline component:", e)}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
