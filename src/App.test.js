import React from 'react';
import ReactDOM from 'react-dom';
import * as enzyme from 'enzyme';
import App from './App';
import * as utils from './utils';

const fakePlacemark = {
  geometry: {
    coordinates: []
  },
  properties: {
    balloonContent: 'balloon text'
  }
};

utils.createPlacemark = jest.fn(() => Promise.resolve(fakePlacemark));

describe('Map', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should handle state changes on adding and removing placemarks', async () => {
    const wrapper = enzyme.mount(<App />);

    expect(wrapper.state()).toEqual({
      placemarks: []
    });


    const instance = wrapper.instance();
    await instance.handleAddPlacemark({
      get: () => {}
    });
    expect(utils.createPlacemark).toBeCalled();
    expect(wrapper.state()).toEqual({
      placemarks: [fakePlacemark]
    });
    instance.handleDeletePlacemark(0)({
      stopPropagation: () => {}
    });
    expect(wrapper.state()).toEqual({
      placemarks: []
    });
  });
});
