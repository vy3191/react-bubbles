import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import LOCAL_STORAGE_KEY from '../../constants/constant';

function PrivateRouter(props) {
  const auth = localStorage.getItem(LOCAL_STORAGE_KEY);
  const { component:Component, ...rest } = props;
  return(
    <div>
      <Route {...rest} render={ (props) => {
         if(auth) {
            return <Component {...props} />
         } else {
           return <Redirect to="/" />
         }
      }} />
    </div>
  )
}

export default PrivateRouter;
