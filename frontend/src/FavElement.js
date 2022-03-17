import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

function FavElement({ avatar }) {
  const [hideLarger, setHideLarger] = useState(true);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    const image = localStorage.getItem('favorite_img');
    const name = localStorage.getItem('favorite_name');

    setImage(image);
    setName(name);
  }, [avatar]);

  return (
    <div>
      <div
        className={classNames(
          'fixed inset-0 max-w-full max-h-full cursor-pointer z-50 flex items-center justify-center flex-wrap bg-black',
          { hidden: hideLarger }
        )}
        onClick={() => setHideLarger(true)}>
        <div
          className={
            'bg-white w-3/4 flex items-center justify-center flex-wrap rounded-t-lg rounded-b-lg'
          }>
          <div className={'text-center leading-4 text-2xl basis-full m-2.5'}>{name}</div>
          <img
            src={image}
            className={'w-96 h-96 overflow-hidden object-cover max-w-full max-h-full m-2.5'}
          />
        </div>
      </div>
      <img
        src={image}
        className={
          'relative overflow-hidden h-12 w-12 object-cover cursor-pointer rounded-full border border-slate-400'
        }
        onClick={() => setHideLarger(false)}
      />
    </div>
  );
}

export default FavElement;
