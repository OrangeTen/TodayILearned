import { locale } from "./locale";
import messagesEnes from "./messages.enes";
import messagesKokr from "./messages.kokr";

let messages;

if (locale === "ko-KR") {
  messages = messagesKokr;
} else if (locale === "en-US") {
  messages = messagesEnes;
} else {
  messages = messagesEnes;
}

export default messages;
