import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../../store/authStore";

declare global {
  interface Window {
    kakao: any;
  }
}

const API_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;
const KAKAO_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&libraries=services&autoload=false`;

const SSU_LOCATION = { lat: 37.37344496460528, lng: 126.96159700684552 };

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

export function MapCanvas() {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const watchIdRef = useRef<number | null>(null);
  const [isPWA, setIsPWA] = useState(false);
  const isModalOpen = useAuthStore((state) => state.isModalOpen);
  const isOpen = isModalOpen;
  console.log(isOpen);

  // 커스텀 마커 HTML
  const markerHtml = `
    <div style="
      transform: translate(-50%, -50%);
      width: 36px; height: 36px; display:flex; align-items:center; justify-content:center;
      background:#fff; border-radius:9999px; border:2px solid #3b82f6;
      box-shadow:0 6px 18px rgba(0,0,0,.18); font-size:18px;">📍</div>
  `;

  useEffect(() => {
    // PWA 환경 감지
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
          level: 4,
          draggable: true,
          scrollwheel: true,
        });
        mapRef.current = map;

        // 현재 위치 마커(커스텀 오버레이)
        const initialPos = new kakao.maps.LatLng(
          SSU_LOCATION.lat,
          SSU_LOCATION.lng
        );
        const marker = new kakao.maps.CustomOverlay({
          position: initialPos,
          content: markerHtml,
          yAnchor: 0.5,
          xAnchor: 0.5,
          map,
        });
        markerRef.current = marker;

        // 위치 갱신 함수
        const updatePosition = (lat: number, lng: number) => {
          const pos = new kakao.maps.LatLng(lat, lng);
          marker.setPosition(pos);
          map.panTo(pos);
        };

        // 첫 위치 한 번만 가져오고, 이후 watch로 스트림 구독
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (p) => {
              updatePosition(p.coords.latitude, p.coords.longitude);
            },
            () => {},
            {
              timeout: 10_000,
              maximumAge: 60_000,
            }
          );

          // 실시간 추적
          const id = navigator.geolocation.watchPosition(
            (p) => {
              updatePosition(p.coords.latitude, p.coords.longitude);
            },
            (err) => {
              // 권한 거부/타임아웃 등 에러는 콘솔로만
              console.warn("watchPosition error:", err);
            },
            {
              timeout: 15_000,
              maximumAge: 5_000, // 캐시 허용 (짧게)
            }
          );
          watchIdRef.current = id as unknown as number;
        } else {
          console.warn("Geolocation not supported.");
        }
      });
    })();

    return () => {
      if (watchIdRef.current !== null) {
        try {
          navigator.geolocation.clearWatch(watchIdRef.current);
        } catch {}
      }
      if (markerRef.current) markerRef.current.setMap(null);
      if (mapRef.current) mapRef.current = null;
    };
  }, []);

  return (
    <div
      className="h-full z-0 overflow-hidden"
      style={{ height: isPWA && !isOpen ? "calc(100% + 34px)" : "100%" }}
    >
      <div
        id="map"
        className="w-full h-full transform-gpu [filter:grayscale(30%)_saturate(90%)_brightness(105%)]"
        style={{
          transformOrigin: "center center",
          height: isPWA && !isOpen ? "calc(100% + 34px)" : "100%",
        }}
      />
    </div>
  );
}
