import { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const API_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
const KAKAO_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services&autoload=false`;

const SSU_LOCATION = {
  lat: 37.4963538,
  lng: 126.9572222,
};

const loadKakaoMap = () =>
  new Promise((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao);
    const script = document.createElement("script");
    script.src = KAKAO_URL;
    script.async = true;
    script.onload = () => resolve(window.kakao);
    script.onerror = () => reject(new Error("Failed to load Kakao Maps API"));
    document.head.appendChild(script);
  });

export const MapCanvas = () => {
  useEffect(() => {
    (async () => {
      const kakao = (await loadKakaoMap()) as typeof window.kakao;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const map = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(SSU_LOCATION.lat, SSU_LOCATION.lng),
          level: 4,
          draggable: false,
          scrollwheel: false,
        });

        const pos = new kakao.maps.LatLng(37.4968, 126.9576);
        const content = `
          <div style="
            transform-origin: center;
            background:#fff; border-radius:9999px; padding:6px 8px;
            box-shadow:0 4px 10px rgba(0,0,0,.15); font-size:20px;">
            🥳
          </div>`;
        new kakao.maps.CustomOverlay({
          position: pos,
          content,
          yAnchor: 1,
          map,
        });
      });
    })();
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        id="map"
        className="w-full h-full transform-gpu
                   [filter:grayscale(50%)_saturate(70%)_brightness(108%)]"
        style={{
          transformOrigin: "center center",
          scale: 1,
        }}
      />
    </div>
  );
};
