import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const mobileFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(0, -50%);
  }
  to {
    opacity: 1;
    transform: translate(0, -100%);
  }
`;

export const OutSide = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
`;

export const StyledPopup = styled.div`
  padding: 25px 24px;
  width: 375px;
  height: 308px;
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

export const PopupTitle = styled.span`
  display: inline-block;
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const StyledCloseIcon = styled.img`
  width: 23px;
  height: 23px;
  position: absolute;
  top: 25px;
  right: 24px;
  cursor: pointer;
`;

export const SortList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const SortItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 15px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray100};
  cursor: pointer;
`;

export const SortText = styled.span<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.font.caption.b16.size};
  font-weight: ${({ $active, theme }) =>
    $active ? theme.font.caption.b16.weight : theme.font.caption.m16.weight};
  line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.brandRed : theme.colors.black};
`;

export const ActiveIcon = styled.img`
  width: 23px;
  height: 23px;
`;
