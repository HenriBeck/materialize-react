import React, {
  PropTypes,
  PureComponent,
} from 'react';

import Stylesheet from '/src/styles/stylesheet';
import Icon from '../icon';

export default class ExpansionPanel extends PureComponent {
  static propTypes = {
    label: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    value: PropTypes.node,
    style: PropTypes.object,
  };

  static defaultProps = {
    value: '',
    style: {},
  };

  static contextTypes = { theme: PropTypes.object };

  get theme() {
    return this.context.theme.expansionPanel;
  }

  get styles() {
    return Stylesheet.compile({
      root: {
        backgroundColor: this.theme.bgColor,
        ...this.props.style,
      },

      labelContainer: {
        layout: {
          direction: 'horizontal',
          mainAlign: 'space-between',
          crossAlign: 'center',
        },
        padding: '16px 24px',
      },

      labels: {
        height: 24,
        flex: 1,
      },

      label: {
        typo: 'body2',
        fontSize: 16,
        lineHeight: '24px',
        width: '33%',
      },

      labelValue: {
        typo: 'body1',
        lineHeight: '24px',
        fontSize: 16,
        padding: '0 16px',
        color: this.theme.labelValueColor,
      },

      labelIcon: {
        fontSize: 24,
        size: 24,
        lineHeight: 1,
      },

      margin: {
        size: ['100%', 16],
        transform: 'scale(0)',
        backgroundColor: 'transparent',
      },
    });
  }

  render() {
    const styles = this.styles;

    return (
      <div style={styles.root}>
        <div
          style={styles.labelContainer}
        >
          <span style={styles.labels}>
            <span style={styles.label}>
              {this.props.label}
            </span>

            {this.props.value && (
              <span style={styles.labelValue}>
                {this.props.value}
              </span>
            )}
          </span>

          <Icon
            icon="chevron-down"
            style={styles.icon}
            ref={(element) => { this.icon = element; }}
          />
        </div>

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
