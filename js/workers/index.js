self.onmessage = ({ data: action }) => { // data should be a FSA compliant action object.
  self.postMessage({
    ...action,
    payload: {
      num: action.payload.num + 1,
    },
  });
};
