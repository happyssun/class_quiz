import { PlusOutlined } from "@ant-design/icons";
import { Upload, UploadProps } from "antd";
import { useState } from "react";

export default function ImageUploadWithAntd() {
  const [fileList, setFileList] = useState([]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined rev={undefined} />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </>
  );
}
