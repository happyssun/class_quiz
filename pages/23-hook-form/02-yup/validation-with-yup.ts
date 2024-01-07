import * as yup from "yup";

export const userSchema = yup.object({
  writer: yup
    .string()
    .max(5, "5글자 이내의 문자열입니다")
    .required("작성자를 입력하세요"),
  password: yup
    .string()
    .required("비밀번호를 입력하세요")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,8}$/,
      "비밀번호는 영문,숫자,특수문자를 포함한 6자리 이상 8자리 이내입니다."
    ),
  title: yup
    .string()
    .required("제목을 입력하세요")
    .max(100, "제목은 100자 이내 입니다."),
  contents: yup
    .string()
    .required("내용을 입력하세요")
    .max(1000, "내용은 1000자 이내 입니다."),
});
