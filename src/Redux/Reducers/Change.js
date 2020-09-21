import id from 'uuid/v4';

const initialState = {
  grudges: [],
  past: [],
  present: {},
  future: []
};

const handleForgiveness = (grudges, payload) => {
  return grudges.map((grudge) => {
    if (grudge.id !== payload) return grudge;
    return { ...grudge, forgiven: !grudge.forgiven };
  });
};

const getPresent = (grudges, payload) => {
  const grudge = grudges.find((g) => g.id === payload);
  return {...grudge, forgiven: !grudge.forgiven };
}

const changeReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'ADD_GRUDGE':
    action.payload.id = id();
    action.payload.forgiven = false;
    return { ...state, grudges: [action.payload, ...state.grudges], present: action.payload, past: state.present.id ? [...state.past, state.present] : [...state.past] };
  case 'TOGGLE_FORGIVENESS':
    return { ...state, grudges: handleForgiveness([...state.grudges], action.payload), past: [...state.past, state.present], present: getPresent([...state.grudges], action.payload) };
  case 'UNDO':
    return { ...state };
  case 'REDO':
    return { ...state };
  default:
    return { ...state };
  }
};

export { changeReducer };
