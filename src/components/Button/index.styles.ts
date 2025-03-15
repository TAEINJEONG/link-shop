import styled, { css } from "styled-components";

export const StyledButton = styled.button<{
  $variant: "Primary" | "Secondary" | "Danger";
  size: "small" | "medium" | "large";
  width?: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  width: ${({ width }) => (width ? `${width}px` : `100%`)};

  ${({ size }) => {
    switch (size) {
      case "small":
        return css`
          font-size: ${({ theme }) => theme.font.caption.sb14.size};
          font-weight: ${({ theme }) => theme.font.caption.m15.weight};
          line-height: ${({ theme }) => theme.font.caption.sb14.lineHeight};
          padding: 7px 12px;
          border-radius: 8px;
        `;
      case "medium":
        return css`
          font-size: ${({ theme }) => theme.font.caption.sb15.size};
          font-weight: ${({ theme }) => theme.font.caption.sb15.weight};
          line-height: ${({ theme }) => theme.font.caption.m15.lineHeight};
          padding: 9px 21px;
          border-radius: 37px;
        `;
      case "large":
        return css`
          font-size: ${({ theme }) => theme.font.body.sb17.size};
          font-weight: ${({ theme }) => theme.font.body.sb17.weight};
          line-height: ${({ theme }) => theme.font.caption.b16.lineHeight};
          padding: 12px 20px;
          border-radius: 37px;
        `;
      default:
        return "";
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case "Primary":
        return css`
          background-color: ${({ theme }) => theme.colors.brandBlue};
          color: white;
        `;
      case "Danger":
        return css`
          background-color: ${({ theme }) => theme.colors.brandRed};
          color: white;
        `;
      case "Secondary":
        return css`
          background-color: transparent;
          color: ${({ theme }) => theme.colors.brandBlue};
          border: 1px solid ${({ theme }) => theme.colors.brandBlue};
        `;
      default:
        return "";
    }
  }}

  &:disabled {
    pointer-events: none;
    background-color: ${({ theme }) => theme.colors.gray200};
  }
  &:active {
    transform: scale(0.95);
    transition: transform 0.01s ease-in-out;
  }
`;
