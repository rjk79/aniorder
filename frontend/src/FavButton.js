import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

function FavButton(props) {
  const { image, name, setAvatar } = props;
  const [favClicked, updateFavClicked] = useState(false);

  function toggleFavorite() {
    updateFavClicked(true);
    localStorage.setItem('favorite_img', image);
    localStorage.setItem('favorite_name', name);
    setAvatar(image);
  }

  return (
    <div onClick={toggleFavorite} className="cursor-pointer items-center">
      <StarIcon
        className={classNames('w-7 h-7 cursor-pointer inline-block m-1.5', {
          'text-blue-500': favClicked,
          'text-gray-300': !favClicked
        })}
      />
      <div
        className={classNames('inline-block text-xs', {
          'text-blue-500': favClicked,
          'text-gray-300': !favClicked
        })}>
        {favClicked ? 'Saved' : 'Save'} as Avatar
      </div>
    </div>
  );
}

export default FavButton;
