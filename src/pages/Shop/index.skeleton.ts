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

export const Product = styled(SkeletonWrapper)`
  display: flex;
  align-items: center;
  width: calc(50% - 52px);
  padding: 16px 20px;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.colors.white100};

  @media only screen and (max-width: 1199px) {
    width: 100%;
  }
`;

export const ProductImage = styled(SkeletonWrapper)`
  margin-right: 20px;
  width: 95px;
  height: 95px;
  border-radius: 15px;
`;

export const ProductInfoContainer = styled(SkeletonWrapper)`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled(SkeletonWrapper)`
  margin: 0 0 10px 0;
  height: 17px;
`;

export const ProductPrice = styled(SkeletonWrapper)`
  height: 28px;
`;
