// @flow strict-local

import React from 'react';
import noop from 'lodash.noop';
import { storiesOf } from '@storybook/react';

import Divider from '../Divider';
import Checkbox from '../Checkbox';
import Label from '../Label';
import Button from '../Button';

import ExpansionPanel from '.';

type Props = {};
type State = {
  test1: boolean,
  test2: boolean,
  test3: boolean,
  test4: boolean,
};

class Story extends React.PureComponent<Props, State> {
  state = {
    test1: false,
    test2: false,
    test3: false,
    test4: false,
  };

  handleChange = name => () => {
    this.setState((state) => {
      return { [name]: !state[name] };
    });
  };

  render() {
    return (
      <div style={{ width: 600 }}>
        <ExpansionPanel
          expanded={this.state.test1}
          summary={(
            <ExpansionPanel.Summary>
              Test 1
            </ExpansionPanel.Summary>
          )}
          onChange={this.handleChange('test1')}
        >

          <ExpansionPanel.Details>
            This is so weird content which has no meaning
          </ExpansionPanel.Details>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={this.state.test2}
          summary={(
            <ExpansionPanel.Summary>
              Test 2
            </ExpansionPanel.Summary>
          )}
          onChange={this.handleChange('test2')}
        >

          <ExpansionPanel.Details>
            This is so weird content which has no meaning
          </ExpansionPanel.Details>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={this.state.test3}
          summary={(
            <ExpansionPanel.Summary>
              Test 3
            </ExpansionPanel.Summary>
          )}
          onChange={this.handleChange('test3')}
        >
          <ExpansionPanel.Details>
            This is so weird content which has no meaning
          </ExpansionPanel.Details>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={this.state.test4}
          summary={(
            <ExpansionPanel.Summary>
              Test 4
            </ExpansionPanel.Summary>
          )}
          onChange={this.handleChange('test4')}
        >
          <ExpansionPanel.Details>
            <Label
              control={(
                <Checkbox
                  checked
                  onChange={noop}
                />
              )}
            >
              Checkbox
            </Label>
          </ExpansionPanel.Details>

          <Divider />

          <ExpansionPanel.Actions>
            <Button onPress={this.handleChange('test4')}>
              Cancel
            </Button>

            <Button
              color="primary"
              onPress={this.handleChange('test4')}
            >
              Save
            </Button>
          </ExpansionPanel.Actions>
        </ExpansionPanel>
      </div>
    );
  }
}

storiesOf('ExpansionPanel', module)
  .add('Default styles', () => (
    <Story />
  ));
