import React from 'react';
import { storiesOf } from '@storybook/react';
import injectSheet from 'react-jss';
import { number } from '@storybook/addon-knobs';

import Icon from '../icon';
import IconButton from '../icon-button';

import Badge from './badge';

const styles = {
  badge: {
    right: 4,
    top: 4,
  },
};

storiesOf('Badge', module)
  .add('With icon', () => (
    <div style={{ position: 'relative' }}>
      <Icon icon="bell" />

      <Badge>
        {number('Badge content', 10)}
      </Badge>
    </div>
  ))
  .add('With icon button', () => {
    const StyledStory = injectSheet(styles)(props => (
      <div style={{ position: 'relative' }}>
        <IconButton icon="bell" />

        <Badge className={props.classes.badge}>
          {number('Badge content', 9)}
        </Badge>
      </div>
    ));

    return <StyledStory />;
  })
  .add('Text', () => (
    <div
      style={{
        padding: 5,
        position: 'relative',
      }}
    >
      <Badge>
        {number('Badge content', 9)}
      </Badge>

      Some text
    </div>
  ));
