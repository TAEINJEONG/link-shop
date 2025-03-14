import styled, { keyframes } from "styled-components";
import Button from "./Button";
import Input from "./input";
import React, { useState } from "react";

interface DialogProps {
  onClick: () => void;
  onClose?: () => void;
  deleteShop: (password: string) => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const mobileFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(0, -50%);
  }
  to {
    opacity: 1;
    transform: translate(0, -100%);
  }
`;

const OutSide = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
`;

const StyledPopup = styled.div`
  padding: 25px 24px;
  width: 375px;
  height: 208px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #000000;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.white};
  animation: ${fadeIn} 0.2s ease-in-out;

  @media only screen and (max-width: 744px) {
    width: calc(100% - 50px);
    top: 100%;
    left: 0;
    border-radius: 24px 24px 0 0;
    transform: translate(0, -100%);
    animation: ${mobileFadeIn} 0.2s ease-in;
  }
`;

const PopupTitle = styled.p`
  margin: 20px 0 24px 0;
  text-align: center;
  font-size: ${({ theme }) => theme.font.heading.h1.size};
  font-weight: ${({ theme }) => theme.font.heading.h1.weight};
  line-height: ${({ theme }) => theme.font.heading.h1.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  padding: 8px 0;
`;

const ConfrimButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const PasswordDialog = ({ onClose, deleteShop }: DialogProps) => {
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <OutSide onClick={onClose}>
      <StyledPopup onClick={(event) => event.stopPropagation()}>
        <PopupTitle>비밀번호를 입력하세요</PopupTitle>

        <InputContainer>
          <Input type="password" onChange={handlePasswordChange} />
        </InputContainer>

        <ConfrimButtons>
          <Button
            variant="Primary"
            size="large"
            onClick={() => deleteShop(password)}
            width={200}
          >
            확인
          </Button>
          <Button
            variant="Secondary"
            size="large"
            onClick={onClose}
            width={200}
          >
            취소
          </Button>
        </ConfrimButtons>
      </StyledPopup>
    </OutSide>
  );
};

export default PasswordDialog;
