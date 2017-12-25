import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean,
  text,
} from '@storybook/addon-knobs';

import TextField from './text-field';

/**
 * The story for the TextField component.
 *
 * @class
 */
class Story extends PureComponent {
  state = { value: '' };

  /**
   * Change the state when the user changes the input.
   */
  handleChange = (ev) => {
    this.setState({ value: ev.target.value });
  };

  render() {
    return (
      <TextField
        value={this.state.value}
        onChange={this.handleChange}
        {...this.props}
      />
    );
  }
}

storiesOf('TextField', module)
  .add('Default styles', () => (
    <Story
      label={text('Label', 'Label')}
      floatingLabel={boolean('Floating', true)}
      error={text('Error')}
      helperText={text('Helper Text')}
      placeholder={text('Placeholder', 'Placeholder')}
      disabled={boolean('Disabled', false)}
    />
  ))
  .add('With Prefix', () => (
    <Story
      label={text('Label', 'Label')}
      floatingLabel={boolean('Floating', true)}
      error={text('Error')}
      helperText={text('Helper Text')}
      placeholder={text('Placeholder', 'Placeholder')}
      disabled={boolean('Disabled', false)}
    >
      <TextField.Prefix>
        $
      </TextField.Prefix>
    </Story>
  ))
  .add('With Suffix', () => (
    <Story
      label={text('Label', 'Label')}
      floatingLabel={boolean('Floating', true)}
      error={text('Error')}
      helperText={text('Helper Text')}
      placeholder={text('Placeholder', 'Placeholder')}
      disabled={boolean('Disabled', false)}
    >
      <TextField.Suffix>
        lbs
      </TextField.Suffix>
    </Story>
  ));
