import React from "react";
import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import Input01 from "../../../src/components/inputs";

import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../02-yup/validation-with-yup";

interface IInputs {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

export default function ReactHookFormYupPage(): JSX.Element {
  const form = useForm<IInputs>({
    defaultValues: { writer: "", password: "", title: "", contents: "" },
    resolver: yupResolver(userSchema), // Use yupResolver with your userSchema
  });

  const { handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  const onSubmit = (data: IInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2} width={400}>
        <Input01
          label="작성자"
          name="writer"
          register={form.register}
          error={errors.writer}
        />
        <Input01
          label="비밀번호"
          name="password"
          register={form.register}
          error={errors.password}
        />
        <Input01
          label="제목"
          name="title"
          register={form.register}
          error={errors.title}
        />
        <Input01
          label="내용"
          name="contents"
          register={form.register}
          error={errors.contents}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#ed799e" }}
        >
          등록하기
        </Button>
      </Stack>
      <DevTool control={form.control} />
    </form>
  );
}
