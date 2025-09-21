import { useApi } from "./api";
import type { PrevMessage, ChatDetail, ChatRooms } from "../types/chat";

const { getData, postData } = useApi();

export const getChatLists = async () => {
  try {
    const response = await getData<ChatRooms>("/api/chats");

    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const enjoyChat = async ({ targetUserId }: { targetUserId: number }) => {
  try {
    const response = await postData<{ chatRoodId: number }>("/api/chats", {
      targetUserId: targetUserId,
    });
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const getDetailChat = async ({ chatRoomId }: { chatRoomId: number }) => {
  try {
    const response = await getData<ChatDetail>(
      `/api/chats/rooms/${chatRoomId}`
    );
    return response;
  } catch (error: any) {
    console.log(error);
  }
};

export const getPrevChat = async ({
  roomId,
  lastMessageId,
  size,
}: {
  roomId: number;
  lastMessageId: number;
  size?: number;
}) => {
  try {
    const response = await getData<PrevMessage>(
      `/api/chats/rooms/${roomId}/previous-messages`,
      { roomId: roomId, size: size || 50, lastMessageId: lastMessageId }
    );
    return response;
  } catch (error: any) {
    console.log(error);
  }
};
