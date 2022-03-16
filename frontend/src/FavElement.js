import React, { useState } from "react";
import classNames from 'classnames';

function FavElement() {
  const [hideLarger, updateHideLarger] = useState(true);

  const img = localStorage.getItem("favorite_img");
  const name = localStorage.getItem("favorite_name");

  function showLargerImage() {
    updateHideLarger(false);
  }
  function hideLargerImage() {
    updateHideLarger(true);
  }

  return (
    <div>
      <div
        className={classNames('fixed inset-0 max-w-full max-h-full cursor-pointer z-50 flex items-center justify-center flex-wrap bg-black', {'hidden' : hideLarger})}
        onClick={hideLargerImage}
      >
        <div className={'bg-white w-3/4 flex items-center justify-center flex-wrap rounded-t-lg rounded-b-lg'}>
          <div className={'text-center leading-4 text-2xl basis-full m-2.5'}>{name}</div>
          <img
            src={img}
            className={'w-96 h-96 overflow-hidden object-cover max-w-full max-h-full m-2.5'}
          />
        </div>
      </div>
      <img
        src={img}
        className={'relative overflow-hidden h-12 w-12 object-cover cursor-pointer rounded-full border border-slate-400'}
        onClick={showLargerImage}
      />
    </div>

  );
}

export default FavElement;
