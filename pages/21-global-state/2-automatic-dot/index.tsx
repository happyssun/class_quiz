// 텍스트 입력창을 만들고, 숫자만 입력해도 자동으로 2018.01.01 처럼
// "."이 추가되도록 만들어 주세요.

import { useState } from "react";
import { getValidDate } from "../../../src/components/commons/libraries/validationDate";

export default function InputAlgorithm() {
  const [value, setValue] = useState("");

  const onChangeInput = (event) => {
    const dottedValue = [];
    const nextValue = event.target.value;
    if (nextValue.length > value.length) {
      const nextPureValue = nextValue.replaceAll(".", "").split("");
      nextPureValue.forEach((data: string, index: number) => {
        dottedValue.push(data);
        if (index + 1 === 4 || index + 1 === 6) dottedValue.push(".");
      });
      setValue(getValidDate(dottedValue));
    } else {
      const nextPureValue = nextValue.replaceAll(".", "").split("");
      nextPureValue.forEach((data: string, index: number) => {
        dottedValue.push(data);
        if (nextPureValue.length > 6 && (index + 1 === 4 || index + 1 === 6)) {
          dottedValue.push(".");
        } else if (nextPureValue.length > 4 && index + 1 === 4) {
          dottedValue.push(".");
        }
      });
      setValue(dottedValue.join(""));
    }
  };

  return (
    <input
      type="text"
      value={value}
      placeholder="YYYY.MM.DD"
      maxLength={10}
      onChange={onChangeInput}
    />
  );
}
