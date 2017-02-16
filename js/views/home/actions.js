import ActionTypes from '../../redux/action_types.json';

export function getRandomNumber() {
  return {
    type: ActionTypes.GET_RANDOM,
    payload: {
      random: Math.floor(Math.random() * 1e6),
    },
  };
}
