import React from 'react';
import { storiesOf } from '@storybook/react';
import injectSheet from 'react-jss';
import { boolean } from '@storybook/addon-knobs';

import Typography from './typography';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '16px',
  },
};

const Story = injectSheet(styles)(({
  classes,
  secondary,
  primary,
  accent,
}) => {
  const TypoWrapper = props => (
    <Typography
      secondary={secondary}
      accent={accent}
      primary={primary}
      {...props}
    />
  );

  return (
    <div className={classes.container}>
      <TypoWrapper typography="display4">Display 4</TypoWrapper>
      <TypoWrapper typography="display3">Display 3</TypoWrapper>
      <TypoWrapper typography="display2">Display 2</TypoWrapper>
      <TypoWrapper typography="display1">Display 1</TypoWrapper>

      <TypoWrapper typography="headline">Headline</TypoWrapper>
      <TypoWrapper typography="title">Title</TypoWrapper>

      <TypoWrapper typography="subhead">Subhead</TypoWrapper>
      <TypoWrapper typography="body1">Body 1</TypoWrapper>
      <TypoWrapper typography="body2">Body 1</TypoWrapper>

      <TypoWrapper typography="caption">Caption</TypoWrapper>
      <TypoWrapper typography="menu">Menu</TypoWrapper>
      <TypoWrapper typography="button">Button</TypoWrapper>

      <TypoWrapper typography="code1">Code 1</TypoWrapper>
      <TypoWrapper typography="code2">Code 2</TypoWrapper>
    </div>
  );
});

storiesOf('Typography', module)
  .add('Default styles', () => (
    <Story
      secondary={boolean('Secondary', false)}
      primary={boolean('Primary', false)}
      accent={boolean('Accent', false)}
    />
  ));
