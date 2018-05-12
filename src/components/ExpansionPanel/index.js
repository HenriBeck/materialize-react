// @flow strict

import React, {
  type Element,
  type ElementType,
  type Node,
} from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Collapse from '../Collapse';
import createSheet from '../../styles/create-sheet';
import { type Theme } from '../../theme/types';

import Summary from './Summary';
import Actions from './Actions';
import Details from './Details';

type Props = {
  expanded: boolean,
  className: string,
  summary: Element<ElementType>,
  onChange: () => void,
  children: Node,
};
type Data = { expanded: boolean };

const Sheet = createSheet('ExpansionPanel', (theme: Theme) => {
  return {
    expansionPanel: {
      position: 'relative',
      transition: 'margin 140ms',
      backgroundColor: theme.sheet,
      boxShadow: theme.elevation['2'],
      outline: 0,
      margin: (data: Data) => (data.expanded ? '16px 0' : 0),

      '&::before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        backgroundColor: theme.divider,
        opacity: (data: Data) => (data.expanded ? 0 : 1),
      },

      '&:first-child': {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        marginTop: 0,

        '&::before': { display: 'none' },
      },

      '&:last-child': {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        marginBottom: 0,
      },

      '&[aria-expanded="true"] + &::before': { display: 'none' },
    },
  };
});

function ExpansionPanel(props: Props) {
  const data: Data = { expanded: props.expanded };

  return (
    <Sheet data={data}>
      {({ classes }) => (
        <div
          {...getNotDeclaredProps(props, ExpansionPanel)}
          className={`${classes.expansionPanel} ${props.className}`}
          aria-expanded={props.expanded}
        >
          {React.cloneElement(props.summary, {
            expanded: props.expanded,
            onClick: props.onChange,
          })}

          <Collapse isOpen={props.expanded}>
            {props.children}
          </Collapse>
        </div>
      )}
    </Sheet>
  );
}

ExpansionPanel.propTypes = {
  expanded: PropTypes.bool.isRequired,
  summary: PropTypes.element.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ExpansionPanel.defaultProps = { className: '' };

ExpansionPanel.Summary = Summary;
ExpansionPanel.Actions = Actions;
ExpansionPanel.Details = Details;

export default ExpansionPanel;
