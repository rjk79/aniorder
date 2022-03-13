import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Animal = ({
  animal,
  revealed,
  onLowerClick,
  onUpperClick,
  className,
  imageSize,
  textClassName
}) => {
  return (
    <div
      className={classNames(
        'relative flex flex-col justify-center items-center rounded-lg',
        className
      )}>
      <div
        onClick={onUpperClick}
        className="bg-opacity-0 absolute h-1/2 top-0 w-full bg-red-100 z-10"></div>
      <div
        onClick={onLowerClick}
        className="bg-opacity-0 absolute h-1/2 top-1/2 w-full bg-blue-100 z-10"></div>
      <div className={classNames('inline-block text-center', textClassName)}>{animal.name}</div>
      {revealed && <div className={classNames('text-sm')}>{animal.lifespan} years</div>}
      <div className={classNames('overflow-hidden rounded-lg', imageSize, {})}>
        <img src={animal.image_link} className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default Animal;
