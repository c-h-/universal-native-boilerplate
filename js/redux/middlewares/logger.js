const NO_LOG = [
  undefined,
  null,
];

export default function () {
  return next => (action) => {
    const result = next(action);
    if (
      process.env.NODE_ENV !== 'production'
      && !NO_LOG.includes(action.type)
    ) {
      console.log(action);
    }
    return result;
  };
}
