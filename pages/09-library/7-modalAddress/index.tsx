import { Button, Modal } from "antd";
import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

interface AddressProps {
  address: string;
}

const Address: React.FC<AddressProps> = ({ address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(address);

  const handleComplete = (data: any) => {
    const fullAddress = data.address; // 검색된 주소 정보에서 주소 문자열 추출
    const extraAddress = data.addressType === "R" ? "" : data.bname;
    setSelectedAddress(`${fullAddress} ${extraAddress}`);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>주소 검색</Button>
      <Modal open={isModalOpen}>
        {isModalOpen && (
          <DaumPostcode
            onComplete={handleComplete}
            autoClose
            width={500}
            height={600}
            style={{ zIndex: 1000 }}
          />
        )}
      </Modal>
      {selectedAddress && <p>{selectedAddress}</p>}
    </>
  );
};

export default Address;

/* 논리 연산자 &&을 사용한 조건부 렌더링 
  {selectedAddress && <p>{selectedAddress}</p>}
    : selectedAddress가 truthy한 값일 때만 <p>{selectedAddress}</p>를 출력

*/
