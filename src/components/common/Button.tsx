import { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: string;
  type: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({ type, children, onClick }: ButtonProps) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
