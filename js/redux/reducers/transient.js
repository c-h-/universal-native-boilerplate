import ActionTypes from '../action_types.json';

const initState = {
  appReady: false,
};

/**
 * Data that shouldn't be persisted across sessions can be saved here
 */
export default function transient(state = initState, action) {
  switch (action.type) {
    case ActionTypes.SET_APP_READY: {
      return {
        ...state,
        appReady: action.appReady,
      };
    }
    default:
      return state;
  }
}
