import React from "react";
import { TextField } from "@mui/material";

const Input01 = ({ label, name, register, error }) => {
  return (
    <TextField
      required
      label={label}
      {...register(name, {
        required: `${label}을(를) 입력하세요.`,
      })}
      error={!!error}
      helperText={error?.message}
    />
  );
};

export default Input01;
