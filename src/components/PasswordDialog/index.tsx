import * as styles from "./index.styles";
import Button from "../Button";
import Input from "../Input";
import React, { useState } from "react";

interface DialogProps {
  onClick: () => void;
  onClose?: () => void;
  deleteShop: (password: string) => void;
}

const PasswordDialog = ({ onClose, deleteShop }: DialogProps) => {
  const [password, setPassword] = useState<string>("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <styles.OutSide onClick={onClose}>
      <styles.StyledPopup onClick={(event) => event.stopPropagation()}>
        <styles.PopupTitle>비밀번호를 입력하세요</styles.PopupTitle>

        <styles.InputContainer>
          <Input type="password" onChange={handlePasswordChange} />
        </styles.InputContainer>

        <styles.ConfrimButtons>
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
        </styles.ConfrimButtons>
      </styles.StyledPopup>
    </styles.OutSide>
  );
};

export default PasswordDialog;
