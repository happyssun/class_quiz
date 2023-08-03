import axios from "axios";
import { useEffect, useState } from "react";

export default function OpenapiWithUseEffect() {
  const [dogUrl, setDogUrl] = useState("");

  const fetchDog = async () => {
    const result = await axios.get("https://dog.ceo/api/breeds/image/random");
    setDogUrl(result.data.message);
  };

  // 처음 마운트될때 한번만 실행 되도록 - 처음에 페이지 로딩될때 강아지사진을 처음부터 가져오며 실행
  useEffect(() => {
    fetchDog();
  }, []);

  
  const onClickBringDog = () => {
    fetchDog();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <img src={dogUrl} style={{ height: "300px", width: "300px" }} />
      <button onClick={onClickBringDog} style={{ width: "300px" }}>
        사진 가져오기
      </button>
    </div>
  );
}
