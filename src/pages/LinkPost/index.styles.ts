import styled from "styled-components";

export const LinkPostContainer = styled.div`
  margin: 0 auto;
  padding: 40px 24px;
  max-width: 1200px;
  width: calc(100% - 48px);
`;

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

export const ProductFormContainer = styled.div`
  margin: 0 auto 30px;
  padding: 22px 28px;
  max-width: calc(696px - 56px);
  width: calc(100% - 56px);
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.white100};
`;

export const DeleteButton = styled.div`
  display: flex;
  justify-content: start;
  margin-bottom: 12px;
`;

export const InputContainer = styled.div`
  padding: 20px 0;
`;

export const passwordInputContainer = styled(InputContainer)`
  padding-bottom: 0;
`;

export const TopLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 40px auto 16px auto;
  max-width: 696px;
  width: 100%;
`;

export const representativeProduct = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.caption.b16.size};
  font-weight: ${({ theme }) => theme.font.caption.b16.weight};
  line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
  color: ${({ theme }) => theme.colors.black};
`;

export const AddProductText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.font.caption.b16.size};
  font-weight: ${({ theme }) => theme.font.caption.b16.weight};
  line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
  color: ${({ theme }) => theme.colors.brandBlue};
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  margin: 72px auto 0;
  max-width: 696px;
  width: 100%;
`;
