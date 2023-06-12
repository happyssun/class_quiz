import styled from "@emotion/styled";
import { Rate } from "antd";
import { useState } from "react";

const MyRate = styled(Rate)`
  font-size: 30px;
`;

export default function StarRate() {
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [value, setValue] = useState(3);

  return (
    <>
      <MyRate tooltips={desc} onChange={setValue} value={value} />
      {value ? <span className="ant-rate-text">{`${value}점`}</span> : ""}
    </>
  );
}
