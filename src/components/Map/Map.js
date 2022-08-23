import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { withGoogleMap, GoogleMap} from 'react-google-maps';

const useStyles = makeStyles(theme => ({
  root: {
  },  
}));

const Map = props => {
  const { className, size, color, ...rest } = props;

  const classes = useStyles();
  // const GoogleMapContent = withGoogleMap(props =>(
      // <GoogleMap
      //     defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
      //     defaultZoom = {13}
      //   >
      // </GoogleMap>
  // ));

  return (
    <div></div>
      // {...rest}
      // className={clsx(
      //   {
      //     [classes.root]: true,          
      //   },
      //   className
      // )}>
      // <GoogleMapContent
      //   containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }   
      //   mapElement={ <div style={{ height: `100%` }} /> }
      //   />
  );
};
Map.defaultProps = {
  size: 'md',
  color: 'default'
};

export default Map;
