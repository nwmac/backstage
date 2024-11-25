import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loader: {
    display: 'none'
  }
});
const RancherLoader = () => {
  const classes = useStyles();

  useEffect(() => {
    console.error('LOGO SHOWN!!!!!!');

    window.top?.postMessage('backstage-loaded');
  });

  return (
    <div id="rancher-backstage-loader"></div>
  );
};

export default RancherLoader;
