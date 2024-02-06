import { atom } from "recoil";

export const quizIsEditState = atom({
  key: "quizIsEditState",
  default: true,
});

export const quizAccessTokenState = atom({
  key: "quizAccessToken",
  default: "",
});
