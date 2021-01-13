import { Message } from "../../../backend/src/chat/message";
import { fetchTimeOut } from "./util";

export const getChat = async (offerId: string): Promise<Message[]> => {
  return fetchTimeOut(`/api/v1/chat/${offerId}`).then((res) => {
    return res.json();
  }) as Promise<Message[]>;
};

export const postChatMessage = async (
  offerId: string,
  content: string
): Promise<Message> => {
  return fetchTimeOut(`/api/v1/chat/${offerId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  }).then((res) => {
    return res.json();
  }) as Promise<Message>;
};
