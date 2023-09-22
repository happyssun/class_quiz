import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IInputs {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export default function ReactHookFormPage(): JSX.Element {
  const { register, handleSubmit } = useForm<IInputs>();
  const onSubmit: SubmitHandler<IInputs> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      작성자 :{" "}
      <input
        type="text"
        {...register("writer", { required: true, maxLength: 20 })}
      />
      비밀번호 :{" "}
      <input type="password" {...register("password", { required: true })} />
      제목 : <input type="text" {...register("title")} />
      내용 : <input type="text" {...register("contents")} />
      <input type="submit" value={"등록하기"} />
    </form>
  );
}
