import { healthCheck } from "../api/api";
import { getUserMaxSlots } from "../api/auth";
import { getChatLists, getDetailChat } from "../api/chat";
import { getLocation } from "../api/location";
import { getNotifications } from "../api/notice";

export const TestLoader = async () => {
  const testData = await healthCheck();

  return { testData };
};

export const HomeLoader = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return;

  const maxSlots = await getUserMaxSlots();
  const locationData = await getLocation();
  const chatLists = await getChatLists();

  return { maxSlots, locationData, chatLists };
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
