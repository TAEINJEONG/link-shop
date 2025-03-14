import styled from "styled-components";

export const ShopInfoContainer = styled.div`
  padding: 24px;
  width: calc(50% - 60px);
  border-radius: 25px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white100};

  @media only screen and (max-width: 1199px) {
    width: 100%;
  }

  @media only screen and (max-width: 744px) {
    width: 100%;
    overflow: scroll;
  }
`;

export const ShopInfoHeaderSection = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ShopInfoHeaderLeft = styled.div`
  display: flex;
`;

export const ShopImage = styled.img`
  margin-right: 15px;
  width: 60px;
  height: 60px;
  border-radius: 99px;
`;

export const ShopTextSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6.5px 0;
`;

export const ShopName = styled.span`
  margin-bottom: 7px;
  font-size: ${({ theme }) => theme.font.body.b18.size};
  font-weight: ${({ theme }) => theme.font.body.sb17.weight};
  line-height: ${({ theme }) => theme.font.body.sb17.lineHeight};
`;

export const ShopHandle = styled.span`
  font-size: ${({ theme }) => theme.font.caption.r16.size};
  font-weight: ${({ theme }) => theme.font.caption.r16.weight};
  line-height: ${({ theme }) => theme.font.caption.r16.lineHeight};
  color: ${({ theme }) => theme.colors.gray300};
`;

export const ShopInfoHeaderRight = styled.div`
  display: flex;
  align-items: end;
  cursor: pointer;
`;

export const LikeIcon = styled.img`
  margin-right: 6px;
`;

export const LikeCount = styled.span`
  font-size: ${({ theme }) => theme.font.caption.b16.size};
  font-weight: ${({ theme }) => theme.font.caption.m16.weight};
  line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
`;

export const ShopInfoProductList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProductCount = styled.span`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.font.caption.sb15.size};
  font-weight: ${({ theme }) => theme.font.caption.m15.weight};
  line-height: ${({ theme }) => theme.font.caption.sb15.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;

export const productImageList = styled.div`
  display: flex;
  gap: 12px;

  @media only screen and (max-width: 744px) {
    overflow: scroll;
  }
`;

export const ProductImage = styled.img`
  width: 95px;
  height: 95px;
  border-radius: 15px;
`;
