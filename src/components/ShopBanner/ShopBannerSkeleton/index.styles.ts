import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    background-position: 0% 0%
  }
  100% {
    background-position: -135% 0%
  }
`;

const SkeletonWrapper = styled.div`
  background: linear-gradient(-90deg, #efefef 0%, #fcfcfc 50%, #efefef 100%);
  background-size: 400% 400%;
  animation: ${pulse} 1.5s infinite ease-in-out;
`;

export const BannerContainer = styled(SkeletonWrapper)`
  padding: 20px 24px;
  border-radius: 24px;
`;

export const BannerTopSection = styled(SkeletonWrapper)`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const LikeShopButton = styled(SkeletonWrapper)`
  display: flex;
  align-items: end;
  justify-content: center;
`;

export const BaseIcon = styled(SkeletonWrapper)`
  margin-right: 5px;
  width: 25px;
  height: 25px;
`;

export const LikeCount = styled(SkeletonWrapper)`
  width: 16px;
  height: 16px;
`;

export const RightIcons = styled(SkeletonWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const MenuListContainer = styled(SkeletonWrapper)`
  height: 23px;
`;

export const BannerCenterSection = styled(SkeletonWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 18px 0 20px 0;
  height: 166px;
`;

export const ShopImage = styled(SkeletonWrapper)`
  width: 84px;
  height: 84px;
  border-radius: 99px;
`;

export const ShopName = styled(SkeletonWrapper)`
  margin: 16px 0 8px 0;
  width: 100%;
  height: 38px;
`;

export const ShopId = styled(SkeletonWrapper)`
  height: 16px;
`;
