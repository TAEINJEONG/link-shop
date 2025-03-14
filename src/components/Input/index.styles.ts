import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.font.caption.sb14.size};
  color: ${({ theme }) => theme.colors.black};
`;

export const StyledInput = styled.input`
  padding-right: 40px;
  font-size: ${({ theme }) => theme.font.body.r17.size};
  border: 0;
  outline: none;
  background-color: transparent;

  &::placeholder {
    font-size: ${({ theme }) => theme.font.body.r17.size};
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

export const StyledErrorMessage = styled.span`
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  color: ${({ theme }) => theme.colors.brandRed};
`;

export const PasswordToggleIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translatey(-50%);
`;
