import { Button, Modal } from "antd";
import { useState } from "react";

export default function ModalOpen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>모달열기</Button>
      <Modal
        title={"게시글 등록"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <hr />
        <br />
        <p>게시글이 등록되었습니다.</p>
      </Modal>
    </>
  );
}
