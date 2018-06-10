/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import DeleteButton from '../';

it('renders a DeleteButton', () => {
  expect(
    renderer.create(
      <DeleteButton
        handlePress={jest.fn()}
        showShadow
        androidRipple
        androidRippleColor="red"
        androidRippleBorderless
        iconStyle={{ color: 'red' }}
        style={{ backgroundColor: 'blue' }}
      />,
    ),
  ).toMatchSnapshot();
});

it('renders a DeleteButton with custom icon', () => {
  expect(
    renderer.create(<DeleteButton customIcon={<MaterialIcon name="check" />} />),
  ).toMatchSnapshot();
});

it('renders a DeleteButton with no props', () => {
  expect(renderer.create(<DeleteButton />)).toMatchSnapshot();
});
/* eslint-enable */
