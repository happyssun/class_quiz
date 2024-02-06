import { useRecoilState } from "recoil";
import { quizIsEditState } from "../../../src/commons/stores";
import RecoilEditPage from "./edit";
import { useEffect } from "react";

export default function RecoilNewPage() {
  const [, setIsEdit] = useRecoilState(quizIsEditState);

  useEffect(() => {
    setIsEdit(false);
  }, []);

  return (
    <>
      <RecoilEditPage />
    </>
  );
}
