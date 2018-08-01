import React from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark, SearchControl, ZoomControl, FullscreenControl, Polyline } from 'react-yandex-maps';
import get from 'lodash/get';

const mapState = {
  center: [55.76, 37.64],
  zoom: 10,
  controls: []
};

const CustomMap = ({ placemarks, handleAddPlacemark, handleSelectSearchResult, addPlacemarkRef, handlePlacemarkDragEnd }) => (
  <YMaps>
    <Map width="100%" height={600} state={mapState} onClick={handleAddPlacemark}>
      <ZoomControl />
      <FullscreenControl />
      <SearchControl
        options={{
          size: 'auto',
          noPlacemark: true,
          noSelect: false,
          float: 'right'
        }}
        onResultSelect={handleSelectSearchResult}
      />
      {placemarks.map((placemarkParams, index) => (
        <Placemark
          key={index}
          instanceRef={addPlacemarkRef(index)}
          {...placemarkParams}
          options={{
            draggable: true
          }}
          onDragEnd={handlePlacemarkDragEnd(index)}
        />
      ))}
      <Polyline
        geometry={{
          coordinates: placemarks.map(placemark => get(placemark, 'geometry.coordinates'))
        }}
        options={{
          strokeColor: '#0000ff',
          strokeWidth: 4,
          strokeOpacity: 0.6
        }}
      />
    </Map>
  </YMaps>
);

CustomMap.propTypes = {
  placemarks: PropTypes.array,
  handleAddPlacemark: PropTypes.func,
  handleSelectSearchResult: PropTypes.func,
  addPlacemarkRef: PropTypes.func,
  handlePlacemarkDragEnd: PropTypes.func
};

CustomMap.defaultProps = {
  placemarks: []
};

export default CustomMap;
