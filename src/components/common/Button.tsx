import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: string;
  btnType: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ type, btnType, children, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[btnType]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
