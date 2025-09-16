import { healthCheck } from "../api/api";
import { getChatLists, getDetailChat } from "../api/chat";
import { getLocation } from "../api/location";

export const TestLoader = async () => {
  const testData = await healthCheck();

  return { testData };
};

export const HomeLoader = async () => {
  const locationData = await getLocation();
  const chatLists = await getChatLists();

  return { locationData, chatLists };
};

export const ChatLoader = async ({ params }: any) => {
  const { roomId } = params;
  const chatDetail = await getDetailChat({ roomId: roomId });

  return { chatDetail };
};
