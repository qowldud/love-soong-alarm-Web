import { useLoaderData } from "react-router-dom";
import { ChatContent } from "../components/chat/Content";
import { CHAT_CONST } from "../hooks/consts";

export const Chat = () => {
  const { chatDetail } = useLoaderData();
  console.log(chatDetail);

  return (
    <>
      {CHAT_CONST.map((item, index) => (
        <ChatContent key={index} item={item} />
      ))}
    </>
  );
};
