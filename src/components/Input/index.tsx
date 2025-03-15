import React, { useState } from "react";
import * as styles from "./index.styles";
import visibilityOn from "../../assets/images/btn_visibility_on_24px.svg";
import visibilityOff from "../../assets/images/btn_visibility_off_24px.svg";

interface InputProps {
  children?: React.ReactNode;
  label?: string;
  placeholder?: string;
  errorMessage?: string | null;
  type: "common" | "password" | "number";
  name?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  children,
  label,
  placeholder,
  errorMessage,
  type,
  name,
  onChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const ToggleVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <styles.InputWrapper>
      {label && <styles.Label>{label}</styles.Label>}
      <styles.StyledInput
        onChange={onChange}
        name={name}
        type={type === "password" && !passwordVisible ? "password" : "text"}
        placeholder={
          type === "password"
            ? "영문+숫자 6자 이상을 입력해주세요"
            : placeholder
        }
      />
      {type === "password" && (
        <styles.PasswordToggleIcon
          src={passwordVisible ? visibilityOn : visibilityOff}
          onClick={ToggleVisible}
        />
      )}
      {children}
      {errorMessage && (
        <styles.StyledErrorMessage>{errorMessage}</styles.StyledErrorMessage>
      )}
    </styles.InputWrapper>
  );
};

export default Input;
