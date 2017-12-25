import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  text,
} from '@storybook/addon-knobs';

import TextArea from './text-area';

/**
 * The story for the textarea component.
 *
 * @class
 */
class Story extends PureComponent {
  state = { value: '' };

  /**
   * Change the value state when the change event is fired from the textarea.
   */
  handleChange = (ev) => {
    this.setState({ value: ev.target.value });
  };

  render() {
    return (
      <TextArea
        value={this.state.value}
        textareaProps={{
          style: {
            height: 200,
            width: 300,
          },
        }}
        onChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

storiesOf('TextArea', module)
  .add('Default styles', () => (
    <Story
      label={text('Label', 'Label')}
      error={text('Error')}
      helperText={text('Helper Text')}
      disabled={boolean('Disabled', false)}
    />
  ));
