// @flow strict

import React, { type Node } from 'react';

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

function RadioButtonGroup({
  selected,
  onChange,
  children,
  ...props
}: Props): Node {
  return (
    <Layout
      inline
      direction="column"
      {...props}
    >
      <Context.Provider
        value={{
          selected,
          onChange,
        }}
      >
        {children}
      </Context.Provider>
    </Layout>
  );
}

export { Context };

export default RadioButtonGroup;
