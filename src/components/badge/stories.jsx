import React from 'react';
import { storiesOf } from '@storybook/react';
import injectSheet from 'react-jss';
import { number } from '@storybook/addon-knobs';

import Icon from '../icon';
import IconButton from '../icon-button';

import Badge from './badge';

storiesOf('Badge', module)
  .add('With icon', () => (
    <Badge badgeContent={number('Badge content', 10)}>
      <Icon icon="bell" />
    </Badge>
  ))
  .add('With icon button', () => {
    const StyledStory = injectSheet({
      badge: {
        '& > .badge': {
          right: 4,
          top: 4,
        },
      },
    })(({ classes }) => (
      <Badge
        badgeContent={number('Badge content', 9)}
        className={classes.badge}
      >
        <IconButton icon="bell" />
      </Badge>
    ));

    return <StyledStory />;
  })
  .add('Text', () => (
    <Badge badgeContent={number('Badge content', 9)}>
      <div style={{ padding: 5 }}>Some text</div>
    </Badge>
  ));
