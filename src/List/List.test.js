import * as React from 'react';

import List from './List';

const placemarks = [
  {
    geometry: {
      coordinates: [55.89295915605037, 37.85286010742186]
    },
    properties: {
      balloonContent: 'национальный парк Лосиный остров'
    }
  },
  {
    geometry: {
      coordinates: [55.848947666047906, 37.74299682617186]
    },
    properties: {
      balloonContent: 'район Метрогородок'
    }
  },
  {
    geometry: {
      coordinates: [55.75922564680012, 37.97782958984373]
    },
    properties: {
      balloonContent: 'Красноармейская улица, 10'
    }
  }
];


describe('List', () => {
  it('should call handleOpenBalloon on placemark', () => {
    const cb = () => {};
    const handleOpenBalloon = jest.fn();
    const wrapper = mount(
      <List placemarks={placemarks} onOpenBalloon={() => handleOpenBalloon} onDeletePlacemark={() => cb} />
    );
    const firstElement = wrapper.find('.List-Item').first();

    firstElement.simulate('click');

    expect(handleOpenBalloon).toBeCalled();
  });

  it('should call handleDelete on placemark', () => {
    const cb = () => {};
    const handleDelete = jest.fn();
    const wrapper = mount(
      <List placemarks={placemarks} onOpenBalloon={() => cb} onDeletePlacemark={() => handleDelete} />
    );
    const firstElement = wrapper.find('.List-Item--remove').first();

    firstElement.simulate('click');

    expect(handleDelete).toBeCalled();
  });

  it('should should render all passed places', () => {
    const cb = () => {};
    const wrapper = mount(
      <List placemarks={placemarks} onOpenBalloon={cb} onDeletePlacemark={cb} />
    );
    const children = wrapper.find('.List-Items').children();
    expect(children).toHaveLength(placemarks.length);
  });
});
