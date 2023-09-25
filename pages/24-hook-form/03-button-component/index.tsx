import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { userSchema } from "../02-yup/validation-with-yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button01 } from "../../../src/components/buttons/01";

interface IInputs {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export default function ReactHookFormYupPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IInputs>({
    resolver: yupResolver(userSchema),
    mode: "onChange",
  });
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
        })}
      />
      <div>{errors.writer && <span>{errors.writer.message}</span>}</div>
      비밀번호 :{" "}
      <input
        type="password"
        {...register("password", {
          required: "비밀번호를 입력하세요.",
        })}
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
      <Button01 isValid={isValid} />
    </form>
  );
}
