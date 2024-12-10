import React from "react";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";

// Polylineをデコードする関数
const decodePolyline = (encoded) => {
  const points = [];
  let index = 0, len = encoded.length;
  let lat = 0, lng = 0;

  while (index < len) {
    let b, shift = 0, result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points;
};

const MapComponent = ({ encodedPath }) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const decodedPath = decodePolyline(encodedPath); // デコード処理
  // 経路の最初の地点を地図の中心に設定
  const center = decodedPath.length > 0 ? decodedPath[0] : { lat: 35.6895, lng: 139.6917 }; // デフォルトは東京


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
          path={decodedPath}
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
