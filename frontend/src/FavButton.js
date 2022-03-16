import React, { useState } from "react";
import { StarIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

function FavButton(props) {
  const { img, name } = props;
  const [favClicked, updateFavClicked] = useState(false);

  function toggleFavorite() {
    updateFavClicked(true);
    localStorage.setItem("favorite_img", img);
    localStorage.setItem("favorite_name", name);
  }
  return (
    <div>
      <StarIcon
        className={classNames('w-7 h-7 cursor-pointer inline-block m-1.5', {'text-blue-500' : favClicked})}
        onClick={toggleFavorite}
      />
      <div className={classNames('inline-block text-xs', {'text-blue-500' : favClicked})}>Save as Avatar</div>
    </div>
  );
}

export default FavButton;
