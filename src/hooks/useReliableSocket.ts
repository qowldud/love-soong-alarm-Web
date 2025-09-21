import { useRef, useEffect, useCallback } from "react";

type WSLike = WebSocket;

export function useReliableSocket(
  urlFactory: () => string | null,
  handlers: {
    onOpen?: (ws: WSLike) => void;
    onMessage?: (data: any) => void;
    onError?: (e: Event) => void;
    onClose?: (e: CloseEvent) => void;
  }
) {
  const wsRef = useRef<WSLike | null>(null);
  const reconnectTimer = useRef<number | null>(null);
  const retryCountRef = useRef(0);
  const connectingWatchdog = useRef<number | null>(null);

  const clearTimer = (idRef: React.MutableRefObject<number | null>) => {
    if (idRef.current) {
      window.clearTimeout(idRef.current);
      idRef.current = null;
    }
  };

  const cleanupTimers = () => {
    clearTimer(reconnectTimer);
    clearTimer(connectingWatchdog);
  };

  const hardClose = (reason = "hardClose") => {
    try {
      wsRef.current?.close(1000, reason);
    } catch {}
    wsRef.current = null;
  };

  const scheduleReconnect = useCallback(() => {
    cleanupTimers();
    hardClose("scheduleReconnect");

    const jitter = Math.random() * 200;
    const delay = Math.min(1000 * 2 ** retryCountRef.current, 20000) + jitter;
    retryCountRef.current += 1;

    reconnectTimer.current = window.setTimeout(() => {
      connect();
    }, delay);
  }, []);

  const armConnectingWatchdog = () => {
    clearTimer(connectingWatchdog);
    connectingWatchdog.current = window.setTimeout(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.CONNECTING) {
        hardClose("connecting-timeout");
        scheduleReconnect();
      }
    }, 9000);
  };

  const connect = useCallback(() => {
    const url = urlFactory();
    if (!url) return;

    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) return;
      if (wsRef.current.readyState === WebSocket.CONNECTING) {
        armConnectingWatchdog();
        return;
      }
      hardClose("stale-before-connect");
    }

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;
      armConnectingWatchdog();

      ws.onopen = () => {
        clearTimer(connectingWatchdog);
        retryCountRef.current = 0;
        handlers.onOpen?.(ws);
      };

      ws.onmessage = (evt) => {
        try {
          handlers.onMessage?.(JSON.parse(evt.data as string));
        } catch {
          handlers.onMessage?.(evt.data);
        }
      };

      ws.onerror = (e) => {
        handlers.onError?.(e);
        scheduleReconnect();
      };

      ws.onclose = (e) => {
        handlers.onClose?.(e);
        scheduleReconnect();
      };
    } catch {
      scheduleReconnect();
    }
  }, [
    handlers.onClose,
    handlers.onError,
    handlers.onMessage,
    handlers.onOpen,
    scheduleReconnect,
    urlFactory,
  ]);

  useEffect(() => {
    connect();
    return () => {
      cleanupTimers();
      hardClose("unmount");
    };
  }, [connect]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        retryCountRef.current = 0;
        connect();
      }
    };
    const onOnline = () => {
      retryCountRef.current = 0;
      connect();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onOnline);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onOnline);
    };
  }, [connect]);

  const sendMessage = useCallback(
    (data: any) => {
      const ws = wsRef.current;
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(typeof data === "string" ? data : JSON.stringify(data));
      } else {
        connect();
        console.warn("소켓이 열려 있지 않습니다. 재연결을 시도했습니다.");
      }
    },
    [connect]
  );

  const reconnectNow = useCallback(() => {
    cleanupTimers();
    retryCountRef.current = 0;
    hardClose("manual-reconnect");
    connect();
  }, [connect]);

  return {
    socket: wsRef.current,
    readyState: wsRef.current?.readyState ?? WebSocket.CLOSED,
    sendMessage,
    reconnect: reconnectNow,
    ensureConnected: connect,
  };
}
