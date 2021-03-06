import React from 'react';
import classNames from 'classnames';

const Button = ({ label, className, onClick }) => {
  return (
    <button
      className={classNames('outline-0 hover:opacity-90 cursor-pointer', className)}
      onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
