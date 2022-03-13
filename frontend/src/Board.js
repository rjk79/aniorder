import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChartBarIcon, QuestionMarkCircleIcon, MoonIcon, SunIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import ConfettiGenerator from 'confetti-js';
import { cloneDeep } from 'lodash';

import Animal from './Animal';
import Modal from './Modal';
import Snackbar from './Snackbar.tsx';

const mockAnimals = [
  {
    name: 'Western Gaboon Viper',
    latin_name: 'Bitis rhinoceros',
    animal_type: 'Reptile',
    active_time: 'Nocturnal',
    length_min: '4',
    length_max: '6',
    weight_min: '40',
    weight_max: '45',
    lifespan: '20',
    habitat: 'Tropical forest',
    diet: 'Rodents and other small mammals',
    geo_range: 'Central Africa',
    image_link: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bitis_gabonica.jpg',
    id: 184
  },
  {
    name: 'Siamang',
    latin_name: 'Hylobates syndactylus',
    animal_type: 'Mammal',
    active_time: 'Diurnal',
    length_min: '1.90',
    length_max: '2.00',
    weight_min: '20',
    weight_max: '23',
    lifespan: '23',
    habitat: 'Tropical rainforest',
    diet: 'Primarily fruit and leaves, some invertebrates',
    geo_range: 'Malaysia and Sumatra',
    image_link: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/DPPP_5348.jpg',
    id: 162
  },
  {
    name: 'Siamang',
    latin_name: 'Hylobates syndactylus',
    animal_type: 'Mammal',
    active_time: 'Diurnal',
    length_min: '1.90',
    length_max: '2.00',
    weight_min: '20',
    weight_max: '23',
    lifespan: '23',
    habitat: 'Tropical rainforest',
    diet: 'Primarily fruit and leaves, some invertebrates',
    geo_range: 'Malaysia and Sumatra',
    image_link: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/DPPP_5348.jpg',
    id: 162
  },
  {
    name: 'Siamang',
    latin_name: 'Hylobates syndactylus',
    animal_type: 'Mammal',
    active_time: 'Diurnal',
    length_min: '1.90',
    length_max: '2.00',
    weight_min: '20',
    weight_max: '23',
    lifespan: '23',
    habitat: 'Tropical rainforest',
    diet: 'Primarily fruit and leaves, some invertebrates',
    geo_range: 'Malaysia and Sumatra',
    image_link: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/DPPP_5348.jpg',
    id: 162
  },
  {
    name: 'Siamang',
    latin_name: 'Hylobates syndactylus',
    animal_type: 'Mammal',
    active_time: 'Diurnal',
    length_min: '1.90',
    length_max: '2.00',
    weight_min: '20',
    weight_max: '23',
    lifespan: '23',
    habitat: 'Tropical rainforest',
    diet: 'Primarily fruit and leaves, some invertebrates',
    geo_range: 'Malaysia and Sumatra',
    image_link: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/DPPP_5348.jpg',
    id: 162
  }
];

