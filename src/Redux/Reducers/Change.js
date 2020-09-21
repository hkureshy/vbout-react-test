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
  return {...grudge, forgiven: !grudge.forgiven, status: 'updated' };
};

const updateGrudgesOnUndo = (grudges, present) => {
  if(present) {
    if(present.status === 'new') {
      if(grudges.length === 1) {
        return [];
      } else {
        grudges.splice(0, 1);
        return grudges;
      }
    }
    if(present.status === 'updated') {
      return grudges.map(grudge => {
        if(grudge.id === present.id) {
          return { ...grudge, forgiven: grudge.forgiven === present.forgiven ? !present.forgiven : present.forgiven }
        }
        return grudge;
      });
    }
  }

  return [];
};

const updateGrudgesOnRedo = (grudges, present) => {
  if(present) {
    if(present.status === 'new') {
      return [present, ...grudges];
    }
    if(present.status === 'updated') {
      return grudges.map(grudge => {
        if(grudge.id === present.id) {
          return { ...grudge, forgiven: present.forgiven }
        }
        return grudge;
      });
    }
  }

  return [];
}

const changeReducer = (state = initialState, action) => {
  const { grudges, past, present, future } = state;
  switch (action.type) {
    case 'ADD_GRUDGE':
      action.payload.id = id();
      action.payload.forgiven = false;
      return {
        ...state,
        grudges: [{...action.payload, status: 'new'}, ...grudges],
        past: present.id ? [...past, present] : [...past],
        present: {...action.payload, status: 'new'},
        future: []
      };
    case 'TOGGLE_FORGIVENESS':
      return {
        ...state,
        grudges: handleForgiveness([...grudges], action.payload),
        past: [...past, present],
        present: getPresent([...grudges], action.payload),
        future: []
      };
    case 'UNDO':
      const previous = past.length ? [...past][past.length - 1] : {};
      const newPast = past.length ? [...past].slice(0, past.length - 1) : [];
      return {
        ...state,
        grudges: updateGrudgesOnUndo([...grudges], present),
        past: newPast,
        present: previous,
        future: [present, ...future]
      };
    case 'REDO':
      const next = [...future][0]
      const newFuture = [...future].slice(1);
      return {
        ...state,
        grudges: next ? updateGrudgesOnRedo([...grudges], next) : [...grudges],
        past: present.id ? [...past, present] : [],
        present: next,
        future: newFuture
      };
    default:
      return { ...state };
  }
};

export { changeReducer };
