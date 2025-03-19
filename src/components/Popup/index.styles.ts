import styled, { keyframes } from "styled-components";

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

export const OutSide = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
`;

export const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 24px 24px;
  width: 343px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.white100};
  animation: ${fadeIn} 0.1s ease-in-out;
`;

export const PopupCheckIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const PopupMessage = styled.span`
  margin: 20px 0 24px 0;
  font-size: ${({ theme }) => theme.font.body.r17.size};
  font-weight: ${({ theme }) => theme.font.body.r17.weight};
  line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;

export const confrimButtons = styled.div`
  display: flex;
  gap: 4px;
`;
