import React, {ComponentType, useContext} from 'react';
import {Loading} from '../components/controls';
import {LoginContext} from '../context';

function withLoading(Component: ComponentType<any>) {
  return function WithLoadingComponent({isLoading, ...props}: any) {
    const context = useContext(LoginContext);

    return (
      <>
        {context.loading ? <Loading /> : null}
        <Component {...props} />
      </>
    );
  };
}

export default withLoading;
