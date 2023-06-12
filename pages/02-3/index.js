import { useState } from "react";

export default function VarificationCode() {
  const [num, setNum] = useState("000000");

  function getNumber() {
    const randomNum = Math.floor(Math.random() * 1000000) + 1;
    setNum(randomNum);
  }

  return (
    <>
      <div>{num}</div>
      <button onClick={getNumber}>인증번호 생성</button>
    </>
  );
}
