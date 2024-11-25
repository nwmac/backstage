import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 30,
  },
  path: {
    fill: '#7df3e1',
  },
});
const LogoFull = () => {
  const classes = useStyles();

  useEffect(() => {
    console.error('LOGO SHOWN!!!!!!');

    window.top?.postMessage('backstage-loaded');
  });

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        viewBox="0 0 220 93.8" fill="#3D98D3" width="48">
      <g>
        <g>
          <path  d="M200.7,20.6l-2.2-13c-0.7-4.2-2.3-7.6-3.6-7.6c-1.3,0-2.4,3.5-2.4,7.7v3.4c0,4.2-3.5,7.7-7.7,7.7h-3.4
            c-0.2,0-0.5,0-0.7,0v9.4c0.2,0,0.5,0,0.7,0h12.8C198.5,28.2,201.4,24.8,200.7,20.6"/>
          <path  d="M170,9.6h-20.8c-0.2,0-0.3,0-0.5,0h-21.3c-0.3,0-0.5,0-0.7,0.1v-2c0-4.2-1.1-7.7-2.4-7.7
            c-1.3,0-2.9,3.4-3.6,7.6l-2.2,13c-0.7,4.2,2.2,7.6,6.4,7.6h12.8c1.3,0,2.6-0.2,3.6-0.6c-0.4,2.2-2.3,3.8-4.6,3.8h-18
            c-2.9,0-5.1-2.6-4.6-5.5l1.8-10.9c0.5-2.9-1.7-5.5-4.6-5.5H22.1c-1.9,0-3.5,1.1-4.3,2.8L1,38c-0.3,0.4-0.3,1,0.1,1.4l3.3,3.9
            c0.4,0.5,1.1,0.6,1.6,0.2l11.4-9v54.8c0,2.6,2.1,4.7,4.7,4.7h25.4c2.6,0,4.7-2.1,4.7-4.7v-19c0-2.6,2.1-4.7,4.7-4.7h63.3
            c2.6,0,4.7,2.1,4.7,4.7v19c0,2.6,2.1,4.7,4.7,4.7h25.4c2.6,0,4.7-2.1,4.7-4.7V68.6h-13.5c-4.2,0-7.7-3.5-7.7-7.7V47.8
            c0-2.5,1.2-4.7,3.1-6.1v15.7c0,4.2,3.5,7.7,7.7,7.7H170c4.2,0,7.7-3.5,7.7-7.7v-40C177.7,13.1,174.2,9.6,170,9.6"/>
        </g>
      </g>
      </svg>
    </div>
    <div style={{whiteSpace: 'nowrap', marginLeft: '5px', color: '#000', fontSize: '14px', fontWeight: 'bold' }}>Rancher<br />Developer Portal</div>
    </div>
  );
};

export default LogoFull;
