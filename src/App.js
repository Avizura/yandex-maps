import React, { Component } from 'react';
import { YMaps, Map, Placemark, SearchControl, ZoomControl, FullscreenControl, Polyline } from 'react-yandex-maps';
import get from 'lodash/get';
import { createPlacemark } from './utils';

import List from './List';
import './App.css';

const mapState = { center: [55.76, 37.64],
  zoom: 10,
  controls: []
};

class App extends Component {
  state = {
    placemarks: []
  }

  placemarksRefs = []

  handleAddPlacemark = async (event) => {
    const coordinates = event.get('coords');
    const newPlacemark = await createPlacemark(coordinates);
    this.setState({
      placemarks: [...this.state.placemarks, newPlacemark]
    });
  }

  handleDragPlacemarkerEnd = index => async (event) => {
    const coordinates = event.get('target').geometry.getCoordinates();
    const newPlacemark = await createPlacemark(coordinates);
    this.setState({
      placemarks: [
        ...this.state.placemarks.slice(0, index),
        newPlacemark,
        ...this.state.placemarks.slice(index + 1)]
    });
  }

  handleSelectSearchResult = async (event) => {
    const target = event.get('target');
    const index = event.get('index');
    const name = target.getRequestString();
    const geoObject = await target.getResult(index);

    this.setState({
      placemarks: [
        ...this.state.placemarks,
        {
          geometry: {
            coordinates: geoObject.geometry._coordinates
          },
          properties: {
            balloonContent: name
          }
        }
      ]
    });
  }

  handleDeletePlacemarker = index => (event) => {
    // prevent unnecessary ballooon opening
    event.stopPropagation();
    this.setState({
      placemarks: [...this.state.placemarks.slice(0, index), ...this.state.placemarks.slice(index + 1)]
    });
  }

  handleDragListItemEnd = ({ source, destination }) => {
    const placemarks = [...this.state.placemarks];

    [placemarks[source.index], placemarks[destination.index]] = [placemarks[destination.index], placemarks[source.index]];

    this.setState({
      placemarks
    });
  }

  handleOpenBalloon = index => () => this.placemarksRefs[index].balloon.open();

  addPlacemarkerRef = index => (ref) => {
    this.placemarksRefs[index] = ref;
  }

  render() {
    return (
      <div className="App">
        <YMaps>
          <Map width="100%" height={600} state={mapState} onClick={this.handleAddPlacemark}>
            <ZoomControl />
            <FullscreenControl />
            <SearchControl
              options={{
                size: 'auto',
                noPlacemark: true,
                float: 'right'
              }}
              onResultSelect={this.handleSelectSearchResult}
            />
            {this.state.placemarks.map((placemarkParams, index) => (
              <Placemark
                key={index}
                instanceRef={this.addPlacemarkerRef(index)}
                {...placemarkParams}
                options={{
                  draggable: true
                }}
                onDragEnd={this.handleDragPlacemarkerEnd(index)}
              />
            ))}
            <Polyline
              geometry={{
                coordinates: this.state.placemarks.map(pm => pm.geometry.coordinates)
              }}
              options={{
                strokeColor: '#0000ff',
                strokeWidth: 4,
                strokeOpacity: 0.6
              }}
            />
          </Map>
        </YMaps>
        <List
          placemarks={this.state.placemarks}
          onDragListItemEnd={this.handleDragListItemEnd}
          onDeletePlacemarker={this.handleDeletePlacemarker}
          onOpenBalloon={this.handleOpenBalloon}
        />
      </div>
    );
  }
}

export default App;
