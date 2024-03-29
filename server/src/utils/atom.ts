export type Atom<Type> = [() => Type, (newState: Type) => Type]

const atom = <Type>(
  initialState: Type
): Atom<Type> => {
  var state: Type = initialState;

  const getState = (): Type => state;

  const setState = (newState: Type): Type => {
    state = newState;
    return state;
  };

  return [getState, setState];
};

export default atom;
