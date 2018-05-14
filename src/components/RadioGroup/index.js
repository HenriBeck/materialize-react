// @flow strict-local

import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

import Layout from '../Layout';

type Props = {
  selected: string,
  onChange: (name: string) => void,
  children: Node,
};

const Context = React.createContext({
  selected: null,
  onChange: () => null,
});

function RadioGroup(props: Props) {
  const context = {
    selected: props.selected,
    onChange: props.onChange,
  };

  return (
    <Layout
      inline
      direction="column"
      {...getNotDeclaredProps(props, Layout)}
    >
      <Context.Provider value={context}>
        {props.children}
      </Context.Provider>
    </Layout>
  );
}

RadioGroup.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export { Context };

export default RadioGroup;
