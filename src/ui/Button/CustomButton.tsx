import React from "react";
import classNames from "classnames";
import styles from "./CustomButton.module.scss";

interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  size = "medium",
  className,
}) => {
  const baseClasses = styles.customButton;
  const sizeClasses = styles[`customButtonSize${size}` as keyof typeof styles];

  const classes = classNames(baseClasses, sizeClasses, className);

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
