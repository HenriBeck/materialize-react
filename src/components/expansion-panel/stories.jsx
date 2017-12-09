import React, { PureComponent } from 'react';
import { storiesOf } from '@storybook/react';

import Layout from '../layout';
import Divider from '../divider';
import Checkbox from '../checkbox';
import Label from '../label';
import Button from '../button';

import ExpansionPanel from './expansion-panel';

/**
 * The story for the ExpansionPanel component.
 *
 * @class
 */
class Story extends PureComponent {
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
      <Layout
        direction="column"
        style={{ width: 600 }}
      >
        <ExpansionPanel
          expanded={this.state.test1}
          onChange={this.handleChange('test1')}
        >
          <ExpansionPanel.Summary>
            Test 1
          </ExpansionPanel.Summary>

          <ExpansionPanel.Details>
            This is so weird content which has no meaning
          </ExpansionPanel.Details>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={this.state.test2}
          onChange={this.handleChange('test2')}
        >
          <ExpansionPanel.Summary>
            Test 1
          </ExpansionPanel.Summary>

          <ExpansionPanel.Details>
            This is so weird content which has no meaning
          </ExpansionPanel.Details>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={this.state.test3}
          onChange={this.handleChange('test3')}
        >
          <ExpansionPanel.Summary>
            Test 1
          </ExpansionPanel.Summary>

          <ExpansionPanel.Details>
            This is so weird content which has no meaning
          </ExpansionPanel.Details>
        </ExpansionPanel>

        <ExpansionPanel
          expanded={this.state.test4}
          onChange={this.handleChange('test4')}
        >
          <ExpansionPanel.Summary>
            Test 1
          </ExpansionPanel.Summary>

          <ExpansionPanel.Details>
            <Label>
              <Checkbox checked />

              Checkbox
            </Label>
          </ExpansionPanel.Details>

          <Divider />

          <ExpansionPanel.Actions>
            <Button onPress={this.handleChange('test4')}>
              Cancel
            </Button>

            <Button onPress={this.handleChange('test4')}>
              Save
            </Button>
          </ExpansionPanel.Actions>
        </ExpansionPanel>
      </Layout>
    );
  }
}

storiesOf('ExpansionPanel', module)
  .add('Default styles', () => (
    <Story />
  ));
