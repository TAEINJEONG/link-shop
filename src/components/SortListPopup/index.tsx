import CloseIcon from "../../assets/images/close-icon.svg";
import CheckIcon from "../../assets/images/check-icon.svg";
import * as styles from "./index.styles";

interface SortProps {
  active: string;
  onClick: (value: "recent" | "likes" | "productsCount") => void;
  onClose?: () => void;
}

const SortListPopup = ({ active = "recent", onClick, onClose }: SortProps) => {
  return (
    <styles.OutSide onClick={onClose}>
      <styles.StyledPopup onClick={(event) => event.stopPropagation()}>
        <styles.PopupTitle>정렬</styles.PopupTitle>
        <styles.StyledCloseIcon src={CloseIcon} onClick={onClose} />
        <styles.SortList>
          <styles.SortItem onClick={() => onClick("recent")}>
            <styles.SortText $active={active === "recent"}>
              최신순(recent)
            </styles.SortText>
            {active === "recent" && <styles.ActiveIcon src={CheckIcon} />}
          </styles.SortItem>
          <styles.SortItem onClick={() => onClick("likes")}>
            <styles.SortText $active={active === "likes"}>
              좋아요순(likes)
            </styles.SortText>
            {active === "likes" && <styles.ActiveIcon src={CheckIcon} />}
          </styles.SortItem>
          <styles.SortItem onClick={() => onClick("productsCount")}>
            <styles.SortText $active={active === "productsCount"}>
              상품 많은순(productsCount)
            </styles.SortText>
            {active === "productsCount" && (
              <styles.ActiveIcon src={CheckIcon} />
            )}
          </styles.SortItem>
        </styles.SortList>
      </styles.StyledPopup>
    </styles.OutSide>
  );
};

export default SortListPopup;
