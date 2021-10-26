import React from 'react';
import style from './IconButton.module.css';

interface IconButtonProps {
  onClick?: () => void;
}

// TODO: Refactor this component to use MUI
const IconButton: React.FC<IconButtonProps> = ({ onClick, children }) => (
  <button className={style.iconButton} onClick={onClick}>
    {children}
  </button>
);

export { IconButton };
