import * as styles from "./index.styles";
import Button from "../Button";
import PopupCheck from "../assets/images/popup-check.svg";

interface PopupProps {
  type: "confirm" | "alert";
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Popup = ({ type = "confirm", onConfirm, onCancel }: PopupProps) => {
  return (
    <styles.OutSide>
      <styles.PopupContainer>
        {type === "confirm" ? (
          <styles.PopupMessage>등록이 완료되었습니다.</styles.PopupMessage>
        ) : (
          <>
            <styles.PopupCheckIcon src={PopupCheck} />
            <styles.PopupMessage>정말 삭제하시겠어요?</styles.PopupMessage>
          </>
        )}

        {type === "confirm" ? (
          <Button variant="Primary" size="large" width={160}>
            확인
          </Button>
        ) : (
          <styles.confrimButtons>
            <Button
              variant="Primary"
              size="large"
              onClick={onConfirm}
              width={123}
            >
              확인
            </Button>
            <Button
              variant="Secondary"
              size="large"
              onClick={onCancel}
              width={123}
            >
              취소
            </Button>
          </styles.confrimButtons>
        )}
      </styles.PopupContainer>
    </styles.OutSide>
  );
};

export default Popup;
