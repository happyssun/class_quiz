import React from "react";

export default function Hof() {
  const onClickBtn = (name: number) => (): void => {
    return console.log(name);
  };

  return <button onClick={onClickBtn(123)}>클릭</button>;
}
