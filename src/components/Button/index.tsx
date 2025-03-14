import React from "react";
import * as styles from "./index.styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "Primary" | "Secondary";
  size: "small" | "medium" | "large";
  width?: number;
}

const Button = ({
  children,
  variant = "Primary",
  size = "medium",
  width,
  ...rest
}: ButtonProps) => {
  return (
    <styles.StyledButton $variant={variant} size={size} width={width} {...rest}>
      {children}
    </styles.StyledButton>
  );
};

export default Button;
