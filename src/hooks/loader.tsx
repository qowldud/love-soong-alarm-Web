import { healthCheck } from "../api/api";
import { getUserTickets } from "../api/auth";
import { getDetailChat } from "../api/chat";
import { getLocation } from "../api/location";
import { getNotifications } from "../api/notice";

export const TestLoader = async () => {
  const testData = await healthCheck();

  return { testData };
};

export const HomeLoader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const authStore = localStorage.getItem("auth-store");

  if (!accessToken || !authStore) return;
  const locationData = await getLocation();

  return { locationData };
};

export const CoinLoader = async () => {
  const ticketNumber = await getUserTickets();

  return { ticketNumber };
};

export const ChatLoader = async ({ params }: any) => {
  const { chatRoomId } = params;
  const chatDetail = await getDetailChat({ chatRoomId: chatRoomId });

  return { chatDetail };
};

export const AlarmLoader = async () => {
  const alarmList = await getNotifications();

  return { alarmList };
};
