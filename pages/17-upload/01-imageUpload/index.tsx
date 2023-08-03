import { UploadOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { Button, Image, Input, Modal } from "antd";
import { useRef, useState } from "react";

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
  const [createBoard] = useMutation(CREATE_BOARD);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const [writer, setWriter] = useState("");
  const [pw, setPw] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const imageRef = useRef(null); // useRef를 사용하여 ref를 생성합니다.

  const onChangeWriter = (e) => {
    setWriter(e.currentTarget.value);
  };
  const onChangePw = (e) => {
    setPw(e.currentTarget.value);
  };
  const onChangeTitle = (e) => {
    setTitle(e.currentTarget.value);
  };
  const onChangeContents = (e) => {
    setContents(e.currentTarget.value);
  };

  const onChangeImage = async (e) => {
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
      const result = await createBoard({
        variables: {
          writer,
          password: pw,
          title,
          contents,
          images: [imageUrl],
        },
      });
      alert("저장되었습니다!");
    }
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
      <Image src={`https://storage.googleapis.com/${imageUrl}`} />
      <Input type="file" onChange={onChangeImage} />
      <Button onClick={onClickSubmit}>저장하기</Button>
    </>
  );
}
