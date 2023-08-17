import { useEffect, useState } from "react";
import Presenter from "./presenter";

export default function Container() {
  const names = ["철수", "영희", "훈이", "맹구"];

  useEffect(() => {
    names.forEach((el, index) => {
      console.log(`${el}는 ${index}번째 칸에 들어있습니다.`);
    });
  }, []);

  const [state, setState] = useState(0);

  const onClick = () => {
    setState((prev) => prev + 1);
  };

  return (
    <>
      {/* <Presenter child="철수" age={13} /> */}
      {Presenter({ child: "철수", age: 4 })}
      <button onClick={onClick}>증가 버튼 </button>
      <div>{state}</div>
    </>
  );
}
