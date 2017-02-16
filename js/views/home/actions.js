import ActionTypes from '../../redux/action_types.json';

export function getRandomNumber() {
  return {
    type: ActionTypes.GET_RANDOM,
    payload: {
      random: Math.floor(Math.random() * 1e6),
    },
  };
}

export const add1Action = n => ({
  type: 'ADD_1',
  meta: {
    WebWorker: true, // this line specifies that the worker should show up and do the job
  },
  payload: {
    num: n,
  },
});
