import { forwardRef } from "react";

import StyledInput from "@/components/Input/index.styled";

function Input(
  {
    type = "text",
    placeholder,
    minLength,
    maxLength,
    value,
    required,
    disabled,
    onChange,
  },
  ref
) {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      minLength={minLength}
      maxLength={maxLength}
      value={value}
      required={required}
      disabled={disabled}
      onChange={onChange}
      ref={ref}
    />
  );
}

export default forwardRef(Input);
