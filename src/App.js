import React, { Component } from 'react';
import get from 'lodash/get';
import { createPlacemark } from './utils';

import CustomMap from './Map';
import List from './List';
import './App.css';

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

  handleDeletePlacemark = index => (event) => {
    // prevent unnecessary handleOpenBalloon call
    event.stopPropagation();
    this.setState({
      placemarks: [
        ...this.state.placemarks.slice(0, index),
        ...this.state.placemarks.slice(index + 1)
      ]
    });
  }

  handlePlacemarkDragEnd = index => async (event) => {
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
            coordinates: get(geoObject, 'geometry._coordinates')
          },
          properties: {
            balloonContent: name
          }
        }
      ]
    });
  }

  handleListItemDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const placemarks = [...this.state.placemarks];
    [placemarks[source.index], placemarks[destination.index]] =
    [placemarks[destination.index], placemarks[source.index]];

    this.setState({
      placemarks
    });
  }

  handleOpenBalloon = index => () => {
    const balloon = this.placemarksRefs[index].balloon;
    if (balloon.isOpen()) {
      balloon.close();
    } else {
      balloon.open();
    }
  }

  addPlacemarkRef = index => (ref) => {
    this.placemarksRefs[index] = ref;
  }

  render() {
    return (
      <div className="App">
        <CustomMap
          placemarks={this.state.placemarks}
          handleSelectSearchResult={this.handleSelectSearchResult}
          addPlacemarkRef={this.addPlacemarkRef}
          handleAddPlacemark={this.handleAddPlacemark}
          handlePlacemarkDragEnd={this.handlePlacemarkDragEnd}
        />
        <List
          placemarks={this.state.placemarks}
          onDragListItemEnd={this.handleListItemDragEnd}
          onDeletePlacemark={this.handleDeletePlacemark}
          onOpenBalloon={this.handleOpenBalloon}
        />
      </div>
    );
  }
}

export default App;
