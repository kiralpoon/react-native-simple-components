import React from 'react';
import renderer from 'react-test-renderer';

import SmartImage from '../';

const IMAGE_SOURCE_LOCAL = 5;
const IMAGE_SOURCE_REMOTE = 'https://d3iw72m71ie81c.cloudfront.net/male-47.jpg';

describe('SmartImage', () => {
  it('renders with all props', () => {
    expect(
      renderer.create(
        <SmartImage
          source={IMAGE_SOURCE_LOCAL}
          iconStyle={{ color: 'red' }}
          style={{ backgroundColor: 'blue' }}
          loaderColor="green"
        />,
      ),
    ).toMatchSnapshot();
  });

  it('renders with minimum required props', () => {
    expect(renderer.create(<SmartImage />)).toMatchSnapshot();
  });

  it('renders with remote URI', () => {
    expect(renderer.create(<SmartImage source={{ uri: IMAGE_SOURCE_REMOTE }} />)).toMatchSnapshot();
  });

  it('toggles loading', () => {
    const component = renderer.create(<SmartImage source={IMAGE_SOURCE_LOCAL} />);
    const instance = component.getInstance();

    instance.setLoading(false);

    expect(instance.state.isLoading).toBe(false);
  });

  it('renders with error', () => {
    const component = renderer.create(<SmartImage source={IMAGE_SOURCE_LOCAL} />);
    const { root } = component;
    const instance = component.getInstance();

    instance.setError({
      nativeEvent: {
        error: 'Test',
      },
    });

    expect(instance.state.hasError).toBe(true);
    expect(instance.state.isLoading).toBe(false);

    // Should now see icon
    const icon = root.findByProps({ testID: 'icon' });
    expect(icon).toBeDefined();
    expect(icon.props.name).toBe('error-outline');
  });

  it('renders with offline error', () => {
    const component = renderer.create(<SmartImage source={IMAGE_SOURCE_LOCAL} />);
    const { root } = component;
    const instance = component.getInstance();

    instance.setError({
      nativeEvent: {
        error: 'The Internet connection appears to be offline.',
      },
    });

    expect(instance.state.hasError).toBe(true);
    expect(instance.state.isOffline).toBe(true);
    expect(instance.state.isLoading).toBe(false);

    // Should now see icon
    const icon = root.findByProps({ testID: 'icon' });
    expect(icon).toBeDefined();
    expect(icon.props.name).toBe('signal-cellular-off');
  });
});
