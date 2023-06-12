import axios from "axios";
import { useState } from "react";

export default function REST_API() {
  const [name, setName] = useState("");

  const onClickSubmit = async () => {
    const result = await axios.get("https://koreanjson.com/users");
    console.log(result.data);
    console.log(result.data[2].name); // 배열에서 결과를 출력할때
    const name = result.data[1].name;
    setName(name);
  };

  return (
    <>
      <button onClick={onClickSubmit}>REST_API 요청하기</button>
      <div>{name}</div>
    </>
  );
}
