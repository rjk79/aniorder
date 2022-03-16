import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import FavButton from './FavButton';

import Button from './Button.tsx';

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
    height: 'ft.',
    total_power: '⚡'
  };

  const image =
    animalKind === 'animal'
      ? animal.image_link
      : animal.sprites?.other?.['official-artwork']?.front_default;

  const revealedValue =
    order === 'height'
      ? (animal[order] / 3.048).toFixed(2)
      : order === 'weight'
      ? (animal[order] / 4.536).toFixed(2)
      : animal[order];

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
              {revealedValue} {unitMap[order]}
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
          {animal.types && (
            <div
              className={classNames(
                'italic inline-block text-center line-clamp-4 font-normal text-sm'
              )}>
              {animal.types.map((type) => type.type.name).join(', ')}
            </div>
          )}
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
          {image && <FavButton img={image} name={animal.name}/>}
        </>
      )}
      {onSubmit && (
        <Button
          className="my-4 font-medium rounded-lg bg-sky-500 text-white flex text-base justify-center items-center px-4 py-2 border-0"
          onClick={onSubmit}
          label={
            animal.name
              ? 'Place Your Animal to the Right of This'
              : 'Place your Animal First in Line'
          }
        />
      )}
    </div>
  );
};

export default Animal;
