import { ChatContent } from "../components/chat/Content";
import { CHAT_CONST } from "../hooks/consts";

export const Chat = () => {
  return (
    <>
      {CHAT_CONST.map((item, index) => (
        <ChatContent key={index} item={item} />
      ))}
    </>
  );
};
