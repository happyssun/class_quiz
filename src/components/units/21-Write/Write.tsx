import { useRecoilState } from "recoil";
import { isEditState } from "../../../commons/stores";

export default function BoardWrite21() {
  const [isEdit] = useRecoilState(isEditState);
  return <>{isEdit ? "수정하기" : "등록하기"}</>;
}
