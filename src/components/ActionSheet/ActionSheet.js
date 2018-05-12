import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, Text } from 'react-native';
import { Touchable, IconTextRow } from 'react-native-simple-components';
import { AnimateTranslateY } from 'react-native-simple-animators';

import styles from './styles';

export default class ActionSheet extends React.Component {
  static get propTypes() {
    return {
      options: PropTypes.arrayOf(
        PropTypes.shape({ iconName: PropTypes.string, text: PropTypes.string }),
      ),
      handlePress: PropTypes.func,
      rowHeight: PropTypes.number,
      textStyle: Text.propTypes.style,
      iconStyle: Text.propTypes.style,
      style: ViewPropTypes.style,
    };
  }

  static defaultProps = {
    options: [{ iconName: 'check', text: 'Option 1' }],
    rowHeight: 56,
  };

  state = {
    shouldAnimateOut: false,
  };

  handleSelect = (item) => {
    this.setState({
      shouldAnimateOut: true,
    });
    setTimeout(() => {
      if (this.props.handlePress) {
        this.props.handlePress(item);
      }
    }, 500);
  };

  render() {
    const initialValue = (this.props.options.length + 1) * this.props.rowHeight;

    return (
      <AnimateTranslateY
        initialValue={initialValue}
        finalValue={0}
        shouldAnimateIn={!this.state.shouldAnimateOut}
        shouldAnimateOut={this.state.shouldAnimateOut}
        style={[styles.container, this.props.style]}
      >
        {this.props.options.map((item) => {
          return (
            <Touchable
              onPress={() => this.handleSelect(item.text)}
              style={styles.itemContainer}
              key={item.text}
            >
              <IconTextRow
                iconName={item.iconName}
                iconStyle={[styles.icon, this.props.iconStyle]}
                text={item.text}
                textStyle={[styles.text, this.props.textStyle]}
                style={[styles.itemContainer, { height: this.props.rowHeight }]}
              />
            </Touchable>
          );
        })}
        <Touchable onPress={() => this.handleSelect('Cancel')} style={styles.itemContainer}>
          <IconTextRow
            iconName="cancel"
            iconStyle={[styles.icon, this.props.iconStyle]}
            text="Cancel"
            textStyle={[styles.text, this.props.textStyle]}
            style={[styles.itemContainer, { height: this.props.rowHeight }]}
          />
        </Touchable>
      </AnimateTranslateY>
    );
  }
}