import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as envelop from '../ducks/envelop';
import multidispatch from '../actionHelper';

const useEnvelop = (id) => {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => envelop.selectors.isLoading(state.envelop, id));

  const geo = useSelector((state) => envelop.selectors.envelop(state.envelop, id));

  useEffect(() => {
    if (!geo) {
      if (!isLoading && count < 10) {
        setCount((x) => x + 1);
        multidispatch(dispatch, envelop.actions.fetch(id));
      }
    }
  }, [geo, isLoading, id, count, dispatch]);

  return {
    isLoading,
    geo,
  };
};

export default useEnvelop;
