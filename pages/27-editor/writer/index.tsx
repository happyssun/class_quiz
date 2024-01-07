import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { gql, useMutation } from "@apollo/client";
import { useMoveToPage } from "../../../src/components/commons/hooks/useMoveToPage";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardPage() {
  const { handleSubmit, register, setValue, trigger } = useForm();
  const [createBoard] = useMutation(CREATE_BOARD);
  const { onClickMoveToPage } = useMoveToPage();

  // 성능최적화 code-splitting
  // reactQuill을 그냥 import하면 서버사이드렌더링에서 안보여서 에러남 그래서 next에서 지원하는 dynamic 방식으로 가져옴
  const ReactQuill = dynamic(async () => await import("react-quill"), {
    ssr: false,
  });

  // 퀼에서 입력한 값을 넣어주기 위해
  // 이때 useFoarm의 register를 사용하지 않기 때문에 값을 직접 넣어주고 유효성검사도 직접해야함
  const onChangeContents = (value) => {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger(value);
  };

  const onClickSubmit = async (data): Promise<void> => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: data.writer,
          password: data.password,
          title: data.title,
          contents: data.contents,
        },
      },
    });

    const { Modal } = await import("antd"); // dynamic import 같은 성능 최적화방식
    Modal.success({ content: "게시글이 등록되었습니다!" });

    const boardId = result.data.createBoard._id; // 주소창이동을 id로 하려고
    void onClickMoveToPage(`/27-editor/detail/${boardId}`)();
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      작성자 : <input type="text" {...register("writer", { required: true })} />
      비밀번호 :
      <input type="password" {...register("password", { required: true })} />
      제목 : <input type="text" {...register("title", { required: true })} />
      <ReactQuill theme="snow" onChange={onChangeContents} />
      <button>등록하기</button>
    </form>
  );
}
