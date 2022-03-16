import React, { useState, useEffect } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';

const CollectionModalContent = ({ collection }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [names, setNames] = useState(null);

  useEffect(() => {
    getNames();
  }, []);

  async function getNames() {
    const res = await fetchNames();
    const resJSON = await res.json();

    const names = {};
    resJSON.results.forEach((result) => {
      const splitRes = result.url.split('/');
      const key = splitRes[splitRes.length - 2];
      names[key] = result.name;
    });

    setNames(names);
  }

  function fetchNames() {
    const request = new Request('https://pokeapi.co/api/v2/pokemon?limit=898', {
      method: 'GET'
    });

    return fetch(request);
  }

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
      items.push(
        <div key={id} className="relative">
          <img
            onClick={() => {
              if (hoveredId === id) {
                setHoveredId(null);
              } else {
                setHoveredId(id);
              }
            }}
            src={collectionMap[id]}
            className="h-16 w-16"
          />
          {hoveredId === id && (
            <div className="flex-col text-xs rounded-full flex items-center justify-center capitalize bg-black opacity-70 text-white h-full w-full absolute top-0 left-0 pointer-events-none">
              <div>#{id}</div>
              <div>{names[id]}</div>
            </div>
          )}
        </div>
      );
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
