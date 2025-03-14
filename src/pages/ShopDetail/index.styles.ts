import styled from "styled-components";
import { Link } from "react-router-dom";

export const Shoptent = styled.img`
  padding: 0 14px;
  width: calc(100vw - 28px);
  max-height: 74px;
  height: 74px;
  object-fit: none;
`;

export const PrevContainer = styled.div`
  display: inline-flex;
  margin: 20px 0 16px 0;
  cursor: pointer;
`;

export const prevTag = styled.img`
  margin-right: 4px;
  width: 15px;
  height: 16px;
`;

export const PrevPage = styled(Link)`
  font-size: ${({ theme }) => theme.font.caption.sb16.size};
  font-weight: ${({ theme }) => theme.font.caption.sb16.weight};
  line-height: ${({ theme }) => theme.font.caption.sb16.lineHeight};
  color: ${({ theme }) => theme.colors.gray300};
`;

export const ShopContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;

  @media only screen and (max-width: 1199px) {
    padding: 0 24px;
  }
`;

export const representativeProduct = styled.span`
  display: inline-block;
  margin: 23px 0 16px 0;
  font-size: ${({ theme }) => theme.font.caption.b16.size};
  font-weight: ${({ theme }) => theme.font.caption.b16.weight};
  line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;

export const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const Product = styled.div`
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

export const ProductImage = styled.img`
  margin-right: 20px;
  width: 95px;
  height: 95px;
  border-radius: 15px;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.p`
  margin: 0 0 10px 0;
  font-size: ${({ theme }) => theme.font.body.r17.size};
  font-weight: ${({ theme }) => theme.font.body.r17.weight};
  line-height: ${({ theme }) => theme.font.body.r17.lineHeight};
`;

export const ProductPrice = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.heading.h1.size};
  font-weight: ${({ theme }) => theme.font.heading.h1.weight};
  line-height: ${({ theme }) => theme.font.heading.h1.lineHeight};
`;
