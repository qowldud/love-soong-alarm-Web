import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useSelectedUserStore } from "../../store/useSelectedUserStore";

declare global {
  interface Window {
    kakao: any;
  }
}

const API_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
const KAKAO_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services&autoload=false`;

const SSU_LOCATION = { lat: 37.4963538, lng: 126.9572222 };

const loadKakaoMap = () =>
  new Promise<typeof window.kakao>((resolve, reject) => {
    if (window.kakao?.maps) return resolve(window.kakao);
    const s = document.createElement("script");
    s.src = KAKAO_URL;
    s.async = true;
    s.onload = () => resolve(window.kakao);
    s.onerror = () => reject(new Error("Failed to load Kakao Maps API"));
    document.head.appendChild(s);
  });

export function TutorialMap() {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const userMarkerRef = useRef<any[]>([]);
  const watchIdRef = useRef<number | null>(null);
  const [isPWA, setIsPWA] = useState(false);
  const isModalOpen = useAuthStore((state) => state.isModalOpen);
  const isOpen = isModalOpen;

  useEffect(() => {
    const checkPWA = () => {
      return (
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes("android-app://")
      );
    };

    setIsPWA(checkPWA());
  }, []);

  useEffect(() => {
    (async () => {
      const kakao = await loadKakaoMap();
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const map = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(SSU_LOCATION.lat, SSU_LOCATION.lng),
          level: 3,
          draggable: true,
          scrollwheel: true,
        });
        mapRef.current = map;

        kakao.maps.event.addListener(map, "click", () => {
          const { setSelectedUserId } = useSelectedUserStore.getState();
          setSelectedUserId(null);
        });
      });
    })();

    return () => {
      if (watchIdRef.current !== null) {
        try {
          navigator.geolocation.clearWatch(watchIdRef.current);
        } catch (err) {}
      }
      if (markerRef.current) markerRef.current.setMap(null);
      if (mapRef.current) mapRef.current = null;
      if (userMarkerRef.current) {
        userMarkerRef.current.forEach((m) => m.setMap(null));
        userMarkerRef.current = [];
      }
    };
  }, []);

  return (
    <div className="h-full overflow-hidden nagative-bottom">
      <div
        id="map"
        className="w-full h-full transform-gpu"
        style={{
          transformOrigin: "center center",
          height: isPWA && !isOpen ? "calc(100% + 34px)" : "100%",
        }}
      />
    </div>
  );
}
