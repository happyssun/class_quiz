import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IInputs {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export default function ReactHookFormPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IInputs>();
  const onSubmit: SubmitHandler<IInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      작성자 :{" "}
      <input
        type="text"
        {...register("writer", {
          required: "작성자를 입력하세요.",
          maxLength: { value: 20, message: "최대 20자까지 입력 가능합니다." },
        })}
      />
      <div>{errors.writer && <span>{errors.writer.message}</span>}</div>
      비밀번호 :{" "}
      <input
        type="password"
        {...register("password", { required: "비밀번호를 입력하세요." })}
      />
      <div>{errors.password && <span>{errors.password.message}</span>}</div>
      제목 :{" "}
      <input
        type="text"
        {...register("title", { required: "제목을 입력하세요" })}
      />
      <div>{errors.title && <span>{errors.title.message}</span>}</div>
      내용 :{" "}
      <input
        type="text"
        {...register("contents", { required: "내용을 입력하세요" })}
      />
      <div>{errors.contents && <span>{errors.contents.message}</span>}</div>
      <input
        type="submit"
        value={"등록하기"}
        style={{ backgroundColor: isValid ? "yellow" : "" }}
      />
    </form>
  );
}
