import React from 'react';
import classNames from 'classnames';

const Button = ({ label, className, onClick }) => {
  return (
    <div className={classNames('hover:opacity-90 cursor-pointer', className)} onClick={onClick}>
      {label}
    </div>
  );
};

export default Button;
