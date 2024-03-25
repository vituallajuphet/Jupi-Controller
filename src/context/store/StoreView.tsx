import {View, Text} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {GET_TOKEN} from '../actions';
import {StoreContext} from '.';
import {useLoading} from '../hooks';

const StoreView = props => {
  const store = useContext(StoreContext);
  const {dispatch, state} = store;
  const {setLoading} = useLoading(store);

  useEffect(() => {
    logWithToken();
  }, []);

  const logWithToken = async () => {
    setLoading(true);
    try {
      const data = await GET_TOKEN();

      if (data?.user) {
        dispatch({type: 'LOGIN', payload: data?.user});
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return <>{props.children}</>;
};

export default StoreView;
