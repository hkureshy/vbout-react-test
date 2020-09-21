export const addGrudge = (grudge) => (dispatch) => {
  return dispatch({
    type: 'ADD_GRUDGE',
    payload: grudge
  });
};

export const toggleForgiveness = (id) => (dispatch) => {
  return dispatch({
    type: 'TOGGLE_FORGIVENESS',
    payload: id
  });
};

export const undo = () => (dispatch) => {
  return dispatch({
    type: 'UNDO'
  })
}

export const redo = () => (dispatch) => {
  return dispatch({
    type: 'REDO'
  })
}
