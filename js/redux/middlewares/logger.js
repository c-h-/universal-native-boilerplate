const NO_LOG = [
  undefined,
  null,
];

export default function ({ getState }) {
  return next => (action) => {
    const actionWithoutType = {
      ...action,
    };
    delete actionWithoutType.type;
    const result = next(action);
    if (!NO_LOG.includes(action.type)) {
      console.group(
        `%c  ${action.type}  `,
        'background: #6800b3; color: white'
      );
      for (const key in actionWithoutType) {
        console.log(`${key}:`, actionWithoutType[key]);
      }
      // console.log('state:', getState());
      console.groupEnd();
    }
    return result;
  };
}