const Board = () => {
  const [board, setBoard] = useState(mockAnimals);
  const [hand, setHand] = useState([]);
  const [position, setPosition] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [modal, setModal] = useState(null);
  const [modalAnimal, setModalAnimal] = useState(null);
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    setup();
  }, []);

  useEffect(() => {
    getAnimals();
  }, [board]);

  async function setup() {
    const res = await fetchAnimals();
    const resJSON = await res.json();
    setBoard(resJSON);
  }

  async function getAnimals() {
    const res = await fetchAnimals();
    const resJSON = await res.json();
    setHand(resJSON);
  }

  function fetchAnimals() {
    const request = new Request(`https://zoo-animal-api.herokuapp.com/animals/rand/1`, {
      method: 'GET'
    });

    return fetch(request);
  }

  function checkPosition(current, newBoard) {
    const positionNum = Number(position);
    const prev = positionNum - 1 >= 0 ? newBoard[positionNum - 1] : null;
    const next = positionNum + 1 <= newBoard.length - 1 ? newBoard[positionNum + 1] : null;

    if (prev && Number(prev.lifespan) > Number(current.lifespan)) return false;
    if (next && Number(next.lifespan) < Number(current.lifespan)) return false;
    return true;
  }

  function onSubmit(e) {
    e.preventDefault();

    const newBoard = cloneDeep(board);
    newBoard.splice(position, 0, hand[0]);

    if (checkPosition(hand[0], newBoard)) {
      const newHand = cloneDeep(hand);
      newHand.splice(0, 1);

      setBoard(newBoard);
      setHand(newHand);
      setFeedback('Correct!');
    } else {
      setFeedback('Wrong :(');
    }
    setPosition(null);
  }

  const modalContent =
    modal === 'animal' ? (
      <Animal
        animal={modalAnimal}
        className="h-full w-full font-bold text-2xl"
        textClassName="text-2xl"
      />
    ) : modal === 'instructions' ? (
      <>
        <div className="font-bold text-2xl">Instructions:</div>
        <div>Try to order the animals by lifespan!</div>
        <div>
          Click on the <strong>bottom</strong> of an animal card to view its info
        </div>
        <div>
          Click on the <strong>top</strong> of an animal card to place your animal after it
        </div>
        <div>
          Confirm your choice by clicking <strong>Submit</strong>
        </div>
      </>
    ) : null;

  return (
    <div
      className={classNames('relative w-full h-screen ', {
        dark: nightMode
      })}>
      <div className="h-full w-full p-5 dark:bg-slate-900 dark:text-white">
        <div className="flex justify-between items-center">
          <h1 className="header text-2xl font-bold dark:text-sky-400">Aniorder</h1>
          <div className="flex space-x-4 items-center">
            <div
              className={classNames(
                'relative h-4 w-8 flex items-center rounded-lg cursor-pointer',
                {
                  'bg-sky-200': nightMode,
                  'bg-gray-200': !nightMode
                }
              )}
              onClick={() => setNightMode(!nightMode)}>
              <div
                className={classNames(
                  '-left-2 absolute h-5 w-5 flex items-center justify-center rounded-full transition',
                  {
                    'transform translate-x-6': nightMode,
                    'bg-sky-400': nightMode,
                    'bg-gray-400': !nightMode
                  }
                )}>
                {nightMode ? (
                  <MoonIcon className="h-4 w-4" />
                ) : (
                  <SunIcon className="h-4 w-4 text-white" />
                )}
              </div>
            </div>
            {/* <ChartBarIcon
            className="h-7 w-7 cursor-pointer"
            onClick={() => setModal('high-scores')}
          /> */}
            <QuestionMarkCircleIcon
              className="h-7 w-7 cursor-pointer"
              onClick={() => setModal('instructions')}
            />
          </div>
        </div>
        <div>
          <span>
            Streak: <strong> {board.length}</strong>
          </span>
        </div>
        <div>
          <div className="text-2xl font-bold">Board:</div>
          <div className="flex space-x-2 flex-wrap space-y-2">
            {board.map((animal, index) => (
              <div key={index} className="flex space-x-2">
                {!index && (
                  <div
                    onClick={() => setPosition(0)}
                    className={classNames(
                      'text-gray-400 h-40 w-28 border border-black rounded-lg',
                      {
                        'border-yellow-500 border-2': position === 0,
                        'border-black border': position !== 0
                      }
                    )}>
                    Pick me if you want to make your animal first
                  </div>
                )}
                <Animal
                  className={classNames('h-40 w-28 font-bold', {
                    'border-yellow-500 border-2': position - 1 === index,
                    'border-black border': position - 1 !== index
                  })}
                  imageSize="h-20 w-20"
                  animal={animal}
                  revealed={true}
                  onLowerClick={() => {
                    setModal('animal');
                    setModalAnimal(animal);
                  }}
                  onUpperClick={() => setPosition(index + 1)}
                  textClassName="text-sm h-12 leading-3"
                />
              </div>
            ))}
          </div>
        </div>
        {position !== null && (
          <button
            className="rounded-lg bg-emerald-400 max-w-min flex justify-center p-2"
            onClick={onSubmit}>
            Submit
          </button>
        )}
        <hr className="m-0 border-t border-gray-700 my-5" />
        <div>
          <div className="text-2xl font-bold">Current Animal:</div>
          <div className="flex space-x-2">
            {hand.map((animal, index) => (
              <Animal
                className="h-40 w-28 border font-bold border-black"
                imageSize="h-20 w-20"
                key={index}
                animal={animal}
                onLowerClick={() => {
                  setModal('animal');
                  setModalAnimal(animal);
                }}
                onUpperClick={() => {
                  setModal('animal');
                  setModalAnimal(animal);
                }}
                textClassName="text-sm h-12 leading-3"
              />
            ))}
          </div>
        </div>
        <div className="text-xl text-red-400">{feedback}</div>

        <Modal closeModal={() => setModal(null)} modal={modal}>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

export default Board;
