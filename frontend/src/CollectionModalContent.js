import React, { useState, useEffect } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { Switch } from '@headlessui/react';

const CollectionModalContent = ({ collection }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [names, setNames] = useState(null);
  const [foundOnly, setFoundOnly] = useState(false);

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

  function getItems() {
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
              <div className="flex-col text-xs rounded-lg flex items-center justify-center capitalize bg-black opacity-70 text-white h-full w-full absolute top-0 left-0 pointer-events-none">
                <div>#{id}</div>
                <div>{names[id]}</div>
              </div>
            )}
          </div>
        );
      } else if (!foundOnly) {
        items.push(
          <div
            key={id}
            className="flex items-center justify-center rounded-full h-16 w-16 bg-black text-white font-bold">
            {id}
          </div>
        );
      }
    }

    return [items, ids];
  }

  return (
    <div>
      <div className="flex justify-between items-center text-2xl w-full p-5 bg-gradient-to-tr from-red-700 to-red-100">
        <div className="text-white font-bold">Pokédex</div>
        <div className="font-medium text-sm">
          {getItems()[1].length}
          {'/'}898
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-medium text-sm">Show Found Only</div>
          <Switch
            checked={foundOnly}
            onChange={setFoundOnly}
            className={`${
              foundOnly ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}>
            <span className="sr-only">Show Found Only</span>
            <span
              className={`${
                foundOnly ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transition transform bg-white rounded-full`}
            />
          </Switch>
        </div>
      </div>
      <div className="flex flex-wrap h-96 overflow-y-auto">{getItems()[0]}</div>
    </div>
  );
};

export default CollectionModalContent;
