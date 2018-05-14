// @flow strict-local

import React from 'react';
import clamp from 'clamp';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import getNotDeclaredProps from 'react-get-not-declared-props';

import getCoords from '../../utils/get-coords';

import Sheet, { type Data } from './Sheet';

type Props = {
  value: number,
  onChange: (value: number) => void,
  disabled: boolean,
  className: string,
};
type State = {
  isDragging: boolean,
  translateX: number,
  isFocused: boolean,
};

export default class Slider extends React.PureComponent<Props, State> {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    className: '',
  };

  static keyCodes: Map<number, number> = new Map([
    [37, -2],
    [38, 2],
    [39, 2],
    [40, -2],
  ]);

  state = {
    isDragging: false,
    translateX: 0,
    isFocused: false,
  };

  componentDidMount() {
    if (this.root.current) {
      this.rootRect = this.root.current.getBoundingClientRect();

      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ translateX: this.computeTranslate() });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.value !== this.props.value) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ translateX: this.computeTranslate() });
    }
  }

  root = React.createRef();

  rootRect: ClientRect;

  computeTranslate(): number {
    return this.rootRect.width * clamp(this.props.value, 0, 100) / 100;
  }

  computeNewValue(ev: SyntheticMouseEvent<HTMLElement> | SyntheticTouchEvent<HTMLElement>) {
    const coords = getCoords(ev);

    return coords
      ? (coords.x - this.rootRect.left + 4) / this.rootRect.width * 100
      : this.props.value;
  }

  getThumbTransform() {
    const draggingScale = this.state.isDragging ? ' scale(1.5)' : '';
    const disabledScale = this.props.disabled ? ' scale(0.75)' : '';

    return `translateX(${this.state.translateX}px)${draggingScale}${disabledScale}`;
  }

  handleThumbPress = () => {
    this.setState({ isDragging: true });
  };

  handleThumbRelease = () => {
    this.setState({ isDragging: false });
  };

  handleKeyDown = (ev: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (Slider.keyCodes.has(ev.keyCode)) {
      this.props.onChange(
        clamp(this.props.value + Slider.keyCodes.get(ev.keyCode), 0, 100)
      );
    }
  };

  handleMove = (ev: SyntheticMouseEvent<HTMLElement> | SyntheticTouchEvent<HTMLElement>) => {
    ev.preventDefault();

    if (this.state.isDragging) {
      this.props.onChange(this.computeNewValue(ev));
    }
  };

  handleClick = (ev: SyntheticMouseEvent<HTMLSpanElement>) => {
    this.props.onChange(this.computeNewValue(ev));
  };

  handleResize = () => {
    if (this.root.current) {
      this.rootRect = this.root.current.getBoundingClientRect();

      this.setState({ translateX: this.computeTranslate() });
    }
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const value = clamp(this.props.value, 0, 100);
    const data: Data = {
      thumbTransform: this.getThumbTransform(),
      isActive: this.props.value > 0,
      disabled: this.props.disabled,
      value,
      isFocused: this.state.isFocused,
    };

    return (
      <EventListener
        target="window"
        onMouseMove={this.handleMove}
        onMouseUp={this.handleThumbRelease}
        onTouchMove={this.handleMove}
        onTouchEnd={this.handleThumbRelease}
        onResize={this.handleResize}
      >
        <Sheet data={data}>
          {({ classes }) => (
            <div
              {...getNotDeclaredProps(this.props, Slider)}
              className={`${classes.slider} ${this.props.className}`}
              ref={this.root}
              role="slider"
              tabIndex={this.props.disabled ? -1 : 0}
              aria-disabled={this.props.disabled}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={value}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onKeyDown={this.handleKeyDown}
            >
              <span
                className={classes.track}
                onClick={this.handleClick}
              />

              <span
                className={classes.thumb}
                onMouseDown={this.handleThumbPress}
                onTouchStart={this.handleThumbPress}
              />
            </div>
          )}
        </Sheet>
      </EventListener>
    );
  }
}
