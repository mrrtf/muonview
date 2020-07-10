const multidispatch = (dispatch, actions) => {
  if (Array.isArray(actions)) {
    actions.map((a) => dispatch(a));
  } else {
    dispatch(actions);
  }
};

export default multidispatch;
