/* 이 부분 리팩토링하기
import { useState } from "react";

export default function QuizPage() {
  const [count, setCount] = useState(0);

  const onClickCountUp = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <p>지금의 카운트는 {count} 입니다!</p>
        <button onClick={onClickCountUp}>Count up!</button>
      </div>
    </>
  );
}
*/

import { useState } from "react";

export default function QuizPage() {
  const result = useState(0);

  const onClickCountUp = () => {
    result[1](result[0] + 1);
  };

  return (
    <>
      <div>
        <p>지금의 카운트는 {result} 입니다!</p>
        <button onClick={onClickCountUp}>Count up!</button>
      </div>
    </>
  );
}
