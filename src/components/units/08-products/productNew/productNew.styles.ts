import styled from "@emotion/styled";
import { ISubmitBtnProps } from "./productNew.types";

export const Button = styled.button`
  width: 100px;
  height: 30px;
  font-size: 15px;
  margin-top: 10px;

  background-color: ${(props: ISubmitBtnProps) =>
    props.isActiveBtn ? "skyblue" : "lightgray"};
`;
