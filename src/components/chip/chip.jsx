import React, { PureComponent } from 'react';
import is from 'is_js';
import PropTypes from 'prop-types';

import Icon from '../icon';
import getNotDeclaredProps from '../../utils/react/get-not-declared-props';
import layout from '../../styles/plugins/layout';
import typo from '../../styles/plugins/typo';
import elevation from '../../styles/plugins/elevation';
import injectSheet from '../../styles/jss';
import connectWithTheme from '../../styles/theme/connect-with-theme';

export class Chip extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    img: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    className: PropTypes.string,
    deletable: PropTypes.bool,
    onDelete: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
  };

  static defaultProps = {
    img: '',
    className: '',
    deletable: false,
    style: {},
    onDelete: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
  };

  state = { isFocused: false };

  keyDown = false;

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  handleFocus = (ev) => {
    this.props.onFocus(ev);

    this.setState({ isFocused: true });
  };

  handleBlur = (ev) => {
    this.props.onBlur(ev);

    this.setState({ isFocused: false });
  };

  handleKeyDown = (ev) => {
    this.props.onKeyDown(ev);

    if (ev.keyCode === 46 && !this.keyDown) {
      this.keyDown = true;

      this.handleDelete();
    }
  };

  handleKeyUp = (ev) => {
    this.props.onKeyUp(ev);

    this.keyDown = false;
  };

  renderImage() {
    const props = { className: this.props.classes.img };

    if (is.json(this.props.img)) {
      return (
        <span {...props}>
          {this.props.img.text}
        </span>
      );
    }

    return (
      <img
        alt="chip"
        src={this.props.img}
        {...props}
      />
    );
  }

  render() {
    const {
      classes,
      deletable
    } = this.props;
    const eventHandlers = {
      onKeyDown: deletable ? this.handleKeyDown : this.props.onKeyDown,
      onKeyUp: deletable ? this.handleKeyUp : this.props.onKeyUp,
      onFocus: deletable ? this.handleFocus : this.props.onFocus,
      onBlur: deletable ? this.handleBlur : this.props.onBlur,
    };

    return (
      <button
        {...getNotDeclaredProps(this, Chip)}
        className={`${classes.chip} ${this.props.className}`}
        tabIndex={this.props.deletable ? 0 : -1}
        {...eventHandlers}
      >
        <span className={`${classes.shadow} ${this.state.isFocused && classes.shadowActive}`} />

        {this.props.img && this.renderImage()}

        <span className={classes.label}>
          {this.props.children}
        </span>

        {this.props.deletable && (
          <Icon
            icon="close-circle"
            className={classes.delete}
            onTouchStart={this.handleDelete}
            onMouseDown={this.handleDelete}
          />
        )}
      </button>
    );
  }
}

const styles = {
  chip: {
    composes: 'chip',
    position: 'relative',
    backgroundColor: props => props.theme.bgColor,
    borderRadius: props => props.theme.height / 2,
    height: props => props.theme.height,
    outline: 0,
    border: 0,
    padding: props => `0 ${props.deletable ? 0 : 12}px 0 ${props.img ? 0 : 12}px`,
    ...layout({
      direction: 'horizontal',
      inline: true,
      crossAlign: 'center',
    }),
  },

  img: {
    composes: 'chip--img',
    height: props => props.theme.height,
    width: props => props.theme.height,
    borderRadius: '50%',
    textTransform: 'uppercase',
    backgroundColor: props => (is.json(props.img) ? props.img.color : 'transparent'),
    lineHeight: props => props.theme.height,
    textAlign: 'center',
    margin: '0 8px 0 0',
    color: props => (is.json(props.img) ? props.img.textColor : 'inherit'),
  },

  delete: {
    composes: 'chip--delete',
    height: props => props.theme.deleteIconSize,
    width: props => props.theme.deleteIconSize,
    lineHeight: props => props.theme.deleteIconSize,
    fontSize: props => props.theme.deleteIconFontSize,
    margin: '0 4px',
    cursor: 'pointer',
    zIndex: 1,
  },

  label: {
    composes: 'chip--label',
    ...typo('body1'),
    color: props => props.theme.color,
    userSelect: 'none',
  },

  shadow: {
    composes: 'chip--shadow',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    boxShadow: props => elevation(props.theme.focusedElevation),
    opacity: 0,
    transition: props => `opacity ${props.theme.transitionTime}ms linear`,
    borderRadius: 'inherit',
  },

  shadowActive: { opacity: 1 },
};

export default connectWithTheme(injectSheet(styles)(Chip), 'chip');
