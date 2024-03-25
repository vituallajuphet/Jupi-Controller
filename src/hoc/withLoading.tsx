import React, {ComponentType, useContext} from 'react';
import {Loading} from '../components/controls';
import {StoreContext} from '../context/store';

function withLoading(Component: ComponentType<any>) {
  return function WithLoadingComponent({isLoading, ...props}: any) {
    const store = useContext(StoreContext);
    const loading = store.state?.appState?.loading;

    return (
      <>
        {loading ? <Loading /> : null}
        <Component {...props} />
      </>
    );
  };
}

export default withLoading;
