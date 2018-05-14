// @flow strict-local

import React, {
  type Node,
  type Element,
  type ElementType,
} from 'react';
import PropTypes from 'prop-types';
import subscribeToContext from 'react-context-subscriber';

import Typography from '../Typography';
import Ripple from '../Ripple';
import { cloneElement } from '../../utils/react';
import { Context } from '../Tabs';

import Sheet, { type Data } from './Sheet';

type Props = {
  name: string,
  context: {
    onChange: (name: string) => void,
    createRef: (name: string, element: HTMLElement | null) => void,
    selectedTab: string,
    tabStyle: 'text' | 'text-and-icons' | 'icons',
    color: 'primary' | 'accent',
  },
  children: Node,
  className: string,
  noink: boolean,
  icon: Element<ElementType>,
};

class Tab extends React.PureComponent<Props> {
  static propTypes = {
    name: PropTypes.string.isRequired,
    context: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      createRef: PropTypes.func.isRequired,
      selectedTab: PropTypes.func.isRequired,
      tabStyle: PropTypes.oneOf(['text', 'text-and-icons', 'icons']).isRequired,
      color: PropTypes.oneOf(['primary', 'accent']).isRequired,
    }).isRequired,
    children: PropTypes.node,
    icon: PropTypes.element,
    className: PropTypes.string,
    noink: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    icon: null,
    className: '',
    noink: false,
  };

  createRef = (element: HTMLElement | null) => {
    this.props.context.createRef(this.props.name, element);
  };

  handlePress = () => this.props.context.onChange(this.props.name);

  render() {
    const isSelected = this.props.context.selectedTab === this.props.name;
    const data: Data = {
      style: this.props.context.tabStyle,
      color: this.props.context.color,
      isSelected,
    };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <span
            role="tab"
            className={`${classes.tab} ${this.props.className}`}
            ref={this.createRef}
            aria-selected={isSelected}
          >
            {this.props.context.tabStyle.includes('icons')
              ? cloneElement(this.props.icon, { className: classes.icon })
              : null
            }

            {this.props.context.tabStyle.includes('text') && (
              <Typography
                typography="body"
                color={isSelected ? 'text' : 'secondary'}
                className={classes.text}
              >
                {this.props.children}
              </Typography>
            )}

            <Ripple
              nowaves={this.props.noink}
              className={classes.ripple}
              onPress={this.handlePress}
            />
          </span>
        )}
      </Sheet>
    );
  }
}

export default subscribeToContext(Context.Consumer)(Tab);
