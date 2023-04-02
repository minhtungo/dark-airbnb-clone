import { FC } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: FC<ButtonProps> = ({ label }) => {
  return <button>{label}</button>;
};

export default Button;
