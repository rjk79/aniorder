import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
  MoonIcon,
  SunIcon,
  RefreshIcon
} from '@heroicons/react/solid';
import classNames from 'classnames';
import ConfettiGenerator from 'confetti-js';
import { cloneDeep } from 'lodash';

import Animal from './Animal';
import Modal from './Modal';
import Snackbar from './Snackbar.tsx';

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
const MOCKS = false;

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
  const [strikes, setStrikes] = useState(0);
  const [chosenName, setChosenName] = useState('');
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScores();
    setup();
  }, []);

  useEffect(() => {
    setupHand();
  }, [board]);

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
      const resJSON = await res.json();
      setBoard(resJSON);
    }
  }

  async function setupHand() {
    if (MOCKS) {
      setHand([mockAnimals[0]]);
    } else {
      const res = await fetchAnimals();
      const resJSON = await res.json();
      setHand(resJSON);
    }
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

  const modalContent = ['animal', 'board-animal'].includes(modal) ? (
    <Animal
      animal={modalAnimal}
      className="h-full w-full font-bold text-2xl"
      textClassName="text-2xl"
      imageSize="h-80 w-80"
      {...(modal === 'board-animal' ? { onSubmit } : {})}
      details={true}
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
      <div className="text-2xl font-bold">Order By:</div>
      <div className="space-y-2">
        {['lifespan', 'weight_max', 'length_max'].map((param, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center"
            onClick={() => setSelectedOrder(param)}>
            <input
              className="accent-pink-500 mr-2 h-4 w-4"
              type="checkbox"
              checked={selectedOrder === param}
            />
            <div className="capitalize">{param.replace(/_/g, ' ')}</div>
          </div>
        ))}
      </div>
      <button
        className="w-40 font-medium rounded-lg bg-pink-500 text-white flex text-base justify-center items-center px-2 py-2 border-0"
        onClick={() => {
          setOrder(selectedOrder);
          setup();
        }}>
        Start New Game
      </button>
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
  ) : null;

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
        <div className="flex justify-between">
          <span className="capitalize">
            Ordering By: <strong> {order.replace(/_/g, ' ')}</strong>
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
        <div>
          <div className="flex flex-wrap mb-48">
            {board.map((animal, index) => (
              <div key={index} className="flex mb-2">
                {!index && (
                  <div
                    className={classNames(
                      'flex justify-center items-center text-center font-semibold p-2 mr-2 text-white bg-sky-500 h-40 w-28 border border-black rounded-lg cursor-pointer dark:border-sky-500',
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
                    'mr-2 h-40 w-28 font-semibold border border-black dark:border-sky-500 cursor-pointer',
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
                />
              </div>
            ))}
          </div>
        </div>
        <div className="fixed w-full left-0 bottom-0 px-2 py-2 flex justify-between items-center bg-white bg-opacity-70 border-t border-gray-300 dark:bg-slate-900 dark:bg-opacity-70">
          <div className="">
            <div className="text-xl font-bold">Your Animal</div>
            <div className="flex space-x-2 mr-2">
              {hand.map((animal, index) => (
                <Animal
                  className="h-40 w-28 border font-semibold border-black cursor-pointer dark:border-sky-500"
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
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex">
              <span>Your Name: </span>
              <input
                className="border border-gray-200 w-full p-2 rounded-lg m-0 dark:text-black"
                value={chosenName}
                onChange={(e) => setChosenName(e.target.value)}
                placeholder="Enter your name here..."
              />
            </div>
            <div className="text-xs text-gray-400 break-words w-48">
              As long as your name is present, your high score will update whenever a game finishes
            </div>
          </div>
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
