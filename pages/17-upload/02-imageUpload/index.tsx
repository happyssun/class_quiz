import { UploadOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import { Button, Image, Input, Modal } from "antd";
import { ChangeEvent, useRef, useState } from "react";

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

  const imageRef = useRef(null); // useRef to create a ref

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
      setImageUrl(result.data?.uploadFile.url ?? null);
    } catch (error) {
      Modal.error({ content: error.message });
    }
  };

  const onClickSubmit = async () => {
    if (writer && pw && title && contents) {
      const result = await createBoard({
        variables: {
          createboardInput: {
            writer,
            password: pw,
            title,
            contents,
            images: imageUrl ? [imageUrl] : [],
          },
        },
      });
      if (result.data?.createBoard) {
        alert("저장되었습니다!");
      } else {
        alert("저장에 실패했습니다!");
      }
    } else {
      alert("모든 필드를 입력하세요!");
    }
  };

  const onClickImage = () => {
    void imageRef.current.click();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      작성자:
      <Input type="text" onChange={onChangeWriter} />
      비밀번호:
      <Input type="password" onChange={onChangePw} />
      제목:
      <Input type="text" onChange={onChangeTitle} />
      내용:
      <Input type="text" onChange={onChangeContents} />
      {imageUrl && (
        <Image
          src={`https://storage.googleapis.com/${imageUrl}`}
          style={{
            width: "50px",
            height: "50px",
            margin: "20px 0",
          }}
        />
      )}
      {/* Use label to trigger the hidden file input */}
      <label htmlFor="fileInput" style={{ display: "none" }}>
        <input
          src={imageUrl ? `https://storage.googleapis.com/${imageUrl}` : ""}
          style={{
            width: "50px",
            height: "50px",
            margin: "20px 0",
          }}
        />
      </label>
      <input
        type="file"
        id="fileInput"
        onChange={onChangeImage}
        style={{ display: "none" }}
        ref={imageRef} // Connect the input element to the ref
      />
      <UploadOutlined onClick={onClickImage} rev={undefined} />
      <Button onClick={onClickSubmit}>저장하기</Button>
    </div>
  );
}
