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

function RadioGroup({
  selected,
  onChange,
  children,
  ...props
}: Props) {
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

export default RadioGroup;
