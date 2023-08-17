import { useRecoilState } from "recoil";
import { isEditState } from "../../../src/commons/stores";
import RecoilEditPage from "./edit";
import { useEffect } from "react";

export default function RecoilNewPage() {
  const [, setIsEdit] = useRecoilState(isEditState);

  useEffect(() => {
    setIsEdit(false);
  }, []);

  return (
    <>
      <RecoilEditPage />
    </>
  );
}
