import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const Animal = ({
  animal,
  revealed,
  onClick,
  className,
  imageSize,
  textClassName,
  onSubmit,
  details,
  order,
  animalKind
}) => {
  const unitMap = {
    lifespan: 'years',
    weight_max: 'lbs.',
    length_max: 'ft.',
    weight: 'lbs.',
    height: 'ft.'
  };

  const image =
    animalKind === 'animal'
      ? animal.image_link
      : animal.sprites?.other?.['official-artwork']?.front_default;

  return (
    <div
      className={classNames('relative flex flex-col items-center rounded-lg bg-white', className)}
      onClick={onClick}>
      {image && (
        <div className={classNames('relative overflow-hidden rounded-t-lg', imageSize, {})}>
          <img src={image} className="h-full w-full object-cover" />
          {revealed && (
            <div
              className={classNames(
                'w-full text-center text-sm absolute bg-black bg-opacity-50 text-white top-0'
              )}>
              {animal[order]} {unitMap[order]}
            </div>
          )}
        </div>
      )}
      <div
        className={classNames(
          'inline-block text-center line-clamp-4 dark:text-black capitalize',
          textClassName
        )}>
        {animal.name}
      </div>
      {details && (
        <>
          <div
            className={classNames(
              'italic inline-block text-center line-clamp-4 font-normal text-sm'
            )}>
            {animal.latin_name}
          </div>
          {image && (
            <a
              href={image}
              target="_blank"
              className={classNames(
                'text-xs font-normal underline inline-block text-center line-clamp-4 dark:text-black'
              )}
              rel="noreferrer">
              see full image
            </a>
          )}
        </>
      )}
      {onSubmit && (
        <button
          className="my-4 font-medium rounded-lg bg-sky-500 text-white flex text-base justify-center items-center px-4 py-2 border-0"
          onClick={onSubmit}>
          {animal.name
            ? 'Place Your Animal to the Right of This'
            : 'Place your Animal First in Line'}
        </button>
      )}
    </div>
  );
};

export default Animal;
