import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Map from './Map';

describe('Map', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Map />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
