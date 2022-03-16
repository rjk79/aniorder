import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';

const CollectionModalContent = ({ collection }) => {
  const collectionMap = {};

  collection.forEach((imageUrl) => {
    const splitUrl = imageUrl.split('/');
    const lastUrlPart = splitUrl[splitUrl.length - 1];
    const id = lastUrlPart.split('.')[0];
    collectionMap[id] = imageUrl;
  });

  const items = [];
  const ids = Object.keys(collectionMap).map((key) => Number(key));

  for (let id = 1; id < 899; id++) {
    if (ids.includes(id)) {
      items.push(<img key={id} src={collectionMap[id]} className="h-16 w-16" />);
    } else {
      items.push(<QuestionMarkCircleIcon key={id} className="h-16 w-16" />);
    }
  }
  return (
    <div>
      <div className="flex justify-between items-center text-2xl w-full p-5 bg-gradient-to-tr from-white to-red-700">
        <div className=" font-bold">Pokedex</div>
        <div className="font-normal text-sm">
          {ids.length}
          {'/'}898
        </div>
      </div>
      <div className="flex flex-wrap h-96 overflow-y-auto">{items}</div>
    </div>
  );
};

export default CollectionModalContent;
