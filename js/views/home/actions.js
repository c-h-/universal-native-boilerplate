import ActionTypes from '../../redux/action_types.json';

export function getRandomNumber() {
  return {
    type: ActionTypes.GET_RANDOM,
    payload: {
      random: Math.floor(Math.random() * 1e6),
    },
  };
}

export function doSomeStuff() {
  return {
    type: ActionTypes.DO_STUFF,
    payload: {
      stuff: 2 + 2,
    },
  };
}
