import { useState } from "react";

export default function PrevstatePage() {
  const [state, setState] = useState(0);

  function sumAll() {
    setState((prev) => prev + 1);
  }

  return (
    <>
      <div>결과는: {state}</div>
      <button onClick={sumAll}>실행!</button>
    </>
  );
}
