import { useRef, useEffect, useCallback } from "react";

/*
    TODO ::
    휴대폰에서는 되는거 같은데 아직 확인 못해봄
    어플 백그라운드에 뒀다가 다시 마운트했을 때 채팅방 다시 연결하는 로직
    웹에서는 안됨!.. 이게 오히려 웹 단에서 처리가 어려운거 같음

    사실 백그라운드에서 돌리고 있을 이유는 없으니 뒤에서는 아예 끊어놓을 생각이었는데
    그러면 알람이 어떻게 안되나 싶어서 그냥 코스트 좀 더 들더라도 백에서도 유지시켜야 하나 싶고
*/

export function useReliableSocket(
  urlFactory: () => string | null,
  handlers: {
    onOpen?: (ws: WebSocket) => void;
    onMessage?: (data: any) => void;
    onError?: (e: Event) => void;
    onClose?: (e: CloseEvent) => void;
  }
) {
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const url = urlFactory();
    if (!url) return;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => handlers.onOpen?.(ws);
    ws.onmessage = (evt) => {
      try {
        handlers.onMessage?.(JSON.parse(evt.data));
      } catch {
        handlers.onMessage?.(evt.data);
      }
    };
    ws.onerror = (e) => handlers.onError?.(e);
    ws.onclose = (e) => handlers.onClose?.(e);
  }, [urlFactory, handlers]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [connect]);

  const sendMessage = useCallback((data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn("소켓이 열려 있지 않습니다.");
    }
  }, []);

  return {
    socket: wsRef.current,
    sendMessage,
    reconnect: connect,
  };
}
