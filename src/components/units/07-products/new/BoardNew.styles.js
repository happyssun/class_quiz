import styled from "@emotion/styled";

export const SubmitButton = styled.button`
  width: 200px;
  font-size: ${(props) => props.fontsize};
  color: ${(props) => props.color};
  background-color: ${(props) => (props.btnColor ? "skyblue" : "default")};
`;
