import styled from "styled-components";

export const ShopListContainer = styled.div`
  margin: 0 auto;
  padding: 40px 24px;
  max-width: 1200px;
  width: calc(100% - 48px);
`;

export const HeaderNavigation = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  width: 100%;
`;

export const Logo = styled.img`
  width: 152px;
  height: 32px;
`;

export const InputContainer = styled.div`
  margin-bottom: 40px;
  position: relative;
  border: 1px solid #dddcdf;
  border-radius: 49px;
`;

export const OrderbyContainer = styled.div`
  display: inline-block;
  margin-bottom: 32px;
  cursor: pointer;
`;

export const OrderbyText = styled.span`
  font-size: ${({ theme }) => theme.font.body.b18.size};
  font-weight: ${({ theme }) => theme.font.body.b18.weight};
  line-height: ${({ theme }) => theme.font.body.b18.lineHeight};
`;

export const OrderbyIcon = styled.img`
  width: 12px;
  height: 12px;
`;

export const SearchInput = styled.input`
  padding: 17px 0 17px 56px;
  width: calc(100% - 56px);
  border: none;
  border-radius: 49px;
  font-size: ${({ theme }) => theme.font.body.r18.size};
  font-weight: ${({ theme }) => theme.font.body.r18.weight};
  line-height: ${({ theme }) => theme.font.body.r18.lineHeight};
`;

export const SearchIcon = styled.img`
  width: 23px;
  height: 23px;
  position: absolute;
  top: 16px;
  left: 20px;
`;

export const ShopList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export const NoDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 68px;
  width: 100%;
`;

export const NoDataMessage = styled.span`
  text-align: center;
  font-size: ${({ theme }) => theme.font.body.m17.size};
  font-weight: ${({ theme }) => theme.font.body.m17.weight};
  line-height: ${({ theme }) => theme.font.body.m17.lineHeight};
`;

export const NoDataImage = styled.img`
  margin-bottom: 32px;
  width: 375px;
  height: 182px;
`;

export const LoadingContainer = styled.div`
  margin-top: 24px;
`;
