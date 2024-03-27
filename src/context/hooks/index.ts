export const useLoading = (store: any) => {
  const dispatch = store?.dispatch;

  const setLoading = (loading: boolean) => {
    dispatch({
      type: 'SET_LOADING',
      payload: loading,
    });
  };

  return {setLoading};
};
