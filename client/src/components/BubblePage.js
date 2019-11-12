import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../Auth/Api';
import {withRouter} from 'react-router-dom';
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect( () => {
     axiosWithAuth().get('/api/colors')
                  .then( res => {
                    // console.log(res);
                    setColorList(res.data);
                  })
                  .catch( err => {
                    console.log(err);
                  })
  },[]);

  return (
    <div style={{display:'flex', justifyContent:'center', margin: '50px auto', width: '100%'}}>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default withRouter(BubblePage);
