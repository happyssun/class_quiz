import { useState } from "react";
import {
  Wrapper,
  ErrorMsg,
  InputWrapper,
  Label,
  Inputbox,
} from "../../styles/02-4-emotion";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [errorCheck, setErrorCheck] = useState("");

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  function onChangePw(e) {
    setPw(e.target.value);
  }

  function onChangePwCheck(e) {
    setPwCheck(e.target.value);
  }

  function onClickErrorCheck() {
    if (email.includes("@") === false) {
      setErrorCheck("이메일 형식에 맞게 입력하세요!");
    } else if (pw !== pwCheck) {
      setErrorCheck("비밀번호가 일치하지 않습니다!");
    } else {
      setErrorCheck("회원가입을 축하합니다!");
    }
  }

  return (
    <>
      <Wrapper>
        <InputWrapper>
          <Label>Email :</Label>
          <Inputbox type="text" onChange={onChangeEmail}></Inputbox>
        </InputWrapper>
        <InputWrapper>
          <Label>Password :</Label>
          <Inputbox type="password" onChange={onChangePw}></Inputbox>
        </InputWrapper>
        <InputWrapper>
          <Label>Password Check :</Label>
          <Inputbox type="password" onChange={onChangePwCheck}></Inputbox>
        </InputWrapper>
        <ErrorMsg>{errorCheck}</ErrorMsg>
        <button onClick={onClickErrorCheck}>회원가입</button>
      </Wrapper>
    </>
  );
}
