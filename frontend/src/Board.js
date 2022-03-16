import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
  MoonIcon,
  SunIcon,
  RefreshIcon,
  CheckIcon,
  PencilIcon,
  ViewListIcon
} from '@heroicons/react/solid';
import classNames from 'classnames';
import { cloneDeep } from 'lodash';

import CollectionModalContent from './CollectionModalContent.js';
import Button from './Button.tsx';
import Animal from './Animal';
import Modal from './Modal';
import Snackbar from './Snackbar.tsx';
import { Listbox, RadioGroup } from '@headlessui/react';

const MOCKS = false;

const mockAnimals = [
  {
    name: 'Western Monkey Spotted Gaboon Viper',
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
    name: 'Ring-tailed Lemur',
    latin_name: 'Lemur catta',
    animal_type: 'Mammal',
    active_time: 'Diurnal',
    length_min: '1.3',
    length_max: '1.5',
    weight_min: '5',
    weight_max: '8',
    lifespan: '16',
    habitat: 'Forest',
    diet: 'Fruit, leaves, flowers and insects',
    geo_range: 'Southern and Southwestern Madagascar',
    image_link:
      'https://upload.wikimedia.org/wikipedia/commons/0/0b/Ring-tailed_lemur_%28Lemur_catta%29.jpg',
    id: 151
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

const GAME_LOST = 'Play again?';

const Board = () => {
  const [board, setBoard] = useState([]);
  const [hand, setHand] = useState([]);
  const [position, setPosition] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [modal, setModal] = useState(null);
  const [modalAnimal, setModalAnimal] = useState(null);
  const [nightMode, setNightMode] = useState(false);
  const [order, setOrder] = useState('lifespan');
  const [selectedOrder, setSelectedOrder] = useState('lifespan');
  // const [strikes, setStrikes] = useState(0);
  const [strikes, setStrikes] = useState(4);
  const [chosenName, setChosenName] = useState('');
  const [scores, setScores] = useState([]);
  const [selectedAnimalKind, setSelectedAnimalKind] = useState('animal');
  const [animalKind, setAnimalKind] = useState('animal');
  const [submittedName, setSubmittedName] = useState(false);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getScores();
    setup();
    fetchCollection();
  }, []);

  useEffect(() => {
    setupHand();
  }, [board]);

  useEffect(() => {
    if (selectedAnimalKind === 'animal') {
      setSelectedOrder('lifespan');
    } else {
      setSelectedOrder('weight');
    }
  }, [selectedAnimalKind]);

  useEffect(() => {
    if (selectedAnimalKind === 'animal') {
      setSelectedOrder('lifespan');
    } else {
      setSelectedOrder('weight');
    }
  }, [selectedAnimalKind]);

  function setup() {
    setupBoard();
    setupHand();
    setModal(null);
    setStrikes(0);
  }

  async function setupBoard() {
    if (MOCKS) {
      setBoard(mockAnimals);
    } else {
      const res = await fetchAnimals();
      const animal = await res.json();

      if (selectedAnimalKind !== 'animal') {
        animal.total_power = getTotalPower(animal);
      }

      setBoard(selectedAnimalKind === 'animal' ? animal : [animal]);
    }
  }

  function fetchCollection() {
    const collection = localStorage.getItem('collection');
    if (collection) {
      setCollection(collection.split(','));
    }
  }

  function saveCollection() {
    const collectionStr = collection.join(',');
    const boardImages = board.map((animal) => animal.sprites.front_default);
    const filteredImages = boardImages.filter((image) => !collection.includes(image));
    const boardStr = boardImages.join(',');
    const newCollection = collectionStr.concat(boardStr);

    setCollection(newCollection.split(','));
    localStorage.setItem('collection', newCollection);
  }

  async function setupHand() {
    if (MOCKS) {
      setHand([mockAnimals[0]]);
    } else {
      const res = await fetchAnimals();
      const animal = await res.json();

      if (selectedAnimalKind !== 'animal') {
        animal.total_power = getTotalPower(animal);
      }

      setHand(selectedAnimalKind === 'animal' ? animal : [animal]);
    }
  }

  function fetchAnimals() {
    const randomIndex = Math.floor(Math.random() * 899);
    const url =
      selectedAnimalKind === 'animal'
        ? 'https://zoo-animal-api.herokuapp.com/animals/rand/1'
        : `https://pokeapi.co/api/v2/pokemon/${randomIndex}`;

    const request = new Request(url, {
      method: 'GET'
    });

    return fetch(request);
  }

  function checkPosition(current, newBoard) {
    const positionNum = Number(position);
    const prev = positionNum - 1 >= 0 ? newBoard[positionNum - 1] : null;
    const next = positionNum + 1 <= newBoard.length - 1 ? newBoard[positionNum + 1] : null;

    if (prev && Number(prev[order]) > Number(current[order])) return false;
    if (next && Number(next[order]) < Number(current[order])) return false;
    return true;
  }

  function onSubmit(e) {
    if (strikes === 5) return;

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
      const newStrikes = strikes + 1;
      if (newStrikes === 5) {
        setFeedback(GAME_LOST);
        saveScore(board.length);
        setStrikes(newStrikes);

        if (animalKind !== 'animal') {
          saveCollection();
        }
      } else {
        setStrikes(newStrikes);
        setFeedback('Try again');
      }
    }
    setPosition(null);
    setModal(null);
  }

  async function getScores() {
    const res = await axios.get('/api/scores');
    setScores(res.data);
  }

  async function saveScore(streak) {
    const existingScore = scores.find(
      (score) => score.name.toLowerCase() === chosenName.toLowerCase()
    );
    if (chosenName && existingScore && existingScore.value < streak) {
      axios
        .patch(`/api/scores/${existingScore._id}`, {
          value: String(streak)
        })
        .then(() => getScores());
    } else if (chosenName && !existingScore) {
      axios
        .post('/api/scores', {
          name: chosenName,
          value: String(streak)
        })
        .then(() => getScores());
    }
  }

  function formatParam(param) {
    const original = param.replace(/_/g, ' ').split(' ');
    const reversed = original.reverse();
    return reversed.join(' ');
  }

  function getTotalPower(animal) {
    return animal.stats.reduce((acc, curr) => acc + curr.base_stat, 0);
  }

  const orderOptions =
    selectedAnimalKind === 'animal'
      ? ['lifespan', 'weight_max', 'length_max']
      : ['weight', 'height', 'total_power'];

  const modalContent = ['animal', 'board-animal'].includes(modal) ? (
    <Animal
      animal={modalAnimal}
      className="h-full w-full font-bold text-2xl"
      textClassName="text-2xl"
      imageSize="h-80 w-80"
      {...(modal === 'board-animal' ? { onSubmit } : {})}
      details={true}
      animalKind={animalKind}
    />
  ) : modal === 'instructions' ? (
    <>
      <div className="font-bold text-2xl">Instructions:</div>
      <div>
        Try to order the animals by <strong>lifespan, size, or weight!</strong>
      </div>
      <div>- Click on an animal card to select it</div>
      <div>
        - Click on the submit button to try to place your animal directly after your selection
      </div>
      <div>(You can keep placing animals until you guess incorrectly 5 times)</div>
    </>
  ) : modal === 'new-game' ? (
    <>
      <RadioGroup value={selectedOrder} onChange={setSelectedOrder} className="space-y-2">
        <RadioGroup.Label className="text-2xl">Order By:</RadioGroup.Label>
        {orderOptions.map((param, index) => (
          <RadioGroup.Option key={index} value={param}>
            {({ checked, active }) => (
              <div
                className={classNames('flex', {
                  'ring-0 border-0': active
                })}>
                <div className="h-6 w-6 rounded-full bg-pink-500 mr-2 flex justify-center items-center shrink-0">
                  {checked && <CheckIcon className="h-5 w-5 text-white" />}
                </div>
                <span className="capitalize">{formatParam(param)}</span>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>

      <div className="space-y-2 flex flex-col">
        <div className="block self-end">
          <Listbox value={selectedAnimalKind} onChange={setSelectedAnimalKind}>
            <Listbox.Button className="capitalize opacity-0 border border-gray-700 hover:opacity-100">
              {selectedAnimalKind}
            </Listbox.Button>
            <Listbox.Options className="absolute bg-white">
              {['animal', 'poke'].map((kind, index) => (
                <Listbox.Option key={index} value={kind}>
                  {({ active }) => (
                    <div className={classNames('capitalize', { 'bg-blue-500': active })}>
                      {kind}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        <Button
          className="w-40 font-medium rounded-lg bg-pink-500 text-white flex text-base justify-center items-center px-2 py-2 border-0"
          onClick={() => {
            setOrder(selectedOrder);
            setAnimalKind(selectedAnimalKind);
            setup();
          }}
          label="Start New Game"
        />
      </div>
    </>
  ) : modal === 'high-scores' ? (
    <div className="space-y-4">
      <div className="font-bold text-2xl">High Scores</div>
      <div className="divide-y-2 divide-blue-100">
        {scores.slice(0, 4).map((score, index) => (
          <div key={index} className="py-2 flex">
            <div className="shrink-0">
              {index + 1}
              {`.`}
              {index === 0 && <>🥇</>}
              {index === 1 && <>🥈</>}
              {index === 2 && <>🥉</>}
            </div>
            <span className="ml-2 flex justify-between w-full">
              <span className="inline-block font-bold text-base uppercase">{score.name}</span>
              <span className="font-bold text-base">{score.value}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  ) : modal === 'collection' ? (
    <>
      <CollectionModalContent collection={collection} />
    </>
  ) : null;

  function getSpriteLine(animals, bounce) {
    return (
      <div className="flex gap-2 flex-wrap">
        {animals.map((animal, index) => (
          <div
            key={index}
            className={classNames('overflow-hidden rounded-t-lg h-16 w-16', {
              'animate-bounce ': bounce
            })}>
            <img src={animal.sprites.front_default} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={classNames('relative w-full min-h-screen', {
        dark: nightMode
      })}>
      <div className="h-full w-full min-h-screen p-2 dark:bg-slate-900 dark:text-white">
        <div className="flex justify-between items-center">
          <h1 className="header text-2xl font-bold dark:text-sky-400">Aniorder 🦁</h1>
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
            <ChartBarIcon
              className="h-7 w-7 cursor-pointer"
              onClick={() => setModal('high-scores')}
            />
            <QuestionMarkCircleIcon
              className="h-7 w-7 cursor-pointer"
              onClick={() => setModal('instructions')}
            />
            {animalKind !== 'animal' && (
              <ViewListIcon
                className="h-7 w-7 cursor-pointer"
                onClick={() => setModal('collection')}
              />
            )}
            <div className="relative">
              {strikes === 5 && (
                <div className="animate-ping bg-sky-500 pointer-events-none rounded-full w-full h-full absolute bg-opacity-50"></div>
              )}
              <RefreshIcon
                className="h-7 w-7 cursor-pointer"
                onClick={() => setModal('new-game')}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <span className="capitalize">
            Ordering By: <strong> {formatParam(order)}</strong>
          </span>
          <span>
            Streak: <strong> {board.length}</strong>
          </span>
          <span
            className={classNames({
              'text-red-500': strikes === 5
            })}>
            Strikes: <strong> {strikes}</strong>
          </span>
        </div>
        {strikes === 5 && animalKind !== 'animal' && getSpriteLine(board, true)}
        <div>
          <div className="flex flex-wrap mb-48">
            {board.map((animal, index) => (
              <div key={index} className="flex mb-2">
                {!index && (
                  <div
                    className={classNames(
                      'flex justify-center items-center border border-gray-200 text-center hover:shadow-lg font-semibold p-2 mr-2 text-white bg-sky-500 h-40 w-28 rounded-lg cursor-pointer dark:border-sky-500 transform hover:scale-110 transition',
                      {}
                    )}
                    onClick={() => {
                      setModal('board-animal');
                      setModalAnimal({});
                      setPosition(0);
                    }}>
                    Place Your Animal First in Line
                  </div>
                )}
                <Animal
                  className={classNames(
                    'mr-2 h-40 w-28 font-semibold border border-gray-200 dark:border-sky-500 cursor-pointer transform hover:scale-110 hover:z-10 hover:shadow-lg transition',
                    {}
                  )}
                  imageSize="h-28 w-28"
                  animal={animal}
                  revealed={true}
                  onClick={() => {
                    setModal('board-animal');
                    setModalAnimal(animal);
                    setPosition(index + 1);
                  }}
                  textClassName="text-sm leading-4"
                  order={order}
                  animalKind={animalKind}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="z-20 fixed w-full left-0 bottom-0 px-2 py-2 flex justify-between items-center bg-white bg-opacity-70 border-t border-gray-300 dark:bg-slate-900 dark:bg-opacity-70">
          <div className="">
            <div className="text-xl font-bold">Your Animal</div>
            <div className="flex space-x-2 mr-2">
              {hand.map((animal, index) => (
                <Animal
                  className="h-40 w-28 hover:shadow-lg font-semibold border border-gray-200 cursor-pointer dark:border-sky-500 transform hover:scale-110 transition"
                  imageSize="h-28 w-28"
                  key={index}
                  animal={animal}
                  onClick={() => {
                    setModal('animal');
                    setModalAnimal(animal);
                  }}
                  textClassName="text-sm leading-4"
                  {...(strikes === 5 ? { revealed: true } : {})}
                  order={order}
                  animalKind={animalKind}
                />
              ))}
            </div>
          </div>
          {!submittedName ? (
            <div>
              <div className="flex flex-col space-y-2">
                <span>Your Name: </span>
                <input
                  type="text"
                  className="border border-gray-200 w-full p-2 rounded-lg m-0 dark:text-black"
                  value={chosenName}
                  onChange={(e) => setChosenName(e.target.value)}
                  placeholder="Enter your name here..."
                />
                <Button
                  className="w-40 font-medium rounded-lg bg-pink-500 text-white flex text-base justify-center items-center px-2 py-2 border-0"
                  onClick={() => setSubmittedName(true)}
                  label="Submit"
                />
              </div>
              <div className="text-xs text-gray-400 break-words w-48">
                As long as your name is present, your high score will update whenever a game
                finishes
              </div>
            </div>
          ) : (
            <div className="flex space-x-2">
              <div>Playing as:</div>
              <div className="capitalize font-bold">{chosenName.toLowerCase()}</div>
              <PencilIcon className="h-5 w-5" onClick={() => setSubmittedName(false)} />
            </div>
          )}
        </div>

        <Modal closeModal={() => setModal(null)} modal={modal}>
          {modalContent}
        </Modal>
      </div>
      {feedback && <Snackbar label={feedback} setLabel={setFeedback} />}
    </div>
  );
};

export default Board;
