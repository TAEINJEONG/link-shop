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

export const ShopInfoContainer = styled(SkeletonWrapper)`
  padding: 24px;
  width: calc(50% - 60px);
  border-radius: 25px;

  @media only screen and (max-width: 1199px) {
    width: 100%;
  }

  @media only screen and (max-width: 744px) {
    width: 100%;
    overflow: scroll;
  }
`;

export const ShopInfoHeaderSection = styled(SkeletonWrapper)`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ShopInfoHeaderLeft = styled(SkeletonWrapper)`
  display: flex;
  border-radius: 99px;
`;

export const ShopImage = styled(SkeletonWrapper)`
  width: 60px;
  height: 60px;
  border-radius: 99px;
`;

export const ShopInfoHeaderRight = styled(SkeletonWrapper)`
  display: flex;
  align-items: end;
`;

export const LikeIcon = styled(SkeletonWrapper)`
  width: 23px;
  height: 23px;
`;

export const LikeCount = styled(SkeletonWrapper)`
  width: 30px;
  height: 16px;
`;

export const ShopInfoProductList = styled(SkeletonWrapper)`
  display: flex;
  flex-direction: column;
`;

export const ProductCount = styled(SkeletonWrapper)`
  margin-bottom: 8px;
  height: 15px;
`;

export const ProductImageList = styled(SkeletonWrapper)`
  display: flex;
  gap: 12px;

  @media only screen and (max-width: 744px) {
    overflow: scroll;
  }
`;

export const ProductImage = styled(SkeletonWrapper)`
  width: 95px;
  height: 95px;
  border-radius: 15px;
`;
