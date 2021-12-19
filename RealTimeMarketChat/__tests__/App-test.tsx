import 'react-native';
import React from 'react';
import Home from '../src/screens/Home';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Home renders correctly', () => {
  renderer.create(<Home />);
});
