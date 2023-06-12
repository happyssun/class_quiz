import { useState } from "react";

export default function App() {
  const [hello, setHello] = useState("안녕하세요");

  function greet() {
    setHello("반갑습니다");
  }

  return (
    <div>
      <button onClick={greet}>{hello}</button>
    </div>
  );
}
