// components/ShopBanner.styles.ts
import styled, { keyframes } from "styled-components";

// ✨ 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(0) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(0) scale(1);
  }
`;

const toastFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 0) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
`;

// ✨ 컨테이너 스타일
export const BannerContainer = styled.div`
  padding: 20px 24px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.white100};
`;

export const BannerTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LikeShopButton = styled.button`
  display: flex;
  align-items: end;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

export const LikeCount = styled.span`
  font-size: ${({ theme }) => theme.font.caption.b16.size};
  font-weight: ${({ theme }) => theme.font.caption.m16.weight};
  line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
`;

// ✨ 공통 아이콘 스타일
export const BaseIcon = styled.img`
  margin-right: 5px;
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

export const ShareIcon = styled(BaseIcon)``;
export const MenuIcon = styled(BaseIcon)`
  margin-right: 0;
`;

export const MenuListContainer = styled.div`
  height: 23px;
`;

// ✨ 드롭다운 메뉴 스타일
export const ShopMenuList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 23px;
  margin-top: 8px;
  width: 160px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid #dddddd;
  text-align: left;
  border-radius: 6px;
  box-shadow: 0 4px 16px 0 #1122110d;
  z-index: 1;
  overflow: hidden;
  animation: ${fadeIn} 0.1s ease-in-out;
`;

export const MenuButton = styled.button`
  padding: 18px 0;
  font-size: ${({ theme }) => theme.font.body.b18.size};
  font-weight: ${({ theme }) => theme.font.body.b18.weight};
  line-height: ${({ theme }) => theme.font.body.sb17.lineHeight};
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

export const EditButton = styled(MenuButton)`
  border-bottom: 1px solid #dddddd;
`;

export const RightIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// ✨ 중앙 섹션 스타일
export const BannerCenterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 18px 0 20px 0;
`;

export const ShopImage = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 99px;
  overflow: hidden;
`;

export const ShopName = styled.p`
  margin: 16px 0 8px 0;
  font-size: 32px;
  font-weight: 800;
  line-height: 38.19px;
  color: ${({ theme }) => theme.colors.black};
`;

export const ShopId = styled.span`
  font-size: ${({ theme }) => theme.font.caption.b16.size};
  font-weight: ${({ theme }) => theme.font.caption.r16.weight};
  line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
  color: ${({ theme }) => theme.colors.gray300};
`;

// ✨ 토스트 메시지 스타일
export const ToastContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  width: 360px;
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.gray300};
  animation: ${toastFadeIn} 0.1s ease-in-out;
`;

export const ToastIcon = styled.img`
  margin-right: 18px;
  width: 23px;
  height: 23px;
`;

export const ToastMessage = styled.span`
  font-size: ${({ theme }) => theme.font.body.b18.size};
  font-weight: ${({ theme }) => theme.font.body.b18.weight};
  line-height: ${({ theme }) => theme.font.body.b18.lineHeight};
  color: ${({ theme }) => theme.colors.white100};
`;
