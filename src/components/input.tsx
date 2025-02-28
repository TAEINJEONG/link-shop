import React, { useState } from "react";
import styled from "styled-components";
import visibilityOn from "../assets/images/btn_visibility_on_24px.svg";
import visibilityOff from "../assets/images/btn_visibility_off_24px.svg";

interface InputProps {
  children?: React.ReactNode;
  label: string;
  placeholder?: string;
  errorMessage?: string;
  type: "common" | "password";
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.font.caption.sb14.size};
  color: ${({ theme }) => theme.colors.black};
`;

const StyledInput = styled.input`
  padding-right: 40px;
  font-size: ${({ theme }) => theme.font.body.r17.size};
  border: 0;
  outline: none;
  background-color: transparent;

  &::placeholder {
    font-size: ${({ theme }) => theme.font.body.r17.size};
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const StyledErrorMessage = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  color: ${({ theme }) => theme.colors.brandRed};
`;

const PasswordToggleIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translatey(-50%);
`;

const Input: React.FC<InputProps> = ({
  children,
  label,
  placeholder,
  errorMessage,
  type,
}) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const ToggleVisible = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <InputWrapper>
      <Label>{label}</Label>
      <StyledInput
        type={type === "password" && !passwordVisible ? "password" : "text"}
        placeholder={
          type === "password"
            ? "영문+숫자 6자 이상을 입력해주세요"
            : placeholder
        }
      />
      {type === "password" && (
        <PasswordToggleIcon
          src={passwordVisible ? visibilityOn : visibilityOff} // ✅ 아이콘 변경
          onClick={ToggleVisible}
        />
      )}
      {children}
      {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
