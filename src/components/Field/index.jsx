import React from "react";

import Input from "@/components/Input";

import { ERROR_MESSAGE } from "@/constants";

import StyledField from "@/components/Field/index.styled";

function Field({
  labelName,
  type,
  placeholder,
  minLength,
  maxLength,
  errorMessage,
  value,
  required,
  disabled,
  onChange,
}) {
  return (
    <StyledField>
      <div className="field__header">
        <label>{labelName}</label>
        <div className="error__message">{ERROR_MESSAGE[errorMessage]}</div>
      </div>
      <Input
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        required={required}
        disabled={disabled}
        onChange={onChange}
      />
    </StyledField>
  );
}

export default Field;
