import { UploadOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { Button, Image, Input, Modal } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import {
  Mutation,
  MutationCreateBoardArgs,
  MutationUploadFileArgs,
} from "../../../src/commons/types/generated/types";
import { useRouter } from "next/router";

const CREATE_BOARD = gql`
  mutation createBoard($createboardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      images
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageUpload() {
  const [createBoard] = useMutation<
    Pick<Mutation, "createBoard">,
    MutationCreateBoardArgs
  >(CREATE_BOARD);

  const [uploadFile] = useMutation<
    Pick<Mutation, "uploadFile">,
    MutationUploadFileArgs
  >(UPLOAD_FILE);

  const [writer, setWriter] = useState("");
  const [pw, setPw] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter;

  const imageRef = useRef<HTMLInputElement>(null);

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.currentTarget.value);
  };
  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.currentTarget.value);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.currentTarget.value);
  };

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      });
      setImageUrl(result.data?.uploadFile.url ?? "");
    } catch {
      Modal.error({ content: error.message });
    }
  };

  const onClickSubmit = async () => {
    if (writer && pw && title && contents) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password: pw,
              title,
              contents,
              images: [imageUrl],
            },
          },
        });
        alert(result.data.createBoard.message);
        alert("저장되었습니다!");
        router.push("/");
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    }
  };

  const onClickImage = () => {
    void imageRef.current?.click();
  };

  return (
    <>
      작성자:
      <Input type="text" onChange={onChangeWriter} />
      비밀번호:
      <Input type="password" onChange={onChangePw} />
      제목:
      <Input type="text" onChange={onChangeTitle} />
      내용:
      <Input type="text" onChange={onChangeContents} />
      <input
        type="file"
        onChange={onChangeImage}
        style={{ display: "none" }}
        ref={imageRef}
      />
      {imageUrl && (
        <Image
          src={imageUrl ? `https://storage.googleapis.com/${imageUrl}` : ""}
          style={{
            width: "50px",
            height: "50px",
            margin: "20px 0",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          margin: "20px 0",
        }}
      >
        <Button
          onClick={onClickImage}
          type="primary"
          icon={<UploadOutlined />}
          shape="round"
        >
          파일 등록
        </Button>
        <Button onClick={onClickSubmit}>저장하기</Button>
      </div>
    </>
  );
}
